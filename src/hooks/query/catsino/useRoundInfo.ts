import useLCD from '../useLCD'
import { QueryKeyEnum, upDown, ContractAddr } from 'types'
import useReactQuery from 'hooks/common/useReactQuery'

export type UseRoundInfoReturn = {
  roundInfo?: upDown.RoundInfoResponse
  refetch: () => void
}

const useRoundInfo = ({
  catsinoContract,
  round,
}: {
  catsinoContract: ContractAddr
  round: number
}): UseRoundInfoReturn => {
  const { wasmFetch } = useLCD()
  const { data: roundInfo, refetch } = useReactQuery(
    [QueryKeyEnum.CATSINO_ROUND_INFO, catsinoContract],
    () =>
      wasmFetch<upDown.RoundInfo, upDown.RoundInfoResponse>({
        contract: catsinoContract,
        msg: {
          round_info: {
            round,
          },
        },
      }),

    {
      enabled: !!catsinoContract,
    }
  )

  return { roundInfo, refetch }
}

export default useRoundInfo
