import { ReactElement } from 'react'
import styled from 'styled-components'
import _ from 'lodash'

import { COLOR, UTIL, STYLE } from 'consts'

import { FormText, View, Row } from 'components'
import { UseMyOrderReturn } from 'hooks/common/trade/useMyOrder'
import { IconCircleX, IconMoodEmpty } from '@tabler/icons'

const StyledContainer = styled(View)`
  @media ${STYLE.media.mobile} {
    margin-top: 20px;
  }
`

const StyledOrderList = styled(View)`
  border: 1px solid ${COLOR.primary._400};
  height: 100%;
  padding: 15px;
  border-radius: 8px;
`

const StyledOrderItem = styled(Row)`
  padding: 5px 0;
`

const StyledCancleButton = styled(View)`
  ${STYLE.clickable}
  padding:5px;
`

const MyOrder = ({
  myOrderReturn,
}: {
  myOrderReturn: UseMyOrderReturn
}): ReactElement => {
  const { limitOrderList, setOrderId, tokenForBuySymbol, tokenToBuySymbol } =
    myOrderReturn

  return (
    <StyledContainer>
      <FormText fontType={'B18'} style={{ paddingBottom: 10 }}>
        My Limit Orders
      </FormText>
      <StyledOrderList>
        {limitOrderList.length > 0 ? (
          <Row style={{ borderBottom: `1px solid ${COLOR.gray._300}` }}>
            <View style={{ alignItems: 'center', paddingLeft: 10 }}>
              <FormText fontType="B18">Type</FormText>
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <FormText fontType="B18">Price</FormText>
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <FormText fontType="B18">Order</FormText>
            </View>
            <View style={{ width: 30 }} />
          </Row>
        ) : (
          <Row style={{ alignItems: 'center' }}>
            <IconMoodEmpty
              color={COLOR.gray._400}
              style={{ paddingRight: 5 }}
            />
            <FormText fontType="R16" color={COLOR.gray._400}>
              No Active Orders
            </FormText>
          </Row>
        )}
        {_.map(limitOrderList, (item, index) => {
          return (
            <StyledOrderItem key={`limitOrderList-${index}`}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingLeft: 10,
                }}
              >
                <FormText
                  color={item.type === 'Buy' ? COLOR.success : COLOR.error}
                >
                  {item.type}
                </FormText>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <FormText>{UTIL.setComma(item.price)}</FormText>
              </View>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <FormText>{`${UTIL.formatAmount(
                  item.toBuyAmount
                )} ${tokenToBuySymbol}`}</FormText>
                <FormText fontType="R14">{`(${UTIL.formatAmount(
                  item.toSellAmount
                )} ${tokenForBuySymbol})`}</FormText>
              </View>
              <StyledCancleButton
                onClick={(): void => {
                  setOrderId(item.orderId)
                }}
              >
                <IconCircleX color={COLOR.error} />
              </StyledCancleButton>
            </StyledOrderItem>
          )
        })}
      </StyledOrderList>
    </StyledContainer>
  )
}

export default MyOrder
