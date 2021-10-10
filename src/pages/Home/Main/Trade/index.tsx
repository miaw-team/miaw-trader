import { ReactElement } from 'react'
import styled from 'styled-components'

import { ASSET, COLOR, STYLE } from 'consts'

import { FormText, Card, SelectTab, AuthButton } from 'components'
import useRoute from 'hooks/common/useRoute'
import useBuy from 'hooks/common/trade/useBuy'
import useSell from 'hooks/common/trade/useSell'

import {
  TradeTypeEnum,
  RoutePath,
  TokenType,
  TokenDenomEnum,
  ContractAddr,
} from 'types'

import BuyForm from './BuyForm'
import SellForm from './SellForm'

const StyledCard = styled(Card)`
  flex: 1;
  @media ${STYLE.media.tablet} {
  }
`

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
  const sellReturn = useSell({
    fromTokenContractOrDenom: token.contractOrDenom,
    toTokenContractOrDenom: tradeBaseDenom,
    fromTokenSymbol: token.symbol,
    toTokenSymbol: ASSET.symbolOfDenom[tradeBaseDenom],
    pairContract,
  })

  const {
    onClickBuy,
    invalidForm: invalidBuyForm,
    fee,
    submitErrMsg: buySubmitErrMsg,
  } = buyReturn

  const {
    onClickSell,
    invalidForm: invalidSellForm,
    fee: sellFee,
    submitErrMsg: sellSubmitErrMsg,
  } = sellReturn

  return (
    <>
      <StyledCard>
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
      </StyledCard>
    </>
  )
}

export default Trade
