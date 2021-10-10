import useLCD from '../useLCD'
import { QueryKeyEnum, lpStaking, ContractAddr } from 'types'
import useReactQuery from 'hooks/common/useReactQuery'

const useLpStakingState = ({
  lpStaking,
}: {
  lpStaking?: ContractAddr
}): {
  state?: lpStaking.StateResponse
  refetch: () => void
} => {
  const { wasmFetch } = useLCD()
  const { data: state, refetch } = useReactQuery(
    [QueryKeyEnum.LPSTAKING_STATE, lpStaking],
    () =>
      lpStaking &&
      wasmFetch<lpStaking.State, lpStaking.StateResponse>({
        contract: lpStaking,
        msg: {
          state: {},
        },
      }),
    {
      keepPreviousData: true,
      enabled: !!lpStaking,
    }
  )

  return { state, refetch }
}

export default useLpStakingState
