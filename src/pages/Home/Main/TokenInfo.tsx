import { ReactElement, useMemo } from 'react'
import styled from 'styled-components'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import {
  IconChartBar,
  IconCircle,
  IconCircleCheck,
  IconCopy,
  IconLayout,
} from '@tabler/icons'
import { toast } from 'react-toastify'
import _ from 'lodash'

import terraswapLogo from 'images/terraswap.svg'
import astroportLogo from 'images/astroport.svg'

import { UTIL, STYLE, COLOR, APIURL, WHITELIST } from 'consts'

import { FormText, Card, FormImage, Row, LinkA, View } from 'components'
import { DexEnum, PairType, TokenDenomEnum, TokenType } from 'types'
import useLayout from 'hooks/common/useLayout'

import { SortedTokenType } from 'hooks/common/home/useTokenList'
import usePool from 'hooks/query/pair/usePool'
import useNetwork from 'hooks/common/useNetwork'

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

const StyledDexDenomItem = styled(Row)<{ selected: boolean }>`
  ${STYLE.clickable}
  border-radius: 8px;
  padding: 3px 10px;
  align-items: center;
  border: 2px solid
    ${({ selected }): string =>
      selected ? COLOR.primary._400 : COLOR.gray._300};
  opacity: ${({ selected }): number => (selected ? 1 : 0.8)};
  margin-right: 10px;
`

const SwapBase = ({
  pairList,
  pairType,
  setSelectedPairToken,
}: {
  pairList: PairType[]
  pairType: PairType
  setSelectedPairToken: React.Dispatch<
    React.SetStateAction<
      | {
          history?: SortedTokenType['history']
          token: TokenType
          pairType: PairType
        }
      | undefined
    >
  >
}): ReactElement => {
  return (
    <View style={{ borderTop: `1px solid gray`, paddingTop: 6, marginTop: 6 }}>
      <FormText fontType="B14">Select Dex / Denom</FormText>
      <Row>
        {_.map(pairList, (x, i) => {
          const dexSrc =
            x.dex === DexEnum.terraswap ? terraswapLogo : astroportLogo
          const denomSrc = WHITELIST.tokenInfo[x.base].logo
          const selected = pairType.pair === x.pair
          return (
            <StyledDexDenomItem
              key={`pairList-${i}`}
              onClick={(): void => {
                setSelectedPairToken((ori) => {
                  if (ori) {
                    return { ...ori, pairType: x }
                  }
                })
              }}
              selected={selected}
            >
              <View style={{ paddingRight: 6 }}>
                {selected ? (
                  <IconCircleCheck color={COLOR.primary._400} />
                ) : (
                  <IconCircle color={COLOR.gray._300} />
                )}
              </View>
              <View>
                <Row style={{ alignItems: 'center' }}>
                  <FormImage src={dexSrc} size={26} />
                  <FormText style={{ padding: '0 4px' }}>/</FormText>
                  <FormImage src={denomSrc} size={30} />
                </Row>
                {x.dex === DexEnum.terraswap && (
                  <View>
                    <FormText fontType="R14">Limit order</FormText>
                  </View>
                )}
              </View>
            </StyledDexDenomItem>
          )
        })}
      </Row>
    </View>
  )
}

const TokenPrice = ({
  history,
  token,
  pairType,
}: {
  history?: SortedTokenType['history']
  token: TokenType
  pairType: PairType
}): ReactElement => {
  const pairContract = pairType.pair
  const tradeBaseContract = WHITELIST.tokenInfo[pairType.base].contractOrDenom
  const { getSymbolByContractOrDenom } = useNetwork()
  const { poolInfo } = usePool({
    pairContract,
    token_0_ContractOrDenom: token.contractOrDenom,
  })

  const token_0_Price = poolInfo?.token_0_Price

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
      <FormText fontType="B20">{`${displayPrice} ${getSymbolByContractOrDenom(
        tradeBaseContract
      )}`}</FormText>
      {tradeBaseContract === TokenDenomEnum.uusd && (
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
  history,
  token,
  pairType,
  setSelectedPairToken,
}: {
  history?: SortedTokenType['history']
  token: TokenType
  pairType: PairType
  setSelectedPairToken: React.Dispatch<
    React.SetStateAction<
      | {
          history?: SortedTokenType['history']
          token: TokenType
          pairType: PairType
        }
      | undefined
    >
  >
}): ReactElement => {
  const { isMobileWidth } = useLayout()
  const pairContract = pairType.pair

  const chartLink = APIURL.getCoinhallLink({ pairContract })
  const dashboardLink = APIURL.getDashboardLink({ pairContract })

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
          <TokenPrice history={history} token={token} pairType={pairType} />
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
      <SwapBase
        pairList={token.pairList}
        pairType={pairType}
        setSelectedPairToken={setSelectedPairToken}
      />
    </StyledContainer>
  )
}

export default TokenInfo
