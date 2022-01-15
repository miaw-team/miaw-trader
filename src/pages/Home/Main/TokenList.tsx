import { ReactElement, ReactNode, useMemo } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import { IconChevronDown, IconChevronUp, IconX, IconStar } from '@tabler/icons'

import { COLOR, STYLE, UTIL } from 'consts'

import { FormImage, FormText, Card, Row, View, FormInput } from 'components'

import {
  ContractAddr,
  RoutePath,
  TokenDenomEnum,
  TokenType,
  uToken,
} from 'types'
import useRoute from 'hooks/common/useRoute'
import {
  SortedTokenType,
  SortTypeEnum,
  UseTokenListReturn,
} from 'hooks/common/home/useTokenList'
import useFavoriteToken from 'hooks/common/useFavoriteToken'
import { ExtractPoolResponseType } from 'logics/pool'

const StyledCard = styled(Card)`
  width: 400px;
  @media ${STYLE.media.tablet} {
    width: fit-content;
  }
`

const StyledListHeader = styled(Row)`
  padding: 5px;
  border-top: 1px solid ${COLOR.gray._600};
  border-bottom: 1px solid ${COLOR.gray._600};
`

const StyledSort = styled(View)`
  ${STYLE.clickable}
`

const StyledTokenItem = styled(View)`
  ${STYLE.clickable}
  padding:10px 0;
  align-items: center;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr;
`

const StyledTokenItemBox = styled(View)`
  height: 700px;
  overflow-y: scroll;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
`

const TokenItem = ({
  token,
  history,
  poolInfo,
  closeModal,
}: {
  token: TokenType<ContractAddr | TokenDenomEnum>
  history?: SortedTokenType['history']
  poolInfo: ExtractPoolResponseType
  closeModal?: () => void
}): ReactElement => {
  const { token_0_Price, token_1_PoolSize } = poolInfo
  const { insertRouteParam } = useRoute<RoutePath.home>()

  const { addFavoriteList, removeFavoriteList, favoriteList } =
    useFavoriteToken()

  const isFavorite = favoriteList.includes(token.symbol)

  const displayPrice = useMemo(() => {
    const token_0_PriceBn = UTIL.toBn(token_0_Price)
    if (token_0_PriceBn.isLessThan(0.01)) {
      return token_0_PriceBn.toFixed(6)
    }
    return token_0_PriceBn.toFixed(3)
  }, [token_0_Price])

  const displayUstPoolSize = useMemo(() => {
    const bn = UTIL.toBn(token_1_PoolSize as string)

    return UTIL.formatAmount(bn.multipliedBy(2).toString() as uToken, {
      abbreviate: true,
      toFix: 0,
    })
  }, [token_1_PoolSize])

  const getPoolSizeSafty = useMemo(() => {
    const bn = UTIL.toBn(token_1_PoolSize as string)
    return bn.isLessThan(1000 * 1e6)
      ? COLOR.error
      : bn.isLessThan(100 * 1000 * 1e6)
      ? COLOR.warning
      : COLOR.gray._600
  }, [token_1_PoolSize])

  const change1d = useMemo(() => {
    if (history) {
      return history
    }

    return {
      isIncreased: false,
      changePercent: '-',
    }
  }, [history])

  return (
    <StyledTokenItem
      onClick={(): void => {
        insertRouteParam('symbol', token.symbol)
        closeModal && closeModal()
      }}
    >
      <Row style={{ flex: 1, alignItems: 'center' }}>
        <IconStar
          fill={isFavorite ? COLOR.rainbow.yellow : 'none'}
          color={isFavorite ? COLOR.rainbow.yellow : COLOR.gray._400}
          onClick={(event): void => {
            event.stopPropagation()
            isFavorite
              ? removeFavoriteList({ symbol: token.symbol })
              : addFavoriteList({ symbol: token.symbol })
          }}
        />
        <FormImage
          src={token.logo}
          size={20}
          style={{
            borderRadius: 15,
            padding: 5,
            marginLeft: 5,
            marginRight: 5,
          }}
        />
        <FormText fontType="B16" color={COLOR.primary._400}>
          {token.symbol}
        </FormText>
      </Row>
      <Row
        style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}
      >
        <FormText fontType="B16" color={COLOR.gray._600}>
          {displayPrice}
        </FormText>
      </Row>
      <View style={{ flex: 1, alignItems: 'flex-end' }}>
        <FormText
          fontType="B16"
          color={change1d.isIncreased ? COLOR.success : COLOR.error}
        >
          {change1d.isIncreased ? '+' : '-'}
          {change1d.changePercent}%
        </FormText>
      </View>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <FormText fontType="B16" color={getPoolSizeSafty}>
          {displayUstPoolSize}
        </FormText>
      </View>
    </StyledTokenItem>
  )
}

