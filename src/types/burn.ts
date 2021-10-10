export enum SayOptionEnum {
  init_name = 'init_name',
  change_name = 'change_name',

  rank_1 = 'rank_1',
  rank_2 = 'rank_2',
  rank_3 = 'rank_3',
  rank_4 = 'rank_4',
  rank_5 = 'rank_5',
  rank_6 = 'rank_6',
  rank_7 = 'rank_7',

  // for event
  PLACEBO_RAFFLE_1 = 'PLACEBO_RAFFLE_1',
}

export type burnMemoType =
  | {
      type: SayOptionEnum
      msg: string
    }
  | {
      type: SayOptionEnum
      name: string
    }
