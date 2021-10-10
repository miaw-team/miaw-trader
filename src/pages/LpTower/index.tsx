import { ReactElement } from 'react'
import { Route } from 'react-router-dom'

import { RoutePath } from 'types'

import Main from './Main'

const LpTower = (): ReactElement => {
  return <Route exact path={RoutePath.lpTower} component={Main} />
}

export default LpTower
