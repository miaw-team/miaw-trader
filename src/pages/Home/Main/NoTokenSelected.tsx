import { ReactElement } from 'react'
import styled from 'styled-components'
import Lottie from 'react-lottie'

import animationData from 'images/cat_ball.json'

import { View, FormText, Card } from 'components'

const StyledContainer = styled(Card)`
  align-items: center;
  margin-bottom: 20px;
`
const NoTokenSelected = (): ReactElement => {
  return (
    <StyledContainer>
      <View style={{ width: 300 }}>
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData,
          }}
        />
      </View>
      <FormText fontType="B16">Select a token to trade or provide</FormText>
    </StyledContainer>
  )
}

export default NoTokenSelected
