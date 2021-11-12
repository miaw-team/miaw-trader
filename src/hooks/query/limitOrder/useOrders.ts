import _ from 'lodash'
import { useMemo } from 'react'

import useLCD from '../useLCD'
import {
  QueryKeyEnum,
  limitOrder,
  ContractAddr,
  uToken,
  TokenDenomEnum,
} from 'types'
import useReactQuery from 'hooks/common/useReactQuery'

export type ExtractLimitOrdersType = {
  orderId: number
  feeAmount: uToken
  offerAmount: uToken
  askAmount: uToken
  offerContractOrDenom: ContractAddr | TokenDenomEnum
  askContractOrDenom: ContractAddr | TokenDenomEnum
}

export type UseTokenInfoReturn = {
  orders: ExtractLimitOrdersType[]
  refetch: () => void
}

const useOrders = ({
  limitOrderContract,
  bidderAddr,
  pairContract,
}: {
  limitOrderContract: ContractAddr
  bidderAddr: string
  pairContract: ContractAddr
}): UseTokenInfoReturn => {
  const { wasmFetch } = useLCD()
  const { data, refetch } = useReactQuery(
    [
      QueryKeyEnum.LIMIT_ORDER_ORDERS,
      limitOrderContract,
      bidderAddr,
      pairContract,
    ],
    () =>
      wasmFetch<limitOrder.Orders, limitOrder.OrdersResponse>({
        contract: limitOrderContract,
        msg: {
          orders: {
            bidder_addr: bidderAddr,
          },
        },
      }),

    {
      enabled: !!limitOrderContract && !!bidderAddr,
    }
  )

  const orders = useMemo(() => {
    return _.map(
      data?.orders.filter((x) => x.pair_addr === pairContract),
      (item) => {
        const offerContractOrDenom =
          'token' in item.offer_asset.info
            ? item.offer_asset.info.token.contract_addr
            : item.offer_asset.info.native_token.denom
        const askContractOrDenom =
          'token' in item.ask_asset.info
            ? item.ask_asset.info.token.contract_addr
            : item.ask_asset.info.native_token.denom

        return {
          orderId: item.order_id,
          feeAmount: item.fee_amount,
          offerAmount: item.offer_asset.amount,
          askAmount: item.ask_asset.amount,
          offerContractOrDenom,
          askContractOrDenom,
        } as ExtractLimitOrdersType
      }
    )
  }, [data])

  return { orders, refetch }
}

export default useOrders
