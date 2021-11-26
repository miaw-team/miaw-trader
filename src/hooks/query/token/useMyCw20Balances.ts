import { useConnectedWallet } from '@terra-money/wallet-provider'
import _ from 'lodash'

import { UTIL } from 'consts'

import { QueryKeyEnum, uToken, ContractAddr, cw20 } from 'types'
import useReactQuery from 'hooks/common/useReactQuery'
import useNetwork from 'hooks/common/useNetwork'
import useLCD from '../useLCD'

const useMyCw20Balances = (): {
  myCw20Balances: {
    [tokenAddress: ContractAddr]: uToken
  }
  refetch: () => void
} => {
  const connectedWallet = useConnectedWallet()
  const myAddress = (connectedWallet?.walletAddress || '') as ContractAddr
  const { wasmFetch } = useLCD()
  const { whitelist, lpOfLpList } = useNetwork()

  const { data: myCw20Balances = {}, refetch } = useReactQuery(
    [QueryKeyEnum.CW20USTLP_BALANCE, myAddress],
    async () => {
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

      const data = await Promise.all(
        _.map(
          whiteListContractList.concat(lpOfLpContractList),
          async (contract) => {
            const fetchResult = await wasmFetch<
              cw20.Balance,
              cw20.BalanceResponse
            >({
              contract,
              msg: { balance: { address: myAddress } },
            })

            return {
              contract,
              balance: fetchResult.balance,
            }
          }
        )
      )

      const result: {
        [tokenAddress: ContractAddr]: uToken
      } = {}

      _.forEach(data, (item) => {
        result[item.contract] = item.balance
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
