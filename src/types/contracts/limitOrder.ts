import { uCW20 } from 'types/currencies'
import { ContractAddr } from './common'
import { terraswap } from './terraswap'

export namespace limitOrder {
  export interface Config {
    config: {}
  }

  export interface ConfigResponse {
    fee_token: ContractAddr
    min_fee_amount: uCW20
    terraswap_factory: ContractAddr
  }

  export interface Order {
    order: {
      order_id: number
    }
  }

  export interface OrderResponse {
    order_id: number
    bidder_addr: string
    pair_addr: string
    offer_asset: terraswap.Asset
    ask_asset: terraswap.Asset
    fee_amount: uCW20
  }

  export interface Orders {
    orders: {
      bidder_addr?: string
      start_after?: number
      limit?: number
      order_by?: 'asc' | 'desc'
    }
  }

  export interface OrdersResponse {
    orders: OrderResponse[]
  }

  export interface LastOrderId {
    last_order_id: {}
  }

  export interface LastOrderIdResponse {
    last_order_id: number
  }
}
