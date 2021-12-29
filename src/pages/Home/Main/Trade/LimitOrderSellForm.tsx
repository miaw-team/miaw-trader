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
  FormText,
  FormLabel,
} from 'components'
import { TokenDenomEnum, uToken, Token } from 'types'
import { UseLimitOrderSellReturn } from 'hooks/common/trade/useLimitOrderSell'
import useMyBalance from 'hooks/common/useMyBalance'

const StyledSection = styled(View)`
  padding-bottom: 20px;
`

const StyledMaxBalance = styled(Row)`
  justify-content: flex-end;
  padding-top: 8px;
`

const LimitOrderSellForm = ({
  useLimitOrderSellReturn,
}: {
  useLimitOrderSellReturn: UseLimitOrderSellReturn
}): ReactElement => {
  const {
    offerTokenSymbol,
    askTokenSymbol,
    offerContractOrDenom,
    askAmount,

    offerAmount,
    updateOfferAmount,
    offerAmountErrMsg,

    askPrice,
    updateAskPrice,
    askPriceErrMsg,

    miawToken,
    miawAmount,
    setMiawAmount,
    miawAmountErrMsg,

    fee,
  } = useLimitOrderSellReturn

  const { balance: offerBal } = useMyBalance({
    contractOrDenom: offerContractOrDenom,
  })

  const { balance: miawBal } = useMyBalance({
    contractOrDenom: miawToken.contractOrDenom,
  })

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
        <View style={{ paddingBottom: 20 }}>
          <FormLabel>Order to sell</FormLabel>
          <FormInput
            number
            suffix={offerTokenSymbol}
            onChangeValue={(value): void => {
              updateOfferAmount(value as Token)
            }}
            inputProps={{
              placeholder: '0',
              value: offerAmount,
            }}
            isError={!!offerAmountErrMsg}
            helperText={offerAmountErrMsg}
          />
          <StyledMaxBalance>
            <MaxButton
              value={offerBal}
              onClick={(value): void => {
                updateOfferAmount(UTIL.demicrofy(value) as Token)
              }}
            />
          </StyledMaxBalance>
        </View>
        <View style={{ paddingBottom: 30 }}>
          <FormLabel>Price</FormLabel>
          <FormInput
            number
            suffix={`per ${offerTokenSymbol}`}
            onChangeValue={(value): void => {
              updateAskPrice(value as Token)
            }}
            inputProps={{
              placeholder: '0',
              value: askPrice,
            }}
            isError={!!askPriceErrMsg}
            helperText={askPriceErrMsg}
          />
        </View>
        <View>
          <FormLabel>Fee for priority</FormLabel>
          <FormInput
            number
            suffix={miawToken.symbol}
            onChangeValue={(value): void => {
              setMiawAmount(value as Token)
            }}
            inputProps={{
              placeholder: '0',
              value: miawAmount,
            }}
            isError={!!miawAmountErrMsg}
            helperText={miawAmountErrMsg}
          />
          <StyledMaxBalance>
            <MaxButton
              value={miawBal}
              onClick={(value): void => {
                setMiawAmount(UTIL.demicrofy(value) as Token)
              }}
            />
          </StyledMaxBalance>
        </View>
        <View>
          <FormText>
            {`${UTIL.formatAmount(UTIL.microfy(askAmount))} ${askTokenSymbol}`}
          </FormText>
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

export default LimitOrderSellForm
