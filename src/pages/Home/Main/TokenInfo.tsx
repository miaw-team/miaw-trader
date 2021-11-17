import { ReactElement, useMemo } from 'react'
import styled from 'styled-components'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { IconChartBar, IconCopy, IconLayout } from '@tabler/icons'
import { toast } from 'react-toastify'

import { UTIL, STYLE, COLOR, APIURL, ASSET } from 'consts'

import { FormText, Card, FormImage, Row, LinkA } from 'components'
import { ContractAddr, TokenDenomEnum } from 'types'
import useLayout from 'hooks/common/useLayout'

import { SortedTokenType } from 'hooks/common/home/useTokenList'
import usePool from 'hooks/query/pair/usePool'

const StyledContainer = styled(Card)``

const StyledSymbolPrice = styled(Row)`
  align-items: center;
`

const StyledNameAddress = styled(Row)`
  align-items: center;
  @media ${STYLE.media.tablet} {
    justify-content: center;
  }
  @media ${STYLE.media.mobile} {
    flex-direction: column;
  }
`

const StyledTokenLogo = styled(Row)`
  align-items: center;
  @media ${STYLE.media.tablet} {
    flex-direction: column;
  }
`

const StyledCopy = styled(Row)`
  ${STYLE.clickable}
`

const StyledLinkBox = styled(Row)`
  @media ${STYLE.media.tablet} {
    justify-content: space-around;
  }
`

const TokenPrice = ({
  selectedToken,
  pairContract,
  tradeBaseDenom,
}: {
  selectedToken: SortedTokenType
  pairContract: ContractAddr
  tradeBaseDenom: TokenDenomEnum
}): ReactElement => {
  const { history } = selectedToken

  const { poolInfo } = usePool({
    pairContract,
    token_0_ContractOrDenom: selectedToken.token.contractOrDenom,
  })

  const { token_0_Price } = poolInfo

  const change1d = useMemo(() => {
    if (history) {
      return history
    }

    return {
      isIncreased: false,
      changePercent: '-',
    }
  }, [history])

  const displayPrice = useMemo(() => {
    const token_0_PriceBn = UTIL.toBn(token_0_Price)
    if (token_0_PriceBn.isLessThan(0.01)) {
      return token_0_PriceBn.toFixed(6)
    }
    return token_0_PriceBn.toFixed(3)
  }, [token_0_Price])

  return (
    <Row style={{ alignItems: 'center', paddingRight: 10 }}>
      <FormText fontType="B20">{`${displayPrice} ${ASSET.symbolOfDenom[tradeBaseDenom]}`}</FormText>
      {tradeBaseDenom === TokenDenomEnum.uusd && (
        <FormText
          fontType="B16"
          color={change1d.isIncreased ? COLOR.success : COLOR.error}
        >
          ({change1d.isIncreased ? '+' : '-'}
          {change1d.changePercent}%)
        </FormText>
      )}
    </Row>
  )
}

const TokenInfo = ({
  selectedToken,
  pairContract,
  tradeBaseDenom,
}: {
  selectedToken: SortedTokenType
  pairContract: ContractAddr
  tradeBaseDenom: TokenDenomEnum
}): ReactElement => {
  const { token } = selectedToken
  const { isMobileWidth } = useLayout()

  const chartLink = pairContract && APIURL.getCoinhallLink({ pairContract })
  const dashboardLink =
    pairContract && APIURL.getDashboardLink({ pairContract })

  return (
    <StyledContainer>
      <StyledTokenLogo>
        <StyledSymbolPrice>
          <Row style={{ alignItems: 'center' }}>
            <FormImage
              src={token.logo}
              size={32}
              style={{ paddingRight: 10 }}
            />
            {false === isMobileWidth && (
              <FormText
                fontType={{ default: 'B32', mobile: 'B24' }}
                style={{ paddingRight: 10 }}
              >
                {token.symbol}
              </FormText>
            )}
          </Row>
          <TokenPrice
            selectedToken={selectedToken}
            pairContract={pairContract}
            tradeBaseDenom={tradeBaseDenom}
          />
        </StyledSymbolPrice>
      </StyledTokenLogo>
      <StyledNameAddress>
        <FormText fontType="R20">{token.name}</FormText>
        <CopyToClipboard
          text={token.contractOrDenom}
          onCopy={(): void => {
            toast(`Copied ${token.symbol} address!`, {
              position: 'top-center',
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            })
          }}
        >
          <StyledCopy style={{ alignItems: 'center' }}>
            <FormText
              fontType={{ default: 'R18', mobile: 'R16' }}
              color={COLOR.gray._400}
            >
              {`(${UTIL.truncate(token.contractOrDenom, [10, 10])}`}
            </FormText>
            <IconCopy size={18} color={COLOR.gray._400} />
            <FormText
              fontType={{ default: 'R18', mobile: 'R16' }}
              color={COLOR.gray._400}
            >
              {')'}
            </FormText>
          </StyledCopy>
        </CopyToClipboard>
      </StyledNameAddress>
      <StyledLinkBox>
        {chartLink && (
          <Row style={{ alignItems: 'center', paddingRight: 10 }}>
            <IconChartBar
              size={14}
              color={COLOR.primary._400}
              style={{ paddingRight: 4 }}
            />
            <LinkA link={chartLink}>
              <FormText fontType={'R18'} color={COLOR.primary._400}>
                {isMobileWidth ? 'Chart' : 'Coinhall Chart'}
              </FormText>
            </LinkA>
          </Row>
        )}
        {dashboardLink && (
          <Row style={{ alignItems: 'center' }}>
            <IconLayout
              size={14}
              color={COLOR.primary._400}
              style={{ paddingRight: 4 }}
            />
            <LinkA link={dashboardLink}>
              <FormText fontType={'R18'} color={COLOR.primary._400}>
                {isMobileWidth ? 'Dashboard' : 'Terra Swap Dashboard'}
              </FormText>
            </LinkA>
          </Row>
        )}
      </StyledLinkBox>
    </StyledContainer>
  )
}

export default TokenInfo
