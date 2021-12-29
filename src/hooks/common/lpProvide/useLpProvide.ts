import { useState, useMemo, useEffect } from 'react'
import { CreateTxOptions, MsgExecuteContract, Fee } from '@terra-money/terra.js'
import { useConnectedWallet } from '@terra-money/wallet-provider'
import { useDebouncedCallback } from 'use-debounce/lib'
import { useRecoilValue } from 'recoil'

import { UTIL } from 'consts'

import {
  uToken,
  Token,
  PostTxStatus,
  TokenDenomEnum,
  ContractAddr,
} from 'types'
import { LpSimulation } from 'types/lpSimulation'

import usePostTx from '../usePostTx'
import postTxStore from 'store/postTxStore'
import useCalcFee from '../useCalcFee'
import useFabricator from '../useFabricator'

import { validateFormInputAmount } from 'logics/validator'
import { LpToken_0_Simulation, LpToken_1_Simulation } from 'logics/lpSimulator'
import usePool from 'hooks/query/pair/usePool'
import useMyBalance from '../useMyBalance'

export type UseLpProvideReturn = {
  token_0_ContractOrDenom: ContractAddr | TokenDenomEnum
  token_1_ContractOrDenom: ContractAddr | TokenDenomEnum
  token_0_Symbol: string
  token_1_Symbol: string

  token_0_Amount: Token
  updateToken_0_Amount: (value: Token) => void
  token_0_AmountErrMsg: string
  token_1_Amount: Token
  updateToken_1_Amount: (value: Token) => void
  token_1_AmountErrMsg: string

  fee?: Fee
  simulation?: LpSimulation

  onClickLpProvide: () => void
  invalidForm: boolean
  submitErrMsg: string
}

const useLpProvide = ({
  token_0_ContractOrDenom,
  token_1_ContractOrDenom,
  token_0_Symbol,
  token_1_Symbol,
  pairContract,
}: {
  token_0_ContractOrDenom: ContractAddr | TokenDenomEnum
  token_1_ContractOrDenom: ContractAddr | TokenDenomEnum
  token_0_Symbol: string
  token_1_Symbol: string
  pairContract: ContractAddr
}): UseLpProvideReturn => {
  const { balance: uusdBal } = useMyBalance({
    contractOrDenom: TokenDenomEnum.uusd,
  })
  const { balance: token_0_bal } = useMyBalance({
    contractOrDenom: token_0_ContractOrDenom,
  })
  const { balance: token_1_bal } = useMyBalance({
    contractOrDenom: token_1_ContractOrDenom,
  })

  const { getLpProvideMsgs } = useFabricator()
  const connectedWallet = useConnectedWallet()
  const { poolInfo, refetch: refetchPool } = usePool({
    pairContract,
    token_0_ContractOrDenom,
  })
  const [simulation, setSimulation] = useState<LpSimulation>()

  const postTxResult = useRecoilValue(postTxStore.postTxResult)
  const { postTx } = usePostTx()

  const walletAddress = connectedWallet?.walletAddress as string

  const [token_0_Amount, setToken_0_Amount] = useState('' as Token)
  const token_0_AmountErrMsg = useMemo(() => {
    const myToken_0_Amount = UTIL.demicrofy(token_0_bal)
    return validateFormInputAmount({
      input: token_0_Amount,
      max: myToken_0_Amount,
    })
  }, [token_0_Amount])

  const [token_1_Amount, setToken_1_Amount] = useState('' as Token)
  const token_1_AmountErrMsg = useMemo(() => {
    const myToken_1_Amount = UTIL.demicrofy(token_1_bal)
    return validateFormInputAmount({
      input: token_1_Amount,
      max: myToken_1_Amount,
    })
  }, [token_1_Amount])

  const invalidForm =
    postTxResult.status === PostTxStatus.BROADCAST ||
    token_0_Amount.trim() === '' ||
    !!token_0_AmountErrMsg ||
    !!token_1_AmountErrMsg

  const txOptions: CreateTxOptions = useMemo(() => {
    let msgs: MsgExecuteContract[] = []
    if (Number(token_0_Amount) > 0 && Number(token_1_Amount) > 0) {
      msgs = getLpProvideMsgs({
        token_0_Amount,
        token_1_Amount,
        token_0_ContractOrDenom,
        token_1_ContractOrDenom,
        pairContract,
      })
    }
    return {
      msgs,
      feeDenoms: ['uusd'],
    }
  }, [walletAddress, token_0_Amount, token_1_Amount])

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
  }, [fee])

  const dbcSimulateTokenAmount = useDebouncedCallback(
    async (nextUToken_0_Amount: uToken) => {
      const simulation = await LpToken_0_Simulation({
        poolInfo,
        uToken_0: nextUToken_0_Amount,
      })
      setSimulation(simulation)
      setToken_1_Amount(simulation?.token_1_Amount as Token)
    },
    400
  )

  const updateToken_0_Amount = async (
    nextToken_0_Amount: Token
  ): Promise<void> => {
    setToken_0_Amount(nextToken_0_Amount.trim() as Token)
    setToken_1_Amount('' as Token)
    const nextUToken_0_Amount = UTIL.microfy(nextToken_0_Amount) as uToken
    dbcSimulateTokenAmount(nextUToken_0_Amount)
  }

  const dbcSimulateUstAmount = useDebouncedCallback(
    async (nextUToken_1_Amount: uToken) => {
      const simulation = await LpToken_1_Simulation({
        poolInfo,
        uToken_1: nextUToken_1_Amount,
      })
      setSimulation(simulation)
      setToken_0_Amount(simulation?.token_0_Amount as Token)
    },
    400
  )

  const updateToken_1_Amount = async (
    nextToken_1_Amount: Token
  ): Promise<void> => {
    setToken_1_Amount(nextToken_1_Amount.trim() as Token)
    setToken_0_Amount('' as Token)
    const nextUToken_1_Amount = UTIL.microfy(nextToken_1_Amount) as uToken
    dbcSimulateUstAmount(nextUToken_1_Amount)
  }

  const onClickLpProvide = (): void => {
    postTx({ txOptions: { ...txOptions, fee } })
  }

  const initForm = (): void => {
    setToken_1_Amount('' as Token)
    setToken_0_Amount('' as Token)
  }

  useEffect(() => {
    updateToken_0_Amount(token_0_Amount)
  }, [pairContract])

  useEffect(() => {
    if (postTxResult.status === PostTxStatus.DONE) {
      initForm()
      refetchPool()
    }
  }, [postTxResult.status])

  return {
    token_0_ContractOrDenom,
    token_1_ContractOrDenom,
    token_0_Symbol,
    token_1_Symbol,

    token_0_Amount,
    updateToken_0_Amount,
    token_0_AmountErrMsg,
    token_1_Amount,
    updateToken_1_Amount,
    token_1_AmountErrMsg,

    fee,
    simulation,
    onClickLpProvide,
    invalidForm,
    submitErrMsg,
  }
}

export default useLpProvide
