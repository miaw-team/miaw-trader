import { useConnectedWallet } from '@terra-money/wallet-provider'

import { QueryKeyEnum, uToken, ContractAddr, cw20 } from 'types'
import useReactQuery from 'hooks/common/useReactQuery'
import useLCD from '../useLCD'
import { UTIL } from 'consts'

const useMyCw20Balance = ({
  contract,
}: {
  contract: ContractAddr
}): {
  balance: uToken
  refetch: () => void
} => {
  const connectedWallet = useConnectedWallet()
  const myAddress = (connectedWallet?.walletAddress || '') as ContractAddr
  const { wasmFetch } = useLCD()

  const { data: balance = '0' as uToken, refetch } = useReactQuery(
    [QueryKeyEnum.CW20USTLP_BALANCE, myAddress, contract],
    async () => {
      const fetchResult = await wasmFetch<cw20.Balance, cw20.BalanceResponse>({
        contract,
        msg: { balance: { address: myAddress } },
      })

      return fetchResult.balance
    },
    {
      enabled: !!myAddress && false === UTIL.isNativeDenom(contract),
    }
  )

  return { balance, refetch }
}

export default useMyCw20Balance
