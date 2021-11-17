import { useState, useMemo, useEffect } from 'react'
import {
  CreateTxOptions,
  MsgExecuteContract,
  StdFee,
} from '@terra-money/terra.js'
import { useConnectedWallet } from '@terra-money/wallet-provider'
import { useRecoilValue } from 'recoil'

import { UTIL } from 'consts'

import {
  Token,
  uUST,
  PostTxStatus,
  TokenDenomEnum,
  ContractAddr,
  TokenType,
} from 'types'

import usePostTx from '../usePostTx'
import postTxStore from 'store/postTxStore'
import useCalcFee from '../useCalcFee'
import useFabricator from '../useFabricator'
import useMyBalance from '../useMyBalance'

import {
  validateFeeTax,
  validateFormInputAmount,
  validateFormInputMinAmount,
} from 'logics/validator'
import useNetwork from '../useNetwork'
import usePool from 'hooks/query/pair/usePool'

export type UseLimitOrderSellReturn = {
  offerTokenPrice: Token
  offerContractOrDenom: ContractAddr | TokenDenomEnum
  askDenom: TokenDenomEnum
  offerTokenSymbol: string
  askTokenSymbol: string

  offerAmount: Token

  askAmount: Token
  updateOfferAmount: (value: Token) => void
  offerAmountErrMsg: string
  askPrice: Token
  updateAskPrice: (value: Token) => void
  askPriceErrMsg: string

  miawToken: TokenType<ContractAddr>
  miawAmount: Token
  setMiawAmount: (value: Token) => void
  miawAmountErrMsg: string

  fee?: StdFee

  onClickLimitOrderSell: () => void
  invalidForm: boolean
  submitErrMsg: string
}

const useLimitOrderSell = ({
  offerContractOrDenom,
  askDenom,
  offerTokenSymbol,
  askTokenSymbol,
  pairContract,
}: {
  offerContractOrDenom: ContractAddr | TokenDenomEnum
  askDenom: TokenDenomEnum
  offerTokenSymbol: string
  askTokenSymbol: string
  pairContract: ContractAddr
}): UseLimitOrderSellReturn => {
  const { getTokenBalance } = useMyBalance()
  const { getSubmitOrderMsgs } = useFabricator()
  const connectedWallet = useConnectedWallet()
  const { limitOrder, miawToken } = useNetwork()

  const { poolInfo } = usePool({
    pairContract,
    token_0_ContractOrDenom: askDenom,
  })

  const offerTokenPrice = UTIL.toBn(poolInfo.token_1_Price)
    .dp(6)
    .toString(10) as Token

  const postTxResult = useRecoilValue(postTxStore.postTxResult)
  const { postTx } = usePostTx()

  const walletAddress = connectedWallet?.walletAddress as string

  const [offerAmount, setOfferAmount] = useState('' as Token)
  const offerAmountErrMsg = useMemo(() => {
    const myOfferAmount = UTIL.demicrofy(getTokenBalance(offerContractOrDenom))
    return validateFormInputAmount({
      input: offerAmount,
      max: myOfferAmount,
    })
  }, [offerAmount])

  const [askPrice, setAskPrice] = useState('' as Token)
  const askPriceErrMsg = useMemo(() => {
    return validateFormInputMinAmount({
      input: askPrice,
      min: offerTokenPrice,
    })
  }, [askPrice])

  const askAmount = useMemo(() => {
    if (offerAmount && askPrice) {
      return UTIL.toBn(offerAmount).multipliedBy(askPrice).toString(10) as Token
    }
    return '0' as Token
  }, [offerAmount, askPrice])

  const myMiawAmount = UTIL.demicrofy(
    getTokenBalance(miawToken.contractOrDenom)
  )
  const [miawAmount, setMiawAmount] = useState<Token>('1' as Token)
  const miawAmountErrMsg = useMemo(() => {
    return validateFormInputAmount({
      input: miawAmount,
      max: myMiawAmount,
      min: '1' as Token,
    })
  }, [miawAmount, myMiawAmount])

  const invalidForm =
    postTxResult.status === PostTxStatus.BROADCAST ||
    offerAmount.trim() === '' ||
    !!miawAmountErrMsg ||
    !!offerAmountErrMsg ||
    !!askPriceErrMsg

  const txOptions: CreateTxOptions = useMemo(() => {
    let msgs: MsgExecuteContract[] = []
    if (Number(askAmount) > 0 && Number(offerAmount) > 0) {
      msgs = getSubmitOrderMsgs({
        offerAmount,
        askAmount,
        limitOrderContract: limitOrder,
        offerContractOrDenom,
        askContractOrDenom: askDenom,
        feeContractOrDenom: miawToken.contractOrDenom,
        feeAmount: miawAmount,
      })
    }
    return {
      msgs,
      feeDenoms: ['uusd'],
    }
  }, [walletAddress, offerAmount, askAmount, miawAmount])

  const { fee } = useCalcFee({
    isValid: !invalidForm,
    txOptions,
  })

  const updateOfferAmount = async (nextOfferAmount: Token): Promise<void> => {
    setOfferAmount(nextOfferAmount.trim() as Token)
  }

  const updateAskPrice = async (nextAskPrice: Token): Promise<void> => {
    setAskPrice(nextAskPrice.trim() as Token)
  }

  const submitErrMsg = useMemo(() => {
    let msg = ''

    if (fee) {
      let availableUusd = UTIL.toBn(getTokenBalance(TokenDenomEnum.uusd))

      if (offerContractOrDenom === TokenDenomEnum.uusd) {
        availableUusd = availableUusd.minus(UTIL.microfy(askAmount))
      }

      msg = validateFeeTax({
        availableUusd: availableUusd.toFixed(0) as uUST,
        fee,
      })
    }

    return msg
  }, [fee, askAmount])

  const onClickLimitOrderSell = (): void => {
    postTx({ txOptions: { ...txOptions, fee } })
  }

  const initForm = (): void => {
    updateOfferAmount('' as Token)
    setAskPrice('' as Token)
  }

  useEffect(() => {
    if (postTxResult.status === PostTxStatus.DONE) {
      initForm()
    }
  }, [postTxResult.status])

  return {
    offerTokenPrice,
    offerContractOrDenom,
    askDenom,
    offerTokenSymbol,
    askTokenSymbol,

    askAmount,

    offerAmount,
    updateOfferAmount,
    offerAmountErrMsg,

    askPrice,
    updateAskPrice,
    askPriceErrMsg,

    miawToken,
    miawAmount,
    setMiawAmount,
    miawAmountErrMsg,

    fee,
    onClickLimitOrderSell,
    invalidForm,
    submitErrMsg,
  }
}

export default useLimitOrderSell
