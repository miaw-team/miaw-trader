import { useMemo } from 'react'

import { useWallet } from '@terra-money/wallet-provider'
import { Coins, LCDClient, TxInfo } from '@terra-money/terra.js'

import { ContractAddr } from 'types'

const useLCD = (): {
  lcd: LCDClient
  lastSyncedHeightFetch: () => Promise<string>
  txInfoFetch: (props: { txHash: string }) => Promise<TxInfo>
  balanceFetch: (props: { address: string }) => Promise<Coins>
  wasmFetch: <Msg extends object, Response>(props: {
    contract: ContractAddr
    msg: Msg
  }) => Promise<Response>
} => {
  const wallet = useWallet()
  const gasPrices = {
    uusd: '0.456',
  }
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

  const balanceFetch = ({ address }: { address: string }): Promise<Coins> =>
    lcd.bank.balance(address)

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
