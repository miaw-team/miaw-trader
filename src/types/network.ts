import { TokenDenomEnum } from 'types'
import { ContractAddr } from './contracts'

export enum TokenKeyEnum {
  MIAW = 'MIAW',
  UST = 'UST',
  Luna = 'Luna',
  bLuna = 'bLuna',
  TWD = 'TWD',
  STT = 'STT',
  LOTA = 'LOTA',
  bETH = 'bETH',
  ANC = 'ANC',
  MIR = 'MIR',
  mAAPL = 'mAAPL',
  mABNB = 'mABNB',
  mAMC = 'mAMC',
  mAMD = 'mAMD',
  mAMZN = 'mAMZN',
  mBABA = 'mBABA',
  mBTC = 'mBTC',
  mCOIN = 'mCOIN',
  mDOT = 'mDOT',
  mETH = 'mETH',
  mFB = 'mFB',
  mGLXY = 'mGLXY',
  mGME = 'mGME',
  mGOOGL = 'mGOOGL',
  mGS = 'mGS',
  mIAU = 'mIAU',
  mMSFT = 'mMSFT',
  mNFLX = 'mNFLX',
  mQQQ = 'mQQQ',
  mSLV = 'mSLV',
  mSPY = 'mSPY',
  mSQ = 'mSQ',
  mTSLA = 'mTSLA',
  mTWTR = 'mTWTR',
  mUSO = 'mUSO',
  mVIXY = 'mVIXY',
  DPH = 'DPH',
  MINE = 'MINE',
  SPEC = 'SPEC',
  VKR = 'VKR',
  PSI = 'PSI',
  KUJI = 'KUJI',
  ALTE = 'ALTE',
  ASTRO = 'ASTRO',
  WHALE = 'WHALE',
  APOLLO = 'APOLLO',
  LUNI = 'LUNI',
  TLAND = 'TLAND',
  ORNE = 'ORNE',
}

export type AddressMap = {
  lotaToken: ContractAddr
  lotaUstPair: ContractAddr
  lotaUstLPToken: ContractAddr
}

export enum DexEnum {
  terraswap = 'Terraswap',
  astroport = 'Astroport',
  loop = 'Loop',
}

export type PairType = {
  dex: DexEnum
  base: TokenKeyEnum
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
