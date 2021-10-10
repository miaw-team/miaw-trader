import { CSSProperties, ReactElement, ReactNode } from 'react'
import styled from 'styled-components'
import _ from 'lodash'

import { COLOR } from 'consts'
import { Text, Row, View } from 'components'

type FormDataListProps = {
  data: { title: ReactNode; value: ReactNode }[]
  size?: 'lg' | 'sm'
  containerStyle?: CSSProperties
  itemBoxStyle?: CSSProperties
}

const StyledItemBox = styled(Row)`
  justify-content: space-between;
`

const StyledTitle = styled(Text)<{ size: 'lg' | 'sm' }>`
  font-size: ${({ size }): string => (size === 'sm' ? '14px' : '16px')};
  color: ${COLOR.gray._300};
`

const StyledValue = styled(Text)<{ size: 'lg' | 'sm' }>`
  font-size: ${({ size }): string => (size === 'sm' ? '14px' : '16px')};
  color: ${COLOR.gray._50};
`

const FormDataList = (props: FormDataListProps): ReactElement => {
  const { data, size = 'lg', containerStyle } = props
  return (
    <View style={containerStyle}>
      {_.map(data, ({ title, value }, index) => {
        return (
          <StyledItemBox
            key={`data-${index}`}
            style={{ paddingTop: index === 0 ? 0 : 8, ...props.itemBoxStyle }}
          >
            <StyledTitle size={size}>{title}</StyledTitle>
            <StyledValue size={size}>{value}</StyledValue>
          </StyledItemBox>
        )
      })}
    </View>
  )
}

export default FormDataList
