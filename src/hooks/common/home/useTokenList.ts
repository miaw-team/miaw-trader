import { useMemo, useState } from 'react'
import _ from 'lodash'

import { UTIL } from 'consts'

import useNetwork from '../useNetwork'
import usePoolList from 'hooks/query/pair/usePoolList'
import { TokenInfoGoupEnum, TokenType } from 'types'
import { ExtractPoolResponseType } from 'logics/pool'

export enum SortTypeEnum {
  name = 'name',
  price = 'price',
  poolSize = 'poolSize',
}

export type SortedTokenType = {
  token: TokenType
  poolInfo?: ExtractPoolResponseType
}

export type UseTokenListReturn = {
  groupFilter: TokenInfoGoupEnum[]
  setGroupFilter: React.Dispatch<React.SetStateAction<TokenInfoGoupEnum[]>>
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
  const [groupFilter, setGroupFilter] = useState<TokenInfoGoupEnum[]>([])
  const [sortBy, setSortBy] = useState<SortTypeEnum>(SortTypeEnum.poolSize)
  const [sortDesc, setSortDesc] = useState<boolean>(true)

  const filteredList = useMemo(() => {
    let list = whitelist
    if (filter) {
      list = list.filter((x) => {
        const lowerFilter = filter.toLowerCase()
        return (
          x.symbol.toLowerCase().includes(lowerFilter) ||
          x.name.toLowerCase().includes(lowerFilter)
        )
      })
    }

    if (groupFilter.length > 0) {
      list = list.filter((x) => x.group && groupFilter.includes(x.group))
    }

    return list
  }, [filter, groupFilter])

  const targetPairContractList = useMemo(
    () =>
      _.map(filteredList, (token) => ({
        symbol: token.symbol,
        pair: token.pairList[0].pair,
        tokenContractOrDenom: token.contractOrDenom,
      })),
    [filteredList]
  )

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
    if (false === isMainnet || poolInfoList.length > 0) {
      return _.map(filteredList, (token) => {
        const symbol = token.symbol

        const poolInfo = poolInfoList.find((x) => x.symbol === symbol)?.poolInfo

        return { token, poolInfo }
      })
    }
    return []
  }, [poolInfoList])

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
          UTIL.toBn(a.poolInfo?.token_1_PoolSize).gt(
            b.poolInfo?.token_1_PoolSize || 0
          )
        ) {
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
    groupFilter,
    setGroupFilter,
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
