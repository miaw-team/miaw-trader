import axios from 'axios'
import useReactQuery from 'hooks/common/useReactQuery'
import moment from 'moment'
import _ from 'lodash'

import { QueryKeyEnum, TokenType, TokenDenomEnum } from 'types'
import { UTIL, APIURL } from 'consts'

type FetchResponseType = {
  [symbol: string]: {
    token0: {
      symbol: string
      tokenAddress: string
    }
    token1: {
      symbol: string
      tokenAddress: string
    }
    latestToken0Price: string
    latestToken1Price: string
    historicalData: {
      timestamp: number
      token0Price: string
      token1Price: string
      token0Volume: string
      token1Volume: string
      token0Reserve: string
      token1Reserve: string
      totalLpTokenShare: string
      volumeUST: string
      liquidityUST: string
      txCount: number
    }[]
  }
}

export type UseHistoricalDataReturn = {
  historicalTokenPrice: {
    symbol: string
    tokenPrice1ago: string
    isIncreased: boolean
    changePercent: string
  }[]
}

const useHistoricalDataForList = ({
  tokenList,
}: {
  tokenList: TokenType[]
}): UseHistoricalDataReturn => {
  const { data: historicalTokenPrice = [] } = useReactQuery(
    [QueryKeyEnum.HISTORICAL_DATA, tokenList],
    async () => {
      const nowTimeStamp = moment().unix()
      const aDayAgo = moment().subtract(1, 'day').subtract(1, 'hours').unix()
      const queryData = _.map(
        tokenList.filter((x) => x.pair_ust),
        (token) => {
          return `${token.symbol}:pair(pairAddress: "${token.pair_ust}"){
            token0{
              symbol
              tokenAddress
            }
            token1{
              symbol
              tokenAddress
            }
            latestToken0Price
            latestToken1Price
            historicalData(
              to: ${nowTimeStamp}
              from: ${aDayAgo}
              interval: HOUR
            ){
              timestamp
              token0Price
              token1Price
            }
          }`
        }
      ).join('')

      const query = `query{${queryData}}`

      try {
        const fetchData = await axios.post<{
          data: FetchResponseType
        }>(APIURL.TERRASWAP_API, {
          query,
        })

        if (fetchData?.data?.data) {
          const data = fetchData.data.data
          return _.map(data, (target, symbol) => {
            let tokenPrice1ago = '0'
            let isIncreased = false
            let changePercent = '0'

            if (target.token0.symbol === TokenDenomEnum.uusd) {
              tokenPrice1ago = target.historicalData.pop()?.token1Price || '0'
              const change = UTIL.getPriceChange({
                to: UTIL.toBn(target.latestToken1Price),
                from: UTIL.toBn(tokenPrice1ago),
              })
              isIncreased = change.isIncreased
              changePercent = change.rate.multipliedBy(100).toFixed(2)
            } else {
              tokenPrice1ago = target.historicalData.pop()?.token0Price || '0'
              const change = UTIL.getPriceChange({
                to: UTIL.toBn(target.latestToken0Price),
                from: UTIL.toBn(tokenPrice1ago),
              })
              isIncreased = change.isIncreased
              changePercent = change.rate.multipliedBy(100).toFixed(2)
            }

            return {
              symbol,
              tokenPrice1ago,
              isIncreased,
              changePercent,
            }
          })
        }
      } catch {}
    },
    {
      enabled: tokenList.length > 0,
    }
  )

  return {
    historicalTokenPrice,
  }
}

export default useHistoricalDataForList
