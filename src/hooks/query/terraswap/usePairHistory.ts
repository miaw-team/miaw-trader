import axios from 'axios'
import useReactQuery from 'hooks/common/useReactQuery'

import { QueryKeyEnum, ContractAddr } from 'types'
import { APIURL } from 'consts'

type FetchResponseType = {
  pair: {
    token0: {
      symbol: string
      tokenAddress: string
    }
    token1: {
      symbol: string
      tokenAddress: string
    }
    historicalData: {
      timestamp: number
      token0Reserve: string
      token1Reserve: string
      totalLpTokenShare: string
    }[]
  }
}

export type UseHistoricalDataReturn = {
  pair?: FetchResponseType['pair']
}

const usePairHistory = ({
  pairContract,
  from,
  to,
}: {
  pairContract: ContractAddr
  from: number
  to: number
}): UseHistoricalDataReturn => {
  const { data: pair } = useReactQuery(
    [QueryKeyEnum.HISTORICAL_DATA, pairContract, from, to],
    async () => {
      const query = `query{
        pair(pairAddress: "${pairContract}") {
          token0 {
            symbol
            tokenAddress
          }
          token1 {
            symbol
            tokenAddress
          }
          historicalData(to: ${to}, from: ${from}, interval: DAY) {
            timestamp
            token0Reserve
            token1Reserve
            totalLpTokenShare
          }
        }
      }`

      const fetchData = await axios.post<{
        data: FetchResponseType
      }>(APIURL.TERRASWAP_API, { query })

      return fetchData.data.data.pair
    },
    {
      enabled: !!pairContract && to > 0 && from > 0,
    }
  )

  return { pair }
}

export default usePairHistory
