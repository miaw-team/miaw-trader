import { UTIL } from 'consts'
import _ from 'lodash'
import {
  terraswap,
  uToken,
  uUST,
  Token,
  ContractAddr,
  TokenDenomEnum,
} from 'types'

export type ExtractPoolResponseType = {
  token_0_ContractOrDenom: TokenDenomEnum | ContractAddr
  pairContract: ContractAddr
  token_0_Price: Token
  token_1_Price: Token
  totalShare: string
  token_0_PoolSize: uToken
  token_1_PoolSize: uToken
}

export const poolResponseParser = async ({
  poolResponse,
  pairContract,
  simulate,
  token_0_ContractOrDenom,
}: {
  poolResponse: terraswap.PoolResponse<uToken>
  pairContract: ContractAddr
  simulate: (props: {
    amount: uToken
    pairContract: ContractAddr
    tokenContract: TokenDenomEnum | ContractAddr
  }) => Promise<terraswap.SimulationResponse<uUST, uUST>>
  token_0_ContractOrDenom: TokenDenomEnum | ContractAddr
}): Promise<ExtractPoolResponseType> => {
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

  const token_1_Price = UTIL.toBn(baseAmount)
    .div(simulated.return_amount)
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
  return {
    token_0_ContractOrDenom,
    pairContract,
    token_0_Price,
    token_1_Price,
    totalShare: poolResponse.total_share,
    token_0_PoolSize,
    token_1_PoolSize,
  }
}
