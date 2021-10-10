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
import { TokenDenomEnum, LP, uToken } from 'types'
import { UseLpStakeReturn } from 'hooks/common/lpStake/useLpStake'
import useLayout from 'hooks/common/useLayout'
import useMyBalance from 'hooks/common/useMyBalance'

const StyledSection = styled(View)`
  padding-bottom: 40px;
`

const StyledMaxBalance = styled(Row)`
  justify-content: flex-end;
  padding-top: 8px;
`

const LpStakeForm = ({
  lpStakeReturn,
}: {
  lpStakeReturn: UseLpStakeReturn
}): ReactElement => {
  const { isMobileWidth } = useLayout()
  const { getTokenBalance } = useMyBalance()
  const {
    lpContract,
    fee,
    lpTokenAmount,
    setLpTokenAmount,
    lpTokenAmountErrMsg,
  } = lpStakeReturn

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
              value={getTokenBalance(lpContract)}
              onClick={(value): void => {
                setLpTokenAmount(UTIL.demicrofy(value) as LP)
              }}
            />
          </StyledMaxBalance>
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

export default LpStakeForm
