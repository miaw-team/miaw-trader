import { ReactElement } from 'react'
import styled from 'styled-components'

import { STYLE, COLOR } from 'consts'

import { AuthButton, Card, FormText, SelectTab, View } from 'components'
import useRoute from 'hooks/common/useRoute'

import { LpProvideTypeEnum, RoutePath, LpofLpType } from 'types'

import useLpProvide from 'hooks/common/lpProvide/useLpProvide'
import useLpWithdraw from 'hooks/common/lpProvide/useLpWithdraw'

import LpProvideForm from './LpProvideForm'
import LpWithdrawForm from './LpWithdrawForm'

const StyledContainer = styled(View)`
  padding-top: 36px;
  @media ${STYLE.media.tablet} {
    padding-top: 0;
  }
`

const StyledCard = styled(Card)`
  flex: 1;
`

const SelectedLpProvide = ({
  selectedLpOfLp,
}: {
  selectedLpOfLp: LpofLpType
}): ReactElement => {
  const { insertRouteParam, routeParams } = useRoute<RoutePath.lpTower>()
  const type = routeParams?.lpProvideType || LpProvideTypeEnum.provide

  const token_0_ContractOrDenom = selectedLpOfLp.token_0_Contract
  const token_1_ContractOrDenom = selectedLpOfLp.token_1_Contract
  const token_0_Symbol = selectedLpOfLp.token_0_Symbol
  const token_1_Symbol = selectedLpOfLp.token_1_Symbol

  const pairContract = selectedLpOfLp.lpOfLp_Pair
  const lpContract = selectedLpOfLp.lpOfLp_Lp

  const lpProvideReturn = useLpProvide({
    pairContract,
    token_0_ContractOrDenom,
    token_1_ContractOrDenom,
    token_0_Symbol,
    token_1_Symbol,
  })
  const lpWithdrawReturn = useLpWithdraw({
    pairContract,
    lpContract,
    token_0_ContractOrDenom,
    token_1_ContractOrDenom,
    token_0_Symbol,
    token_1_Symbol,
  })
  const {
    onClickLpProvide,
    invalidForm: invalidStakeForm,
    fee: provideFee,
    submitErrMsg: provideSubmitErrMsg,
  } = lpProvideReturn
  const {
    onClickLpWithdraw,
    invalidForm: invalidUnStakeForm,
    fee: withdrawFee,
    submitErrMsg: withdrawSubmitErrMsg,
  } = lpWithdrawReturn

  return (
    <StyledCard>
      <SelectTab
        options={[
          { value: LpProvideTypeEnum.provide, label: 'PROVIDE' },
          { value: LpProvideTypeEnum.withdraw, label: 'WITHDRAW' },
        ]}
        onSelect={(value): void => {
          insertRouteParam('lpProvideType', value)
        }}
        selected={type}
      />
      {type === LpProvideTypeEnum.provide ? (
        <>
          <LpProvideForm
            lpProvideReturn={lpProvideReturn}
            selectedLpOfLp={selectedLpOfLp}
          />
          {provideSubmitErrMsg && (
            <FormText fontType={'R14'} color={COLOR.error}>
              {provideSubmitErrMsg}
            </FormText>
          )}
          <AuthButton
            onClick={onClickLpProvide}
            disabled={invalidStakeForm || !provideFee || !!provideSubmitErrMsg}
          >
            PROVIDE
          </AuthButton>
        </>
      ) : (
        <>
          <LpWithdrawForm lpWithdrawReturn={lpWithdrawReturn} />
          {withdrawSubmitErrMsg && (
            <FormText fontType={'R14'} color={COLOR.error}>
              {withdrawSubmitErrMsg}
            </FormText>
          )}
          <AuthButton
            onClick={onClickLpWithdraw}
            disabled={
              invalidUnStakeForm || !withdrawFee || !!withdrawSubmitErrMsg
            }
          >
            WITHDRAW
          </AuthButton>
        </>
      )}
    </StyledCard>
  )
}

const LpProvide = ({
  lpOfLpList,
}: {
  lpOfLpList: LpofLpType[]
}): ReactElement => {
  const { routeParams } = useRoute<RoutePath.lpTower>()
  const lpOfLpIndex = routeParams?.lpOfLpIndex || '0'

  const selectedLpOfLp: LpofLpType | undefined = lpOfLpList[+lpOfLpIndex]

  return (
    <StyledContainer>
      {selectedLpOfLp && <SelectedLpProvide selectedLpOfLp={selectedLpOfLp} />}
    </StyledContainer>
  )
}

export default LpProvide
