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
  validateFormInputAmountDecimal,
} from 'logics/validator'
import useNetwork from '../useNetwork'
import usePool from 'hooks/query/pair/usePool'

export type UseLimitOrderBuyReturn = {
  askTokenPrice: Token
  offerDenom: TokenDenomEnum
  askContractOrDenom: ContractAddr | TokenDenomEnum
  offerTokenSymbol: string
  askTokenSymbol: string

  offerAmount: Token
  offerAmountErrMsg: string

  askAmount: Token
  updateAskAmount: (value: Token) => void
  askAmountErrMsg: string
  askPrice: Token
  updateAskPrice: (value: Token) => void
  askPriceErrMsg: string

  miawToken: TokenType<ContractAddr>
  miawAmount: Token
  setMiawAmount: (value: Token) => void
  miawAmountErrMsg: string

  fee?: StdFee

  onClickLimitOrderBuy: () => void
  invalidForm: boolean
  submitErrMsg: string
}

const useLimitOrderBuy = ({
  offerDenom,
  askContractOrDenom,
  offerTokenSymbol,
  askTokenSymbol,
  pairContract,
}: {
  offerDenom: TokenDenomEnum
  askContractOrDenom: ContractAddr | TokenDenomEnum
  offerTokenSymbol: string
  askTokenSymbol: string
  pairContract: ContractAddr
}): UseLimitOrderBuyReturn => {
  const { getTokenBalance } = useMyBalance()
  const { getSubmitOrderMsgs } = useFabricator()
  const connectedWallet = useConnectedWallet()
  const { limitOrder, miawToken } = useNetwork()

  const { pollInfo } = usePool({
    pairContract,
    token_0_ContractOrDenom: askContractOrDenom,
  })

  const askTokenPrice = UTIL.toBn(pollInfo.token_0_Price)
    .dp(6)
    .toString(10) as Token

  const postTxResult = useRecoilValue(postTxStore.postTxResult)
  const { postTx } = usePostTx()

  const walletAddress = connectedWallet?.walletAddress as string

  const [askAmount, setAskAmount] = useState('' as Token)
  const askAmountErrMsg = useMemo(() => {
    return validateFormInputAmountDecimal({
      input: askAmount,
    })
  }, [askAmount])

  const [askPrice, setAskPrice] = useState('' as Token)
  const askPriceErrMsg = useMemo(() => {
    return validateFormInputAmount({
      input: askPrice,
      max: askTokenPrice,
    })
  }, [askPrice])

  const offerAmount = useMemo(() => {
    if (askAmount && askPrice) {
      return UTIL.toBn(askAmount).multipliedBy(askPrice).toString(10) as Token
    }
    return '0' as Token
  }, [askAmount, askPrice])
  const offerAmountErrMsg = useMemo(() => {
    const myOfferToken = UTIL.demicrofy(getTokenBalance(offerDenom))
    return validateFormInputAmount({
      input: offerAmount,
      max: myOfferToken,
    })
  }, [offerAmount])

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
    askAmount.trim() === '' ||
    !!miawAmountErrMsg ||
    !!askAmountErrMsg ||
    !!askPriceErrMsg

  const txOptions: CreateTxOptions = useMemo(() => {
    let msgs: MsgExecuteContract[] = []
    if (Number(askAmount) > 0 && Number(offerAmount) > 0) {
      msgs = getSubmitOrderMsgs({
        offerAmount,
        askAmount,
        limitOrderContract: limitOrder,
        offerContractOrDenom: offerDenom,
        askContractOrDenom,
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

  const updateAskAmount = async (nextAskAmount: Token): Promise<void> => {
    setAskAmount(nextAskAmount.trim() as Token)
  }

  const updateAskPrice = async (nextAskPrice: Token): Promise<void> => {
    setAskPrice(nextAskPrice.trim() as Token)
  }

  const submitErrMsg = useMemo(() => {
    let msg = ''

    if (fee) {
      let availableUusd = UTIL.toBn(getTokenBalance(TokenDenomEnum.uusd))

      if (offerDenom === TokenDenomEnum.uusd) {
        availableUusd = availableUusd.minus(UTIL.microfy(askAmount))
      }

      msg = validateFeeTax({
        availableUusd: availableUusd.toFixed(0) as uUST,
        fee,
      })
    }

    return msg
  }, [fee, askAmount])

  const onClickLimitOrderBuy = (): void => {
    postTx({ txOptions: { ...txOptions, fee } })
  }

  const initForm = (): void => {
    updateAskAmount('' as Token)
    setAskPrice('' as Token)
  }

  useEffect(() => {
    if (postTxResult.status === PostTxStatus.DONE) {
      initForm()
    }
  }, [postTxResult.status])

  return {
    askTokenPrice,
    offerDenom,
    askContractOrDenom,
    offerTokenSymbol,
    askTokenSymbol,

    offerAmount,
    offerAmountErrMsg,

    askAmount,
    updateAskAmount,
    askAmountErrMsg,

    askPrice,
    updateAskPrice,
    askPriceErrMsg,

    miawToken,
    miawAmount,
    setMiawAmount,
    miawAmountErrMsg,

    fee,
    onClickLimitOrderBuy,
    invalidForm,
    submitErrMsg,
  }
}

export default useLimitOrderBuy
