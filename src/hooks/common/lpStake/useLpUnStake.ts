import { useState, useMemo, useEffect } from 'react'
import { CreateTxOptions, MsgExecuteContract, Fee } from '@terra-money/terra.js'
import { useConnectedWallet } from '@terra-money/wallet-provider'
import { useRecoilValue } from 'recoil'

import { UTIL } from 'consts'

import {
  ContractAddr,
  LP,
  uLP,
  PostTxStatus,
  TokenDenomEnum,
  lpStaking,
} from 'types'

import {} from '../usePostTx'
import useCalcFee from '../useCalcFee'
import useFabricator from '../useFabricator'
import useMyBalance from '../useMyBalance'
import usePostTx from '../usePostTx'

import { validateFormInputAmount } from 'logics/validator'
import postTxStore from 'store/postTxStore'
import useLpStakerInfo from 'hooks/query/lpStaking/useLpStakerInfo'

export type UseLpUnStakeReturn = {
  stakerInfo?: lpStaking.StakerInfoResponse
  lpStaking: ContractAddr

  lpTokenAmount: LP
  setLpTokenAmount: (value: LP) => void
  lpTokenAmountErrMsg: string

  fee?: Fee

  onClickLpUnStake: () => void
  invalidForm: boolean
  submitErrMsg: string
}

const useLpUnStake = ({
  lpStaking,
}: {
  lpStaking: ContractAddr
}): UseLpUnStakeReturn => {
  const { balance: uusdBal } = useMyBalance({
    contractOrDenom: TokenDenomEnum.uusd,
  })

  const { getLpUnStakeMsgs } = useFabricator()
  const connectedWallet = useConnectedWallet()

  const postTxResult = useRecoilValue(postTxStore.postTxResult)
  const { postTx } = usePostTx()

  const myAddress = (connectedWallet?.walletAddress || '') as ContractAddr

  const { stakerInfo, refetch: reFetchLpStakingInfo } = useLpStakerInfo({
    staker: myAddress,
    lpStaking,
  })
  const [lpTokenAmount, setLpTokenAmount] = useState('' as LP)
  const lpTokenAmountErrMsg = useMemo(() => {
    const bond_amount = UTIL.demicrofy((stakerInfo?.bond_amount || '0') as uLP)
    return validateFormInputAmount({
      input: lpTokenAmount,
      max: bond_amount,
    })
  }, [lpTokenAmount])

  const invalidForm = lpTokenAmount.trim() === '' || !!lpTokenAmountErrMsg

  const txOptions: CreateTxOptions = useMemo(() => {
    let msgs: MsgExecuteContract[] = []
    if (Number(lpTokenAmount) > 0) {
      msgs = getLpUnStakeMsgs({ amount: lpTokenAmount, lpStaking })
    }
    return {
      msgs,
      feeDenoms: ['uusd'],
    }
  }, [lpTokenAmount])

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

  const onClickLpUnStake = (): void => {
    postTx({ txOptions: { ...txOptions, fee } })
  }

  const initForm = (): void => {
    setLpTokenAmount('' as LP)
  }

  useEffect(() => {
    if (postTxResult.status === PostTxStatus.DONE) {
      initForm()
      reFetchLpStakingInfo()
    }
  }, [postTxResult.status])

  return {
    stakerInfo,
    lpStaking,

    lpTokenAmount,
    setLpTokenAmount,
    lpTokenAmountErrMsg,

    fee,
    onClickLpUnStake,
    invalidForm,
    submitErrMsg,
  }
}

export default useLpUnStake
