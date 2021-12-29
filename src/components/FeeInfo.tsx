import { ReactElement } from 'react'
import { Fee } from '@terra-money/terra.js'
import styled from 'styled-components'

import { ASSET, COLOR } from 'consts'

import { TokenDenomEnum, uToken } from 'types'

import BalanceFormat from './BalanceFormat'
import Row from './Row'
import View from './View'
import FormText from './FormText'

const StyledContainer = styled(Row)`
  margin-top: 10px;
  border-radius: 3px;
  border: 1px solid ${COLOR.primary._600};
  justify-content: space-between;
  padding: 5px 10px;
  background-color: #27a9e11a;
`

const StyledTitle = styled(FormText)`
  color: ${COLOR.primary._600};
`

const FeeInfo = ({ fee }: { fee?: Fee }): ReactElement => {
  return (
    <>
      {fee && (
        <StyledContainer>
          <StyledTitle>Tx Fee</StyledTitle>
          <View>
            {fee.amount.map((f) => (
              <BalanceFormat
                key={`fee-${f}`}
                value={f.amount.toString() as uToken}
                suffix={ASSET.symbolOfDenom[f.denom as TokenDenomEnum]}
              />
            ))}
          </View>
        </StyledContainer>
      )}
    </>
  )
}

export default FeeInfo
