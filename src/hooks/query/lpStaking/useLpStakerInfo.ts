import useLCD from '../useLCD'
import { QueryKeyEnum, ContractAddr, lpStaking } from 'types'
import useReactQuery from 'hooks/common/useReactQuery'

export type UseLpStakerInfoReturn = {
  stakerInfo?: lpStaking.StakerInfoResponse
  refetch: () => void
}
const useLpStakerInfo = ({
  staker,
  lpStaking,
}: {
  staker: ContractAddr
  lpStaking: ContractAddr
}): UseLpStakerInfoReturn => {
  const { wasmFetch } = useLCD()
  const { data: stakerInfo, refetch: refecthQuery } = useReactQuery(
    [QueryKeyEnum.LPSTAKING_INFO, staker, lpStaking],
    () =>
      wasmFetch<lpStaking.StakerInfo, lpStaking.StakerInfoResponse>({
        contract: lpStaking,
        msg: {
          staker_info: { staker },
        },
      }),
    {
      keepPreviousData: true,
      enabled: !!lpStaking && !!staker,
    }
  )

  const refetch = (): void => {
    refecthQuery()
  }

  return { stakerInfo, refetch }
}

export default useLpStakerInfo
