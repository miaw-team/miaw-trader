import { ReactElement } from 'react'
import styled from 'styled-components'

import { COLOR, STYLE, UTIL } from 'consts'

import { View, FormText, Row } from 'components'
import useSayMiaw from 'hooks/common/sayMiaw/useSayMiaw'

import { ContractAddr, TokenType } from 'types'
import useMyBalance from 'hooks/common/useMyBalance'
import useMyName from 'hooks/common/useMyName'

const StyledContainer = styled(View)`
  background-color: ${COLOR.primary._600};
  padding: 10px;
  border-radius: 8px;
`

const StyledTotalBurnedBox = styled(Row)`
  padding-bottom: 15px;
  @media ${STYLE.media.mobile} {
    flex-direction: column;
  }
`

const TopInfo = ({
  miawToken,
}: {
  miawToken: TokenType<ContractAddr>
}): ReactElement => {
  const sayMiawReturn = useSayMiaw({ miawToken })
  const { name } = useMyName()

  const { balance: myMiaw } = useMyBalance({
    contractOrDenom: miawToken.contractOrDenom,
  })

  return (
    <StyledContainer>
      <StyledTotalBurnedBox>
        <FormText
          fontType="R18"
          style={{ paddingRight: 5 }}
          color={COLOR.rainbow.red}
        >
          🔥Total Burned :
        </FormText>
        <FormText fontType="B18" color={COLOR.gray._100}>{`${UTIL.formatAmount(
          sayMiawReturn.burnedAmount
        )} MIAW ( ≒  ${UTIL.formatAmount(sayMiawReturn.burnedPrice, {
          toFix: 0,
        })} UST )`}</FormText>
      </StyledTotalBurnedBox>
      <View>
        <FormText
          fontType="R16"
          color={COLOR.gray._100}
        >{`My MIAW : ${UTIL.formatAmount(myMiaw)}`}</FormText>
        <FormText
          fontType="R16"
          color={COLOR.gray._100}
        >{`My Name : ${name}`}</FormText>
        <FormText fontType="R14" color={COLOR.warning}>
          * Updating name may need a few minutes
        </FormText>
      </View>
    </StyledContainer>
  )
}

export default TopInfo
