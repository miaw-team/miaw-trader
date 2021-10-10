import { ReactElement } from 'react'
import styled from 'styled-components'

import { STYLE } from 'consts'

import { View } from 'components'

import LpStakingList from './LpStakingList'
import LpStaking from './LpStaking'
import LpOfLpList from './LpOfLpList'
import LpProvide from './LpProvide'
import useNetwork from 'hooks/common/useNetwork'

const StyledContainer = styled(View)`
  ${STYLE.setMediaWidth('lg')}
  @media ${STYLE.media.tablet} {
    padding: 0 20px;
  }
`

const StyledStakeLayout = styled(View)`
  display: grid;
  padding: 20px;
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;

  @media ${STYLE.media.tablet} {
    padding: 0;
    grid-template-columns: 1fr;
    row-gap: 20px;
  }
`

const StyledProvideLayout = styled(View)`
  display: grid;
  padding: 20px;
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;

  @media ${STYLE.media.tablet} {
    padding: 0;
    grid-template-columns: 1fr;
    row-gap: 20px;
  }
`

const Main = (): ReactElement => {
  const { lpStakingList, lpOfLpList } = useNetwork()
  return (
    <StyledContainer>
      {lpStakingList.length > 0 && (
        <StyledStakeLayout>
          <LpStakingList lpStakingList={lpStakingList} />
          <LpStaking lpStakingList={lpStakingList} />
        </StyledStakeLayout>
      )}
      {lpOfLpList.length > 0 && (
        <StyledProvideLayout>
          <LpOfLpList lpOfLpList={lpOfLpList} />
          <LpProvide lpOfLpList={lpOfLpList} />
        </StyledProvideLayout>
      )}
    </StyledContainer>
  )
}

export default Main
