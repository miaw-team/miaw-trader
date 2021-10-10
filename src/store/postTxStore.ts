import { atom } from 'recoil'
import { PostTxStatus, StreamResultType } from 'types'
import storeKeys from './storeKeys'

const postTxResult = atom<StreamResultType>({
  key: storeKeys.postTx.postTxResult,
  default: {
    status: PostTxStatus.READY,
  },
})

export default {
  postTxResult,
}
