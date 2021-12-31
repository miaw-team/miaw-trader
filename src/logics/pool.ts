import { UTIL } from 'consts'
import _ from 'lodash'
import { UST, terraswap, uToken, uUST, Token } from 'types'

export type ExtractPoolByTsResponseType = {
  tokenPricePerUst: UST
  ustPricePerToken: Token
  totalShare: string
  tokenPoolSize: uToken
  ustPoolSize: uUST
}

export const poolByTsResponseParser = (
  data?: terraswap.PoolResponse<uToken>
): ExtractPoolByTsResponseType => {
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
