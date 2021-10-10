import { ReactElement } from 'react'
import styled from 'styled-components'

import { STYLE } from 'consts'
import { Row } from 'components'

import Menu from './Menu'
import Wallet from './Wallet'

const StyledContainer = styled(Row)`
  position: relative;
  min-width: 140px;
  padding: 16px 42px;
  align-items: center;
  justify-content: space-between;

  @media ${STYLE.media.tablet} {
    height: 60px;
    padding: 0 16px;
    align-items: center;
    border-bottom: none;
  }
`

const NavMenu = (): ReactElement => {
  return (
    <StyledContainer>
      <Menu />
      <Wallet />
    </StyledContainer>
  )
}

export default NavMenu
