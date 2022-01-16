import {
  CreateTxOptions,
  MsgExecuteContract,
  AccAddress,
  Fee,
} from '@terra-money/terra.js'
import { useConnectedWallet } from '@terra-money/wallet-provider'

import { UTIL } from 'consts'
import { fabricateSend } from 'logics/fabricator'
import { validateFormInputAmount } from 'logics/validator'
import { useMemo, useState } from 'react'
import { ContractAddr, CW20, TokenType } from 'types'
import useCalcFee from './useCalcFee'
import useMyBalance from './useMyBalance'
import usePostTx, { UsePostTxReturn } from './usePostTx'

export type UseSendReturn = {
  onClickSend: () => Promise<void>
  amount: CW20
  setAmount: (value: CW20) => void
  amountErrMsg: string
  memo?: string
  setMemo: (value: string) => void
  memoErrMsg: string
  recipient: string
  setRecipient: (value: string) => void
  recipientErrMsg: string
  postTx: UsePostTxReturn
  fee?: Fee
  invalidForm: boolean
}

const useSend = ({ token }: { token: TokenType }): UseSendReturn => {
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

  const [recipient, setRecipient] = useState<string>('')
  const recipientErrMsg = useMemo(() => {
    if (recipient.length > 0 && !AccAddress.validate(recipient)) {
      return 'invalid address.'
    }

    return ''
  }, [recipient])

  const invalidForm =
    amount.trim() === '' ||
    recipient === '' ||
    !!amountErrMsg ||
    !!memoErrMsg ||
    !!recipientErrMsg

  const txOptions: CreateTxOptions = useMemo(() => {
    let msgs: MsgExecuteContract[] = []
    if (Number(amount) > 0) {
      msgs = fabricateSend({
        sender: myAddress,
        token: token.contractOrDenom as ContractAddr,
        amount,
        recipient: recipient as ContractAddr,
      })
    }
    return {
      msgs,
      feeDenoms: ['uusd'],
      memo,
    }
  }, [amount, memo, recipient])

  const { fee } = useCalcFee({
    isValid: !invalidForm,
    txOptions,
  })

  const onClickSend = async (): Promise<void> => {
    postTx.postTx({ txOptions: { ...txOptions, fee } })
  }

  return {
    onClickSend,
    amount,
    setAmount,
    amountErrMsg,
    memo,
    setMemo,
    memoErrMsg,
    recipient,
    setRecipient,
    recipientErrMsg,
    postTx,
    fee,
    invalidForm,
  }
}

export default useSend
