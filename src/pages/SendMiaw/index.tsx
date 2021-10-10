import { ReactElement } from 'react'
import { Route } from 'react-router-dom'

import { RoutePath } from 'types'

import Main from './Main'

const Home = (): ReactElement => {
  return <Route exact path={RoutePath.send} component={Main} />
}

export default Home
