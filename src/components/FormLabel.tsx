import { ReactNode, ReactElement } from 'react'
import styled from 'styled-components'

import { COLOR, STYLE } from 'consts'
import FormText from './FormText'
import View from './View'

const StyledLabelBox = styled(View)`
  margin-bottom: 8px;

  @media ${STYLE.media.tablet} {
    margin-bottom: 5px;
  }
`

const FormLabel = ({ children }: { children: ReactNode }): ReactElement => (
  <StyledLabelBox>
    <FormText fontType="R14" color={COLOR.gray._300} {...{ children }} />
  </StyledLabelBox>
)

export default FormLabel
