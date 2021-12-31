import { ReactElement } from 'react'
import styled from 'styled-components'
import _ from 'lodash'

import { COLOR, STYLE, UTIL } from 'consts'
import {
  LpProvideTypeEnum,
  LpStakingType,
  RoutePath,
  Token,
  TradeTypeEnum,
  uLP,
  uToken,
} from 'types'

import { FormImage, View, Row, Card, FormText, Button } from 'components'

import useRoute from 'hooks/common/useRoute'
import useNetwork from 'hooks/common/useNetwork'
import useLayout from 'hooks/common/useLayout'
import useLpStakingInfo from 'hooks/common/lpTower/useLpStakingInfo'
import useLpClaim from 'hooks/common/lpClaim/useLpClaim'
import useMyBalance from 'hooks/common/useMyBalance'
import { LpLpSimulation } from 'logics/lpSimulator'
import { ExtractPoolResponseType } from 'hooks/query/pair/usePool'

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

const ConvertedValue = ({
  poolInfo,
  lpToken,
  tokenSymbol,
  denomSymbol,
}: {
  poolInfo: ExtractPoolResponseType
  lpToken: uToken
  tokenSymbol: string
  denomSymbol: string
}): ReactElement => {
  const { token_0_Amount = '0' as Token, token_1_Amount = '0' as Token } =
    LpLpSimulation({
      poolInfo,
      ulp: lpToken as uLP,
      userLpBalance: lpToken as uLP,
    })

  return (
    <StyledConvertedBalBox>
      <FormText fontType="R16" style={{ paddingRight: 5 }}>
        {`≒ ( ${UTIL.formatAmount(
          UTIL.microfy(token_0_Amount)
        )}${tokenSymbol} + ${UTIL.formatAmount(
          UTIL.microfy(token_1_Amount)
        )}${denomSymbol} ) `}
      </FormText>
    </StyledConvertedBalBox>
  )
}

const LpStakingItem = ({
  item,
  selected,
  onClickItem,
}: {
  item: LpStakingType
  selected: boolean
  onClickItem: () => void
}): ReactElement => {
  const { push } = useRoute()
  const { isMobileWidth } = useLayout()
  const { apr, totalLpStaked, poolInfo } = useLpStakingInfo({
    selectedLpStaking: item,
  })

  const { onClickClaim, stakerInfoReturn, submitErrMsg } = useLpClaim({ item })
  const { getSymbolByContractOrDenom } = useNetwork()

  const tokenSymbol = getSymbolByContractOrDenom(item.tokenContract)
  const denomSymbol = getSymbolByContractOrDenom(item.nativeDenom)

  const { balance: myLpBalance } = useMyBalance({
    contractOrDenom: item.lpContract,
  })

  const myLpStakedBalance =
    stakerInfoReturn.stakerInfo?.bond_amount || ('0' as uToken)
  const myLpReward = (stakerInfoReturn.stakerInfo?.pending_reward || '0') as uLP
  return (
    <StyledItem
      selected={selected}
      onClick={(): void => {
        onClickItem()
        stakerInfoReturn.refetch()
      }}
    >
      <StyledLpBox style={{ marginBottom: 10 }}>
        <Row style={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Row style={{ alignItems: 'center' }}>
            {false === isMobileWidth && (
              <>
                <StyledLogo src={item.tokenLogo} />
                <StyledLogo src={item.nativeDenomLogo} />
              </>
            )}
            <FormText fontType="B20" style={{ paddingLeft: 5 }}>
              {`${tokenSymbol}-${denomSymbol} Staking`}
            </FormText>
          </Row>
          <Button
            style={{ width: 100, height: 26 }}
            onClick={(e): void => {
              push(RoutePath.home, {
                symbol: tokenSymbol,
                tradeType: TradeTypeEnum.buy,
                lpType: LpProvideTypeEnum.provide,
              })
              e.stopPropagation()
            }}
          >
            Provide
          </Button>
        </Row>
        <View>
          <FormText fontType="R16">{`- APR : ${apr} %`}</FormText>
          <FormText fontType="R16">{`- Total Staked : ${UTIL.formatAmount(
            totalLpStaked
          )}`}</FormText>
        </View>
      </StyledLpBox>
      <View style={{ paddingLeft: 5 }}>
        <FormText fontType="B20" style={{ paddingLeft: 5 }}>
          {`My Lp : ${UTIL.formatAmount(myLpBalance)}`}
        </FormText>
        <ConvertedValue
          denomSymbol={denomSymbol}
          tokenSymbol={tokenSymbol}
          poolInfo={poolInfo}
          lpToken={myLpBalance}
        />
        <FormText fontType="B20" style={{ paddingLeft: 5 }}>
          {`My Staked : ${UTIL.formatAmount(myLpStakedBalance)}`}
        </FormText>
        <ConvertedValue
          denomSymbol={denomSymbol}
          tokenSymbol={tokenSymbol}
          poolInfo={poolInfo}
          lpToken={myLpStakedBalance}
        />

        {UTIL.toBn(myLpReward).gt(0) && (
          <>
            <Row
              style={{ alignItems: 'center', justifyContent: 'space-between' }}
            >
              <View>
                <FormText fontType="B20" style={{ paddingLeft: 5 }}>
                  Rewards :
                </FormText>
                <FormText fontType="R16" style={{ paddingRight: 5 }}>
                  {` ${UTIL.formatAmount(myLpReward)}${tokenSymbol} `}
                </FormText>
              </View>
              <Button
                style={{ width: 160, padding: '0 10px' }}
                onClick={onClickClaim}
              >
                Claim
              </Button>
            </Row>
            {submitErrMsg && (
              <FormText fontType={'R14'} color={COLOR.error}>
                {submitErrMsg}
              </FormText>
            )}
          </>
        )}
      </View>
    </StyledItem>
  )
}

const LpStakingList = ({
  lpStakingList,
}: {
  lpStakingList: LpStakingType[]
}): ReactElement => {
  const { routeParams, insertRouteParam } = useRoute<RoutePath.lpTower>()
  const lpStakingIndex = routeParams?.lpStakingIndex || '0'

  const onClickItem = ({ index }: { index: number }): void => {
    insertRouteParam('lpStakingIndex', `${index}`)
  }

  return (
    <StyledContainer>
      <View style={{ height: 36, alignItems: 'center' }}>
        <FormText fontType="B24">LP Staking list</FormText>
      </View>
      <StyledLpListBox>
        {_.map(lpStakingList, (item, index) => (
          <LpStakingItem
            key={`lpStakingList-${index}`}
            item={item}
            onClickItem={(): void => onClickItem({ index })}
            selected={index === +lpStakingIndex}
          />
        ))}
      </StyledLpListBox>
    </StyledContainer>
  )
}

export default LpStakingList
