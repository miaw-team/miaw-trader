import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import styled from 'styled-components'

import { COLOR } from 'consts'

const StyledDatePicker = styled(DatePicker)`
  padding: 10px;
  border-radius: 8px;
  background-color: ${COLOR.gray._50};
  border: 1px solid #00000050;
`

export default StyledDatePicker
