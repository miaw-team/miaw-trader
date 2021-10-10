import { ReactElement } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import { IconMoodCry } from '@tabler/icons'

import { COLOR } from 'consts'

import View from './View'
import Card from './Card'
import Hr from './Hr'
import FormText from './FormText'
import Button from './Button'
import { RoutePath } from 'types'
import useRoute from 'hooks/common/useRoute'

const StyledContainer = styled(View)``

const StyledHeader = styled(Card)`
  padding: 40px;
  margin-bottom: 24px;
`

const StyledDetails = styled(Card)`
  padding: 40px;
  align-items: flex-start;
`

const ErrorView = ({ error }: { error?: any }): ReactElement => {
  const { push } = useRoute()
  return (
    <>
      {_.some(error) && (
        <StyledContainer>
          <StyledHeader>
            <IconMoodCry size={36} color={COLOR.gray._400} />
            <FormText
              fontType="B16"
              color={COLOR.gray._300}
              style={{ paddingTop: 8, paddingBottom: 24 }}
            >
              This page does not exist.
            </FormText>
            <Button
              theme="outline"
              style={{ width: 250 }}
              onClick={(): void => {
                push(RoutePath.home)
              }}
            >
              Return to main page
            </Button>
          </StyledHeader>

          <StyledDetails>
            <FormText
              fontType="B16"
              color={COLOR.gray._50}
              style={{ paddingBottom: 16 }}
            >
              Details
            </FormText>
            <Hr type="dashed" />
            <FormText
              fontType="R14"
              style={{ paddingTop: 16, whiteSpace: 'pre-wrap' }}
            >
              {JSON.stringify(error, null, 2)}
            </FormText>
          </StyledDetails>
        </StyledContainer>
      )}
    </>
  )
}

export default ErrorView
