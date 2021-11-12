import { TokenDenomEnum } from 'types'
import { uToken } from '../currencies'
import { ContractAddr } from './common'

export namespace terraswap {
  export type Asset = {
    info: AssetInfo
    amount: uToken
  }
  export type TokenAssetInfo = { token: { contract_addr: ContractAddr } }
  export type NativeAssetInfo = { native_token: { denom: string } }

  export type AssetInfo = TokenAssetInfo | NativeAssetInfo

  export interface Pair {
    pair: {
      asset_infos: [AssetInfo, AssetInfo]
    }
  }

  export interface PairResponse {
    asset_infos: [AssetInfo, AssetInfo]

    /** Pair contract address */
    contract_addr: ContractAddr

    /** LP contract address */
    liquidity_token: ContractAddr
  }

  export interface Pool {
    pool: {}
  }

  export interface PoolResponse<T extends uToken> {
    total_share: string
    assets: [
      {
        amount: T
        info: {
          token: {
            contract_addr: ContractAddr
          }
        }
      },
      {
        amount: T
        info: {
          native_token: {
            denom: TokenDenomEnum
          }
        }
      }
    ]
  }

  export type SimulationInfo =
    | {
        token: {
          contract_addr: ContractAddr
        }
      }
    | {
        native_token: {
          denom: TokenDenomEnum
        }
      }

  export interface Simulation<T extends uToken> {
    simulation: {
      offer_asset: {
        info: SimulationInfo
        amount: T
      }
    }
  }

  export interface SimulationResponse<T extends uToken, RT extends uToken = T> {
    commission_amount: T
    return_amount: RT
    spread_amount: T
  }

  export type ReverseSimulationInfo =
    | {
        token: {
          contract_addr: ContractAddr
        }
      }
    | {
        native_token: {
          denom: TokenDenomEnum
        }
      }

  export interface ReverseSimulation<T extends uToken> {
    reverse_simulation: {
      ask_asset: {
        info: ReverseSimulationInfo
        amount: T
      }
    }
  }

  export interface ReverseSimulationResponse<
    T extends uToken,
    RT extends uToken = T
  > {
    commission_amount: T
    offer_amount: RT
    spread_amount: T
  }
}
