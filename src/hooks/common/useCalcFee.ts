import { useEffect, useState } from 'react'
import { CreateTxOptions, Fee } from '@terra-money/terra.js'
import { useDebouncedCallback } from 'use-debounce'
import usePostTx from './usePostTx'
import { useConnectedWallet } from '@terra-money/wallet-provider'

const useCalcFee = ({
  isValid,
  txOptions,
}: {
  isValid: boolean
  txOptions: CreateTxOptions
}): {
  fee?: Fee
} => {
  const [fee, setFee] = useState<Fee>()
  const connectedWallet = useConnectedWallet()
  const { getFee } = usePostTx()
  const dbcGetFee = useDebouncedCallback(async () => {
    const txOptionsFee = await getFee({ txOptions })
    setFee(txOptionsFee)
  }, 400)

  useEffect(() => {
    fee && setFee(undefined)
    if (isValid) {
      dbcGetFee()
    } else {
      setFee(undefined)
    }
    return (): void => {
      dbcGetFee.cancel()
    }
  }, [txOptions, isValid, connectedWallet])

  return {
    fee,
  }
}

export default useCalcFee
