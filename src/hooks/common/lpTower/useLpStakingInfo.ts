import { useEffect, useMemo } from 'react'
import _ from 'lodash'
import moment from 'moment'
import { useRecoilValue } from 'recoil'

import { UTIL } from 'consts'

import { LpStakingType, PostTxStatus, uLP } from 'types'
import useLpStakingState from 'hooks/query/lpStaking/useLpStakingState'
import useLpStakingConfig from 'hooks/query/lpStaking/useLpStakingConfig'
import usePool from 'hooks/query/pair/usePool'
import postTxStore from 'store/postTxStore'
import { ExtractPoolResponseType } from 'logics/pool'

export type UseLpStakingInfoReturn = {
  apr: string
  totalLpStaked: uLP
  poolInfo?: ExtractPoolResponseType
}

const useLpStakingInfo = ({
  selectedLpStaking,
}: {
  selectedLpStaking: LpStakingType
}): UseLpStakingInfoReturn => {
  const postTxResult = useRecoilValue(postTxStore.postTxResult)
  const { poolInfo, refetch: refetchPollInfo } = usePool({
    pairContract: selectedLpStaking.lpPair,
    token_0_ContractOrDenom: selectedLpStaking.tokenContract,
  })
  const { state, refetch: refetchState } = useLpStakingState({
    lpStaking: selectedLpStaking.lpStaking,
  })
  const { config, refetch: refetchConfig } = useLpStakingConfig({
    lpStaking: selectedLpStaking.lpStaking,
  })
  const apr = useMemo(() => {
    if (config && state && poolInfo) {
      const rewardYear = config.distribution_schedule.find((x) =>
        _.inRange(moment().unix(), x[0], x[1])
      )
      if (rewardYear) {
        const rewardAmountThisYear = rewardYear[2]

        const lpTokenPrice = UTIL.toBn(poolInfo.token_1_PoolSize)
          .multipliedBy(2)
          .div(poolInfo.totalShare)

        const totalValueLocked = UTIL.toBn(
          state.total_bond_amount
        ).multipliedBy(lpTokenPrice)
        return UTIL.toBn(rewardAmountThisYear)
          .multipliedBy(poolInfo.token_0_Price)
          .div(totalValueLocked)
          .multipliedBy(100)
          .toFixed(2)
      }
    }
    return '0'
  }, [config, state, poolInfo])

  useEffect(() => {
    if ([PostTxStatus.DONE].includes(postTxResult.status)) {
      refetchPollInfo()
      refetchState()
      refetchConfig()
    }
  }, [postTxResult.status])

  return {
    poolInfo,
    apr,
    totalLpStaked: (state?.total_bond_amount || '0') as uLP,
  }
}

export default useLpStakingInfo
