import { useConnectedWallet } from '@terra-money/wallet-provider'
import _ from 'lodash'
import axios from 'axios'

import { UTIL } from 'consts'

import { QueryKeyEnum, uToken, ContractAddr } from 'types'
import useReactQuery from 'hooks/common/useReactQuery'
import useNetwork from 'hooks/common/useNetwork'

type FetchResponseType = Record<string, { Result: string }>

const useMyCw20Balances = (): {
  myCw20Balances: {
    [tokenAddress: ContractAddr]: uToken
  }
  refetch: () => void
} => {
  const connectedWallet = useConnectedWallet()
  const myAddress = (connectedWallet?.walletAddress || '') as ContractAddr

  const { whitelist, lpOfLpList, mantleApi } = useNetwork()

  const stringify = (msg: object): string =>
    JSON.stringify(msg).replace(/"/g, '\\"')

  const { data: myCw20Balances = {}, refetch } = useReactQuery(
    [QueryKeyEnum.CW20USTLP_BALANCE, myAddress],
    async () => {
      const queryItem = (token: ContractAddr): string =>
        `${token}: WasmContractsContractAddressStore(
ContractAddress: "${token}"
QueryMsg: "${stringify({ balance: { address: myAddress } })}") {Result}`

      const queryMap = (tokenList: ContractAddr[]): string => `
      query {${tokenList.map(queryItem)}}`

      const whiteListContractList = _.flatten(
        whitelist.map((x) => {
          const list = []

          if (false === UTIL.isNativeDenom(x.contractOrDenom)) {
            list.push(x.contractOrDenom)
          }
          if (x.lp_ust) {
            list.push(x.lp_ust)
          }
          if (x.lp_luna) {
            list.push(x.lp_luna)
          }

          return list as ContractAddr[]
        })
      )
      const lpOfLpContractList = lpOfLpList.map((x) => x.lpOfLp_Lp)

      const { data } = await axios.post<{
        data: FetchResponseType
      }>(mantleApi, {
        query: queryMap(whiteListContractList.concat(lpOfLpContractList)),
      })

      const result: {
        [tokenAddress: ContractAddr]: uToken
      } = {}

      _.forEach(data.data, (item, key) => {
        const parsed = UTIL.jsonTryParse<{ balance: uToken }>(item.Result)
        result[key as ContractAddr] = parsed?.balance || ('0' as uToken)
      })
      return result
    },
    {
      enabled: !!myAddress,
    }
  )

  return { myCw20Balances, refetch }
}

export default useMyCw20Balances
