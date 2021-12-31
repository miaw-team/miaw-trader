import useLCD from '../useLCD'
import { QueryKeyEnum, astroport, ContractAddr } from 'types'
import useReactQuery from 'hooks/common/useReactQuery'

export type UseConfigReturn = {
  config?: astroport.ConfigResponse
  refetch: () => void
}

const useConfig = ({
  pairContract,
}: {
  pairContract?: ContractAddr
}): UseConfigReturn => {
  const { wasmFetch } = useLCD()

  const { data: config, refetch } = useReactQuery(
    [QueryKeyEnum.POOL_CONFIG, pairContract],
    () =>
      pairContract &&
      wasmFetch<astroport.Config, astroport.ConfigResponse>({
        contract: pairContract,
        msg: { config: {} },
      }),

    {
      enabled: !!pairContract,
    }
  )

  return { config, refetch }
}

export default useConfig
