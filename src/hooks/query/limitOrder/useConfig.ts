import useLCD from '../useLCD'
import { QueryKeyEnum, limitOrder, ContractAddr } from 'types'
import useReactQuery from 'hooks/common/useReactQuery'

export type UseTokenInfoReturn = {
  config?: limitOrder.ConfigResponse
  refetch: () => void
}

const useConfig = ({
  limitOrderContract,
}: {
  limitOrderContract: ContractAddr
}): UseTokenInfoReturn => {
  const { wasmFetch } = useLCD()
  const { data: config, refetch } = useReactQuery(
    [QueryKeyEnum.LIMIT_ORDER_CONFIG, limitOrderContract],
    () =>
      wasmFetch<limitOrder.Config, limitOrder.ConfigResponse>({
        contract: limitOrderContract,
        msg: { config: {} },
      }),

    {
      enabled: !!limitOrderContract,
    }
  )

  return { config, refetch }
}

export default useConfig
