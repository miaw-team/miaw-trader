import { ReactElement } from 'react'
import styled from 'styled-components'

import { COLOR, WHITELIST } from 'consts'

import { AuthButton, Card, FormText, SelectTab } from 'components'
import useRoute from 'hooks/common/useRoute'

import {
  LpProvideTypeEnum,
  RoutePath,
  TokenType,
  ContractAddr,
  TokenKeyEnum,
} from 'types'

import useLpProvide from 'hooks/common/lpProvide/useLpProvide'
import useLpWithdraw from 'hooks/common/lpProvide/useLpWithdraw'

import LpProvideForm from './LpProvideForm'
import LpWithdrawForm from './LpWithdrawForm'

const StyledCard = styled(Card)`
  flex: 1;
`

const LpProvide = ({
  token,
  tradeBase,
  pairContract,
  lpContract,
}: {
  token: TokenType
  tradeBase: TokenKeyEnum
  pairContract: ContractAddr
  lpContract: ContractAddr
}): ReactElement => {
  const { insertRouteParam, routeParams } = useRoute<RoutePath.home>()
  const type = routeParams?.lpType || LpProvideTypeEnum.provide
  const tradeBaseContract = WHITELIST.tokenInfo[tradeBase].contractOrDenom
  const tradeBaseSymbol = WHITELIST.tokenInfo[tradeBase].symbol
  const lpProvideReturn = useLpProvide({
    pairContract,
    token_0_ContractOrDenom: token.contractOrDenom,
    token_1_ContractOrDenom: tradeBaseContract,
    token_0_Symbol: token.symbol,
    token_1_Symbol: tradeBaseSymbol,
  })
  const lpWithdrawReturn = useLpWithdraw({
    pairContract,
    lpContract,
    token_0_ContractOrDenom: token.contractOrDenom,
    token_1_ContractOrDenom: tradeBaseContract,
    token_0_Symbol: token.symbol,
    token_1_Symbol: tradeBaseSymbol,
  })
  const {
    onClickLpProvide,
    invalidForm: invalidStakeForm,
    fee: provideFee,
    submitErrMsg: provideSubmitErrMsg,
  } = lpProvideReturn
  const {
    onClickLpWithdraw,
    invalidForm: invalidUnStakeForm,
    fee: withdrawFee,
    submitErrMsg: withdrawSubmitErrMsg,
  } = lpWithdrawReturn

  return (
    <>
      <StyledCard>
        <SelectTab
          options={[
            { value: LpProvideTypeEnum.provide, label: 'PROVIDE' },
            { value: LpProvideTypeEnum.withdraw, label: 'WITHDRAW' },
          ]}
          onSelect={(value): void => {
            insertRouteParam('lpType', value)
          }}
          selected={type}
        />
        {type === LpProvideTypeEnum.provide ? (
          <>
            <LpProvideForm lpProvideReturn={lpProvideReturn} />
            {provideSubmitErrMsg && (
              <FormText fontType={'R14'} color={COLOR.error}>
                {provideSubmitErrMsg}
              </FormText>
            )}
            <AuthButton
              onClick={onClickLpProvide}
              disabled={
                invalidStakeForm || !provideFee || !!provideSubmitErrMsg
              }
            >
              PROVIDE
            </AuthButton>
          </>
        ) : (
          <>
            <LpWithdrawForm lpWithdrawReturn={lpWithdrawReturn} />
            {withdrawSubmitErrMsg && (
              <FormText fontType={'R14'} color={COLOR.error}>
                {withdrawSubmitErrMsg}
              </FormText>
            )}
            <AuthButton
              onClick={onClickLpWithdraw}
              disabled={
                invalidUnStakeForm || !withdrawFee || !!withdrawSubmitErrMsg
              }
            >
              WITHDRAW
            </AuthButton>
          </>
        )}
      </StyledCard>
    </>
  )
}

export default LpProvide
