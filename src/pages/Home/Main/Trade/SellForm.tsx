import { ReactElement, useMemo } from 'react'
import styled from 'styled-components'
import { IconArrowDownCircle } from '@tabler/icons'

import { ASSET, COLOR, UTIL } from 'consts'

import {
  View,
  Row,
  FormInput,
  BalanceFormat,
  MaxButton,
  FormDataList,
  Hr,
  SlippageToleranceButton,
} from 'components'
import { TokenDenomEnum, uToken, Token, Native } from 'types'
import { UseSellReturn } from 'hooks/common/trade/useSell'
import useMyBalance from 'hooks/common/useMyBalance'

const StyledSection = styled(View)`
  padding-bottom: 20px;
`

const StyledMaxBalance = styled(Row)`
  justify-content: flex-end;
  padding-top: 8px;
`

const SellForm = ({
  sellReturn,
}: {
  sellReturn: UseSellReturn
}): ReactElement => {
  const {
    fromTokenContractOrDenom,
    toTokenContractOrDenom,
    fromTokenSymbol,
    toTokenSymbol,

    fromAmount,
    updateFromAmount,
    fromAmountErrMsg,
    toAmount,
    updateToAmount,
    toAmountErrMsg,
    fee,
    simulation,
    slippage,
    updateSlippage,
  } = sellReturn

  const { balance: fromTokenBal } = useMyBalance({
    contractOrDenom: fromTokenContractOrDenom,
  })

  const { balance: toTokenBal } = useMyBalance({
    contractOrDenom: toTokenContractOrDenom,
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

  const simulationData = useMemo(() => {
    if (simulation) {
      return [
        {
          title: `Price per ${toTokenSymbol}`,
          value: (
            <BalanceFormat
              value={simulation.beliefPrice}
              suffix={fromTokenSymbol}
            />
          ),
        },
        {
          title: 'Minimum Received',
          value: (
            <BalanceFormat
              value={simulation.minimumReceived}
              suffix={toTokenSymbol}
            />
          ),
        },
      ]
    }
    return []
  }, [simulation])

  return (
    <>
      <StyledSection>
        <View>
          <FormInput
            number
            suffix={fromTokenSymbol}
            onChangeValue={(value): void => {
              updateFromAmount(value as Token)
            }}
            inputProps={{
              placeholder: '0',
              value: fromAmount,
            }}
            isError={!!fromAmountErrMsg}
            helperText={fromAmountErrMsg}
          />
          <StyledMaxBalance>
            <MaxButton
              value={fromTokenBal}
              onClick={(value): void => {
                updateFromAmount(UTIL.demicrofy(value) as Token)
              }}
            />
          </StyledMaxBalance>
        </View>
        <View style={{ padding: '4px 0 34px', alignItems: 'center' }}>
          <IconArrowDownCircle color={COLOR.gray._300} />
        </View>
        <View>
          <FormInput
            number
            suffix={toTokenSymbol}
            onChangeValue={(value): void => {
              updateToAmount(value as Native)
            }}
            inputProps={{
              placeholder: '0',
              value: toAmount,
            }}
            isError={!!toAmountErrMsg}
            helperText={toAmountErrMsg}
          />
          <StyledMaxBalance>
            <MaxButton
              value={toTokenBal}
              onClick={(value): void => {
                updateToAmount(UTIL.demicrofy(value) as Native)
              }}
            />
          </StyledMaxBalance>
        </View>
      </StyledSection>

      <StyledSection>
        <SlippageToleranceButton
          slippage={slippage}
          updateSlippage={updateSlippage}
        />
      </StyledSection>

      <StyledSection>
        <Hr type="dashed" />
      </StyledSection>

      {fee && simulation && (
        <StyledSection>
          <FormDataList data={simulationData.concat(feeData)} />
        </StyledSection>
      )}
    </>
  )
}

export default SellForm
