import { ReactElement, useState } from 'react'
import styled from 'styled-components'
import { IconSquare, IconCheckbox } from '@tabler/icons'

import { ASSET, COLOR, STYLE } from 'consts'

import { FormText, Card, SelectTab, AuthButton, View } from 'components'
import useRoute from 'hooks/common/useRoute'
import useBuy, { UseBuyReturn } from 'hooks/common/trade/useBuy'
import useSell, { UseSellReturn } from 'hooks/common/trade/useSell'
import useLimitOrderBuy, {
  UseLimitOrderBuyReturn,
} from 'hooks/common/trade/useLimitOrderBuy'
import useLimitOrderSell, {
  UseLimitOrderSellReturn,
} from 'hooks/common/trade/useLimitOrderSell'
import useMyOrder from 'hooks/common/trade/useMyOrder'

import {
  TradeTypeEnum,
  RoutePath,
  TokenType,
  TokenDenomEnum,
  ContractAddr,
} from 'types'

import MyOrder from './MyOrder'
import BuyForm from './BuyForm'
import LimitOrderBuyForm from './LimitOrderBuyForm'
import LimitOrderSellForm from './LimitOrderSellForm'
import SellForm from './SellForm'

const StyledCard = styled(Card)`
  flex: 1;
`

const StyledLayout = styled(View)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;

  @media ${STYLE.media.mobile} {
    display: flex;
    flex-direction: column-reverse;
  }
`

const StyledLimitOrderButton = styled(FormText)`
  ${STYLE.clickable}
  flex-direction: row;
  align-items: center;
  border-radius: 5px;
  border: 1px solid ${COLOR.gray._600};
  width: fit-content;
  padding: 5px 10px;
  margin-bottom: 10px;
