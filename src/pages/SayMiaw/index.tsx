import { ReactElement } from 'react'
import { Route } from 'react-router-dom'

import { RoutePath } from 'types'

import Main from './Main'

const SayMiaw = (): ReactElement => {
  return <Route exact path={RoutePath.say_miaw} component={Main} />
}

export default SayMiaw
