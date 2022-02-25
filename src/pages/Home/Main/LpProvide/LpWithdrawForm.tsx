import { ReactElement, useMemo } from 'react'
import styled from 'styled-components'
import { IconPlus } from '@tabler/icons'

import { ASSET, COLOR, UTIL, STYLE } from 'consts'

import {
  View,
  Row,
  FormInput,
  BalanceFormat,
  MaxButton,
  FormDataList,
  Hr,
  FormText,
} from 'components'
import { TokenDenomEnum, LP, uToken, Token } from 'types'
import { UseLpWithdrawReturn } from 'hooks/common/lpProvide/useLpWithdraw'
import useMyBalance from 'hooks/common/useMyBalance'

const StyledSection = styled(View)`
  padding-bottom: 20px;
`

const StyledMaxBalance = styled(Row)`
  justify-content: flex-end;
  padding-top: 8px;
`

const StyledReturnBox = styled(Row)`
  align-items: center;
  @media ${STYLE.media.mobile} {
    flex-direction: column;
  }
`

const LpWithdrawForm = ({
  lpWithdrawReturn,
}: {
  lpWithdrawReturn: UseLpWithdrawReturn
}): ReactElement => {
  const {
    lpContract,
    token_0_Symbol,
    token_1_Symbol,

    lpTokenAmount,
    updateLpTokenAmount,
    lpTokenAmountErrMsg,
    fee,
    simulation,
  } = lpWithdrawReturn

  const { balance: lpBal } = useMyBalance({
    contractOrDenom: lpContract,
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
          title: 'Return',
          value: (
            <StyledReturnBox>
              <BalanceFormat
                value={UTIL.microfy(
                  simulation.token_1_Amount || ('0' as Token)
                )}
                suffix={token_1_Symbol}
              />
              <IconPlus
                size={14}
                style={{ padding: '0 4px' }}
                color={COLOR.primary._400}
              />
              <BalanceFormat
                value={UTIL.microfy(
                  simulation.token_0_Amount || ('0' as Token)
                )}
                suffix={token_0_Symbol}
              />
            </StyledReturnBox>
          ),
        },
        {
          title: 'LP from Tx',
          value: <BalanceFormat value={simulation.lpFromTx} suffix={'LP'} />,
        },
        {
          title: 'Share of Pool',
          value: (
            <FormText
              fontType={{ default: 'R16', mobile: 'R14' }}
              color={COLOR.gray._800}
            >
              {UTIL.formatPercentage(simulation.shareOfPool)}%
            </FormText>
          ),
        },
      ]
    }
    return []
  }, [simulation])

  return (
    <>
      <StyledSection>
        <FormInput
          number
          suffix="LP"
          onChangeValue={(value): void => {
            updateLpTokenAmount(value as LP)
          }}
          inputProps={{
            placeholder: '0',
            value: lpTokenAmount,
          }}
          isError={!!lpTokenAmountErrMsg}
          helperText={lpTokenAmountErrMsg}
        />
        <StyledMaxBalance>
          <MaxButton
            value={lpBal}
            onClick={(value): void => {
              updateLpTokenAmount(UTIL.demicrofy(value) as LP)
            }}
          />
        </StyledMaxBalance>
      </StyledSection>
      <StyledSection>
        <Hr type="dashed" />
      </StyledSection>
      {(fee || simulation) && (
        <StyledSection>
          <FormDataList data={simulationData.concat(feeData)} />
        </StyledSection>
      )}
    </>
  )
}

export default LpWithdrawForm
