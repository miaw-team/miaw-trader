import axios from 'axios'
import _ from 'lodash'

import { APIURL } from 'consts'

import useReactQuery from 'hooks/common/useReactQuery'
import { ContractAddr, QueryKeyEnum } from 'types'

const useHistoricalData = ({
  pairContractList,
}: {
  pairContractList: { symbol: string; pair: ContractAddr }[]
}): {
  historicalTokenPrice: {
    symbol: string
    pair: ContractAddr
    historicalPrice: number
  }[]
} => {
  const { data: historicalTokenPrice = [] } = useReactQuery(
    [QueryKeyEnum.HISTORICAL_DATA, pairContractList],
    async () => {
      const query = _.map(pairContractList, (x) => `pairs=${x.pair}`).join('&')
      const fetchData = await axios.get<{
        [pair: ContractAddr]: number // 24H price
      }>(`${APIURL.COINHALL_API}?${query}`)

      return _.map(pairContractList, (x) => ({
        ...x,
        historicalPrice: fetchData.data[x.pair],
      }))
    }
  )
  return {
    historicalTokenPrice,
  }
}

export default useHistoricalData
