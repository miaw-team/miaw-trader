import { ReactElement, useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { isTxError } from '@terra-money/terra.js'

import usePostTx from 'hooks/common/usePostTx'
import useMyBalance from 'hooks/common/useMyBalance'

import postTxStore from 'store/postTxStore'
import { PostTxStatus } from 'types'

import Modal from '../../components/Modal'
import TxStatus from './TxStatus'
import useTxInfo from 'hooks/query/useTxInfo'

const PostTxResult = (): ReactElement => {
  const [isOpen, setIsOpen] = useState(false)
  const [postTxResult, setPostTxResult] = useRecoilState(
    postTxStore.postTxResult
  )

  const { txInfo } = useTxInfo()

  const { resetPostTx } = usePostTx()
  const { refetch } = useMyBalance()

  const onClickStop = (): void => {
    resetPostTx()
    setIsOpen(false)
  }

  useEffect(() => {
    if (postTxResult.status === PostTxStatus.POST) {
      setIsOpen(true)
    } else if (
      [PostTxStatus.DONE, PostTxStatus.ERROR].includes(postTxResult.status)
    ) {
      refetch()
    }
  }, [postTxResult.status])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (txInfo) {
      timer = setTimeout(() => {
        setPostTxResult({
          status: PostTxStatus.ERROR,
          error: 'Could not get TxInfo for 20 seconds',
        })
      }, 1000 * 20)

      if (txInfo) {
        clearTimeout(timer)
        if (isTxError(txInfo)) {
          setPostTxResult({ status: PostTxStatus.ERROR, error: txInfo.raw_log })
        } else {
          setPostTxResult({ status: PostTxStatus.DONE, value: txInfo })
        }
      }
    }
    return (): void => {
      clearTimeout(timer)
    }
  }, [txInfo])

  return (
    <Modal isOpen={isOpen}>
      <TxStatus onClickStop={onClickStop} />
    </Modal>
  )
}

export default PostTxResult
