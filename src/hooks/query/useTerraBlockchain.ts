import { useMemo } from 'react'

import useLCD from './useLCD'
import useReactQuery from '../common/useReactQuery'
import { QueryKeyEnum } from 'types'

const useTerraBlockchain = (): {
  lastSyncedHeight: number
  refetch: () => void
} => {
  const { lastSyncedHeightFetch } = useLCD()

  const { data, refetch } = useReactQuery(
    [QueryKeyEnum.LAST_SYNCED_HEIGHT],
    () => lastSyncedHeightFetch(),
    { refetchInterval: 60 * 1000 }
  )

  const lastSyncedHeight = useMemo(() => {
    if (data) {
      return +data
    }

    return 0
  }, [data])

  return {
    refetch,
    lastSyncedHeight,
  }
}

export default useTerraBlockchain
