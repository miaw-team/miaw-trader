import { CSSProperties, ReactElement, useEffect } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import { IconX } from '@tabler/icons'
import { useRecoilValue } from 'recoil'

import { STYLE, UTIL, COLOR } from 'consts'

import { View, FormText, LinkFinder, Card, Button, Row } from 'components'
import { UseBurnLeaderBoardReturn } from 'hooks/query/miawToken/useBurnLeaderBoard'
import { PostTxStatus, uToken } from 'types'
import postTxStore from 'store/postTxStore'

const StyledContainer = styled(View)`
  @media ${STYLE.media.tablet} {
    padding: 0 20px;
  }
`
const StyledItemBox = styled(Card)`
  position: relative;
  padding: 5px 20px;
  margin-bottom: 5px;
`

const StyledRankingBadgeCon = styled(View)`
  position: absolute;
  left: -10px;
  top: -10px;
`
const StyledRankingBadgeText = styled(FormText)`
  width: 26px;
  height: 26px;
  border: 1px solid ${COLOR.gray._300};
  border-radius: 50%;
  background: ${COLOR.gray._100};
  align-items: center;
  justify-content: center;
`

const RankingBadge = ({ ranking }: { ranking: number }): ReactElement => {
  const rankStyle: CSSProperties = {}

  if (ranking === 1) {
    rankStyle.backgroundColor = COLOR.gold
    rankStyle.color = COLOR.white
  } else if (ranking === 2) {
    rankStyle.backgroundColor = COLOR.siver
    rankStyle.color = COLOR.white
  } else if (ranking === 3) {
    rankStyle.backgroundColor = COLOR.bronze
    rankStyle.color = COLOR.white
  }

  return (
    <StyledRankingBadgeCon>
      <StyledRankingBadgeText style={rankStyle} fontType="R14">
        {ranking}
      </StyledRankingBadgeText>
    </StyledRankingBadgeCon>
  )
}

const LeaderBoard = ({
  closeModal,
  burnLeaderBoard,
}: {
  closeModal?: () => void
  burnLeaderBoard: UseBurnLeaderBoardReturn
}): ReactElement => {
  const postTxResult = useRecoilValue(postTxStore.postTxResult)

  const { dataList, fetchNextPage, isLast, refetch } = burnLeaderBoard

  useEffect(() => {
    if (postTxResult.status === PostTxStatus.DONE) {
      refetch()
    }
  }, [postTxResult.status])

  return (
    <StyledContainer>
      <Row style={{ paddingBottom: 20, alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          <FormText fontType="B24">Miawer board</FormText>
        </View>
        {closeModal && <IconX onClick={closeModal} size={24} />}
      </Row>
      {_.map(dataList, (item, index) => {
        const ranking = index + 1
        return (
          <StyledItemBox key={`dataList-${index}`}>
            <RankingBadge ranking={ranking} />
            <LinkFinder
              type="address"
              address={item.userAddress}
              title={item.name || UTIL.truncate(item.userAddress, [10, 10])}
            />

            <FormText fontType="B14">{`${UTIL.formatAmount(
              `${item.amount}` as uToken
            )} MIAW`}</FormText>
          </StyledItemBox>
        )
      })}
      {false === isLast && (
        <View style={{ paddingTop: 10 }}>
          <Button onClick={fetchNextPage}>More</Button>
        </View>
      )}
    </StyledContainer>
  )
}

export default LeaderBoard
