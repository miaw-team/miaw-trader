import { useMemo } from 'react'
import _ from 'lodash'

import useLCD from '../useLCD'
import { QueryKeyEnum, terraswap, uToken, ContractAddr } from 'types'
import useReactQuery from 'hooks/common/useReactQuery'
import {
  ExtractPoolByTsResponseType,
  poolByTsResponseParser,
} from 'logics/pool'

export type UsePoolListReturn = {
  poolInfoList: {
    symbol: string
    poolByTsInfo: ExtractPoolByTsResponseType
  }[]
  refetch: () => void
}

const usePoolList = ({
  pairContractList,
}: {
  pairContractList: { symbol: string; pair: ContractAddr }[]
}): UsePoolListReturn => {
  const { wasmFetch } = useLCD()
  const { data, refetch } = useReactQuery(
    [QueryKeyEnum.POOL_LIST, pairContractList],
    () =>
      Promise.all(
        _.map(pairContractList, async (item) => {
          let ustFetchData: terraswap.PoolResponse<uToken> | undefined =
            undefined
          if (item) {
            ustFetchData = await wasmFetch<
              terraswap.Pool,
              terraswap.PoolResponse<uToken>
            >({
              contract: item.pair,
              msg: {
                pool: {},
              },
            })
          }

          return {
            symbol: item.symbol,
            ustFetchData,
          }
        })
      ),
    {
      refetchInterval: 1000 * 15,
    }
  )

  const poolInfoList = useMemo(() => {
    return _.map(data, (item) => {
      return {
        symbol: item.symbol,
        poolByTsInfo: poolByTsResponseParser(item.ustFetchData),
      }
    })
  }, [data])

  return { poolInfoList, refetch }
}

export default usePoolList
