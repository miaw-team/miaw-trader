import { ReactElement, useMemo } from 'react'
import styled from 'styled-components'

import { ASSET, UTIL } from 'consts'

import {
  View,
  Row,
  FormInput,
  BalanceFormat,
  MaxButton,
  FormDataList,
  Hr,
  FormLabel,
} from 'components'
import { TokenDenomEnum, uToken, CW20, TokenType } from 'types'
import { UseSendReturn } from 'hooks/common/useSend'

const StyledSection = styled(View)`
  padding-bottom: 20px;
`

const StyledMaxBalance = styled(Row)`
  justify-content: flex-end;
  padding-top: 8px;
`

const SendForm = ({
  sendProps,
  token,
}: {
  sendProps: UseSendReturn
  token: TokenType
}): ReactElement => {
  const {
    amount,
    setAmount,
    amountErrMsg,
    recipient,
    setRecipient,
    recipientErrMsg,
    memo,
    setMemo,
    memoErrMsg,
    myBalance,
    fee,
  } = sendProps

  const feeData = useMemo(
    () =>
      fee
        ? fee.amount.map((f) => ({
            title: 'Tx Fee',
            value: (
              <BalanceFormat
                value={f.amount.toString() as uToken}
                suffix={ASSET.symbolOfDenom[f.denom as TokenDenomEnum]}
              />
            ),
          }))
        : [],
    [fee]
  )

  return (
    <>
      <StyledSection>
        <View>
          <FormInput
            suffix={token.symbol}
            onChangeValue={(value): void => {
              setAmount(value as CW20)
            }}
            inputProps={{
              placeholder: '0',
              value: amount,
            }}
            isError={!!amountErrMsg}
            helperText={amountErrMsg}
          />
          <StyledMaxBalance>
            <MaxButton
              value={myBalance.getTokenBalance(token.contractOrDenom)}
              onClick={(value): void => {
                setAmount(UTIL.demicrofy(value) as CW20)
              }}
            />
          </StyledMaxBalance>
        </View>
        <View>
          <FormLabel>Destination</FormLabel>
          <FormInput
            onChangeValue={(value): void => {
              setRecipient(value)
            }}
            inputProps={{
              placeholder: '',
              value: recipient,
            }}
            isError={!!recipientErrMsg}
            helperText={recipientErrMsg}
          />
        </View>
        <View>
          <FormLabel>Memo</FormLabel>
          <FormInput
            onChangeValue={(value): void => {
              setMemo(value)
            }}
            inputProps={{
              placeholder: '',
              value: memo,
            }}
            isError={!!memoErrMsg}
            helperText={memoErrMsg}
          />
        </View>
      </StyledSection>
      <StyledSection>
        <Hr type="dashed" />
      </StyledSection>

      {fee && (
        <StyledSection>
          <FormDataList data={feeData} />
        </StyledSection>
      )}
    </>
  )
}

export default SendForm
