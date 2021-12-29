export namespace upDown {
  export interface Config {
    config: {}
  }

  export interface ConfigResponse {
    config: {}
  }

  export interface RoundInfo {
    round_info: {
      round: number
    }
  }

  export interface RoundInfoResponse {
    round_info: {
      round: number
    }
  }

  export interface RoundInfos {
    round_infos: {
      start_after?: number
      limit?: number
    }
  }

  export interface BetInfo {
    bet_info: {
      round: number
      bettor: string
    }
  }

  export interface BetInfos {
    bet_infos: {
      bettor: string
      start_after?: number
      limit?: number
    }
  }

  export interface RoundBettors {
    round_bettors: {
      round: number
      start_after?: string
      limit?: number
    }
  }
}
