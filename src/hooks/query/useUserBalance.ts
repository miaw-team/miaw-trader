import { useMemo } from 'react'

import useLCD from './useLCD'
import useReactQuery from '../common/useReactQuery'

import { QueryKeyEnum, TokenDenomEnum, uUST, uLuna, ContractAddr } from 'types'

const useUserBalance = ({
  address,
}: {
  address: ContractAddr
}): {
  refetch: () => void
  userBalances: { [TokenDenomEnum.uusd]: uUST; [TokenDenomEnum.uluna]: uLuna }
} => {
  const { balanceFetch } = useLCD()

  const { data, refetch } = useReactQuery(
    [QueryKeyEnum.USER_BALANCE_ADDRESS, address],
    () => balanceFetch({ address }),
    {
      enabled: !!address,
    }
  )

  const userBalances = useMemo(() => {
    const uusd = data?.[0]?.get('uusd')?.amount.toString()
    const uluna = data?.[0]?.get('uluna')?.amount.toString()

    return {
      [TokenDenomEnum.uusd]: (uusd || '0') as uUST,
      [TokenDenomEnum.uluna]: (uluna || '0') as uLuna,
    }
  }, [data])

  return { refetch, userBalances }
}

export default useUserBalance
