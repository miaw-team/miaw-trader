import { ReactElement } from 'react'
import styled from 'styled-components'

import { STYLE } from 'consts'

import { View, FormText } from 'components'

import useNetwork from 'hooks/common/useNetwork'

import Send from './Send'

const StyledContainer = styled(View)`
  ${STYLE.setMediaWidth('sm')}
  @media ${STYLE.media.tablet} {
    padding: 0 20px;
  }
`

const Main = (): ReactElement => {
  const { miawToken } = useNetwork()

  return (
    <StyledContainer>
      {miawToken ? (
        <Send token={miawToken} />
      ) : (
        <FormText fontType="B32">MIAW token is not ready</FormText>
      )}
    </StyledContainer>
  )
}

export default Main
