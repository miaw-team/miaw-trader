import { Coin, Coins, MsgExecuteContract } from '@terra-money/terra.js'
import { UTIL } from 'consts'
import { ContractAddr, LP, terraswap, Token, TokenDenomEnum } from 'types'

const getAssetInfo = (
  contractOrDenom: TokenDenomEnum | ContractAddr
): terraswap.AssetInfo =>
  UTIL.isNativeDenom(contractOrDenom)
    ? {
        native_token: {
          denom: contractOrDenom as TokenDenomEnum,
        },
      }
    : {
        token: { contract_addr: contractOrDenom as ContractAddr },
      }

export type FabricateSwapOption = {
  fromAmount: Token
  fromTokenContractOrDenom: ContractAddr | TokenDenomEnum
  sender: ContractAddr
  pairContract: ContractAddr
  beliefPrice?: Token
  maxSpread?: string
}

export const fabricateSwap = ({
  fromAmount,
  fromTokenContractOrDenom,
  sender,
  pairContract,
  beliefPrice,
  maxSpread,
}: FabricateSwapOption): MsgExecuteContract[] => {
  const belief_price = UTIL.toBn(beliefPrice).dp(16).toString(10)
  const fromUAmount = UTIL.microfy(fromAmount)

  return UTIL.isNativeDenom(fromTokenContractOrDenom)
    ? [
        new MsgExecuteContract(
          sender,
          pairContract,
          {
            swap: {
              offer_asset: {
                amount: fromUAmount,
                info: { native_token: { denom: fromTokenContractOrDenom } },
              },
              belief_price,
              max_spread: maxSpread,
            },
          },
          new Coins([
            Coin.fromData({
              amount: fromUAmount,
              denom: fromTokenContractOrDenom,
            }),
          ])
        ),
      ]
    : [
        new MsgExecuteContract(sender, fromTokenContractOrDenom, {
          send: {
            contract: pairContract,
            amount: fromUAmount,
            msg: UTIL.toBase64(
              JSON.stringify({
                swap: {
                  belief_price,
                  max_spread: maxSpread,
                },
              })
            ),
          },
        }),
      ]
}

export type FabricateLpProvideOption = {
  sender: ContractAddr
  pairContract: ContractAddr
  token_0_Amount: Token
  token_1_Amount: Token
  token_0_ContractOrDenom: ContractAddr | TokenDenomEnum
  token_1_ContractOrDenom: ContractAddr | TokenDenomEnum
}

export const fabricateLpProvide = ({
  sender,
  token_0_Amount,
  token_1_Amount,
  pairContract,
  token_0_ContractOrDenom,
  token_1_ContractOrDenom,
}: FabricateLpProvideOption): MsgExecuteContract[] => {
  const token_0_IsNativeDenom = UTIL.isNativeDenom(token_0_ContractOrDenom)
  const token_1_IsNativeDenom = UTIL.isNativeDenom(token_1_ContractOrDenom)

  const coinList = []
  const tokenAllowanceMsg = []

  if (token_0_IsNativeDenom) {
    coinList.push(
      new Coin(token_0_ContractOrDenom, UTIL.microfy(token_0_Amount))
    )
  } else {
    tokenAllowanceMsg.push(
      new MsgExecuteContract(sender, token_0_ContractOrDenom, {
        increase_allowance: {
          spender: pairContract,
          amount: UTIL.microfy(token_0_Amount),
          expires: { never: {} },
        },
      })
    )
  }

  if (token_1_IsNativeDenom) {
    coinList.push(
      new Coin(token_1_ContractOrDenom, UTIL.microfy(token_1_Amount))
    )
  } else {
    tokenAllowanceMsg.push(
      new MsgExecuteContract(sender, token_1_ContractOrDenom, {
        increase_allowance: {
          spender: pairContract,
          amount: UTIL.microfy(token_1_Amount),
          expires: { never: {} },
        },
      })
    )
  }

  const token_0_Info = getAssetInfo(token_0_ContractOrDenom)

  const token_1_Info = getAssetInfo(token_1_ContractOrDenom)

  const coins = new Coins(coinList)

  return tokenAllowanceMsg.concat([
    new MsgExecuteContract(
      sender,
      pairContract,
      {
        provide_liquidity: {
          assets: [
            {
              amount: UTIL.microfy(token_0_Amount),
              info: token_0_Info,
            },
            {
              amount: UTIL.microfy(token_1_Amount),
              info: token_1_Info,
            },
          ],
          slippage_tolerance: '0.01',
        },
      },
      coins
    ),
  ])
}

export type FabricateLpWithdrawOption = {
  sender: ContractAddr
  amount: LP
  lpContract: ContractAddr
  pairContract: ContractAddr
}

export const fabricateLpWithdraw = ({
  sender,
  amount,
  lpContract,
  pairContract,
}: FabricateLpWithdrawOption): MsgExecuteContract[] => {
  return [
    new MsgExecuteContract(sender, lpContract, {
      send: {
        contract: pairContract,
        amount: UTIL.microfy(amount),
        msg: UTIL.toBase64(
          JSON.stringify({
            withdraw_liquidity: {},
          })
        ),
      },
    }),
  ]
}

