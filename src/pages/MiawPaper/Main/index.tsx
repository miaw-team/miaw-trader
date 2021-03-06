import { ReactElement } from 'react'
import styled from 'styled-components'
import catFootprintPng from 'images/cat_footprint.png'
import QrCode from 'qrcode.react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { toast } from 'react-toastify'

import { STYLE, WHITELIST, COLOR } from 'consts'

import { View, Card, FormText, LinkA } from 'components'
import { IconSquare, IconSquareCheck } from '@tabler/icons'

const StyledContainer = styled(View)`
  ${STYLE.setMediaWidth()}
  @media ${STYLE.media.tablet} {
    padding: 0 20px;
  }
`

const StyledCard = styled(Card)`
  background-image: url(${catFootprintPng});
  background-size: cover;
`

const StyledSection = styled(View)`
  margin-bottom: 20px;
`

const StyledMainTitle = styled(FormText)``

const StyledSubTitle = styled(FormText)``
const StyledDesc = styled(FormText)`
  flex-direction: row;
  align-items: center;
  white-space: pre-wrap;
  word-break: break-all;
  background-color: ${COLOR.white};
  width: fit-content;
  padding: 0 5px;
`

const Main = (): ReactElement => {
  return (
    <StyledContainer>
      <StyledMainTitle fontType="B32">Miaw paper</StyledMainTitle>
      <StyledCard>
        <StyledSection>
          <StyledSubTitle fontType="B24">What the MIAW</StyledSubTitle>
          <StyledDesc>
            <LinkA link="https://github.com/miaw-team">
              <FormText fontType={'R18'} color={COLOR.primary._400}>
                - Open source project
              </FormText>
            </LinkA>
          </StyledDesc>
          <StyledDesc>
            <LinkA link="https://github.com/miaw-team/miaw-trader">
              <FormText fontType={'R18'} color={COLOR.primary._400}>
                * miaw-trader scource code
              </FormText>
            </LinkA>
          </StyledDesc>
          <StyledDesc>
            <LinkA link="https://github.com/miaw-team/miaw-lp-staking">
              <FormText fontType={'R18'} color={COLOR.primary._400}>
                * lp staking contract scource code
              </FormText>
            </LinkA>
          </StyledDesc>
          <StyledDesc>
            - Token,Lp,Pair contracts are based on The Terraswap factory
          </StyledDesc>
          <StyledDesc>- MIAW was made by a dev who loves the Terra</StyledDesc>
        </StyledSection>

        <StyledSection>
          <StyledSubTitle fontType="B24">
            Token Distribution plan for MIAW V1
          </StyledSubTitle>
          <StyledDesc fontType="B20">100M Total supply</StyledDesc>
          <StyledDesc>
            {'- 15% LP Staking reward. 5years, 5M>4M>3M>2M>1M'}
          </StyledDesc>
          <StyledDesc>{'- 11% Community funds'}</StyledDesc>
          <StyledDesc>{'- 3% Lp Supply'}</StyledDesc>
          <StyledDesc>{'- 1% Team'}</StyledDesc>
          <StyledDesc>{'- 70% burned'}</StyledDesc>
        </StyledSection>

        <StyledSection>
          <StyledSubTitle fontType="B24">Roadmap for MIAW V1</StyledSubTitle>
          <StyledDesc>
            <IconSquareCheck color={COLOR.primary._600} /> SayMiaw
          </StyledDesc>
          <StyledDesc>
            <IconSquareCheck color={COLOR.primary._600} /> LpTower
          </StyledDesc>
          <StyledDesc>
            <IconSquareCheck color={COLOR.primary._600} /> LpStaking
          </StyledDesc>
          <StyledDesc>
            <IconSquareCheck color={COLOR.primary._600} /> Impermanent gain/loss
            chart
          </StyledDesc>
          <StyledDesc>
            <IconSquareCheck color={COLOR.primary._600} /> Limit order
          </StyledDesc>
          <StyledDesc>
            <IconSquare color={COLOR.gray._900} /> Any interesting ideas
          </StyledDesc>
        </StyledSection>

        <StyledSection>
          <StyledSubTitle fontType="B24">Keeping token prices</StyledSubTitle>
          <StyledDesc fontType="B18">1. Say Miaw</StyledDesc>
          <StyledDesc>
            {'-> Burn MIAW through SayMiaw with various events'}
          </StyledDesc>
          <StyledDesc fontType="B18">2. Limit order</StyledDesc>
          <StyledDesc>
            {'-> Token will be used for the limit order fee '}
          </StyledDesc>
        </StyledSection>

        <StyledSection>
          <StyledSubTitle fontType="B24">Need support?</StyledSubTitle>
          <StyledDesc>
            <LinkA link="https://discord.gg/W4HkFYq4AE">
              <FormText fontType={'R18'} color={COLOR.primary._400}>
                - Discord
              </FormText>
            </LinkA>
          </StyledDesc>
          <StyledDesc>
            <LinkA link="https://github.com/miaw-cat/miaw-trader/issues">
              <FormText fontType={'R18'} color={COLOR.primary._400}>
                - Github issues
              </FormText>
            </LinkA>
          </StyledDesc>
        </StyledSection>

        <StyledSection>
          <StyledSubTitle fontType="B24">Support Developer</StyledSubTitle>

          <CopyToClipboard
            text={WHITELIST.address.miawDeveloper}
            onCopy={(): void => {
              toast(`Copied address!`, {
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              })
            }}
          >
            <StyledDesc color={COLOR.primary._400}>
              {`- ${WHITELIST.address.miawDeveloper}`}
            </StyledDesc>
          </CopyToClipboard>
          <br />
          <QrCode value={WHITELIST.address.miawDeveloper} size={200} />
        </StyledSection>
      </StyledCard>
    </StyledContainer>
  )
}

export default Main
