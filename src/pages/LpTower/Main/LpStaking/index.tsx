import { ReactElement } from 'react'
import styled from 'styled-components'

import { STYLE, COLOR } from 'consts'

import { AuthButton, Card, FormText, SelectTab, View } from 'components'
import useRoute from 'hooks/common/useRoute'
import { RoutePath, LpStakeTypeEnum, LpStakingType } from 'types'

import useLpStake from 'hooks/common/lpStake/useLpStake'
import useLpUnStake from 'hooks/common/lpStake/useLpUnStake'

import LpStakeForm from './LpStakeForm'
import LpUnStakeForm from './LpUnStakeForm'

const StyledContainer = styled(View)`
  padding-top: 36px;
  @media ${STYLE.media.tablet} {
    padding-top: 0;
  }
`

const StyledCard = styled(Card)`
  flex: 1;
`

const SelectedLpStaking = ({
  selectedLpStaking,
}: {
  selectedLpStaking: LpStakingType
}): ReactElement => {
  const { routeParams, insertRouteParam } = useRoute<RoutePath.lpTower>()
  const lpStakeType = routeParams?.lpStakeType || LpStakeTypeEnum.stake

  const lpStakeReturn = useLpStake({
    lpStaking: selectedLpStaking.lpStaking,
    lpContract: selectedLpStaking.lpContract,
  })
  const lpUnStakeReturn = useLpUnStake({
    lpStaking: selectedLpStaking.lpStaking,
  })
  const {
    onClickLpStake,
    invalidForm: invalidStakeForm,
    fee: stakeFee,
    submitErrMsg: stakeSubmitErrMsg,
  } = lpStakeReturn
  const {
    onClickLpUnStake,
    invalidForm: invalidUnStakeForm,
    fee: unStakeFee,
    submitErrMsg: unStakeSubmitErrMsg,
  } = lpUnStakeReturn

  return (
    <StyledCard>
      <SelectTab
        options={[
          { value: LpStakeTypeEnum.stake, label: 'STAKE' },
          { value: LpStakeTypeEnum.unstake, label: 'UNSTAKE' },
        ]}
        onSelect={(value): void => {
          insertRouteParam('lpStakeType', value)
        }}
        selected={lpStakeType}
      />
      {lpStakeType === LpStakeTypeEnum.stake ? (
        <>
          <LpStakeForm lpStakeReturn={lpStakeReturn} />
          <AuthButton
            onClick={onClickLpStake}
            disabled={invalidStakeForm || !stakeFee || !!stakeSubmitErrMsg}
          >
            STAKE
          </AuthButton>
          {stakeSubmitErrMsg && (
            <FormText fontType={'R14'} color={COLOR.error}>
              {stakeSubmitErrMsg}
            </FormText>
          )}
        </>
      ) : (
        <>
          <LpUnStakeForm lpUnStakeReturn={lpUnStakeReturn} />
          <AuthButton
            onClick={onClickLpUnStake}
            disabled={
              invalidUnStakeForm || !unStakeFee || !!unStakeSubmitErrMsg
            }
          >
            UNSTAKE
          </AuthButton>
          {unStakeSubmitErrMsg && (
            <FormText fontType={'R14'} color={COLOR.error}>
              {unStakeSubmitErrMsg}
            </FormText>
          )}
        </>
      )}
    </StyledCard>
  )
}

const LpStaking = ({
  lpStakingList,
}: {
  lpStakingList: LpStakingType[]
}): ReactElement => {
  const { routeParams } = useRoute<RoutePath.lpTower>()
  const lpStakingIndex = routeParams?.lpStakingIndex || '0'
  const selectedLpStaking: LpStakingType | undefined =
    lpStakingList[+lpStakingIndex]

  return (
    <StyledContainer>
      {selectedLpStaking && (
        <SelectedLpStaking selectedLpStaking={selectedLpStaking} />
      )}
    </StyledContainer>
  )
}

export default LpStaking