export type FabricateLpStakeOption = {
  sender: ContractAddr
  amount: LP
  lpStaking: ContractAddr
  lpContract: ContractAddr
}

export const fabricateLpStake = ({
  sender,
  amount,
  lpStaking,
  lpContract,
}: FabricateLpStakeOption): MsgExecuteContract[] => {
  return [
    new MsgExecuteContract(sender, lpContract, {
      send: {
        contract: lpStaking,
        amount: UTIL.microfy(amount),
        msg: UTIL.toBase64(
          JSON.stringify({
            bond: {},
          })
        ),
      },
    }),
  ]
}

export type FabricateLpUnStakeOption = {
  sender: ContractAddr
  amount: LP
  lpStaking: ContractAddr
}

export const fabricateLpUnStake = ({
  sender,
  amount,
  lpStaking,
}: FabricateLpUnStakeOption): MsgExecuteContract[] => {
  return [
    new MsgExecuteContract(sender, lpStaking, {
      unbond: {
        amount: UTIL.microfy(amount),
      },
    }),
  ]
}

export type FabricateLpRewardClaimOption = {
  sender: ContractAddr
  lpStaking: ContractAddr
}

export const fabricateLpRewardClaim = ({
  sender,
  lpStaking,
}: FabricateLpRewardClaimOption): MsgExecuteContract[] => {
  return [
    new MsgExecuteContract(sender, lpStaking, {
      claim_rewards: {},
    }),
  ]
}

interface fabricateSendOption {
  sender: ContractAddr
  token: ContractAddr
  amount: Token
  recipient: ContractAddr
}

export const fabricateSend = ({
  sender,
  token,
  amount,
  recipient,
}: fabricateSendOption): MsgExecuteContract[] => {
  return [
    new MsgExecuteContract(sender, token, {
      transfer: { recipient, amount: UTIL.microfy(amount) },
    }),
  ]
}

interface fabricateBurnOption {
  sender: ContractAddr
  token: ContractAddr
  amount: Token
}

export const fabricateBurn = ({
  sender,
  token,
  amount,
}: fabricateBurnOption): MsgExecuteContract[] => {
  return [
    new MsgExecuteContract(sender, token, {
      burn: { amount: UTIL.microfy(amount) },
    }),
  ]
}

export type FabricateSubmitOrderOption = {
  sender: ContractAddr
  limitOrderContract: ContractAddr
  offerAmount: Token
  askAmount: Token
  offerContractOrDenom: ContractAddr | TokenDenomEnum
  askContractOrDenom: ContractAddr | TokenDenomEnum
  feeContractOrDenom: ContractAddr | TokenDenomEnum
  feeAmount: Token
}

export const fabricateSubmitOrder = ({
  sender,
  offerAmount,
  askAmount,
  limitOrderContract,
  offerContractOrDenom,
  askContractOrDenom,
  feeContractOrDenom,
  feeAmount,
}: FabricateSubmitOrderOption): MsgExecuteContract[] => {
  const offerIsNativeDenom = UTIL.isNativeDenom(offerContractOrDenom)

  const coinList = []
  const tokenAllowanceMsg = []

  tokenAllowanceMsg.push(
    new MsgExecuteContract(sender, feeContractOrDenom, {
      increase_allowance: {
        spender: limitOrderContract,
        amount: UTIL.microfy(feeAmount),
        expires: { never: {} },
      },
    })
  )

  if (offerIsNativeDenom) {
    coinList.push(new Coin(offerContractOrDenom, UTIL.microfy(offerAmount)))
  } else {
    tokenAllowanceMsg.push(
      new MsgExecuteContract(sender, offerContractOrDenom, {
        increase_allowance: {
          spender: limitOrderContract,
          amount: UTIL.microfy(offerAmount),
          expires: { never: {} },
        },
      })
    )
  }

  const offerInfo = getAssetInfo(offerContractOrDenom)

  const askInfo = getAssetInfo(askContractOrDenom)

  const coins = new Coins(coinList)

  return tokenAllowanceMsg.concat([
    new MsgExecuteContract(
      sender,
      limitOrderContract,
      {
        submit_order: {
          offer_asset: { info: offerInfo, amount: UTIL.microfy(offerAmount) },
          ask_asset: { info: askInfo, amount: UTIL.microfy(askAmount) },
          fee_amount: UTIL.microfy(feeAmount),
        },
      },
      coins
    ),
  ])
}

export interface FabricateCancelOrderOption {
  sender: ContractAddr
  limitOrderContract: ContractAddr
  orderId: number
}

export const fabricateCancelOrder = ({
  sender,
  limitOrderContract,
  orderId,
}: FabricateCancelOrderOption): MsgExecuteContract[] => {
  return [
    new MsgExecuteContract(sender, limitOrderContract, {
      cancel_order: { order_id: orderId },
    }),
  ]
}
