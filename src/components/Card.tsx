import styled from 'styled-components'

import { COLOR } from 'consts'
import View from './View'

const Card = styled(View)`
  padding: 16px;
  border: 1px solid ${COLOR.gray._300};
  border-radius: 8px;
  box-shadow: 0 3px 10px 0 rgb(66 66 66 / 5%);
  background-color: ${COLOR.white};
`

export default Card
