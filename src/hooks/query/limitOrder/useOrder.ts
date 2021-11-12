import useLCD from '../useLCD'
import { QueryKeyEnum, limitOrder, ContractAddr } from 'types'
import useReactQuery from 'hooks/common/useReactQuery'

export type UseTokenInfoReturn = {
  order?: limitOrder.OrderResponse
  refetch: () => void
}

const useOrder = ({
  limitOrderContract,
  orderId,
}: {
  limitOrderContract: ContractAddr
  orderId: number
}): UseTokenInfoReturn => {
  const { wasmFetch } = useLCD()
  const { data: order, refetch } = useReactQuery(
    [QueryKeyEnum.LIMIT_ORDER_ORDER, limitOrderContract, orderId],
    () =>
      wasmFetch<limitOrder.Order, limitOrder.OrderResponse>({
        contract: limitOrderContract,
        msg: { order: { order_id: orderId } },
      }),

    {
      enabled: !!limitOrderContract,
    }
  )

  return { order, refetch }
}

export default useOrder
