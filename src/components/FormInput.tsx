import { ReactElement, ReactNode, useState } from 'react'
import styled, { CSSProperties } from 'styled-components'

import { COLOR, STYLE } from 'consts'

import Row from './Row'
import View from './View'
import Text from './Text'
import FormText from './FormText'

const StyledContainer = styled(View)`
  margin: 0 -2px;
`

const StyledInputContainer = styled(Row)`
  flex: 1;
  border-radius: 8px;
  border: 2px solid rgba(255, 255, 255, 0.08);
`

const StyledInput = styled.input`
  flex: 1;
  padding: 0 16px;
  height: 36px;
  border: none;
  font-size: 18px;
  font-weight: 400;
  width: 100%;
  min-width: 120px;
  color: ${COLOR.text};
  background-color: ${COLOR.gray._50};
  border: 1px solid #00000050;
  :read-only {
    background-color: ${COLOR.gray._100};
    cursor: not-allowed;
  }
  :focus {
    outline: none;
  }
  ::placeholder {
    opacity: 0.6;
  }
  @media ${STYLE.media.tablet} {
    font-size: 16px;
  }
`
const StyledSuffixBox = styled(View)`
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  border: 1px solid #00000050;
  min-width: 80px;
  align-items: center;
  justify-content: center;
`

const StyledSuffixText = styled(Text)`
  padding: 0 16px;
  color: ${COLOR.text};
  font-weight: 400;
  font-size: 16px;
`

const FormInput = <T extends string>({
  number,
  inputProps,
  onChangeValue,
  suffix,
  isError,
  helperText,
}: {
  number?: boolean
  inputProps?: {
    placeholder?: string
    value?: T
    readOnly?: boolean
    type?: string
    maxLength?: number
  }
  onChangeValue?: (value: T) => void
  suffix?: ReactNode
  isError?: boolean
  helperText?: string
}): ReactElement => {
  const readOnly = inputProps?.readOnly

  const containerStyle: CSSProperties = {}
  let helperTextStyle
  const [onFocus, setOnFocus] = useState(false)
  if (isError) {
    containerStyle.border = `2px solid ${COLOR.error}`
    helperTextStyle = COLOR.error
  } else if (onFocus) {
    containerStyle.border = `2px solid ${COLOR.primary._400}`
    helperTextStyle = COLOR.primary._400
  }

  return (
    <StyledContainer>
      <StyledInputContainer style={containerStyle}>
        <StyledInput
          {...inputProps}
          type={number ? 'number' : 'text'}
          onChange={({ target: { value } }): void => {
            onChangeValue?.(value as T)
          }}
          onWheel={({ currentTarget }): void => {
            currentTarget.blur()
          }}
          style={{ borderRadius: suffix ? '4px 0 0 4px' : 4 }}
          onFocus={(): void => {
            !readOnly && setOnFocus(true)
          }}
          onBlur={(): void => {
            setOnFocus(false)
          }}
        />

        {suffix && (
          <StyledSuffixBox>
            {typeof suffix === 'string' ? (
              <StyledSuffixText>{suffix}</StyledSuffixText>
            ) : (
              suffix
            )}
          </StyledSuffixBox>
        )}
      </StyledInputContainer>
      <FormText fontType={'R14'} color={helperTextStyle}>
        {helperText}
      </FormText>
    </StyledContainer>
  )
}

export default FormInput
