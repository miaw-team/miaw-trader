import { SayOptionEnum } from 'types'

const optionBurnAmount: Record<SayOptionEnum, string> = {
  [SayOptionEnum.init_name]: '1',
  [SayOptionEnum.change_name]: '500',

  [SayOptionEnum.rank_1]: '30',
  [SayOptionEnum.rank_2]: '25',
  [SayOptionEnum.rank_3]: '20',
  [SayOptionEnum.rank_4]: '15',
  [SayOptionEnum.rank_5]: '10',
  [SayOptionEnum.rank_6]: '5',
  [SayOptionEnum.rank_7]: '1',
  // for event
  [SayOptionEnum.PLACEBO_RAFFLE_1]: '50',
}

export default {
  optionBurnAmount,
}
