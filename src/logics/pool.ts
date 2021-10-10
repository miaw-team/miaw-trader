import { UTIL } from 'consts'
import _ from 'lodash'
import {
  UST,
  terraswap,
  uToken,
  uUST,
  Token,
  ContractAddr,
  TokenDenomEnum,
} from 'types'

export type ExtractPoolByUstResponseType = {
  tokenPricePerUst: UST
  ustPricePerToken: Token
  totalShare: string
  tokenPoolSize: uToken
  ustPoolSize: uUST
}

export const poolByUstResponseParser = (
  data?: terraswap.PoolResponse<uToken>
): ExtractPoolByUstResponseType => {
  if (data) {
    const tokenPoolSize =
      data.assets.find((x) => _.get(x.info, 'native_token.denom') !== 'uusd')
        ?.amount || ('0' as uToken)
    const ustPoolSize = (data.assets.find(
      (x) => _.get(x.info, 'native_token.denom') === 'uusd'
    )?.amount || '0') as uUST

    return {
      tokenPricePerUst: UTIL.toBn(ustPoolSize)
        .div(+tokenPoolSize === 0 ? '1' : tokenPoolSize)
        .toString(10) as UST,
      ustPricePerToken: UTIL.toBn(tokenPoolSize)
        .div(+ustPoolSize === 0 ? '1' : ustPoolSize)
        .toString(10) as Token,
      totalShare: data.total_share,
      tokenPoolSize: tokenPoolSize as uToken,
      ustPoolSize,
    }
  }

  return {
    tokenPricePerUst: '0' as UST,
    ustPricePerToken: '0' as Token,
    totalShare: '0',
    tokenPoolSize: '0' as uToken,
    ustPoolSize: '0' as uUST,
  }
}

export type ExtractPoolResponseType = {
  token_0_Price: Token
  token_1_Price: Token
  totalShare: string
  token_0_PoolSize: uToken
  token_1_PoolSize: uToken
}

export const poolResponseParser = ({
  data,
  token_0_ContractOrDenom,
}: {
  data?: terraswap.PoolResponse<uToken>
  token_0_ContractOrDenom: ContractAddr | TokenDenomEnum
}): ExtractPoolResponseType => {
  if (data) {
    const token_0_index = data.assets.findIndex(
      (x) =>
        _.get(x.info, 'native_token.denom') === token_0_ContractOrDenom ||
        _.get(x.info, 'token.contract_addr') === token_0_ContractOrDenom
    )

    const token_0_PoolSize = data.assets[token_0_index].amount
    const token_1_PoolSize = data.assets[token_0_index === 0 ? 1 : 0].amount

    return {
      token_0_Price: UTIL.toBn(token_1_PoolSize)
        .div(+token_0_PoolSize === 0 ? '1' : token_0_PoolSize)
        .toString(10) as Token,
      token_1_Price: UTIL.toBn(token_0_PoolSize)
        .div(+token_1_PoolSize === 0 ? '1' : token_1_PoolSize)
        .toString(10) as Token,
      totalShare: data.total_share,
      token_0_PoolSize,
      token_1_PoolSize,
    }
  }

  return {
    token_0_Price: '0' as Token,
    token_1_Price: '0' as Token,
    totalShare: '0',
    token_0_PoolSize: '0' as uToken,
    token_1_PoolSize: '0' as uToken,
  }
}
