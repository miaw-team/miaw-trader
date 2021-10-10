import React, { ReactElement, ReactNode } from 'react'
import styled from 'styled-components'

import { COLOR } from 'consts'
import FormText, { FontType } from './FormText'

const StyledA = styled.a`
  :hover {
    opacity: 1;
  }
`

const LinkA = ({
  link,
  children,
  fontType,
}: {
  link: string
  children?: ReactNode
  fontType?: FontType
}): ReactElement => {
  return (
    <StyledA href={link} target="_blank" rel="noopener noreferrer">
      {children || (
        <FormText fontType={fontType || 'R14'} color={COLOR.primary._400}>
          {link}
        </FormText>
      )}
    </StyledA>
  )
}

export default LinkA
