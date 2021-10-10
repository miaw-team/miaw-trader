import { uToken } from 'types'

export interface TradeSimulation<From extends uToken, To extends uToken> {
  beliefPrice: To
  minimumReceived: To
  fromAmount?: From
  toAmount?: To
}
