import { useEffect } from 'react'

import { useRecoilValue } from 'recoil'

import { PostTxStatus } from 'types'
import postTxStore from 'store/postTxStore'

const usePostTxStatusEffect = ({
  effectList,
}: {
  effectList: { when: PostTxStatus[]; action: () => void }[]
}): void => {
  const postTxResult = useRecoilValue(postTxStore.postTxResult)

  useEffect(() => {
    if (postTxResult.status) {
      const actionList = effectList.filter((x) =>
        x.when.includes(postTxResult.status)
      )
      if (actionList.length > 0) {
        actionList.forEach((x) => {
          x.action()
        })
      }
    }
  }, [postTxResult.status])
}

export default usePostTxStatusEffect
