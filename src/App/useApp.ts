import { useMemo } from 'react'
import { useWallet, WalletStatus } from '@terra-money/wallet-provider'

const useApp = (): {
  initComplete: boolean
} => {
  const { status } = useWallet()

  const initComplete = useMemo(() => {
    return status !== WalletStatus.INITIALIZING
  }, [status])

  return {
    initComplete,
  }
}

export default useApp
