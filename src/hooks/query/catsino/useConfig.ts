import useLCD from '../useLCD'
import { QueryKeyEnum, upDown, ContractAddr } from 'types'
import useReactQuery from 'hooks/common/useReactQuery'

export type UseConfigReturn = {
  config?: upDown.ConfigResponse
  refetch: () => void
}

const useConfig = ({
  catsinoContract,
}: {
  catsinoContract: ContractAddr
}): UseConfigReturn => {
  const { wasmFetch } = useLCD()
  const { data: config, refetch } = useReactQuery(
    [QueryKeyEnum.CATSINO_CONFIG, catsinoContract],
    () =>
      wasmFetch<upDown.Config, upDown.ConfigResponse>({
        contract: catsinoContract,
        msg: { config: {} },
      }),

    {
      enabled: !!catsinoContract,
    }
  )

  return { config, refetch }
}

export default useConfig
