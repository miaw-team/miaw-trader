import { useEffect, useState } from 'react'
import _ from 'lodash'

import useLCD from '../useLCD'
import {
  QueryKeyEnum,
  terraswap,
  uToken,
  ContractAddr,
  TokenDenomEnum,
  Token,
} from 'types'
import useReactQuery from 'hooks/common/useReactQuery'
import useSimulate from '../token/useSimulate'
import { UTIL } from 'consts'

export type ExtractPoolResponseType = {
  token_0_Price: Token
  totalShare: string
  token_0_PoolSize: uToken
  token_1_PoolSize: uToken
}

export type UsePoolReturn = {
  poolInfo: ExtractPoolResponseType
  refetch: () => void
}

const usePool = ({
  pairContract,
  token_0_ContractOrDenom,
}: {
  pairContract?: ContractAddr
  token_0_ContractOrDenom: ContractAddr | TokenDenomEnum
}): UsePoolReturn => {
  const [poolInfo, setPoolInfo] = useState<ExtractPoolResponseType>({
    token_0_Price: '0' as Token,
    totalShare: '0',
    token_0_PoolSize: '0' as uToken,
    token_1_PoolSize: '0' as uToken,
  })
  const { simulate } = useSimulate()
  const { wasmFetch } = useLCD()
  const { data, refetch } = useReactQuery(
    [QueryKeyEnum.POOL, pairContract],
    () => {
      if (pairContract) {
        return wasmFetch<terraswap.Pool, terraswap.PoolResponse<uToken>>({
          contract: pairContract,
          msg: { pool: {} },
        })
      }
    },
    {
      enabled: !!pairContract,
    }
  )

  const poolResponseParser = async (
    poolResponse: terraswap.PoolResponse<uToken>,
    pairContract: ContractAddr
  ): Promise<void> => {
    const baseAmount = '1000000' as uToken
    const simulated = await simulate({
      amount: baseAmount,
      pairContract,
      tokenContract: token_0_ContractOrDenom,
    })

    const token_0_Price = UTIL.toBn(simulated.return_amount)
      .div(baseAmount)
      .dp(6)
      .toString(10) as Token

    const token_0_index = poolResponse.assets.findIndex(
      (x) =>
        _.get(x.info, 'native_token.denom') === token_0_ContractOrDenom ||
        _.get(x.info, 'token.contract_addr') === token_0_ContractOrDenom
    )

    const token_0_PoolSize = poolResponse.assets[token_0_index].amount
    const token_1_PoolSize =
      poolResponse.assets[token_0_index === 0 ? 1 : 0].amount
    const info = {
      token_0_Price,
      totalShare: poolResponse.total_share,
      token_0_PoolSize,
      token_1_PoolSize,
    }
    setPoolInfo(info)
  }

  useEffect(() => {
    if (data && pairContract) {
      poolResponseParser(data, pairContract)
    }
  }, [data, pairContract])

  return { poolInfo, refetch }
}

export default usePool
