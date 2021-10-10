import type { Token, uToken, uNative } from 'types'
import { terraswap, TradeSimulation } from 'types'
import { UTIL } from 'consts'

const { toBn } = UTIL

export const buyFromSimulator = ({
  simulated,
  fromAmount,
  maxSpread,
}: {
  simulated: terraswap.SimulationResponse<uToken>
  fromAmount: uNative
  maxSpread: string
}): TradeSimulation<uNative, uToken> => {
  const beliefPrice = toBn(fromAmount).div(simulated.return_amount).dp(6)
  const toAmount = toBn(simulated.return_amount).toString() as uToken
  const expectedAmount = toBn(fromAmount).div(beliefPrice)

  const rate = toBn(1).minus(maxSpread)

  const minimumReceived = expectedAmount
    .multipliedBy(rate.isPositive() ? rate : 0)
    .toFixed(0) as uToken

  return {
    minimumReceived,
    beliefPrice: UTIL.microfy(beliefPrice.toString(10) as Token) as uToken,
    toAmount,
    fromAmount,
  }
}

export const buyToSimulator = ({
  simulated,
  toAmount,
  maxSpread,
}: {
  simulated: terraswap.ReverseSimulationResponse<uToken, uNative>
  toAmount: uToken
  maxSpread: string
}): TradeSimulation<uNative, uToken> => {
  const beliefPrice = toBn(simulated.offer_amount).div(toAmount).dp(6)
  const fromAmount = toBn(simulated.offer_amount).toString() as uNative
  const expectedAmount = toBn(simulated.offer_amount).div(beliefPrice)

  const rate = toBn(1).minus(maxSpread)

  const minimumReceived = expectedAmount
    .multipliedBy(rate.isPositive() ? rate : 0)
    .toFixed(0) as uToken

  return {
    minimumReceived,
    beliefPrice: UTIL.microfy(beliefPrice.toString(10) as Token) as uToken,
    toAmount,
    fromAmount,
  }
}

export const sellFromSimulator = ({
  simulated,
  fromAmount,
  maxSpread,
}: {
  simulated: terraswap.SimulationResponse<uNative>
  fromAmount: uToken
  maxSpread: string
}): TradeSimulation<uToken, uNative> => {
  const beliefPrice = toBn(fromAmount).div(simulated.return_amount).dp(6)
  const toAmount = toBn(simulated.return_amount).toString() as uNative
  const expectedAmount = toBn(fromAmount).div(beliefPrice)

  const rate = toBn(1).minus(maxSpread)

  const minimumReceived = expectedAmount
    .multipliedBy(rate.isPositive() ? rate : 0)
    .toFixed(0) as uNative

  return {
    minimumReceived,
    beliefPrice: UTIL.microfy(beliefPrice.toString(10) as Token) as uNative,
    toAmount,
    fromAmount,
  }
}

export const sellToSimulator = ({
  simulated,
  toAmount,
  maxSpread,
}: {
  simulated: terraswap.ReverseSimulationResponse<uNative, uToken>
  toAmount: uNative
  maxSpread: string
}): TradeSimulation<uToken, uNative> => {
  const beliefPrice = toBn(simulated.offer_amount).div(toAmount).dp(6)
  const fromAmount = toBn(simulated.offer_amount).toString() as uToken
  const expectedAmount = toBn(simulated.offer_amount).div(beliefPrice)

  const rate = toBn(1).minus(maxSpread)

  const minimumReceived = expectedAmount
    .multipliedBy(rate.isPositive() ? rate : 0)
    .toFixed(0) as uNative

  return {
    minimumReceived,
    beliefPrice: UTIL.microfy(beliefPrice.toString(10) as Token) as uNative,
    toAmount,
    fromAmount,
  }
}
