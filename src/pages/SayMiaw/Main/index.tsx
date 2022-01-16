import { ReactElement, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useRecoilValue } from 'recoil'

import { STYLE, COLOR } from 'consts'

import { View, FormText, Modal, Row } from 'components'
import useSayMiaw from 'hooks/common/sayMiaw/useSayMiaw'
import useNetwork from 'hooks/common/useNetwork'
import useLayout from 'hooks/common/useLayout'

import postTxStore from 'store/postTxStore'

import { PostTxStatus, TokenType } from 'types'

import TopInfo from './TopInfo'
import LeaderBoard from './LeaderBoard'
import InputMemo from './InputMemo'
import SetName from './SetName'
import MemoList from './MemoList'
import { IconTrophy } from '@tabler/icons'
import useBurnLeaderBoard from 'hooks/query/miawToken/useBurnLeaderBoard'

const StyledContainer = styled(View)`
  ${STYLE.setMediaWidth('lg')}
`

const StyledContentsLayout = styled(View)`
  display: grid;
  grid-template-columns: 1fr 4fr;
  column-gap: 20px;
  padding: 0 20px;

  @media ${STYLE.media.tablet} {
    grid-template-columns: 1fr;
  }
`

const Contents = ({ miawToken }: { miawToken: TokenType }): ReactElement => {
  const [showRanking, setShowRanking] = useState(false)
  const postTxResult = useRecoilValue(postTxStore.postTxResult)
  const sayMiawReturn = useSayMiaw({ miawToken })
  const { isTabletWidth } = useLayout()
  const { miawBurnHistory, burnReturn } = sayMiawReturn
  const burnLeaderBoard = useBurnLeaderBoard()

  const closeModal = (): void => {
    setShowRanking(false)
  }
  useEffect(() => {
    if (postTxResult.status === PostTxStatus.DONE) {
      setTimeout(() => {
        miawBurnHistory.refetch()
        burnReturn.setMemo('')
        burnLeaderBoard.refetch()
      }, 500)
    }
  }, [postTxResult.status])

  return (
    <StyledContainer>
      <StyledContentsLayout>
        {isTabletWidth ? (
          <>
            <Row
              onClick={(): void => {
                setShowRanking(true)
              }}
              style={{
                border: `1px solid ${COLOR.gray._800}`,
                width: 'fit-content',
                padding: '3px 8px',
                borderRadius: 8,
                backgroundColor: COLOR.white,
                alignItems: 'center',
              }}
            >
              <IconTrophy size={14} />
              <FormText fontType="R14">Show ranking</FormText>
            </Row>
            <Modal isOpen={showRanking}>
              <View style={{ backgroundColor: COLOR.white, padding: '20px 0' }}>
                <LeaderBoard
                  closeModal={closeModal}
                  burnLeaderBoard={burnLeaderBoard}
                />
              </View>
            </Modal>
          </>
        ) : (
          <LeaderBoard burnLeaderBoard={burnLeaderBoard} />
        )}
        <View style={{ flex: 1 }}>
          <TopInfo miawToken={miawToken} />
          <SetName miawToken={miawToken} />
          <InputMemo sayMiawReturn={sayMiawReturn} />
          <MemoList sayMiawReturn={sayMiawReturn} />
        </View>
      </StyledContentsLayout>
    </StyledContainer>
  )
}

const Main = (): ReactElement => {
  const { miawToken } = useNetwork()
  return miawToken ? (
    <Contents miawToken={miawToken} />
  ) : (
    <StyledContainer>
      <FormText fontType="B32">{`MIAW token is not ready ${STYLE.CAT_EMOJI}`}</FormText>
    </StyledContainer>
  )
}
export default Main
