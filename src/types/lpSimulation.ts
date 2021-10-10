import BigNumber from 'bignumber.js'
import { uToken, Token } from 'types'

export interface LpSimulation {
  poolPrice: uToken
  lpFromTx: uToken
  shareOfPool: BigNumber
  token_0_Amount?: Token
  token_1_Amount?: Token
}
