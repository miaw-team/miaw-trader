import { ReactElement } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import { useRecoilValue } from 'recoil'
import { IconUrgent } from '@tabler/icons'
import animationData from 'images/cat_idle.json'
import Lottie from 'react-lottie'

import { COLOR, STYLE } from 'consts'

import { Hr, LinkFinder } from 'components'
import postTxStore from 'store/postTxStore'
import { PostTxStatus } from 'types'

import View from '../../components/View'
import Loading from '../../components/Loading'
import FormText from '../../components/FormText'
import Button from '../../components/Button'
import Card from '../../components/Card'

const StyledContainer = styled(View)`
  height: 100%;
  @media ${STYLE.media.tablet} {
    justify-content: flex-end;
  }
`

const StyledCard = styled(Card)`
  ${STYLE.setMediaWidth('sm')}
  margin: auto;
  background-color: ${COLOR.gray._900};
  padding: 20px 30px;
  border-radius: 8px;
  @media ${STYLE.media.tablet} {
    border-radius: 8px 8px 0 0;
    padding-bottom: 50px;
  }
`

const StyledInfoBox = styled(View)`
  background-color: ${COLOR.gray._800};
  align-items: center;
  padding: 10px;
  border-radius: 8px;
`

const StyledTextBox = styled(View)`
  align-items: center;
  margin-bottom: 10px;
`

const StyledIconBox = styled(View)`
  padding-bottom: 8px;
  align-items: center;
`

const StatusText = ({ children }: { children: string }): ReactElement => {
  return (
    <FormText
      fontType="B20"
      color={COLOR.gray._50}
      style={{
        wordBreak: 'break-all',
        whiteSpace: 'pre-wrap',
      }}
    >
      {children}
    </FormText>
  )
}

const PostTxResult = ({
  onClickStop,
}: {
  onClickStop: () => void
}): ReactElement => {
  const postTxResult = useRecoilValue(postTxStore.postTxResult)

  return (
    <StyledContainer>
      <StyledCard>
        <View>
          {postTxResult.status === PostTxStatus.ERROR ? (
            <StyledIconBox>
              <IconUrgent size={60} color={COLOR.error} />
            </StyledIconBox>
          ) : postTxResult.status === PostTxStatus.DONE ? (
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData,
              }}
              height={160}
              width={160}
            />
          ) : (
            <Loading size={100} />
          )}
          {postTxResult.status === PostTxStatus.POST && (
            <>
              <StyledTextBox>
                <StatusText>Wait For Terra Station...</StatusText>
              </StyledTextBox>
              <Button onClick={onClickStop}>Stop</Button>
            </>
          )}
          {postTxResult.status === PostTxStatus.BROADCAST && (
            <>
              <StyledTextBox>
                <StatusText>Broadcasting transaction...</StatusText>
              </StyledTextBox>
              <StyledInfoBox>
                <FormText fontType="R14" color={COLOR.gray._300}>
                  This transaction is in process.
                </FormText>
                <View style={{ width: '100%', padding: '10px 0' }}>
                  <Hr />
                </View>
                <LinkFinder
                  address={postTxResult.value.result.txhash}
                  type="tx"
                />
              </StyledInfoBox>
            </>
          )}
          {postTxResult.status === PostTxStatus.DONE && (
            <>
              <StyledTextBox>
                <StatusText>Done</StatusText>
                <LinkFinder address={postTxResult.value.txhash} type="tx" />
              </StyledTextBox>
              <Button onClick={onClickStop}>Close</Button>
            </>
          )}

          {postTxResult.status === PostTxStatus.ERROR && (
            <>
              <StyledTextBox>
                <StatusText>{_.toString(postTxResult.error)}</StatusText>
              </StyledTextBox>
              <Button onClick={onClickStop}>Close</Button>
            </>
          )}
        </View>
      </StyledCard>
    </StyledContainer>
  )
}

export default PostTxResult
