import useLCD from '../useLCD'
import {
  QueryKeyEnum,
  terraswap,
  uToken,
  ContractAddr,
  TokenDenomEnum,
} from 'types'
import useReactQuery from 'hooks/common/useReactQuery'
import useSimulate from '../token/useSimulate'
import { ExtractPoolResponseType, poolResponseParser } from 'logics/pool'

export type UsePoolReturn = {
  poolInfo?: ExtractPoolResponseType
  refetch: () => void
}

const usePool = ({
  pairContract,
  token_0_ContractOrDenom,
}: {
  pairContract: ContractAddr
  token_0_ContractOrDenom: ContractAddr | TokenDenomEnum
}): UsePoolReturn => {
  const { simulate } = useSimulate()
  const { wasmFetch } = useLCD()
  const { data: poolInfo, refetch } = useReactQuery(
    [QueryKeyEnum.POOL, pairContract, token_0_ContractOrDenom],
    async () => {
      if (pairContract) {
        const poolResponse = await wasmFetch<
          terraswap.Pool,
          terraswap.PoolResponse<uToken>
        >({
          contract: pairContract,
          msg: { pool: {} },
        })

        return poolResponseParser({
          poolResponse,
          pairContract,
          simulate,
          token_0_ContractOrDenom,
        })
      }
    },
    {
      enabled: !!pairContract,
    }
  )

  return { poolInfo, refetch }
}

export default usePool
