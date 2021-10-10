import axios from 'axios'
import _ from 'lodash'
import { useInfiniteQuery } from 'react-query'
import { APIURL } from 'consts'

import { QueryKeyEnum } from 'types'

export type BurnLeaderBoardDataType = {
  userAddress: string
  amount: number
  name: string
}

type FetchResponseType = {
  burnLeaderBoard: {
    userAddress: string
    amount: number
    name: string
  }[]
}

export type UseBurnLeaderBoardReturn = {
  dataList: BurnLeaderBoardDataType[]
  fetchNextPage: () => void
  isLast: boolean
  refetch: () => void
}

const useBurnLeaderBoard = (): UseBurnLeaderBoardReturn => {
  const limit = 100

  const { data, fetchNextPage, refetch, hasNextPage } = useInfiniteQuery(
    [QueryKeyEnum.BURN_LEADERBOARD],
    async ({ pageParam = '' }) => {
      const query = `query {
          burnLeaderBoard(limit:${limit},startAfter:"${pageParam}"){
            userAddress
            amount
            name
          }
        }`

      const { data } = await axios.post<{
        data: FetchResponseType
      }>(APIURL.MIAW_API, { query })

      return data.data.burnLeaderBoard
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.length >= limit) {
          return lastPage[lastPage.length - 1].userAddress
        }
      },
      keepPreviousData: true,
    }
  )

  return {
    dataList: _.flatten(data?.pages),
    fetchNextPage,
    isLast: !hasNextPage,
    refetch,
  }
}

export default useBurnLeaderBoard
