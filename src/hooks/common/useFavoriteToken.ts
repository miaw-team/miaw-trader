import { UTIL } from 'consts'
import { QueryKeyEnum, StorageKeyEnum } from 'types'
import useReactQuery from './useReactQuery'

const useFavoriteToken = (): {
  favoriteList: string[]
  addFavoriteList: (props: { symbol: string }) => void
  removeFavoriteList: (props: { symbol: string }) => void
} => {
  const { data: favoriteList = [], refetch } = useReactQuery(
    [QueryKeyEnum.FAVORITE_LIST],
    () => {
      const storageData =
        localStorage.getItem(StorageKeyEnum.favoriteList) || '[]'
      return UTIL.jsonTryParse<string[]>(storageData)
    }
  )

  const addFavoriteList = ({ symbol }: { symbol: string }): void => {
    if (false === favoriteList.includes(symbol)) {
      localStorage.setItem(
        StorageKeyEnum.favoriteList,
        JSON.stringify(favoriteList.concat([symbol]))
      )
    }
    refetch()
  }

  const removeFavoriteList = ({ symbol }: { symbol: string }): void => {
    if (favoriteList.includes(symbol)) {
      localStorage.setItem(
        StorageKeyEnum.favoriteList,
        JSON.stringify(favoriteList.filter((x) => x !== symbol))
      )
    }
    refetch()
  }

  return {
    favoriteList,
    addFavoriteList,
    removeFavoriteList,
  }
}

export default useFavoriteToken
