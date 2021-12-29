import { CSSProperties, useState, useEffect, useMemo } from 'react'

import { BURN, COLOR, UTIL } from 'consts'

import {
  burnMemoType,
  ContractAddr,
  CW20,
  SayOptionEnum,
  TokenDenomEnum,
  TokenType,
  uCW20,
  uToken,
} from 'types'

import useBurn, { UseBurnReturn } from 'hooks/common/useBurn'
import useCw20BurnHistory, {
  UseBurnHistoryReturn,
} from 'hooks/query/miawToken/useBurnHistory'
import useCw20Info from 'hooks/query/token/useCw20Info'
import usePool from 'hooks/query/pair/usePool'

export type UseSayMiawReturn = {
  burnedAmount: uCW20
  burnedPrice: uCW20
  onClickMiaw: () => void
  miawBurnHistory: UseBurnHistoryReturn
  memoOptions: {
    value: SayOptionEnum
    label: string
  }[]
  burnReturn: UseBurnReturn
  inputMemo: string
  setInputMemo: (value: string) => void
  onChangeOption: (value: SayOptionEnum) => void
}

export const getAmount = (option: SayOptionEnum): string => {
  return BURN.optionBurnAmount[option]
}

export const getMemoStyle = ({
  type,
  amount,
}: {
  type: SayOptionEnum
  amount: uToken
}): CSSProperties => {
  const bn = UTIL.toBn(UTIL.demicrofy(amount))

  const isValid = (
    targetType: SayOptionEnum,
    inputType: SayOptionEnum
  ): boolean => inputType === targetType && bn.gte(getAmount(targetType))

  if (isValid(SayOptionEnum.PLACEBO_RAFFLE_1, type)) {
    return {
      color: COLOR.placebo.primary_2,
      backgroundColor: COLOR.placebo.primary_1,
    }
  } else if (isValid(SayOptionEnum.init_name, type)) {
    return {
      color: COLOR.primary._200,
      backgroundColor: COLOR.gray._100,
      fontSize: 20,
    }
  } else if (isValid(SayOptionEnum.change_name, type)) {
    return {
      color: COLOR.gray._100,
      backgroundColor: COLOR.gray._600,
      fontSize: 20,
    }
  } else if (isValid(SayOptionEnum.rank_1, type)) {
    return { color: COLOR.rainbow.red, fontSize: 32 }
  } else if (isValid(SayOptionEnum.rank_2, type)) {
    return { color: COLOR.rainbow.orang, fontSize: 28 }
  } else if (isValid(SayOptionEnum.rank_3, type)) {
    return { color: COLOR.rainbow.yellow, fontSize: 26 }
  } else if (isValid(SayOptionEnum.rank_4, type)) {
    return { color: COLOR.rainbow.green, fontSize: 24 }
  } else if (isValid(SayOptionEnum.rank_5, type)) {
    return { color: COLOR.rainbow.blue, fontSize: 22 }
  } else if (isValid(SayOptionEnum.rank_6, type)) {
    return { color: COLOR.rainbow.navy, fontSize: 20 }
  } else {
    return { color: COLOR.rainbow.violet, fontSize: 18 }
  }
}

export const burnDataParser = ({
  data,
  name,
}: {
  data: string
  name: string
}): {
  type: SayOptionEnum
  displayMsg: string
} => {
  const json = UTIL.jsonTryParse<burnMemoType>(data)
  let displayMsg = data
  let type = '' as SayOptionEnum

  if (json) {
    type = json.type

    if ('name' in json) {
      if (type === SayOptionEnum.init_name) {
        displayMsg = `🎉 You got a Name~! Welcome ${json.name}`
      } else if (type === SayOptionEnum.change_name) {
        displayMsg = `💡 ${name} got a new name`
      }
    } else {
      displayMsg = json.msg
    }
  }

  return {
    type,
    displayMsg,
  }
}

const useSayMiaw = ({
  miawToken,
}: {
  miawToken: TokenType<ContractAddr>
}): UseSayMiawReturn => {
  const memoOptions = [
    // {
    //   value: SayOptionEnum.PLACEBO_RAFFLE_1,
    //   label: `${getAmount(SayOptionEnum.PLACEBO_RAFFLE_1)} MIAW PLACEBO RAFFLE`,
    // },
    {
      value: SayOptionEnum.rank_7,
      label: `${getAmount(SayOptionEnum.rank_7)} MIAW`,
    },
    {
      value: SayOptionEnum.rank_6,
      label: `${getAmount(SayOptionEnum.rank_6)} MIAW`,
    },
    {
      value: SayOptionEnum.rank_5,
      label: `${getAmount(SayOptionEnum.rank_5)} MIAW`,
    },
    {
      value: SayOptionEnum.rank_4,
      label: `${getAmount(SayOptionEnum.rank_4)} MIAW`,
    },
    {
      value: SayOptionEnum.rank_3,
      label: `${getAmount(SayOptionEnum.rank_3)} MIAW`,
    },
    {
      value: SayOptionEnum.rank_2,
      label: `${getAmount(SayOptionEnum.rank_2)} MIAW`,
    },
    {
      value: SayOptionEnum.rank_1,
      label: `${getAmount(SayOptionEnum.rank_1)} MIAW`,
    },
  ]

  const burnReturn = useBurn({ token: miawToken })
  const { tokenInfo } = useCw20Info({ token: miawToken.contractOrDenom })

  const { poolInfo } = usePool({
    pairContract: miawToken.pairList.find(
      (x) => x.denom === TokenDenomEnum.uusd
    )?.pair,
    token_0_ContractOrDenom: miawToken.contractOrDenom,
  })
  const burnedAmount = useMemo(() => {
    const initSupply = UTIL.toBn(100_000_000).multipliedBy(1e6)
    return initSupply
      .minus(tokenInfo?.total_supply || '0')
      .toString(10) as uCW20
  }, [tokenInfo?.total_supply])

  const burnedPrice = useMemo(() => {
    const price = UTIL.toBn(burnedAmount).multipliedBy(poolInfo.token_0_Price)
    return price.toString(10) as uCW20
  }, [burnedAmount, poolInfo.token_0_Price])

  const [burnOption, setBurnOption] = useState<SayOptionEnum>(
    memoOptions[0].value
  )
  const onChangeOption = (value: SayOptionEnum): void => {
    setBurnOption(value)
    burnReturn.setAmount(getAmount(value) as CW20)
  }

  const [inputMemo, setInputMemo] = useState('')

  const miawBurnHistory = useCw20BurnHistory()

  const onClickMiaw = (): void => {
    burnReturn.burnToken()
  }

  useEffect(() => {
    const burnMemo: burnMemoType = {
      type: burnOption,
      msg: inputMemo,
    }
    burnReturn.setMemo(JSON.stringify(burnMemo))
    return (): void => {
      burnReturn.setMemo(JSON.stringify(burnMemo))
    }
  }, [burnOption, inputMemo])

  useEffect(() => {
    onChangeOption(memoOptions[0].value)
  }, [])

  return {
    burnedAmount,
    burnedPrice,
    onClickMiaw,
    miawBurnHistory,
    memoOptions,
    burnReturn,
    inputMemo,
    setInputMemo,
    onChangeOption,
  }
}

export default useSayMiaw
