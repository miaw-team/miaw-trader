import { ReactElement, useMemo } from 'react'
import styled from 'styled-components'
import { IconCirclePlus } from '@tabler/icons'

import { ASSET, COLOR, UTIL } from 'consts'

import {
  View,
  Row,
  FormInput,
  BalanceFormat,
  MaxButton,
  FormDataList,
  Hr,
  FormText,
  FormImage,
} from 'components'
import { TokenDenomEnum, Token, UST, uToken, LpofLpType } from 'types'
import { UseLpProvideReturn } from 'hooks/common/lpProvide/useLpProvide'
import useMyBalance from 'hooks/common/useMyBalance'

const StyledSection = styled(View)`
  padding-bottom: 20px;
`

const StyledMaxBalance = styled(Row)`
  justify-content: flex-end;
  padding-top: 8px;
`

const StyledLogo = styled(FormImage)`
  width: 20px;
  height: 20px;
`

const LpProvideForm = ({
  lpProvideReturn,
  selectedLpOfLp,
}: {
  lpProvideReturn: UseLpProvideReturn
  selectedLpOfLp: LpofLpType
}): ReactElement => {
  const {
    token_0_ContractOrDenom,
    token_1_ContractOrDenom,

    fee,
    simulation,
    token_0_Amount,
    updateToken_0_Amount,
    token_0_AmountErrMsg,
    token_1_Amount,
    updateToken_1_Amount,
    token_1_AmountErrMsg,
  } = lpProvideReturn

  const { balance: token_0_bal } = useMyBalance({
    contractOrDenom: token_0_ContractOrDenom,
  })

  const { balance: token_1_bal } = useMyBalance({
    contractOrDenom: token_1_ContractOrDenom,
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
        <View>
          <FormInput
            number
            suffix={
              <Row style={{ alignItems: 'center' }}>
                <StyledLogo src={selectedLpOfLp.token_0_LogoList[0]} />
                <StyledLogo src={selectedLpOfLp.token_0_LogoList[1]} />
                <FormText fontType="R18" style={{ paddingLeft: 5 }}>
                  Lp
                </FormText>
              </Row>
            }
            onChangeValue={(value): void => {
              updateToken_0_Amount(value as Token)
            }}
            inputProps={{
              placeholder: '0',
              value: token_0_Amount,
            }}
            isError={!!token_0_AmountErrMsg}
            helperText={token_0_AmountErrMsg}
          />
          <StyledMaxBalance>
            <MaxButton
              value={token_0_bal}
              onClick={(value): void => {
                updateToken_0_Amount(UTIL.demicrofy(value) as Token)
              }}
            />
          </StyledMaxBalance>
        </View>
        <View style={{ padding: '4px 0 34px', alignItems: 'center' }}>
          <IconCirclePlus color={COLOR.gray._300} />
        </View>
        <View>
          <FormInput
            number
            suffix={
              <Row style={{ alignItems: 'center' }}>
                <StyledLogo src={selectedLpOfLp.token_1_LogoList[0]} />
                <StyledLogo src={selectedLpOfLp.token_1_LogoList[1]} />
                <FormText fontType="R18" style={{ paddingLeft: 5 }}>
                  Lp
                </FormText>
              </Row>
            }
            onChangeValue={(value): void => {
              updateToken_1_Amount(value as Token)
            }}
            inputProps={{
              placeholder: '0',
              value: token_1_Amount,
            }}
            isError={!!token_1_AmountErrMsg}
            helperText={token_1_AmountErrMsg}
          />
          <StyledMaxBalance>
            <MaxButton
              value={token_1_bal}
              onClick={(value): void => {
                updateToken_1_Amount(UTIL.demicrofy(value) as UST)
              }}
            />
          </StyledMaxBalance>
        </View>
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

export default LpProvideForm
