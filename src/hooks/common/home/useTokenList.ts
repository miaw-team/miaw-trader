import { useMemo, useState } from 'react'
import _ from 'lodash'

import { UTIL } from 'consts'

import useNetwork from '../useNetwork'
import usePoolList from 'hooks/query/pair/usePoolList'
import useHistoricalDataForList from 'hooks/query/terraswap/useHistoricalDataForList'
import { TokenType } from 'types'
import { ExtractPoolByUstResponseType } from 'logics/pool'

export enum SortTypeEnum {
  name = 'name',
  price = 'price',
  poolSize = 'poolSize',
  change = 'change',
}

export type SortedTokenType = {
  history?: {
    symbol: string
    tokenPrice1ago: string
    isIncreased: boolean
    changePercent: string
  }
  token: TokenType
  poolByUstInfo: ExtractPoolByUstResponseType
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

  const { poolInfoList, refetch } = usePoolList({
    tokenList: filteredList,
  })

  const { historicalTokenPrice } = useHistoricalDataForList({
    tokenList: _.map(poolInfoList, (item) => item.token),
  })

  const poolInfoListWithHistory = useMemo(() => {
    if (false === isMainnet || historicalTokenPrice.length > 0) {
      return _.map(poolInfoList, (x) => {
        const symbol = x.token.symbol
        const history = historicalTokenPrice.find((x) => x.symbol === symbol)

        return { ...x, history }
      })
    }
    return []
  }, [historicalTokenPrice])

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
          UTIL.toBn(a.poolByUstInfo.ustPricePerToken).gt(
            b.poolByUstInfo.ustPricePerToken
          )
        ) {
          return sortDesc ? -1 : 1
        }
        return sortDesc ? 1 : -1
      })
    } else if (sortBy === SortTypeEnum.poolSize) {
      return poolInfoListWithHistory.sort((a, b) => {
        if (
          UTIL.toBn(a.poolByUstInfo.ustPoolSize).gt(b.poolByUstInfo.ustPoolSize)
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
