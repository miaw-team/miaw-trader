import { useMemo } from 'react'
import axios from 'axios'
import _ from 'lodash'
import moment, { Moment } from 'moment'

import { APIURL, UTIL } from 'consts'

import { ContractAddr, QueryKeyEnum, uCW20, uUST } from 'types'
import useReactQuery from 'hooks/common/useReactQuery'

export type TxsHistoryType = {
  timestamp: Moment
  txhash: string
  action: string
  uusd: uUST
  uCW20: uCW20
}

export type UseCw20HistoryReturn = {
  txList: TxsHistoryType[]
}

type FetchResponseType = {
  pair: {
    token0: {
      symbol: string
    }
    token1: {
      symbol: string
    }
    transactions: {
      timestamp: number
      txHash: string
      action: string
      token0Amount: string
      token1Amount: string
    }[]
  }
}

const extractTxHistory = (
  pair: FetchResponseType['pair']
): TxsHistoryType[] => {
  const isToken0Ust = pair.token0.symbol === 'uusd'

  return _.map(pair.transactions, (item) => {
    let action = item.action
    const uusd = (isToken0Ust ? item.token0Amount : item.token1Amount) as uUST
    const uCW20 = (isToken0Ust ? item.token1Amount : item.token0Amount) as uCW20

    if (item.action === 'swap') {
      action = UTIL.toBn(uusd).isPositive() ? 'buy' : 'sell'
    }

    return {
      txhash: item.txHash,
      timestamp: moment.unix(item.timestamp),
      action,
      uusd,
      uCW20,
    }
  })
}

const useTokenPairHistory = ({
  tokenPairContract,
}: {
  tokenPairContract?: ContractAddr
}): UseCw20HistoryReturn => {
  const { data } = useReactQuery(
    [QueryKeyEnum.TX_HISTORY, tokenPairContract],
    async () => {
      if (tokenPairContract) {
        const query = `query {
          pair(pairAddress:"${tokenPairContract}"){
            token0{
              symbol
            }
            token1{
              symbol
            }
            transactions(limit:10){
              timestamp
              txHash
              action
              token0Amount
              token1Amount
            }
          }
        }`

        const fetchData = await axios.post<{
          data: FetchResponseType
        }>(APIURL.TERRASWAP_API, { query })

        if (fetchData?.data?.data) {
          return fetchData.data.data.pair
        }
      }
    }
  )

  const txList = useMemo(() => (data ? extractTxHistory(data) : []), [data])

  return {
    txList,
  }
}

export default useTokenPairHistory
