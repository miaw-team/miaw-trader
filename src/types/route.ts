export enum RoutePath {
  home = '/home',

  lpTower = '/lpTower',

  miaw_paper = '/miaw_paper',

  say_miaw = '/say_miaw',

  send = '/send',
}

export enum TradeTypeEnum {
  buy = 'buy',
  sell = 'sell',
}

export enum LpProvideTypeEnum {
  provide = 'provide',
  withdraw = 'withdraw',
}

export enum LpStakeTypeEnum {
  stake = 'stake',
  unstake = 'unstake',
}

export type RouteParams = {
  [RoutePath.home]: {
    tradeType: TradeTypeEnum
    lpType: LpProvideTypeEnum
    symbol: string
  }
  [RoutePath.lpTower]: {
    lpProvideType: LpProvideTypeEnum
    lpStakeType: LpStakeTypeEnum
    lpOfLpIndex: string
    lpStakingIndex: string
  }
  [RoutePath.miaw_paper]: undefined
  [RoutePath.say_miaw]: undefined
  [RoutePath.send]: undefined
}
