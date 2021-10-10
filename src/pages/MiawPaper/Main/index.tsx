import { ReactElement } from 'react'
import styled from 'styled-components'
import catFootprintPng from 'images/cat_footprint.png'
import QrCode from 'qrcode.react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { toast } from 'react-toastify'

import { STYLE, WHITELIST, COLOR } from 'consts'

import { View, Card, FormText, LinkA } from 'components'

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
          <StyledDesc>- Rewriting for the next features</StyledDesc>
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
