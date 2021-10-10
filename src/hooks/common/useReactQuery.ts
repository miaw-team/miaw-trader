import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
  QueryFunction,
} from 'react-query'
import useNetwork from './useNetwork'

const useReactQuery = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData
>(
  queryKey: unknown[],
  queryFn: QueryFunction<TQueryFnData, unknown[]>,
  options?: UseQueryOptions<TQueryFnData, TError, TData, unknown[]>
): UseQueryResult<TData, TError> => {
  const { isMainnet } = useNetwork()

  return useQuery(queryKey.concat(isMainnet), queryFn, options)
}

export default useReactQuery
