import { useMemo } from 'react'
import axios from 'axios'

import { useWallet } from '@terra-money/wallet-provider'
import { Coins, LCDClient, TxInfo } from '@terra-money/terra.js'

import { ContractAddr, QueryKeyEnum } from 'types'
import useReactQuery from 'hooks/common/useReactQuery'

const useLCD = (): {
  lcd: LCDClient
  lastSyncedHeightFetch: () => Promise<string>
  txInfoFetch: (props: { txHash: string }) => Promise<TxInfo>
  balanceFetch: (props: { address: string }) => Promise<[Coins, any]>
  wasmFetch: <Msg extends object, Response>(props: {
    contract: ContractAddr
    msg: Msg
  }) => Promise<Response>
} => {
  const wallet = useWallet()

  const {
    data: gasPrices = {
      uusd: '0.15',
    },
  } = useReactQuery<{
    [denom: string]: string
  }>([QueryKeyEnum.GAS_PRICES], async () => {
    const { data } = await axios.get('https://fcd.terra.dev/v1/txs/gas_prices')
    return data
  })

  const lcd = useMemo(
    () =>
      new LCDClient({
        chainID: wallet.network.chainID,
        URL: wallet.network.lcd,
        gasPrices,
      }),
    [wallet]
  )

  const lastSyncedHeightFetch = async (): Promise<string> => {
    const block = await lcd.tendermint.blockInfo()
    return block.block.header.height
  }

  const txInfoFetch = ({ txHash }: { txHash: string }): Promise<TxInfo> =>
    lcd.tx.txInfo(txHash)

  const balanceFetch = ({
    address,
  }: {
    address: string
  }): Promise<[Coins, any]> => lcd.bank.balance(address)

  const wasmFetch = <Msg extends object, Response>({
    contract,
    msg,
  }: {
    contract: ContractAddr
    msg: Msg
  }): Promise<Response> => lcd.wasm.contractQuery<Response>(contract, msg)

  return { lcd, lastSyncedHeightFetch, txInfoFetch, balanceFetch, wasmFetch }
}

export default useLCD
