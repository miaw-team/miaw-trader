import { ReactElement } from 'react'
import styled from 'styled-components'

import { COLOR } from 'consts'
const StyledSolidVr = styled.div`
  background-color: ${COLOR.gray._900};
  width: 1px;
`
const StyledDashedVr = styled.div`
  border-bottom: 1px dashed ${COLOR.gray._900};
  width: 1px;
`

const Vr = ({
  type = 'solid',
}: {
  type?: 'solid' | 'dashed'
}): ReactElement => {
  switch (type) {
    case 'dashed':
      return <StyledDashedVr />
    default:
      return <StyledSolidVr />
  }
}
export default Vr
