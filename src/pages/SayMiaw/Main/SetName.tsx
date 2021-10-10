import { ReactElement } from 'react'
import styled from 'styled-components'
import { useConnectedWallet } from '@terra-money/wallet-provider'

import { COLOR, STYLE } from 'consts'

import { View, Row, FormInput, AuthButton, FormText } from 'components'
import useSetName from 'hooks/common/sayMiaw/useSetName'
import { ContractAddr, TokenType } from 'types'

const StyledContainer = styled(View)``

const StyledInputBox = styled(Row)`
  align-items: center;
  justify-content: center;

  @media ${STYLE.media.mobile} {
    flex-direction: column;
    align-items: inherit;
  }
`

const SetName = ({
  miawToken,
}: {
  miawToken: TokenType<ContractAddr>
}): ReactElement => {
  const { hasName, burnReturn, onClickSave, inputName, setInputName } =
    useSetName({
      miawToken,
    })
  const { amountErrMsg, memoErrMsg, invalidForm } = burnReturn
  const connectedWallet = useConnectedWallet()

  return (
    <>
      <StyledContainer>
        <View style={{ paddingBottom: 20 }}>
          <StyledInputBox>
            <View style={{ flex: 3 }}>
              <FormInput
                inputProps={{
                  maxLength: 60,
                  value: inputName,
                  placeholder: hasName
                    ? '500 MIAW for change name'
                    : '1 MIAW for init name',
                }}
                onChangeValue={setInputName}
              />
            </View>
            <View style={{ flex: 1 }}>
              <AuthButton
                style={{ borderRadius: 5, padding: '0 10px' }}
                onClick={onClickSave}
                disabled={invalidForm || !inputName}
              >
                {hasName ? 'Change name' : 'Get my name'}
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

export default SetName
