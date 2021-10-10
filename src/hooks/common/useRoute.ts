import { useHistory, useLocation } from 'react-router-dom'
import _ from 'lodash'

import { RouteParams, QueryKeyEnum } from 'types'
import { useQuery } from 'react-query'

type PushProps<RouteName extends keyof RouteParams> =
  undefined extends RouteParams[RouteName]
    ? [RouteName]
    : [RouteName, RouteParams[RouteName]] | [RouteName]

const useRoute = <RouteName extends keyof RouteParams>(): {
  push: <RouteName extends keyof RouteParams>(
    ...args: PushProps<RouteName>
  ) => void
  goBack: () => void
  routeParams?: RouteParams[RouteName]
  insertRouteParam: (key: keyof RouteParams[RouteName], value: string) => void
} => {
  const history = useHistory()
  const { replace, location } = history
  const push = <RouteName extends keyof RouteParams>(
    ...args: PushProps<RouteName>
  ): void => {
    const path = args[0]
    const params = args[1]

    if (params) {
      const query = _.map(params, (v, k) => `${k}=${v}`).join('&')
      history.push(`${path}?${query}`)
    } else {
      history.push(path)
    }
  }
  const searchParams = new URLSearchParams(useLocation().search)

  const { data: routeParams, refetch: refetchRouteParams } = useQuery(
    [QueryKeyEnum.ROUTE_PARAMS, location.search],
    (): RouteParams[RouteName] => {
      const params: any = {}
      searchParams.forEach((v, k) => {
        params[k] = v
      })

      return params as RouteParams[RouteName]
    }
  )

  const insertRouteParam = (
    key: keyof RouteParams[RouteName],
    value?: string
  ): void => {
    const strKey = encodeURIComponent(key as string)
    value = encodeURIComponent(value || '')
    const query = location.search.substr(1)
    const kvp = query.split('&')

    let i = 0

    for (; i < kvp.length; i++) {
      if (kvp[i].startsWith(strKey + '=')) {
        const pair = kvp[i].split('=')
        pair[1] = value
        kvp[i] = value && pair.join('=')
        break
      }
    }

    if (i >= kvp.length) {
      kvp[kvp.length] = [strKey, value].join('=')
    }
    const params = kvp
      .filter((x) => x)
      .join('&')
      .replace(/^&/, '')

    replace(`${location.pathname}?${params}`)
    refetchRouteParams()
  }

  return { ...history, push, routeParams, insertRouteParam }
}

export default useRoute
