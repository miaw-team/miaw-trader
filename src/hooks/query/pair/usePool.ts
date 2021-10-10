import { useMemo } from 'react'

import useLCD from '../useLCD'
import {
  QueryKeyEnum,
  terraswap,
  uToken,
  ContractAddr,
  TokenDenomEnum,
} from 'types'
import useReactQuery from 'hooks/common/useReactQuery'
import { ExtractPoolResponseType, poolResponseParser } from 'logics/pool'

export type UsePoolReturn = {
  pollInfo: ExtractPoolResponseType
  refetch: () => void
}

const usePool = ({
  pairContract,
  token_0_ContractOrDenom,
}: {
  pairContract?: ContractAddr
  token_0_ContractOrDenom: ContractAddr | TokenDenomEnum
}): UsePoolReturn => {
  const { wasmFetch } = useLCD()
  const { data, refetch } = useReactQuery(
    [QueryKeyEnum.POOL, pairContract],
    () =>
      pairContract &&
      wasmFetch<terraswap.Pool, terraswap.PoolResponse<uToken>>({
        contract: pairContract,
        msg: {
          pool: {},
        },
      }),

    {
      enabled: !!pairContract,
    }
  )

  const pollInfo = useMemo(
    () => poolResponseParser({ data, token_0_ContractOrDenom }),
    [data]
  )

  return { pollInfo, refetch }
}

export default usePool
