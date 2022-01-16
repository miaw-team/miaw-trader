import { useMemo } from 'react'
import { useWallet } from '@terra-money/wallet-provider'

import { ASSET, UTIL, WHITELIST } from 'consts'

import {
  ContractAddr,
  TokenType,
  LpofLpType,
  LpStakingType,
  TokenDenomEnum,
} from 'types'

const useNetwork = (): {
  isMainnet: boolean
  chainId: string
  whitelist: TokenType[]
  lpOfLpList: LpofLpType[]
  lpStakingList: LpStakingType[]
  limitOrder: ContractAddr
  getSymbolByContractOrDenom: (
    contractOrDenom: ContractAddr | TokenDenomEnum
  ) => string
  miawToken: TokenType
  mantleApi: string
} => {
  const { network } = useWallet()
  const isMainnet = useMemo(
    () => /^columbus/.test(network.chainID),
    [network.chainID]
  )

  const mantleApi = useMemo(
    () =>
      isMainnet
        ? 'https://mantle.terra.dev'
        : 'https://bombay-mantle.terra.dev',
    [isMainnet]
  )

  const whitelist = useMemo(
    () => (isMainnet ? WHITELIST.mainnetTokenList : WHITELIST.testnetTokenList),
    [isMainnet]
  )

  const lpOfLpList = useMemo(
    () => (isMainnet ? WHITELIST.mainnetLpOfLpList : []),
    [isMainnet]
  )

  const lpStakingList = useMemo(
    () =>
      isMainnet
        ? WHITELIST.mainnetLpStakingList
        : WHITELIST.testnetLpStakingList,
    [isMainnet]
  )

  const limitOrder = useMemo(
    () =>
      isMainnet ? WHITELIST.mainnetLimitOrder : WHITELIST.testnetLimitOrder,
    [isMainnet]
  )

  const getSymbolByContractOrDenom = (
    contractOrDenom: ContractAddr | TokenDenomEnum
  ): string => {
    if (UTIL.isNativeDenom(contractOrDenom)) {
      return ASSET.symbolOfDenom[contractOrDenom as TokenDenomEnum]
    } else {
      return (
        whitelist.find((x) => x.contractOrDenom === contractOrDenom)?.symbol ||
        ''
      )
    }
  }

  const miawToken = whitelist.find((x) => x.symbol === 'MIAW')! as TokenType

  return {
    isMainnet,
    whitelist,
    lpOfLpList,
    lpStakingList,
    limitOrder,
    chainId: network.chainID,
    getSymbolByContractOrDenom,
    miawToken,
    mantleApi,
  }
}

export default useNetwork
