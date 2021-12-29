import { useEffect, useMemo } from 'react'
import { isTxError, TxInfo } from '@terra-money/terra.js'
import { useRecoilState } from 'recoil'

import useLCD from '../../hooks/query/useLCD'
import useReactQuery from '../../hooks/common/useReactQuery'

import { PostTxStatus, QueryKeyEnum } from 'types'
import postTxStore from 'store/postTxStore'

const useTxInfo = (): {
  txInfo?: TxInfo
  error: unknown
} => {
  const { txInfoFetch } = useLCD()
  const [postTxResult, setPostTxResult] = useRecoilState(
    postTxStore.postTxResult
  )

  const txHash = useMemo(() => {
    if (postTxResult.status === PostTxStatus.BROADCAST) {
      return postTxResult.value.result.txhash
    } else if (postTxResult.status === PostTxStatus.DONE) {
      return postTxResult.value.txhash
    }
  }, [postTxResult])

  const {
    data: txInfo,
    error,
    refetch,
  } = useReactQuery(
    [QueryKeyEnum.TX_INFO, txHash],
    async () => {
      if (txHash) {
        return txInfoFetch({ txHash })
      }
    },
    {
      enabled: !!txHash,
    }
  )

  useEffect(() => {
    let interval: NodeJS.Timeout
    let timeout: NodeJS.Timeout

    if (postTxResult.status === PostTxStatus.BROADCAST) {
      interval = setInterval(() => {
        refetch()
      }, 500)

      timeout = setTimeout(() => {
        setPostTxResult({
          status: PostTxStatus.ERROR,
          error: 'Could not get TxInfo for 20 seconds',
        })
      }, 1000 * 20)
    }

    return (): void => {
      clearTimeout(interval)
      clearTimeout(timeout)
    }
  }, [postTxResult.status])

  useEffect(() => {
    if (txInfo) {
      if (isTxError(txInfo)) {
        setPostTxResult({ status: PostTxStatus.ERROR, error: txInfo.raw_log })
      } else {
        setPostTxResult({ status: PostTxStatus.DONE, value: txInfo })
      }
    }
  }, [txInfo])

  return { txInfo, error }
}

export default useTxInfo
