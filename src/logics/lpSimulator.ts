import { uToken, Token, uLP } from 'types'
import _ from 'lodash'
import BigNumber from 'bignumber.js'

import { UTIL } from 'consts'
import { LpSimulation } from 'types/lpSimulation'
import { ExtractPoolResponseType } from 'hooks/query/pair/usePool'

const { microfy, demicrofy, toBn } = UTIL

export const LpToken_0_Simulation = ({
  poolInfo,
  uToken_0,
}: {
  poolInfo: ExtractPoolResponseType
  uToken_0: uToken
}): LpSimulation => {
  const uToken_0Bn = toBn(uToken_0)
  const uToken_1Bn = uToken_0Bn.multipliedBy(poolInfo.token_0_Price)

  const poolPrice = microfy(poolInfo.token_0_Price) as uToken

  const lpFromTx = _.min([
    uToken_0Bn.multipliedBy(poolInfo.totalShare).div(poolInfo.token_0_PoolSize),
    uToken_1Bn.multipliedBy(poolInfo.totalShare).div(poolInfo.token_1_PoolSize),
  ])!

  const shareOfPool = lpFromTx.div(toBn(poolInfo.totalShare).plus(lpFromTx))

  return {
    poolPrice,
    lpFromTx: lpFromTx.toFixed(0) as uToken,
    shareOfPool,
    token_1_Amount: demicrofy(uToken_1Bn.toFixed(0) as uToken) as Token,
  }
}

export const LpToken_1_Simulation = ({
  poolInfo,
  uToken_1,
}: {
  poolInfo: ExtractPoolResponseType
  uToken_1: uToken
}): LpSimulation => {
  const uToken_1Bn = toBn(uToken_1)
  const uToken_0Bn = uToken_1Bn.div(poolInfo.token_0_Price)

  const poolPrice = microfy(poolInfo.token_0_Price) as uToken

  const lpFromTx = _.min([
    uToken_1Bn.multipliedBy(poolInfo.totalShare).div(poolInfo.token_1_PoolSize),
    uToken_0Bn.multipliedBy(poolInfo.totalShare).div(poolInfo.token_0_PoolSize),
  ])!

  const shareOfPool = lpFromTx.div(toBn(poolInfo.totalShare).plus(lpFromTx))

  return {
    poolPrice,
    lpFromTx: lpFromTx.toFixed(0) as uToken,
    shareOfPool,
    token_0_Amount: demicrofy(uToken_0Bn.toFixed(0) as uToken) as Token,
  }
}

export const LpLpSimulation = ({
  poolInfo,
  ulp,
  userLpBalance,
}: {
  poolInfo: ExtractPoolResponseType
  ulp: uLP
  userLpBalance: uLP
}): LpSimulation => {
  const lpBn = toBn(ulp)

  const uToken_0Bn = toBn(poolInfo.token_0_PoolSize)
    .multipliedBy(lpBn)
    .div(poolInfo.totalShare)

  const uToken_1Bn = toBn(poolInfo.token_1_PoolSize)
    .multipliedBy(lpBn)
    .div(poolInfo.totalShare)

  const poolPrice = microfy(poolInfo.token_0_Price) as uToken

  const lpFromTx = _.max([toBn('0'), toBn(userLpBalance).minus(lpBn)])!

  const shareOfPool = lpFromTx.div(toBn(poolInfo.totalShare).plus(lpFromTx))

  return {
    poolPrice,
    lpFromTx: lpFromTx.toFixed(0) as uToken,
    shareOfPool,

    token_0_Amount: demicrofy(
      uToken_0Bn.toFixed(0, BigNumber.ROUND_DOWN) as uToken
    ) as Token,
    token_1_Amount: demicrofy(
      uToken_1Bn.toFixed(0, BigNumber.ROUND_DOWN) as uToken
    ) as Token,
  }
}
