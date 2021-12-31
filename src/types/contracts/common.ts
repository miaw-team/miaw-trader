import { NominalType } from '../common'

export type ContractAddr = string & NominalType<'ContractAddr'>

export type TokenAssetInfo = { token: { contract_addr: ContractAddr } }
export type NativeAssetInfo = { native_token: { denom: string } }

export type AssetInfo = TokenAssetInfo | NativeAssetInfo
