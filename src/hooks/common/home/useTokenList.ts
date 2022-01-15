import { useMemo, useState } from 'react'
import _ from 'lodash'

import { UTIL } from 'consts'

import useNetwork from '../useNetwork'
import usePoolList from 'hooks/query/pair/usePoolList'
import { TokenType } from 'types'
import useHistoricalData from 'hooks/query/coinhall/useHistoricalData'
import { ExtractPoolResponseType } from 'logics/pool'

export enum SortTypeEnum {
  name = 'name',
  price = 'price',
  poolSize = 'poolSize',
  change = 'change',
}

export type SortedTokenType = {
  history?: {
    symbol: string
    isIncreased: boolean
    changePercent: string
  }
  token: TokenType
  poolInfo?: ExtractPoolResponseType
}

export type UseTokenListReturn = {
  filter: string
  setFilter: (value: string) => void
  sortBy: SortTypeEnum
  onClickSort: (value: SortTypeEnum) => void
  sortDesc: boolean
  sortedList: SortedTokenType[]
  refetch: () => void
}

const useTokenList = (): UseTokenListReturn => {
  const { whitelist, isMainnet } = useNetwork()
  const [filter, setFilter] = useState('')
  const [sortBy, setSortBy] = useState<SortTypeEnum>(SortTypeEnum.poolSize)
  const [sortDesc, setSortDesc] = useState<boolean>(true)

  const filteredList = useMemo(() => {
    if (filter) {
      return whitelist.filter((x) => {
        const lowerFilter = filter.toLowerCase()
        return (
          x.symbol.toLowerCase().includes(lowerFilter) ||
          x.name.toLowerCase().includes(lowerFilter)
        )
      })
    }
    return whitelist
  }, [filter])

  const targetPairContractList = useMemo(
    () =>
      _.map(filteredList, (token) => ({
        symbol: token.symbol,
        pair: token.pairList[0].pair,
        tokenContractOrDenom: token.contractOrDenom,
      })),
    [filteredList]
  )

  const { historicalTokenPrice } = useHistoricalData({
    pairContractList: targetPairContractList,
  })

  const { poolInfoList, refetch } = usePoolList({
    pairTypeList: targetPairContractList.map((x) => {
      return {
        symbol: x.symbol,
        pairContract: x.pair,
        token_0_ContractOrDenom: x.tokenContractOrDenom,
      }
    }),
  })

  const poolInfoListWithHistory = useMemo(() => {
    if (false === isMainnet || _.size(historicalTokenPrice) > 0) {
      return _.map(filteredList, (token) => {
        const symbol = token.symbol
        const historicalPrice =
          historicalTokenPrice.find((x) => x.symbol === symbol)
            ?.historicalPrice || 0
        const poolInfo = poolInfoList.find((x) => x.symbol === symbol)?.poolInfo

        let history
        if (poolInfo && historicalPrice) {
          const change = UTIL.getPriceChange({
            from: UTIL.toBn(historicalPrice),
            to: UTIL.toBn(poolInfo.token_0_Price),
          })
          history = {
            symbol,
            isIncreased: change.isIncreased,
            changePercent: change.rate.multipliedBy(100).toFixed(2),
          }
        }
        return { token, history, poolInfo }
      })
    }
    return []
  }, [historicalTokenPrice, poolInfoList])

  const sortedList = useMemo(() => {
    if (sortBy === SortTypeEnum.name) {
      return poolInfoListWithHistory.sort((a, b) => {
        if (a.token.symbol > b.token.symbol) {
          return sortDesc ? -1 : 1
        }
        return sortDesc ? 1 : -1
      })
    } else if (sortBy === SortTypeEnum.price) {
      return poolInfoListWithHistory.sort((a, b) => {
        if (
          UTIL.toBn(a.poolInfo?.token_0_Price).gt(
            b.poolInfo?.token_0_Price || 0
          )
        ) {
          return sortDesc ? -1 : 1
        }
        return sortDesc ? 1 : -1
      })
    } else if (sortBy === SortTypeEnum.poolSize) {
      return poolInfoListWithHistory.sort((a, b) => {
        if (
          UTIL.toBn(a.poolInfo?.token_0_PoolSize).gt(
            b.poolInfo?.token_0_PoolSize || 0
          )
        ) {
          return sortDesc ? -1 : 1
        }
        return sortDesc ? 1 : -1
      })
    } else if (sortBy === SortTypeEnum.change) {
      return poolInfoListWithHistory.sort((a, b) => {
        const aIsPositive = a.history?.isIncreased
        const aVal = a.history?.changePercent || '0'
        const aBn = UTIL.toBn(aIsPositive ? aVal : `-${aVal}`)

        const bIsPositive = b.history?.isIncreased
        const bVal = b.history?.changePercent || '0'
        const bBn = UTIL.toBn(bIsPositive ? bVal : `-${bVal}`)

        if (aBn.gt(bBn)) {
          return sortDesc ? -1 : 1
        }
        return sortDesc ? 1 : -1
      })
    }
    return []
  }, [poolInfoListWithHistory, sortBy, sortDesc])

  const onClickSort = (value: SortTypeEnum): void => {
    setSortDesc(!sortDesc)
    setSortBy(value)
  }

  return {
    filter,
    setFilter,
    sortBy,
    sortDesc,
    sortedList,
    onClickSort,
    refetch,
  }
}

export default useTokenList
