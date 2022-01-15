import { ReactElement, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { IconList } from '@tabler/icons'

import { STYLE, COLOR } from 'consts'

import { View, Modal, FormText, Row } from 'components'

import { DexEnum, PairType, RoutePath, TokenType } from 'types'

import useRoute from 'hooks/common/useRoute'
import useLayout from 'hooks/common/useLayout'
import useTokenList, { SortedTokenType } from 'hooks/common/home/useTokenList'

import TokenInfo from './TokenInfo'
import Trade from './Trade'
import LpProvide from './LpProvide'
import TokenList from './TokenList'
import NoTokenSelected from './NoTokenSelected'
import TxInfo from './TxInfo'
import Analytics from './Analytics'

const StyledContainer = styled(View)`
  max-width: 100%;
  @media ${STYLE.media.tablet} {
    padding: 0 20px;
  }
`

const StyledTradeBox = styled(View)<{ isLimitOrder: boolean }>`
  display: grid;
  grid-template-columns: ${({ isLimitOrder }): string =>
    isLimitOrder ? '2fr 1fr' : '1fr 1fr'};
  column-gap: 20px;

  @media ${STYLE.media.tablet} {
    grid-template-columns: 1fr;
    row-gap: 20px;
  }
`

const StyledLayout = styled(View)`
  display: grid;
  padding: 20px;
  grid-template-columns: 3fr 1fr;
  column-gap: 20px;

  @media ${STYLE.media.tablet} {
    padding: 0;
    grid-template-columns: 1fr;
  }
`

const StyledTokenInfoBox = styled(View)`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  row-gap: 20px;
`
const StyledTokenListBox = styled(View)``

const Main = (): ReactElement => {
  const { routeParams } = useRoute<RoutePath.home>()
  const tokenSymbol = routeParams?.symbol

  const { isTabletWidth, isMobileWidth } = useLayout()

  const [showList, setShowList] = useState(false)

  const closeModal = (): void => {
    setShowList(false)
  }

  const tokenListReturn = useTokenList()
  const { sortedList } = tokenListReturn

  const selectedToken = useMemo(() => {
    return sortedList.find((x) => x.token.symbol === tokenSymbol)
  }, [sortedList, tokenSymbol])

  const [selectedPairToken, setSelectedPairToken] = useState<{
    history?: SortedTokenType['history']
    token: TokenType
    pairType: PairType
  }>()

  useEffect(() => {
    if (selectedToken?.token) {
      const list = selectedToken.token.pairList
      setSelectedPairToken({ ...selectedToken, pairType: list[0] })
    }
  }, [selectedToken?.token])

  return (
    <StyledContainer>
      {isTabletWidth && (
        <Row
          onClick={(): void => {
            setShowList(true)
          }}
          style={{
            border: `1px solid ${COLOR.gray._800}`,
            width: 'fit-content',
            padding: '3px 8px',
            borderRadius: 8,
            backgroundColor: COLOR.white,
            alignItems: 'center',
            marginBottom: 10,
          }}
        >
          <IconList size={14} />
          <FormText fontType="R14">Show token list</FormText>
        </Row>
      )}
      <StyledLayout>
        <StyledTokenInfoBox>
          {selectedPairToken ? (
            <>
              <TokenInfo
                {...selectedPairToken}
                setSelectedPairToken={setSelectedPairToken}
              />
              <StyledTradeBox
                isLimitOrder={
                  selectedPairToken.pairType.dex === DexEnum.terraswap
                }
              >
                <Trade
                  token={selectedPairToken.token}
                  tradeBase={selectedPairToken.pairType.base}
                  pairContract={selectedPairToken.pairType.pair}
                  dex={selectedPairToken.pairType.dex}
                />
                <LpProvide
                  token={selectedPairToken.token}
                  tradeBase={selectedPairToken.pairType.base}
                  pairContract={selectedPairToken.pairType.pair}
                  lpContract={selectedPairToken.pairType.lp}
                />
              </StyledTradeBox>
              {false === isMobileWidth &&
                selectedPairToken.pairType.dex === DexEnum.terraswap && (
                  <Analytics pairContract={selectedPairToken.pairType.pair} />
                )}
              {selectedPairToken.pairType.dex === DexEnum.terraswap && (
                <TxInfo pairContract={selectedPairToken.pairType.pair} />
              )}
            </>
          ) : (
            <NoTokenSelected />
          )}
        </StyledTokenInfoBox>
        {isTabletWidth ? (
          <Modal isOpen={showList}>
            <TokenList
              closeModal={closeModal}
              tokenListReturn={tokenListReturn}
            />
          </Modal>
        ) : (
          <StyledTokenListBox>
            <TokenList tokenListReturn={tokenListReturn} />
          </StyledTokenListBox>
        )}
      </StyledLayout>
    </StyledContainer>
  )
}

export default Main
