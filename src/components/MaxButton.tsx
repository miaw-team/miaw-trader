import { ReactElement } from 'react'
import styled from 'styled-components'

import { COLOR, STYLE, UTIL } from 'consts'
import Row from 'components/Row'
import FormText from 'components/FormText'

import { uToken } from 'types'

type MaxButtonProps = {
  value: uToken
  onClick: (value: uToken) => void
}

const StyledMaxButton = styled(Row)`
  ${STYLE.clickable}
  border:none;
  background-color: transparent;
  align-items: center;
  :hover {
    opacity: 0.8;
  }
`

const MaxButton = ({ value, onClick }: MaxButtonProps): ReactElement => (
  <StyledMaxButton onClick={(): void => onClick(value)}>
    <FormText fontType="R14" color={COLOR.primary._400}>
      {`MAX ${UTIL.formatAmount(value)}`}
    </FormText>
  </StyledMaxButton>
)

export default MaxButton
