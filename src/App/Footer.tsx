import { ReactElement } from 'react'
import styled from 'styled-components'
import _ from 'lodash'

import discord from 'images/discord.png'
import twitter from 'images/twitter.png'
import github from 'images/github.png'

import { STYLE, COLOR } from 'consts'
import { LinkA, Row, View } from 'components'
import FormImage from 'components/FormImage'

const StyledImgBox = styled(View)`
  padding: 16px;
  border: 1px solid ${COLOR.gray._300};
  border-radius: 50%;
  box-shadow: 0 3px 10px 0 rgb(66 66 66 / 5%);
  background-color: ${COLOR.gray._800};
  margin: 0 10px;
`

const community = [
  {
    href: 'https://github.com/miaw-cat?tab=repositories',
    src: github,
    alt: 'Github',
  },
  {
    href: 'https://discord.gg/8gJMBzkN',
    src: discord,
    alt: 'Discord',
  },
  {
    href: 'https://twitter.com/miawtrader',
    src: twitter,
    alt: 'Twitter',
  },
]

const StyledViewWidth = styled(View)`
  ${STYLE.setMediaWidth()};
`
const StyledBody = styled(Row)`
  align-items: center;
  justify-content: space-between;
  height: 175px;
  margin-top: 28px;
  opacity: 0.5;

  @media ${STYLE.media.tablet} {
    height: 114px;
    margin-top: 0;
    padding: 0 24px;
  }
`

const Footer = (): ReactElement => {
  return (
    <View>
      <StyledViewWidth>
        <StyledBody>
          <Row>
            {_.map(community, (item, index) => {
              return (
                <LinkA key={`community-${index}`} link={item.href}>
                  <StyledImgBox>
                    <FormImage src={item.src} size={20} />
                  </StyledImgBox>
                </LinkA>
              )
            })}
          </Row>
        </StyledBody>
      </StyledViewWidth>
    </View>
  )
}

export default Footer
