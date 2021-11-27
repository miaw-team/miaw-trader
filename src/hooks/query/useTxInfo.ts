import { useEffect, useMemo, useState } from 'react'
import { TxInfo } from '@terra-money/terra.js'
import { useRecoilValue } from 'recoil'

import useLCD from './useLCD'
import useReactQuery from '../common/useReactQuery'

import { PostTxStatus, QueryKeyEnum } from 'types'
import postTxStore from 'store/postTxStore'

const useTxInfo = (): {
  txInfo?: TxInfo
  error: unknown
} => {
  const { txInfoFetch } = useLCD()
  const postTxResult = useRecoilValue(postTxStore.postTxResult)

  const [runInterval, setRunInterval] = useState(true)

  const txHash = useMemo(() => {
    if (postTxResult.status === PostTxStatus.BROADCAST) {
      setRunInterval(true)
      return postTxResult.value.result.txhash
    } else if (postTxResult.status === PostTxStatus.DONE) {
      return postTxResult.value.txhash
    }
  }, [postTxResult])

  const { data: txInfo, error } = useReactQuery(
    [QueryKeyEnum.TX_INFO, txHash],
    async () => {
      if (txHash) {
        return txInfoFetch({ txHash })
      }
    },
    {
      enabled: !!txHash,
      refetchInterval: runInterval ? 500 : false,
    }
  )

  useEffect(() => {
    txInfo && setRunInterval(false)
  }, [txInfo])

  return { txInfo, error }
}

export default useTxInfo
