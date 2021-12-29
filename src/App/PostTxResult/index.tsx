import { ReactElement, useState, useMemo } from 'react'
import { useQueryClient } from 'react-query'

import usePostTx from 'hooks/common/usePostTx'

import { PostTxStatus, QueryKeyEnum } from 'types'

import Modal from '../../components/Modal'
import TxStatus from './TxStatus'
import usePostTxStatusEffect from 'hooks/common/usePostTxStatusEffect'
import useTxInfo from 'App/PostTxResult/useTxInfo'

const PostTxResult = (): ReactElement => {
  useTxInfo()
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)

  const { resetPostTx } = usePostTx()

  const onClickStop = (): void => {
    resetPostTx()
    setIsOpen(false)
  }

  const effectList = useMemo(
    () => [
      { when: [PostTxStatus.POST], action: (): void => setIsOpen(true) },
      {
        when: [PostTxStatus.DONE, PostTxStatus.ERROR],
        action: (): void => {
          queryClient.refetchQueries([QueryKeyEnum.CW20USTLP_BALANCE])
          queryClient.refetchQueries([QueryKeyEnum.USER_BALANCE_ADDRESS])
        },
      },
    ],
    []
  )
  usePostTxStatusEffect({ effectList })

  return (
    <Modal isOpen={isOpen}>
      <TxStatus onClickStop={onClickStop} />
    </Modal>
  )
}

export default PostTxResult
