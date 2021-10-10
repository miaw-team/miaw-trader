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
} from 'components'
import { TokenDenomEnum, LP, uToken, uLP } from 'types'
import { UseLpUnStakeReturn } from 'hooks/common/lpStake/useLpUnStake'
import useLayout from 'hooks/common/useLayout'

const StyledSection = styled(View)`
  padding-bottom: 40px;
`

const StyledMaxBalance = styled(Row)`
  justify-content: flex-end;
  padding-top: 8px;
`

const LpUnStakeForm = ({
  lpUnStakeReturn,
}: {
  lpUnStakeReturn: UseLpUnStakeReturn
}): ReactElement => {
  const { isMobileWidth } = useLayout()
  const {
    stakerInfo,
    lpTokenAmount,
    setLpTokenAmount,
    lpTokenAmountErrMsg,
    fee,
  } = lpUnStakeReturn

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
        <FormInput
          suffix={isMobileWidth ? 'LP' : 'MIAW-UST LP'}
          onChangeValue={(value): void => {
            setLpTokenAmount(value as LP)
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
            value={(stakerInfo?.bond_amount || '0') as uLP}
            onClick={(value): void => {
              setLpTokenAmount(UTIL.demicrofy(value) as LP)
            }}
          />
        </StyledMaxBalance>
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

export default LpUnStakeForm
