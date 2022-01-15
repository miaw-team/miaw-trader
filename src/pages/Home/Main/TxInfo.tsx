import { ReactElement } from 'react'
import styled from 'styled-components'
import { IconExternalLink } from '@tabler/icons'
import _ from 'lodash'

import { UTIL, COLOR } from 'consts'

import { FormText, Row, LinkFinder, View, Card } from 'components'
import { ContractAddr, uToken } from 'types'
import useLayout from 'hooks/common/useLayout'
import useTokenPairHistory from 'hooks/query/token/useCw20History'

const StyledContainer = styled(Card)``

const StyledTxInfoItem = styled(Row)`
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${COLOR.gray._100};
`

const TxInfo = ({
  pairContract,
}: {
  pairContract: ContractAddr
}): ReactElement => {
  const { txList } = useTokenPairHistory({ tokenPairContract: pairContract })
  const { isTabletWidth } = useLayout()

  if (txList.length < 1) {
    return <View />
  }
  return (
    <StyledContainer>
      {_.map(txList.slice(0, 10), (item, index) => {
        const uusdBn = UTIL.toBn(item.uusd)
        const isPositive = uusdBn.isPositive()

        return (
          <StyledTxInfoItem key={`txList-${index}`}>
            {isTabletWidth ? (
              <>
                <View>
                  <LinkFinder
                    type="tx"
                    address={item.txhash}
                    title={
                      <>
                        <Row style={{ alignItems: 'baseline' }}>
                          <FormText fontType={'R14'} color={COLOR.primary._400}>
                            {item.action.toUpperCase()}
                          </FormText>
                          <IconExternalLink
                            size={12}
                            style={{ paddingLeft: 3 }}
                          />
                        </Row>
                        <FormText
                          fontType="B16"
                          color={isPositive ? COLOR.success : COLOR.error}
                        >
                          {`${UTIL.formatAmount(
                            uusdBn.absoluteValue().toString(10) as uToken
                          )} UST`}
                        </FormText>
                      </>
                    }
                  />
                </View>

                <FormText fontType="R14">{item.timestamp.fromNow()}</FormText>
              </>
            ) : (
              <>
                <View style={{ width: 250 }}>
                  <LinkFinder
                    type="tx"
                    address={item.txhash}
                    title={
                      <Row style={{ alignItems: 'baseline' }}>
                        <FormText fontType={'R14'} color={COLOR.primary._400}>
                          {item.action.toUpperCase()}
                        </FormText>
                        <IconExternalLink
                          size={12}
                          style={{ paddingLeft: 3 }}
                        />
                      </Row>
                    }
                  />
                </View>
                <Row style={{ flex: 1 }}>
                  <FormText
                    fontType="B16"
                    color={isPositive ? COLOR.success : COLOR.error}
                  >
                    {`${UTIL.formatAmount(
                      uusdBn.absoluteValue().toString(10) as uToken
                    )} UST`}
                  </FormText>
                </Row>
                <FormText fontType="R16">{item.timestamp.fromNow()}</FormText>
              </>
            )}
          </StyledTxInfoItem>
        )
      })}
    </StyledContainer>
  )
}

export default TxInfo
