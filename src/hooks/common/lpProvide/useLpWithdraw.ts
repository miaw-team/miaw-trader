import { useState, useMemo, useEffect } from 'react'
import { CreateTxOptions, MsgExecuteContract, Fee } from '@terra-money/terra.js'
import { useConnectedWallet } from '@terra-money/wallet-provider'
import { useDebouncedCallback } from 'use-debounce/lib'
import { useRecoilValue } from 'recoil'

import { UTIL } from 'consts'

import {
  Token,
  LP,
  uLP,
  uUST,
  PostTxStatus,
  TokenDenomEnum,
  ContractAddr,
} from 'types'

import usePostTx from '../usePostTx'
import postTxStore from 'store/postTxStore'
import useCalcFee from '../useCalcFee'
import useFabricator from '../useFabricator'

import { validateFormInputAmount } from 'logics/validator'
import { LpSimulation } from 'types/lpSimulation'
import { LpLpSimulation } from 'logics/lpSimulator'
import usePool from 'hooks/query/pair/usePool'
import useMyBalance from '../useMyBalance'

export type UseLpWithdrawReturn = {
  lpContract: ContractAddr | TokenDenomEnum
  token_0_Symbol: string
  token_1_Symbol: string

  lpTokenAmount: LP
  updateLpTokenAmount: (value: LP) => void
  lpTokenAmountErrMsg: string

  fee?: Fee
  tax: uUST
  simulation?: LpSimulation

  onClickLpWithdraw: () => void
  invalidForm: boolean
  submitErrMsg: string
}

const useLpWithdraw = ({
  token_0_ContractOrDenom,
  token_1_ContractOrDenom,
  token_0_Symbol,
  token_1_Symbol,
  lpContract,
  pairContract,
}: {
  token_0_ContractOrDenom: ContractAddr | TokenDenomEnum
  token_1_ContractOrDenom: ContractAddr | TokenDenomEnum
  token_0_Symbol: string
  token_1_Symbol: string
  lpContract: ContractAddr
  pairContract: ContractAddr
}): UseLpWithdrawReturn => {
  const { getTokenBalance } = useMyBalance()

  const { getLpWithdrawMsgs } = useFabricator()
  const connectedWallet = useConnectedWallet()
  const { poolInfo, refetch: refetchPool } = usePool({
    pairContract,
    token_0_ContractOrDenom,
  })
  const [simulation, setSimulation] = useState<LpSimulation>()

  const postTxResult = useRecoilValue(postTxStore.postTxResult)
  const { postTx, getTax } = usePostTx()

  const walletAddress = connectedWallet?.walletAddress as string

  const [lpTokenAmount, setLpTokenAmount] = useState('' as LP)
  const lpTokenAmountErrMsg = useMemo(() => {
    const myTokenUstLp = UTIL.demicrofy(getTokenBalance(lpContract))
    return validateFormInputAmount({
      input: lpTokenAmount,
      max: myTokenUstLp,
    })
  }, [lpTokenAmount])

  const invalidForm =
    postTxResult.status === PostTxStatus.BROADCAST ||
    lpTokenAmount.trim() === '' ||
    !!lpTokenAmountErrMsg

  const txOptions: CreateTxOptions = useMemo(() => {
    let msgs: MsgExecuteContract[] = []
    if (Number(lpTokenAmount) > 0) {
      msgs = getLpWithdrawMsgs({
        amount: lpTokenAmount,
        pairContract,
        lpContract,
      })
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
  const [tax, setTax] = useState<uUST>('0' as uUST)

  const submitErrMsg = useMemo(() => {
    if (fee) {
      const ust = UTIL.toBn(getTokenBalance(TokenDenomEnum.uusd))
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

  const dbcSimulateLpTokenAmount = useDebouncedCallback(
    async (nextUlpTokenAmount: uLP) => {
      const simulation = await LpLpSimulation({
        poolInfo,
        ulp: nextUlpTokenAmount,
        userLpBalance: getTokenBalance(lpContract) as uLP,
      })
      setSimulation(simulation)

      let simulatedUusd

      if (token_0_ContractOrDenom === TokenDenomEnum.uusd) {
        simulatedUusd = UTIL.microfy(
          simulation.token_0_Amount || ('0' as Token)
        ) as uUST
      } else if (token_1_ContractOrDenom === TokenDenomEnum.uusd) {
        simulatedUusd = UTIL.microfy(
          simulation.token_1_Amount || ('0' as Token)
        ) as uUST
      }

      if (simulatedUusd) {
        const _tax = await getTax({ uusd: simulatedUusd })
        setTax(_tax.amount.toString() as uUST)
      }
    },
    400
  )

  const updateLpTokenAmount = async (nextLpTokenAmount: LP): Promise<void> => {
    setLpTokenAmount(nextLpTokenAmount.trim() as LP)
    const nextUlpTokenAmount = UTIL.microfy(nextLpTokenAmount) as uLP
    dbcSimulateLpTokenAmount(nextUlpTokenAmount)
  }

  const onClickLpWithdraw = (): void => {
    postTx({ txOptions: { ...txOptions, fee } })
  }

  const initForm = (): void => {
    updateLpTokenAmount('' as LP)
  }

  useEffect(() => {
    if (postTxResult.status === PostTxStatus.DONE) {
      initForm()
      refetchPool()
    }
  }, [postTxResult.status])

  return {
    lpContract,
    token_0_Symbol,
    token_1_Symbol,

    lpTokenAmount,
    updateLpTokenAmount,
    lpTokenAmountErrMsg,

    fee,
    tax,
    simulation,
    onClickLpWithdraw,
    invalidForm,
    submitErrMsg,
  }
}

export default useLpWithdraw
