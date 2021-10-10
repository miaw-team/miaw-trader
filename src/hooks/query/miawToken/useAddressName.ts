import axios from 'axios'
import { APIURL } from 'consts'

import { QueryKeyEnum } from 'types'
import useReactQuery from 'hooks/common/useReactQuery'

export type DataType = {
  address: string
  name: string
}

type FetchResponseType = {
  getName: {
    address: string
    name: string
  }
}

export type UseAddressNameReturn = {
  name: string
  refetch: () => void
}

const useAddressName = ({
  walletAddress,
}: {
  walletAddress: string
}): UseAddressNameReturn => {
  const { data = '', refetch } = useReactQuery(
    [QueryKeyEnum.ADDRESS_NAME, walletAddress],
    async () => {
      const query = `query {
        getName(address:"${walletAddress}"){
            address
            name
          }
        }`

      const { data } = await axios.post<{
        data: FetchResponseType
      }>(APIURL.MIAW_API, { query })

      return data.data.getName.name
    },
    {
      enabled: !!walletAddress,
    }
  )

  return {
    name: data,
    refetch,
  }
}

export default useAddressName
