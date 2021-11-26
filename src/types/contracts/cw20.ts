import { uToken } from '../currencies'
import { ContractAddr } from './common'

export namespace cw20 {
  export interface Balance {
    balance: {
      address: ContractAddr
    }
  }

  export interface BalanceResponse {
    balance: uToken
  }

  export interface TokenInfo {
    token_info: {}
  }

  export interface TokenInfoResponse {
    decimals: number
    name: string
    symbol: symbol
    total_supply: uToken
  }
}
