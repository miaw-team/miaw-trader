import { useCallback } from 'react'
import { MsgExecuteContract } from '@terra-money/terra.js'
import { useConnectedWallet } from '@terra-money/wallet-provider'

import {
  fabricateSwap,
  fabricateLpProvide,
  fabricateLpWithdraw,
  fabricateLpStake,
  fabricateLpUnStake,
  fabricateLpRewardClaim,
  FabricateSwapOption,
  FabricateLpProvideOption,
  FabricateLpWithdrawOption,
  FabricateLpStakeOption,
  FabricateLpUnStakeOption,
  FabricateLpRewardClaimOption,
} from 'logics/fabricator'
import { ContractAddr } from 'types'

const useFabricator = (): {
  getSwapMsgs: (
    props: Omit<FabricateSwapOption, 'sender'>
  ) => MsgExecuteContract[]
  getLpProvideMsgs: (
    props: Omit<FabricateLpProvideOption, 'sender'>
  ) => MsgExecuteContract[]
  getLpWithdrawMsgs: (
    props: Omit<FabricateLpWithdrawOption, 'sender'>
  ) => MsgExecuteContract[]
  getLpStakeMsgs: (
    props: Omit<FabricateLpStakeOption, 'sender'>
  ) => MsgExecuteContract[]
  getLpUnStakeMsgs: (
    props: Omit<FabricateLpUnStakeOption, 'sender'>
  ) => MsgExecuteContract[]
  getLpRewardClaimMsgs: (
    props: Omit<FabricateLpRewardClaimOption, 'sender'>
  ) => MsgExecuteContract[]
} => {
  const connectedWallet = useConnectedWallet()
  const sender = (connectedWallet?.walletAddress || '') as ContractAddr

  const getSwapMsgs = useCallback(
    (props: Omit<FabricateSwapOption, 'sender'>): MsgExecuteContract[] => {
      return sender ? fabricateSwap({ ...props, sender }) : []
    },
    [sender]
  )

  const getLpProvideMsgs = useCallback(
    (props: Omit<FabricateLpProvideOption, 'sender'>): MsgExecuteContract[] => {
      return sender ? fabricateLpProvide({ ...props, sender }) : []
    },
    [sender]
  )

  const getLpWithdrawMsgs = useCallback(
    (
      props: Omit<FabricateLpWithdrawOption, 'sender'>
    ): MsgExecuteContract[] => {
      return sender ? fabricateLpWithdraw({ ...props, sender }) : []
    },
    [sender]
  )

  const getLpStakeMsgs = useCallback(
    (props: Omit<FabricateLpStakeOption, 'sender'>): MsgExecuteContract[] => {
      return sender ? fabricateLpStake({ ...props, sender }) : []
    },
    [sender]
  )

  const getLpUnStakeMsgs = useCallback(
    (props: Omit<FabricateLpUnStakeOption, 'sender'>): MsgExecuteContract[] => {
      return sender ? fabricateLpUnStake({ ...props, sender }) : []
    },
    [sender]
  )

  const getLpRewardClaimMsgs = useCallback(
    (
      props: Omit<FabricateLpRewardClaimOption, 'sender'>
    ): MsgExecuteContract[] => {
      return sender ? fabricateLpRewardClaim({ ...props, sender }) : []
    },
    [sender]
  )

  return {
    getSwapMsgs,
    getLpProvideMsgs,
    getLpWithdrawMsgs,
    getLpStakeMsgs,
    getLpUnStakeMsgs,
    getLpRewardClaimMsgs,
  }
}

export default useFabricator
