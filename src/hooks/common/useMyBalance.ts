import { UTIL } from 'consts'
import { ContractAddr, TokenDenomEnum, uToken } from 'types'
import useMyCw20Balance from 'hooks/query/token/useMyCw20Balances'
import useMyNativeBalance from 'hooks/query/useMyNativeBalance'
import { useMemo } from 'react'

export type UseMyBalanceReturn = {
  balance: uToken
  refetch: () => void
}

const useMyBalance = ({
  contractOrDenom,
}: {
  contractOrDenom: ContractAddr | TokenDenomEnum
}): UseMyBalanceReturn => {
  const { balance: cw20balance, refetch: refetchCw20Balance } =
    useMyCw20Balance({
      contract: contractOrDenom as ContractAddr,
    })

  const { balances: nativeBalances, refetch: refetchNativeBalances } =
    useMyNativeBalance()

  const balance = useMemo(() => {
    return UTIL.isNativeDenom(contractOrDenom)
      ? nativeBalances[contractOrDenom as TokenDenomEnum]
      : cw20balance
  }, [contractOrDenom, cw20balance, nativeBalances])

  const refetch = (): void => {
    refetchNativeBalances()
    refetchCw20Balance()
  }

  return {
    balance,
    refetch,
  }
}

export default useMyBalance
