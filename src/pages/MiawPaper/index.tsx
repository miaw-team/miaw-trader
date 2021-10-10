import { ReactElement } from 'react'
import { Route } from 'react-router-dom'

import { RoutePath } from 'types'

import Main from './Main'

const MiawPaper = (): ReactElement => {
  return <Route exact path={RoutePath.miaw_paper} component={Main} />
}

export default MiawPaper