`

const Buy = ({
  buyReturn,
  useLimitOrderBuyReturn,
}: {
  buyReturn: UseBuyReturn
  useLimitOrderBuyReturn: UseLimitOrderBuyReturn
}): ReactElement => {
  const {
    onClickBuy,
    invalidForm: invalidBuyForm,
    fee,
    submitErrMsg: buySubmitErrMsg,
  } = buyReturn

  const {
    onClickLimitOrderBuy,
    invalidForm: invalidLoBuyForm,
    fee: loFee,
    submitErrMsg: loBuySubmitErrMsg,
  } = useLimitOrderBuyReturn

  const [buyLimitOrder, setBuyLimitOrder] = useState(false)

  return (
    <>
      <View style={{ alignItems: 'flex-end' }}>
        <StyledLimitOrderButton
          fontType="R16"
          color={buyLimitOrder ? COLOR.primary._400 : COLOR.text}
          onClick={(): void => {
            setBuyLimitOrder(!buyLimitOrder)
          }}
        >
          {buyLimitOrder ? <IconCheckbox /> : <IconSquare />}
          Limit order
        </StyledLimitOrderButton>
      </View>

      {buyLimitOrder ? (
        <>
          <LimitOrderBuyForm useLimitOrderBuyReturn={useLimitOrderBuyReturn} />
          {loBuySubmitErrMsg && (
            <FormText fontType={'R14'} color={COLOR.error}>
              {loBuySubmitErrMsg}
            </FormText>
          )}
          <AuthButton
            onClick={onClickLimitOrderBuy}
            disabled={invalidLoBuyForm || !loFee || !!loBuySubmitErrMsg}
          >
            BUY
          </AuthButton>
        </>
      ) : (
        <>
          <BuyForm buyReturn={buyReturn} />
          {buySubmitErrMsg && (
            <FormText fontType={'R14'} color={COLOR.error}>
              {buySubmitErrMsg}
            </FormText>
          )}
          <AuthButton
            onClick={onClickBuy}
            disabled={invalidBuyForm || !fee || !!buySubmitErrMsg}
          >
            BUY
          </AuthButton>
        </>
      )}
    </>
  )
}

const Sell = ({
  sellReturn,
  useLimitOrderSellReturn,
}: {
  sellReturn: UseSellReturn
  useLimitOrderSellReturn: UseLimitOrderSellReturn
}): ReactElement => {
  const {
    onClickSell,
    invalidForm: invalidSellForm,
    fee: sellFee,
    submitErrMsg: sellSubmitErrMsg,
  } = sellReturn

  const {
    onClickLimitOrderSell,
    invalidForm: invalidLoSellForm,
    fee: loFee,
    submitErrMsg: loSellSubmitErrMsg,
  } = useLimitOrderSellReturn

  const [sellLimitOrder, setSellLimitOrder] = useState(false)
  return (
    <>
      <View style={{ alignItems: 'flex-end' }}>
        <StyledLimitOrderButton
          fontType="R16"
          color={sellLimitOrder ? COLOR.primary._400 : COLOR.text}
          onClick={(): void => {
            setSellLimitOrder(!sellLimitOrder)
          }}
        >
          {sellLimitOrder ? <IconCheckbox /> : <IconSquare />}
          Limit order
        </StyledLimitOrderButton>
      </View>

      {sellLimitOrder ? (
        <>
          <LimitOrderSellForm
            useLimitOrderSellReturn={useLimitOrderSellReturn}
          />
          {loSellSubmitErrMsg && (
            <FormText fontType={'R14'} color={COLOR.error}>
              {loSellSubmitErrMsg}
            </FormText>
          )}
          <AuthButton
            onClick={onClickLimitOrderSell}
            disabled={invalidLoSellForm || !loFee || !!loSellSubmitErrMsg}
          >
            SELL
          </AuthButton>
        </>
      ) : (
        <>
          <SellForm sellReturn={sellReturn} />
          {sellSubmitErrMsg && (
            <FormText fontType={'R14'} color={COLOR.error}>
              {sellSubmitErrMsg}
            </FormText>
          )}
          <AuthButton
            onClick={onClickSell}
            disabled={invalidSellForm || !sellFee || !!sellSubmitErrMsg}
          >
            SELL
          </AuthButton>
        </>
      )}
    </>
  )
}

const Trade = ({
  token,
  tradeBaseDenom,
  pairContract,
}: {
  token: TokenType
  tradeBaseDenom: TokenDenomEnum
  pairContract: ContractAddr
}): ReactElement => {
  const { insertRouteParam, routeParams } = useRoute<RoutePath.home>()
  const tradeType = routeParams?.tradeType || TradeTypeEnum.buy

  const buyReturn = useBuy({
    fromTokenContractOrDenom: tradeBaseDenom,
    toTokenContractOrDenom: token.contractOrDenom,
    fromTokenSymbol: ASSET.symbolOfDenom[tradeBaseDenom],
    toTokenSymbol: token.symbol,
    pairContract,
  })

  const useLimitOrderBuyReturn = useLimitOrderBuy({
    offerDenom: tradeBaseDenom,
    askContractOrDenom: token.contractOrDenom,
    offerTokenSymbol: ASSET.symbolOfDenom[tradeBaseDenom],
    askTokenSymbol: token.symbol,
    pairContract,
  })

  const sellReturn = useSell({
    fromTokenContractOrDenom: token.contractOrDenom,
    toTokenContractOrDenom: tradeBaseDenom,
    fromTokenSymbol: token.symbol,
    toTokenSymbol: ASSET.symbolOfDenom[tradeBaseDenom],
    pairContract,
  })

  const useLimitOrderSellReturn = useLimitOrderSell({
    offerContractOrDenom: token.contractOrDenom,
    askDenom: tradeBaseDenom,
    offerTokenSymbol: token.symbol,
    askTokenSymbol: ASSET.symbolOfDenom[tradeBaseDenom],
    pairContract,
  })

  const myOrderReturn = useMyOrder({
    forBuyDenom: tradeBaseDenom,
    toBuyContractOrDenom: token.contractOrDenom,
    tokenForBuySymbol: ASSET.symbolOfDenom[tradeBaseDenom],
    tokenToBuySymbol: token.symbol,
    pairContract,
  })

  return (
    <StyledCard>
      <StyledLayout>
        <MyOrder myOrderReturn={myOrderReturn} />
        <View style={{ flex: 1 }}>
          <SelectTab
            options={[
              { value: TradeTypeEnum.buy, label: 'BUY' },
              { value: TradeTypeEnum.sell, label: 'SELL' },
            ]}
            onSelect={(value): void => {
              insertRouteParam('tradeType', value)
            }}
            selected={tradeType}
          />

          {tradeType === TradeTypeEnum.buy ? (
            <Buy
              buyReturn={buyReturn}
              useLimitOrderBuyReturn={useLimitOrderBuyReturn}
            />
          ) : (
            <Sell
              sellReturn={sellReturn}
              useLimitOrderSellReturn={useLimitOrderSellReturn}
            />
          )}
        </View>
      </StyledLayout>
    </StyledCard>
  )
}

export default Trade
