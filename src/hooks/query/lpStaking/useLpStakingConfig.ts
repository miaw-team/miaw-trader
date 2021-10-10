import useLCD from '../useLCD'
import { QueryKeyEnum, lpStaking, ContractAddr } from 'types'
import useReactQuery from 'hooks/common/useReactQuery'

const useLpStakingConfig = ({
  lpStaking,
}: {
  lpStaking?: ContractAddr
}): {
  config?: lpStaking.ConfigResponse
  refetch: () => void
} => {
  const { wasmFetch } = useLCD()
  const { data: config, refetch } = useReactQuery(
    [QueryKeyEnum.LPSTAKING_CONFIG, lpStaking],
    () =>
      lpStaking &&
      wasmFetch<lpStaking.Config, lpStaking.ConfigResponse>({
        contract: lpStaking,
        msg: {
          config: {},
        },
      }),
    {
      enabled: !!lpStaking,
    }
  )

  return { config, refetch }
}

export default useLpStakingConfig
