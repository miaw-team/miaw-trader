import { useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import moment from 'moment'
import _ from 'lodash'

import usePairHistory from 'hooks/query/terraswap/usePairHistory'
import { ContractAddr, uToken } from 'types'
import { UTIL } from 'consts'

export type Analytics = {
  holdValue: uToken
  poolValue: uToken
  impermanentLossOrGain: uToken
  timestamp: number
}

export type UseAnalyticsReturn = {
  analyticsList: Analytics[]
  token_0_ContractOrDenom?: ContractAddr
  token_1_ContractOrDenom?: ContractAddr
  inputValue: string
  setInputValue: (value: string) => void
  from: number
  setFrom: (value: number) => void
  to: number
  setTo: (value: number) => void
  returnTokenType: string
  setReturnTokenType: (value: string) => void
}

const getReservePerLp = (reserve: {
  token0Reserve: string
  token1Reserve: string
  totalLpTokenShare: string
}): {
  token0: BigNumber
  token1: BigNumber
} => {
  return {
    token0: UTIL.toBn(reserve.token0Reserve).div(reserve.totalLpTokenShare),
    token1: UTIL.toBn(reserve.token1Reserve).div(reserve.totalLpTokenShare),
  }
}

const useAnalytics = ({
  pairContract,
}: {
  pairContract: ContractAddr
}): UseAnalyticsReturn => {
  const [inputValue, setInputValue] = useState<string>('1')
  const [from, setFrom] = useState<number>(moment().subtract(2, 'month').unix())
  const [to, setTo] = useState<number>(moment().unix())
  const [returnTokenType, setReturnTokenType] = useState('0')
  const { pair } = usePairHistory({ to, from, pairContract })

  const analyticsList: Analytics[] = useMemo(() => {
    if (pair) {
      const historicalData = pair.historicalData.sort((a, b) =>
        a.timestamp > b.timestamp ? 1 : -1
      )
      const holdAmount = getReservePerLp(historicalData[0])

      return _.map(historicalData, (data) => {
        if (returnTokenType === '0') {
          const token1Price = UTIL.toBn(data.token0Reserve).div(
            data.token1Reserve
          )
          const holdValue = holdAmount.token0
            .plus(holdAmount.token1.multipliedBy(token1Price))
            .multipliedBy(inputValue)
          const poolValue = getReservePerLp(data)
            .token0.multipliedBy(2)
            .multipliedBy(inputValue)

          const impermanentLossOrGain = poolValue
            .minus(holdValue)
            .div(holdValue)

          return {
            holdValue: holdValue.toString(10) as uToken,
            poolValue: poolValue.toString(10) as uToken,
            impermanentLossOrGain: impermanentLossOrGain.toString(10) as uToken,
            timestamp: data.timestamp,
          }
        } else {
          const token0Price = UTIL.toBn(data.token1Reserve).div(
            data.token0Reserve
          )
          const holdValue = holdAmount.token1
            .plus(holdAmount.token0.multipliedBy(token0Price))
            .multipliedBy(inputValue)
          const poolValue = getReservePerLp(data)
            .token1.multipliedBy(2)
            .multipliedBy(inputValue)

          const impermanentLossOrGain = poolValue
            .minus(holdValue)
            .div(holdValue)

          return {
            holdValue: holdValue.toString(10) as uToken,
            poolValue: poolValue.toString(10) as uToken,
            impermanentLossOrGain: impermanentLossOrGain.toString(10) as uToken,
            timestamp: data.timestamp,
          }
        }
      })
    }

    return []
  }, [pair, returnTokenType, inputValue])

  return {
    analyticsList,
    token_0_ContractOrDenom: pair?.token0.tokenAddress as ContractAddr,
    token_1_ContractOrDenom: pair?.token1.tokenAddress as ContractAddr,
    inputValue,
    setInputValue,
    from,
    setFrom,
    to,
    setTo,
    returnTokenType,
    setReturnTokenType,
  }
}

export default useAnalytics
