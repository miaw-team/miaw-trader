import { ReactElement } from 'react'
import styled from 'styled-components'
import Select from 'react-select'
import { useConnectedWallet } from '@terra-money/wallet-provider'

import { UTIL, COLOR, STYLE } from 'consts'

import { View, Row, FormInput, AuthButton, FormText } from 'components'
import {
  getMemoStyle,
  UseSayMiawReturn,
  getAmount,
} from 'hooks/common/sayMiaw/useSayMiaw'
import { Token } from 'types'

const StyledContainer = styled(View)``

const StyledSelectBox = styled(Row)`
  align-items: center;
  justify-content: space-between;
  @media ${STYLE.media.mobile} {
    flex-direction: column-reverse;
    align-items: inherit;
  }
`
const StyledInputBox = styled(Row)`
  align-items: center;
  justify-content: center;

  @media ${STYLE.media.mobile} {
    flex-direction: column;
    align-items: inherit;
  }
`

const InputMemo = ({
  sayMiawReturn,
}: {
  sayMiawReturn: UseSayMiawReturn
}): ReactElement => {
  const {
    burnReturn,
    onClickMiaw,
    memoOptions,
    inputMemo,
    setInputMemo,
    onChangeOption,
  } = sayMiawReturn
  const { amountErrMsg, memoErrMsg, invalidForm } = burnReturn
  const connectedWallet = useConnectedWallet()

  const colourStyles = {
    control: (styles: any): any => ({ ...styles, backgroundColor: 'white' }),
    option: (styles: any, { data }: any): any => {
      return {
        ...styles,
        ...getMemoStyle({
          type: data.value,
          amount: UTIL.microfy(getAmount(data.value) as Token),
        }),
      }
    },
    placeholder: (styles: any): any => ({ ...styles }),
    singleValue: (styles: any, { data }: any): any => ({
      ...styles,
      ...getMemoStyle({
        type: data.value,
        amount: UTIL.microfy(getAmount(data.value) as Token),
      }),
    }),
  }

  return (
    <>
      <StyledContainer>
        <View style={{ paddingBottom: 20 }}>
          <StyledSelectBox>
            <View style={{ width: 200 }}>
              <Select
                options={memoOptions}
                defaultValue={memoOptions[0]}
                isSearchable={false}
                styles={colourStyles}
                onChange={(sel): void => {
                  sel && onChangeOption(sel.value)
                }}
              />
            </View>
          </StyledSelectBox>
          <StyledInputBox>
            <View style={{ flex: 3 }}>
              <FormInput
                inputProps={{
                  value: inputMemo,
                  placeholder: '1.Input text. 2.Click Miawing!🐱',
                }}
                onChangeValue={setInputMemo}
              />
            </View>
            <View style={{ flex: 1 }}>
              <AuthButton
                style={{ borderRadius: 5, padding: '0 10px' }}
                onClick={onClickMiaw}
                disabled={invalidForm || !inputMemo}
              >
                Miawing!
              </AuthButton>
            </View>
          </StyledInputBox>
          {connectedWallet && (amountErrMsg || memoErrMsg) && (
            <FormText fontType={'R14'} color={COLOR.error}>
              {amountErrMsg || memoErrMsg}
            </FormText>
          )}
        </View>
      </StyledContainer>
    </>
  )
}

export default InputMemo
