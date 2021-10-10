import { useConnectedWallet } from '@terra-money/wallet-provider'

import { UTIL } from 'consts'
import { ContractAddr, TokenDenomEnum, uToken } from 'types'
import useUserBalance from 'hooks/query/useUserBalance'
import useMyCw20Balance from 'hooks/query/token/useMyCw20Balances'

export type UseMyBalanceReturn = {
  getTokenBalance: (tokenAddress: string) => uToken
  refetch: () => void
}

const useMyBalance = (): UseMyBalanceReturn => {
  const connectedWallet = useConnectedWallet()
  const myAddress = (connectedWallet?.walletAddress || '') as ContractAddr

  const { myCw20Balances, refetch: refetchCw20Balances } = useMyCw20Balance()

  const { userBalances, refetch: refetchUserBalance } = useUserBalance({
    address: myAddress,
  })

  const getTokenBalance = (tokenAddress: string): uToken => {
    const balance = myCw20Balances[tokenAddress as ContractAddr]

    const amount = UTIL.isNativeDenom(tokenAddress)
      ? (userBalances[tokenAddress as TokenDenomEnum] as string as uToken)
      : balance

    return amount
  }

  const refetch = (): void => {
    refetchUserBalance()
    refetchCw20Balances()
  }

  return {
    getTokenBalance,
    refetch,
  }
}

export default useMyBalance
