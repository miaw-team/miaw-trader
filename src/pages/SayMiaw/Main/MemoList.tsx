import { ReactElement } from 'react'
import styled from 'styled-components'
import _ from 'lodash'

import { UTIL, COLOR } from 'consts'

import {
  View,
  FormText,
  LinkFinder,
  Card,
  Button,
  Row,
  LinkA,
} from 'components'
import {
  getMemoStyle,
  burnDataParser,
  UseSayMiawReturn,
} from 'hooks/common/sayMiaw/useSayMiaw'
import { BurnDataType } from 'hooks/query/miawToken/useBurnHistory'

import { SayOptionEnum } from 'types'

const StyledContainer = styled(View)``

const StyledMemoItem = styled(View)`
  padding-bottom: 15px;
`

const MemoItem = ({ burnData }: { burnData: BurnDataType }): ReactElement => {
  const { type, displayMsg } = burnDataParser({
    data: burnData.memo,
    name: burnData.name,
  })
  const memoStyle = getMemoStyle({ type, amount: burnData.burnAmount })

  return (
    <StyledMemoItem>
      <View style={{ width: 250 }}>
        <LinkFinder
          fontType="R12"
          type="address"
          address={burnData.sender}
          title={burnData.name || burnData.sender}
        />
      </View>
      {type === SayOptionEnum.PLACEBO_RAFFLE_1 ? (
        <LinkA link="https://twitter.com/PlaceboNFT/status/1437571885135327234">
          <FormText style={{ ...memoStyle, wordBreak: 'break-all' }}>
            💎 {displayMsg}
          </FormText>
        </LinkA>
      ) : (
        <FormText style={{ ...memoStyle, wordBreak: 'break-all' }}>
          {displayMsg}
        </FormText>
      )}

      <Row>
        <LinkFinder
          fontType="R12"
          type="tx"
          address={burnData.txhash}
          title={
            <FormText
              fontType="R12"
              style={{ paddingRight: 5, color: COLOR.error }}
            >
              {`Burned ${UTIL.formatAmount(burnData.burnAmount)} MIAW! `}
            </FormText>
          }
        />
        <FormText fontType="R12">{` ${burnData.timestamp.fromNow()}`}</FormText>
      </Row>
    </StyledMemoItem>
  )
}

const MemoList = ({
  sayMiawReturn,
}: {
  sayMiawReturn: UseSayMiawReturn
}): ReactElement => {
  const { miawBurnHistory } = sayMiawReturn
  const {
    burnDataList,
    fetchNextPage: getMoreHistory,
    isLast,
  } = miawBurnHistory

  return (
    <StyledContainer>
      <Card>
        {_.map(burnDataList, (burnData, index) => (
          <MemoItem key={`burnDataList-${index}`} burnData={burnData} />
        ))}
      </Card>
      {false === isLast && (
        <View style={{ paddingTop: 10 }}>
          <Button onClick={getMoreHistory}>More</Button>
        </View>
      )}
    </StyledContainer>
  )
}

export default MemoList
