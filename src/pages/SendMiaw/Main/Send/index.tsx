import { ReactElement } from 'react'
import styled from 'styled-components'

import { STYLE } from 'consts'

import { Card, AuthButton } from 'components'

import { TokenType } from 'types'

import useSend from 'hooks/common/useSend'

import SendForm from './SendForm'

const StyledCard = styled(Card)`
  flex: 1;
  @media ${STYLE.media.tablet} {
  }
`

const Send = ({ token }: { token: TokenType }): ReactElement => {
  const sendProps = useSend({ token })
  const { onClickSend, invalidForm, fee } = sendProps
  return (
    <>
      <StyledCard>
        <SendForm sendProps={sendProps} token={token} />
        <AuthButton onClick={onClickSend} disabled={invalidForm || !fee}>
          Send
        </AuthButton>
      </StyledCard>
    </>
  )
}

export default Send
