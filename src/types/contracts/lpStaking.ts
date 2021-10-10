import { uCW20, uLP } from 'types/currencies'
import { ContractAddr } from './common'

export namespace lpStaking {
  export interface Config {
    config: {}
  }

  export interface ConfigResponse {
    miaw_token: ContractAddr
    miaw_lp_token: ContractAddr
    distribution_schedule: Array<[number, number, uCW20]>
  }

  export interface StakerInfo {
    staker_info: {
      staker: ContractAddr
    }
  }

  export interface StakerInfoResponse {
    staker: ContractAddr
    reward_index: number
    bond_amount: uLP
    pending_reward: uCW20
  }

  export interface State {
    state: {}
  }

  export interface StateResponse {
    last_distributed: number
    total_bond_amount: uLP
    global_reward_index: number
  }
}
