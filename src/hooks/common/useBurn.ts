import { CreateTxOptions, MsgExecuteContract } from '@terra-money/terra.js'
import { useConnectedWallet } from '@terra-money/wallet-provider'
import { UTIL } from 'consts'
import { fabricateBurn } from 'logics/fabricator'
import { validateFormInputAmount } from 'logics/validator'
import { useMemo, useState } from 'react'
import { ContractAddr, CW20, TokenType } from 'types'
import useCalcFee from './useCalcFee'
import useMyBalance from './useMyBalance'
import usePostTx, { UsePostTxReturn } from './usePostTx'

export type UseBurnReturn = {
  burnToken: () => Promise<void>
  amount: CW20
  setAmount: (value: CW20) => void
  amountErrMsg: string
  memo?: string
  setMemo: (value: string) => void
  memoErrMsg: string
  postTx: UsePostTxReturn
  invalidForm: boolean
}

const useBurn = ({
  token,
}: {
  token: TokenType<ContractAddr>
}): UseBurnReturn => {
  const { balance: tokenBal } = useMyBalance({
    contractOrDenom: token.contractOrDenom,
  })
  const postTx = usePostTx()
  const connectedWallet = useConnectedWallet()
  const myAddress = (connectedWallet?.walletAddress || '') as ContractAddr

  const [amount, setAmount] = useState<CW20>('' as CW20)
  const amountErrMsg = useMemo(() => {
    const myTokenAmount = UTIL.demicrofy(tokenBal)

    return validateFormInputAmount({
      input: amount,
      max: myTokenAmount,
    })
  }, [amount, tokenBal])

  const [memo, setMemo] = useState<string>('')
  const memoErrMsg = useMemo(() => {
    if (memo && memo.length > 200) {
      return 'memo is too long'
    }

    return ''
  }, [memo])

  const invalidForm =
    amount.trim() === '' || memo.trim() === '' || !!amountErrMsg || !!memoErrMsg

  const txOptions: CreateTxOptions = useMemo(() => {
    let msgs: MsgExecuteContract[] = []
    if (Number(amount) > 0) {
      msgs = fabricateBurn({
        sender: myAddress,
        token: token.contractOrDenom,
        amount,
      })
    }
    return {
      msgs,
      feeDenoms: ['uusd'],
      memo,
    }
  }, [amount, memo])

  const { fee } = useCalcFee({
    isValid: !invalidForm,
    txOptions,
  })

  const burnToken = async (): Promise<void> => {
    postTx.postTx({ txOptions: { ...txOptions, fee } })
  }

  return {
    burnToken,
    amount,
    setAmount,
    amountErrMsg,
    memo,
    setMemo,
    memoErrMsg,
    postTx,
    invalidForm,
  }
}

export default useBurn