const SortTitle = ({
  title,
  sortBy,
  selectedSortBy,
  sortDesc,
  onClickSort,
}: {
  title: ReactNode
  sortBy: SortTypeEnum
  selectedSortBy: SortTypeEnum
  sortDesc: boolean
  onClickSort: (value: SortTypeEnum) => void
}): ReactElement => {
  return (
    <StyledSort
      style={{ flex: 1 }}
      onClick={(): void => {
        onClickSort(sortBy)
      }}
    >
      <Row
        style={{
          alignItems: 'flex-start',
          justifyContent: sortBy === 'price' ? 'flex-end' : 'center',
        }}
      >
        {typeof title === 'string' ? (
          <FormText fontType="B16" color={COLOR.gray._600}>
            {title}
          </FormText>
        ) : (
          title
        )}
        <View style={{ paddingTop: 5, paddingLeft: 5 }}>
          {sortBy === selectedSortBy &&
            (sortDesc ? (
              <IconChevronDown size={14} />
            ) : (
              <IconChevronUp size={14} />
            ))}
        </View>
      </Row>
    </StyledSort>
  )
}

const TokenList = ({
  closeModal,
  tokenListReturn,
}: {
  closeModal?: () => void
  tokenListReturn: UseTokenListReturn
}): ReactElement => {
  const { filter, setFilter, sortBy, sortDesc, sortedList, onClickSort } =
    tokenListReturn

  const { favoriteList } = useFavoriteToken()

  const favoriteSortedList = _.filter(sortedList, (x) =>
    favoriteList.includes(x.token.symbol)
  )
  const remainSortedList = _.filter(
    sortedList,
    (x) => false === favoriteList.includes(x.token.symbol)
  )

  return (
    <StyledCard>
      <Row style={{ paddingBottom: 20, alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          <FormInput
            inputProps={{ value: filter, placeholder: 'Symbol, Name' }}
            onChangeValue={(value): void => setFilter(value)}
          />
        </View>
        {closeModal && <IconX onClick={closeModal} size={24} />}
      </Row>
      <StyledListHeader>
        <SortTitle
          title={'Token'}
          sortBy={SortTypeEnum.name}
          selectedSortBy={sortBy}
          sortDesc={sortDesc}
          onClickSort={onClickSort}
        />
        <SortTitle
          title={
            <FormText fontType="B16" color={COLOR.gray._600}>
              Price
            </FormText>
          }
          sortBy={SortTypeEnum.price}
          selectedSortBy={sortBy}
          sortDesc={sortDesc}
          onClickSort={onClickSort}
        />
        <SortTitle
          title="Change"
          sortBy={SortTypeEnum.change}
          selectedSortBy={sortBy}
          sortDesc={sortDesc}
          onClickSort={onClickSort}
        />
        <SortTitle
          title={'TVL'}
          sortBy={SortTypeEnum.poolSize}
          selectedSortBy={sortBy}
          sortDesc={sortDesc}
          onClickSort={onClickSort}
        />
      </StyledListHeader>
      <StyledTokenItemBox>
        {_.map(favoriteSortedList.concat(remainSortedList), (item, index) => {
          if (item.poolInfo) {
            return (
              <TokenItem
                key={`sortedList-${index}`}
                poolInfo={item.poolInfo}
                token={item.token}
                history={item.history}
                closeModal={closeModal}
              />
            )
          }
        })}
      </StyledTokenItemBox>
    </StyledCard>
  )
}

export default TokenList
