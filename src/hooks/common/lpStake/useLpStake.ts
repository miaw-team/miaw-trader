import { useState, useMemo, useEffect } from 'react'
import { CreateTxOptions, MsgExecuteContract, Fee } from '@terra-money/terra.js'
import { useConnectedWallet } from '@terra-money/wallet-provider'
import { useRecoilValue } from 'recoil'

import { UTIL } from 'consts'

import { ContractAddr, LP, PostTxStatus, TokenDenomEnum } from 'types'

import useCalcFee from '../useCalcFee'
import useFabricator from '../useFabricator'
import useMyBalance from '../useMyBalance'
import usePostTx from '../usePostTx'

import { validateFormInputAmount } from 'logics/validator'
import postTxStore from 'store/postTxStore'

export type UseLpStakeReturn = {
  lpStaking: ContractAddr
  lpContract: ContractAddr

  lpTokenAmount: LP
  setLpTokenAmount: (value: LP) => void
  lpTokenAmountErrMsg: string

  fee?: Fee

  onClickLpStake: () => void
  invalidForm: boolean
  submitErrMsg: string
}

const useLpStake = ({
  lpStaking,
  lpContract,
}: {
  lpStaking: ContractAddr
  lpContract: ContractAddr
}): UseLpStakeReturn => {
  const { balance: uusdBal } = useMyBalance({
    contractOrDenom: TokenDenomEnum.uusd,
  })

  const { balance: lpBal } = useMyBalance({
    contractOrDenom: lpContract,
  })

  const { getLpStakeMsgs } = useFabricator()
  const connectedWallet = useConnectedWallet()

  const postTxResult = useRecoilValue(postTxStore.postTxResult)
  const { postTx } = usePostTx()

  const walletAddress = connectedWallet?.walletAddress as string

  const [lpTokenAmount, setLpTokenAmount] = useState('' as LP)
  const lpTokenAmountErrMsg = useMemo(() => {
    const myUlpAmount = UTIL.demicrofy(lpBal)
    return validateFormInputAmount({
      input: lpTokenAmount,
      max: myUlpAmount,
    })
  }, [lpTokenAmount])

  const invalidForm = lpTokenAmount.trim() === '' || !!lpTokenAmountErrMsg

  const txOptions: CreateTxOptions = useMemo(() => {
    let msgs: MsgExecuteContract[] = []
    if (Number(lpTokenAmount) > 0) {
      msgs = getLpStakeMsgs({ amount: lpTokenAmount, lpStaking, lpContract })
    }
    return {
      msgs,
      feeDenoms: ['uusd'],
    }
  }, [walletAddress, lpTokenAmount])

  const { fee } = useCalcFee({
    isValid: !invalidForm,
    txOptions,
  })

  const submitErrMsg = useMemo(() => {
    if (fee) {
      const ust = UTIL.toBn(uusdBal)
      const uusdFee =
        fee.amount
          .toData()
          ?.find((x) => x.denom === 'uusd')
          ?.amount.toString() || '0'

      if (ust.isLessThanOrEqualTo(uusdFee)) {
        return 'Insufficient fee'
      }
    }
    return ''
  }, [fee, lpTokenAmount])

  const onClickLpStake = (): void => {
    postTx({ txOptions: { ...txOptions, fee } })
  }

  const initForm = (): void => {
    setLpTokenAmount('' as LP)
  }

  useEffect(() => {
    if (postTxResult.status === PostTxStatus.DONE) {
      initForm()
    }
  }, [postTxResult.status])

  return {
    lpStaking,
    lpContract,

    lpTokenAmount,
    setLpTokenAmount,
    lpTokenAmountErrMsg,

    fee,
    onClickLpStake,
    invalidForm,
    submitErrMsg,
  }
}

export default useLpStake
