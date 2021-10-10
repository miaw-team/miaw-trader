import { ReactElement } from 'react'
import styled from 'styled-components'
import _ from 'lodash'

import { UTIL, COLOR } from 'consts'

import FormText, { FontType } from './FormText'
import View from './View'
import { uToken } from 'types'

type BalanceFormatProps = {
  value: uToken
  prefix?: string
  suffix?: string
  size?: 'sm' | 'md' | 'lg'
  isAbbreviateNumber?: boolean
}

const StyledContainer = styled(View)`
  flex-direction: row;
  align-items: baseline;
  white-space: pre-wrap;
`

const BalanceFormat = ({
  value,
  prefix,
  suffix = '',
  size = 'md',
  isAbbreviateNumber,
}: BalanceFormatProps): ReactElement => {
  const formatAmount = UTIL.formatAmount(value)
  const splits = formatAmount.split('.')
  let integer = splits[0]
  let decimal = splits[1]

  const fontColor = COLOR.gray._800
  const fontType: FontType =
    size === 'lg' ? 'R20' : size === 'md' ? 'R16' : 'R14'
  const integerFontType: FontType =
    size === 'lg' ? 'B20' : size === 'md' ? 'B16' : 'B14'
  const decimalFontType: FontType =
    size === 'lg' ? 'R18' : size === 'md' ? 'R14' : 'R12'

  const abbreviated = UTIL.abbreviateNumber(UTIL.delComma(integer))
  if (isAbbreviateNumber) {
    integer = abbreviated.value.split('.')[0]
    decimal = abbreviated.value.split('.')[1]
  }

  return (
    <StyledContainer>
      <FormText fontType={fontType} color={fontColor}>
        {prefix}
      </FormText>
      <FormText
        fontType={integerFontType}
        color={fontColor}
        style={{ opacity: 0.9 }}
      >
        {UTIL.setComma(integer)}
        {decimal ? '.' : ''}
      </FormText>
      {_.some(decimal) && (
        <FormText fontType={decimalFontType} color={fontColor}>
          {decimal}
        </FormText>
      )}
      {isAbbreviateNumber && (
        <FormText fontType={fontType} color={fontColor}>
          {abbreviated.unit}
        </FormText>
      )}
      {suffix && (
        <View style={{ paddingLeft: 4 }}>
          <FormText fontType={fontType} color={fontColor}>
            {suffix}
          </FormText>
        </View>
      )}
    </StyledContainer>
  )
}

export default BalanceFormat
