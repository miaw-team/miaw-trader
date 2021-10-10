import { TokenDenomEnum, TokenSymbolEnum } from 'types'

const TERRA_DECIMAL = 1e6

const symbolOfDenom: Record<TokenDenomEnum, TokenSymbolEnum> = {
  [TokenDenomEnum.uusd]: TokenSymbolEnum.UST,
  [TokenDenomEnum.uluna]: TokenSymbolEnum.Luna,
}

export default {
  symbolOfDenom,
  TERRA_DECIMAL,
}
