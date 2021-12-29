import { TokenDenomEnum } from 'types'
import { ContractAddr } from './contracts'

export type AddressMap = {
  lotaToken: ContractAddr
  lotaUstPair: ContractAddr
  lotaUstLPToken: ContractAddr
}

export enum DexEnum {
  terraswap = 'terraswap',
  astroport = 'astroport',
}

export type PairType = {
  dex: DexEnum
  denom: TokenDenomEnum
  pair: ContractAddr
  lp: ContractAddr
}

export type TokenType<
  T extends ContractAddr | TokenDenomEnum = ContractAddr | TokenDenomEnum
> = {
  symbol: string
  name: string
  logo: string
  contractOrDenom: T
  pairList: PairType[]
}

export type LpofLpType = {
  lpOfLp_LpTicker: string
  token_0_LogoList: [string, string]
  token_0_Contract: ContractAddr
  token_0_Pair: ContractAddr
  token_0_Combined: (ContractAddr | TokenDenomEnum)[]
  token_0_Symbol: string
  token_0_ProvideSymbol?: string
  token_1_LogoList: [string, string]
  token_1_Contract: ContractAddr
  token_1_Pair: ContractAddr
  token_1_Combined: (ContractAddr | TokenDenomEnum)[]
  token_1_Symbol: string
  token_1_ProvideSymbol?: string
  lpOfLp_Lp: ContractAddr
  lpOfLp_Pair: ContractAddr
}

export type LpStakingType = {
  tokenLogo: string
  tokenContract: ContractAddr
  nativeDenomLogo: string
  nativeDenom: TokenDenomEnum
  lpContract: ContractAddr
  lpPair: ContractAddr
  lpStaking: ContractAddr
}
