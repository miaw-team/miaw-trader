import { ReactElement, useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'
import _ from 'lodash'

import { COLOR, STYLE, UTIL } from 'consts'
import {
  LpofLpType,
  RoutePath,
  uLP,
  Token,
  TradeTypeEnum,
  LpProvideTypeEnum,
} from 'types'

import { FormImage, View, Row, Card, FormText, Button } from 'components'

import useRoute from 'hooks/common/useRoute'
import useNetwork from 'hooks/common/useNetwork'
import usePool from 'hooks/query/pair/usePool'
import useMyBalance from 'hooks/common/useMyBalance'
import { LpLpSimulation } from 'logics/lpSimulator'
import useLayout from 'hooks/common/useLayout'

const StyledContainer = styled(View)``

const StyledLpListBox = styled(View)`
  display: grid;
  row-gap: 20px;
  grid-template-rows: max-content;
`

const StyledItem = styled(Card)<{ selected: boolean }>`
  ${STYLE.clickable}
  position:relative;
  border: 1px solid
    ${({ selected }): string =>
      selected ? COLOR.primary._400 : COLOR.gray._300};
`

const StyledItemTiker = styled(View)`
  position: absolute;
  top: -10px;
  left: 20px;
  background-color: ${COLOR.white};
  padding: 5px 10px;
  border: 1px solid ${COLOR.primary._400};
  border-radius: 8px;
`

const StyledLpBox = styled(View)`
  padding: 10px;
  background-color: ${COLOR.gray._100};
  border-radius: 8px;
`

const StyledLogo = styled(FormImage)`
  width: 20px;
  height: 20px;
`

const StyledConvertedBalBox = styled(Row)`
  @media ${STYLE.media.mobile} {
    flex-direction: column;
  }
`

const LpOfLpItem = ({
  item,
  selected,
  onClickItem,
}: {
  item: LpofLpType
  selected: boolean
  onClickItem: () => void
}): ReactElement => {
  const { push } = useRoute()

  const [convertedBalances, setConvertedBalances] =
    useState<{ [symbol: string]: Token }>()

  const { poolInfo } = usePool({
    pairContract: item.lpOfLp_Pair,
    token_0_ContractOrDenom: item.token_0_Contract,
  })
  const { poolInfo: poolInfoOfToken_0 } = usePool({
    pairContract: item.token_0_Pair,
    token_0_ContractOrDenom: item.token_0_Combined[0],
  })
  const { poolInfo: poolInfoOfToken_1 } = usePool({
    pairContract: item.token_1_Pair,
    token_0_ContractOrDenom: item.token_1_Combined[0],
  })

  const { isMobileWidth } = useLayout()
  const { getTokenBalance } = useMyBalance()
  const { getSymbolByContractOrDenom } = useNetwork()

  const myLpOfLp = getTokenBalance(item.lpOfLp_Lp)

  useEffect(() => {
    if (
      +poolInfo.totalShare > 0 &&
      +poolInfoOfToken_0.totalShare > 0 &&
      +poolInfoOfToken_1.totalShare > 0
    ) {
      if (UTIL.toBn(myLpOfLp).gt(0)) {
        const { token_0_Amount = '0' as Token, token_1_Amount = '0' as Token } =
          LpLpSimulation({
            poolInfo,
            ulp: myLpOfLp as uLP,
            userLpBalance: myLpOfLp as uLP,
          })

        const {
          token_0_Amount: token_0_0_Amount = '0' as Token,
          token_1_Amount: token_0_1_Amount = '0' as Token,
        } = LpLpSimulation({
          poolInfo: poolInfoOfToken_0,
          ulp: UTIL.microfy(token_0_Amount) as uLP,
          userLpBalance: UTIL.microfy(token_0_Amount) as uLP,
        })

        const {
          token_0_Amount: token_1_0_Amount = '0' as Token,
          token_1_Amount: token_1_1_Amount = '0' as Token,
        } = LpLpSimulation({
          poolInfo: poolInfoOfToken_1,
          ulp: UTIL.microfy(token_1_Amount) as uLP,
          userLpBalance: UTIL.microfy(token_1_Amount) as uLP,
        })

        const convertedAmountList = [
          {
            symbol: getSymbolByContractOrDenom(item.token_0_Combined[0]),
            amount: token_0_0_Amount,
          },
          {
            symbol: getSymbolByContractOrDenom(item.token_0_Combined[1]),
            amount: token_0_1_Amount,
          },
          {
            symbol: getSymbolByContractOrDenom(item.token_1_Combined[0]),
            amount: token_1_0_Amount,
          },
          {
            symbol: getSymbolByContractOrDenom(item.token_1_Combined[1]),
            amount: token_1_1_Amount,
          },
        ]

        const sumList: { [symbol: string]: Token } = {}
        _.forEach(convertedAmountList, (item) => {
          if (sumList[item.symbol]) {
            sumList[item.symbol] = UTIL.toBn(sumList[item.symbol])
              .plus(item.amount)
              .toString(10) as Token
          } else {
            sumList[item.symbol] = item.amount
          }
        })

        setConvertedBalances(sumList)
      }
    }
    return (): void => {
      setConvertedBalances(undefined)
    }
  }, [poolInfo, poolInfoOfToken_0, poolInfoOfToken_1, myLpOfLp])

  const ConvertedBal = useCallback((): ReactElement => {
    let index = 0
    const size = _.size(convertedBalances)
    return (
      <>
        {_.map(convertedBalances, (val, symbol) => {
          index++
          return (
            <FormText
              key={`convertedBalances-${symbol}`}
              fontType="R16"
              style={{ paddingRight: 5 }}
            >
              {`${UTIL.formatAmount(UTIL.microfy(val))}${symbol} ${
                index < size ? '+' : ''
              }`}
            </FormText>
          )
        })}
      </>
    )
  }, [convertedBalances])

  return (
    <StyledItem selected={selected} onClick={onClickItem}>
      <StyledItemTiker>
        <FormText
          fontType="B16"
          color={COLOR.primary._400}
          style={{ lineHeight: 1 }}
        >
          {item.lpOfLp_LpTicker}
        </FormText>
      </StyledItemTiker>
      <StyledLpBox style={{ marginBottom: 10 }}>
        <Row style={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Row style={{ alignItems: 'center' }}>
            {false === isMobileWidth && (
              <>
                <StyledLogo src={item.token_0_LogoList[0]} />
                <StyledLogo src={item.token_0_LogoList[1]} />
              </>
            )}
            <FormText fontType="B20" style={{ paddingLeft: 5 }}>
              {item.token_0_Symbol}
            </FormText>
          </Row>
          {item.token_0_ProvideSymbol && (
            <Button
              style={{ width: 100, height: 26 }}
              onClick={(e): void => {
                push(RoutePath.home, {
                  symbol: item.token_0_ProvideSymbol || '',
                  tradeType: TradeTypeEnum.buy,
                  lpType: LpProvideTypeEnum.provide,
                })
                e.stopPropagation()
              }}
            >
              Provide
            </Button>
          )}
        </Row>
        <View>
          <FormText fontType="R16">
            {`- PoolSize : ${UTIL.formatAmount(poolInfo.token_0_PoolSize)} LP`}
          </FormText>
        </View>
      </StyledLpBox>
      <StyledLpBox>
        <Row style={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Row style={{ alignItems: 'center' }}>
            {false === isMobileWidth && (
              <>
                <StyledLogo src={item.token_1_LogoList[0]} />
                <StyledLogo src={item.token_1_LogoList[1]} />
              </>
            )}
            <FormText fontType="B20" style={{ paddingLeft: 5 }}>
              {item.token_1_Symbol}
            </FormText>
          </Row>
          {item.token_1_ProvideSymbol && (
            <Button
              style={{ width: 100, height: 26 }}
              onClick={(e): void => {
                push(RoutePath.home, {
                  symbol: item.token_1_ProvideSymbol || '',
                  tradeType: TradeTypeEnum.buy,
                  lpType: LpProvideTypeEnum.provide,
                })
                e.stopPropagation()
              }}
            >
              Provide
            </Button>
          )}
        </Row>
        <View>
          <FormText fontType="R16">
            {`- PoolSize : ${UTIL.formatAmount(poolInfo.token_1_PoolSize)} LP`}
          </FormText>
        </View>
      </StyledLpBox>
      {UTIL.toBn(myLpOfLp).gt(0) && (
        <View>
          <FormText fontType="B20" style={{ paddingLeft: 5 }}>
            {`My Lp : ${UTIL.formatAmount(myLpOfLp)} ${item.lpOfLp_LpTicker}`}
          </FormText>
          <StyledConvertedBalBox>
            <FormText fontType="R16" style={{ paddingRight: 5 }}>
              {'≒ ('}
            </FormText>
            <ConvertedBal />
            <FormText fontType="R16">{')'}</FormText>
          </StyledConvertedBalBox>
        </View>
      )}
    </StyledItem>
  )
}

const LpOfLpList = ({
  lpOfLpList,
}: {
  lpOfLpList: LpofLpType[]
}): ReactElement => {
  const { routeParams, insertRouteParam } = useRoute<RoutePath.lpTower>()
  const lpOfLpIndex = routeParams?.lpOfLpIndex || '0'

  const onClickItem = ({ index }: { index: number }): void => {
    insertRouteParam('lpOfLpIndex', `${index}`)
  }

  return (
    <StyledContainer>
      <View style={{ height: 36, alignItems: 'center' }}>
        <FormText fontType="B24">LP Combination list</FormText>
      </View>
      <StyledLpListBox>
        {_.map(lpOfLpList, (item, index) => (
          <LpOfLpItem
            key={`lpOfLpList-${index}`}
            item={item}
            onClickItem={(): void => onClickItem({ index })}
            selected={index === +lpOfLpIndex}
          />
        ))}
      </StyledLpListBox>
    </StyledContainer>
  )
}

export default LpOfLpList
