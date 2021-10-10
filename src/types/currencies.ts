import { NominalType } from './common'

export enum TokenDenomEnum {
  uusd = 'uusd',
  uluna = 'uluna',
}

export enum TokenSymbolEnum {
  UST = 'UST',
  Luna = 'Luna',
}

// Native currencies
export type uUST = string & NominalType<TokenDenomEnum.uusd>
export type UST = string & NominalType<TokenSymbolEnum.UST>

export type uLuna = string & NominalType<TokenDenomEnum.uluna>
export type Luna = string & NominalType<TokenSymbolEnum.Luna>

export type uNative = uUST | uLuna
export type Native = UST | Luna

export type uCW20 = string & NominalType<'ucw20'>
export type CW20 = string & NominalType<'CW20'>

export type uLP = string & NominalType<'ulp'>
export type LP = string & NominalType<'LP'>

export type uToken = uNative | uCW20 | uLP

export type Token = Native | CW20 | LP
