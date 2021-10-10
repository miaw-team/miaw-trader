import { ReactElement, useMemo, useState } from 'react'
import styled from 'styled-components'

import { COLOR, STYLE, UTIL } from 'consts'

import { validateSlippage } from 'logics/validator'

import FormText from './FormText'
import View from './View'
import Row from './Row'

const StyledContainer = styled(View)`
  justify-content: center;
`

const StyledOptionBox = styled(View)``

const StyledOptionItem = styled(Row)<{ selected?: boolean }>`
  ${STYLE.clickable};
  min-width: 40px;
  height: 28px;
  align-items: center;
  justify-content: center;
  margin: 0 3px;
  border-bottom: 2px solid ${COLOR.gray._800};
  background-color: ${({ selected }): string =>
    selected ? COLOR.primary._400 : 'transparent'};
  :hover {
    border-bottom: 2px solid ${COLOR.primary._400};
  }
`

const StyledInput = styled.input`
  background: ${COLOR.gray._100};
  outline: none;
  border: none;
  width: 40px;
  color: ${COLOR.gray._800};
  text-align: end;
  font-size: 14px;
  ::placeholder {
    color: ${COLOR.gray._600};
  }
`

enum SlippageValueEnum {
  per05 = '0.005',
  per1 = '0.01',
  per5 = '0.05',
}

const SlippageToleranceButton = ({
  slippage,
  updateSlippage,
}: {
  slippage: string
  updateSlippage: (value: string) => void
}): ReactElement => {
  const [inputValue, setInputValue] = useState('')

  const onChangeSlippage = (value: string): void => {
    updateSlippage(value)
  }

  const validation = useMemo(() => {
    return validateSlippage({ slippage })
  }, [slippage])

  const errorMessage = useMemo(() => {
    if (validation.status !== 'success') {
      return validation.message
    }
  }, [validation])

  const inputBorder = useMemo(() => {
    if (inputValue === '') {
      return
    }
    switch (validation.status) {
      case 'error':
        return `2px solid ${COLOR.error}`
      case 'warning':
        return `2px solid ${COLOR.warning}`
      default:
        return `2px solid ${COLOR.primary._400}`
    }
  }, [validation])

  const FixedOptionItem = ({
    value,
    title,
  }: {
    value: SlippageValueEnum
    title: string
  }): ReactElement => {
    const selected = slippage === value
    return (
      <StyledOptionItem
        selected={selected}
        onClick={(): void => {
          setInputValue('')
          onChangeSlippage(value)
        }}
      >
        <FormText
          fontType={selected ? 'B14' : 'R14'}
          color={selected ? COLOR.gray._50 : COLOR.gray._900}
        >
          {title}
        </FormText>
      </StyledOptionItem>
    )
  }

  return (
    <StyledContainer>
      <Row style={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <FormText fontType="R12" color={COLOR.gray._800}>
          Slippage Tolerance
        </FormText>

        <StyledOptionBox>
          <Row style={{ justifyContent: 'space-around' }}>
            <FixedOptionItem title="0.5%" value={SlippageValueEnum.per05} />
            <FixedOptionItem title="1%" value={SlippageValueEnum.per1} />
            <FixedOptionItem title="5%" value={SlippageValueEnum.per5} />
            <StyledOptionItem
              style={{
                borderBottom: inputBorder,
              }}
            >
              <StyledInput
                type="number"
                value={inputValue}
                placeholder={'0'}
                maxLength={4}
                onChange={({ target: { value } }): void => {
                  const bnValue = UTIL.toBn(value).dp(2)
                  setInputValue(bnValue.toString())
                  onChangeSlippage(bnValue.div(100).toString())
                }}
              />
              <FormText fontType="R12" color={COLOR.gray._800}>
                %
              </FormText>
            </StyledOptionItem>
          </Row>
        </StyledOptionBox>
      </Row>
      {errorMessage && (
        <View style={{ alignItems: 'flex-end', paddingTop: 8 }}>
          <FormText
            fontType="R12"
            color={
              validation.status === 'error'
                ? COLOR.error
                : validation.status === 'warning'
                ? COLOR.warning
                : COLOR.gray._800
            }
          >
            {errorMessage}
          </FormText>
        </View>
      )}
    </StyledContainer>
  )
}

export default SlippageToleranceButton
