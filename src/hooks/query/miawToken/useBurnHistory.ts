import axios from 'axios'
import _ from 'lodash'
import moment, { Moment } from 'moment'
import { useInfiniteQuery } from 'react-query'
import { APIURL } from 'consts'

import { ContractAddr, uCW20, QueryKeyEnum } from 'types'

export type BurnDataType = {
  sender: ContractAddr
  burnAmount: uCW20
  timestamp: Moment
  txhash: string
  memo: string
  name: string
}

type FetchResponseType = {
  burnHistory: {
    txHash: string
    memo: string
    name: string
    from: string
    amount: number
    timestamp: number
  }[]
}

export type UseBurnHistoryReturn = {
  burnDataList: BurnDataType[]
  fetchNextPage: () => void
  isLast: boolean
  refetch: () => void
}

const extractData = (data: FetchResponseType['burnHistory']): BurnDataType[] =>
  _.map(data, ({ amount, timestamp, from, txHash, ...rest }) => {
    return {
      txhash: txHash,
      timestamp: moment.unix(timestamp),
      sender: from as ContractAddr,
      burnAmount: `${amount}` as uCW20,
      ...rest,
    }
  })

const useBurnHistory = (): UseBurnHistoryReturn => {
  const limit = 50

  const { data, fetchNextPage, refetch, hasNextPage } = useInfiniteQuery(
    [QueryKeyEnum.BURN_HISTORY],
    async ({ pageParam = '' }) => {
      const query = `query {
          burnHistory(limit:${limit},startAfter:"${pageParam}"){
            txHash
            memo
            name
            from
            amount
            timestamp
          }
        }`

      const { data } = await axios.post<{
        data: FetchResponseType
      }>(APIURL.MIAW_API, { query })

      const burnHistory = data.data.burnHistory || []

      if (burnHistory.length > 0) {
        return extractData(burnHistory)
      }

      return []
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.length >= limit) {
          return lastPage[lastPage.length - 1].txhash
        }
      },
      keepPreviousData: true,
    }
  )

  return {
    burnDataList: _.flatten(data?.pages),
    fetchNextPage,
    isLast: !hasNextPage,
    refetch,
  }
}

export default useBurnHistory
