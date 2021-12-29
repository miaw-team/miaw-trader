import { useMemo } from 'react'

import useLCD from './useLCD'
import useReactQuery from '../common/useReactQuery'

import { QueryKeyEnum, TokenDenomEnum, uUST, uLuna, ContractAddr } from 'types'
import { useConnectedWallet } from '@terra-money/wallet-provider'

const useMyNativeBalance = (): {
  refetch: () => void
  balances: { [TokenDenomEnum.uusd]: uUST; [TokenDenomEnum.uluna]: uLuna }
} => {
  const { balanceFetch } = useLCD()
  const connectedWallet = useConnectedWallet()
  const myAddress = (connectedWallet?.walletAddress || '') as ContractAddr

  const { data, refetch } = useReactQuery(
    [QueryKeyEnum.USER_BALANCE_ADDRESS, myAddress],
    () => balanceFetch({ address: myAddress }),
    {
      enabled: !!myAddress,
    }
  )

  const balances = useMemo(() => {
    const uusd = data?.[0]?.get('uusd')?.amount.toString()
    const uluna = data?.[0]?.get('uluna')?.amount.toString()

    return {
      [TokenDenomEnum.uusd]: (uusd || '0') as uUST,
      [TokenDenomEnum.uluna]: (uluna || '0') as uLuna,
    }
  }, [data])

  return { refetch, balances }
}

export default useMyNativeBalance
