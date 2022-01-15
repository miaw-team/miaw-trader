import { ReactElement, useMemo } from 'react'
import styled from 'styled-components'
import { Line } from 'react-chartjs-2'
import { ChartData, ChartOptions } from 'chart.js'
import _ from 'lodash'
import moment from 'moment'
import Select from 'react-select'

import { COLOR, UTIL } from 'consts'

import { Card, FormText, View, DatePicker, FormInput, Row } from 'components'
import { ContractAddr, Token, uLP } from 'types'
import useAnalytics from 'hooks/common/home/useAnalytics'
import useNetwork from 'hooks/common/useNetwork'
import usePool from 'hooks/query/pair/usePool'
import { LpLpSimulation } from 'logics/lpSimulator'

const StyledContainer = styled(Card)``

const StyledSettingBox = styled(View)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 10px;
`

const MyResponsiveLine = ({
  data,
  returnTypeSymbol,
}: {
  data: ChartData
  returnTypeSymbol: string
}): ReactElement => {
  const options: ChartOptions = {
    aspectRatio: 3,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      'left-y': {
        type: 'linear',
        position: 'left',
        ticks: {
          callback: (value): string =>
            `${UTIL.formatAmount(UTIL.microfy(value as Token), {
              abbreviate: true,
              toFix: 2,
            })}${returnTypeSymbol}`,
        },
      },
      'right-y': {
        type: 'linear',
        position: 'right',
        ticks: {
          callback: (value): string =>
            `${UTIL.toBn(value).dp(2).toString(10)}%`,
        },
      },
    },
    interaction: {
      mode: 'index',
      axis: 'xy',
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        intersect: false,
        callbacks: {
          label: (tooltipItems: any): string => {
            const suffix = [0, 1].includes(tooltipItems.datasetIndex)
              ? returnTypeSymbol
              : '%'
            return `${tooltipItems.dataset.label} : ${tooltipItems.formattedValue}${suffix}`
          },
        },
      },
    },
  }

  return <Line data={data} options={options} />
}

const SimulateLpAmount = ({
  inputLp,
  pairContract,
  token_0_ContractOrDenom,
  token_0_Symbol,
  token_1_Symbol,
}: {
  inputLp: uLP
  pairContract: ContractAddr
  token_0_ContractOrDenom: ContractAddr
  token_0_Symbol?: string
  token_1_Symbol?: string
}): ReactElement => {
  const { poolInfo } = usePool({
    pairContract,
    token_0_ContractOrDenom,
  })

  const simulated =
    poolInfo &&
    LpLpSimulation({
      poolInfo,
      ulp: inputLp as uLP,
      userLpBalance: inputLp as uLP,
    })

  const formatLp = UTIL.formatAmount(inputLp)
  const formatToken_0 = UTIL.formatAmount(
    UTIL.microfy(simulated?.token_0_Amount || ('0' as Token))
  )
  const formatToken_1 = UTIL.formatAmount(
    UTIL.microfy(simulated?.token_1_Amount || ('0' as Token))
  )

  return (
    <Row style={{ paddingTop: 5, paddingBottom: 10 }}>
      <FormText fontType="R14">
        {`${formatLp} LP ≒ ( ${formatToken_0} ${token_0_Symbol} + ${formatToken_1} ${token_1_Symbol} )`}
      </FormText>
    </Row>
  )
}

const Analytics = ({
  pairContract,
}: {
  pairContract: ContractAddr
}): ReactElement => {
  const { getSymbolByContractOrDenom } = useNetwork()
  const {
    analyticsList,
    inputValue,
    setInputValue,
    from,
    setFrom,
    to,
    setTo,
    token_0_ContractOrDenom,
    token_1_ContractOrDenom,
    returnTokenType,
    setReturnTokenType,
  } = useAnalytics({ pairContract })

  const token_0_Symbol =
    token_0_ContractOrDenom &&
    getSymbolByContractOrDenom(token_0_ContractOrDenom)
  const token_1_Symbol =
    token_1_ContractOrDenom &&
    getSymbolByContractOrDenom(token_1_ContractOrDenom)

  const options = [
    {
      value: '0',
      label: token_0_Symbol,
    },
    {
      value: '1',
      label: token_1_Symbol,
    },
  ]

  const data: ChartData = useMemo(() => {
    return {
      labels: _.map(analyticsList, (item) =>
        moment.unix(item.timestamp).format('YYYY.MM.DD')
      ),
      datasets: [
        {
          label: `${token_0_Symbol}-${token_1_Symbol} Hold Value`,
          data: _.map(analyticsList, (item) =>
            UTIL.toBn(item.holdValue).dp(2).toNumber()
          ),
          borderColor: COLOR.rainbow.red,
          backgroundColor: COLOR.rainbow.red,
          yAxisID: 'left-y',
        },
        {
          label: `${token_0_Symbol}-${token_1_Symbol} Pool Value`,
          data: _.map(analyticsList, (item) =>
            UTIL.toBn(item.poolValue).dp(2).toNumber()
          ),
          borderColor: COLOR.rainbow.orang,
          backgroundColor: COLOR.rainbow.orang,
          yAxisID: 'left-y',
        },
        {
          label: 'Impermanent Gain/Loss',
          data: _.map(analyticsList, (item) =>
            UTIL.toBn(item.impermanentLossOrGain)
              .multipliedBy(100)
              .dp(3)
              .toNumber()
          ),
          borderColor: COLOR.rainbow.green,
          backgroundColor: COLOR.rainbow.green,
          yAxisID: 'right-y',
        },
      ],
    }
  }, [analyticsList])

  if (analyticsList.length < 1) {
    return <View />
  }

  return (
    <StyledContainer>
      <StyledSettingBox>
        <View>
          <FormText fontType="R14">Lp Amount</FormText>
          <FormInput
            inputProps={{
              value: inputValue,
            }}
            number
            onChangeValue={(value): void => {
              if (UTIL.toBn(value).lte(1e10) && UTIL.toBn(value).gte(0)) {
                setInputValue(value)
              }
            }}
          />
        </View>
        <View>
          <FormText fontType="R14">From</FormText>
          <DatePicker
            minDate={moment.unix(to).subtract(12, 'months').toDate()}
            maxDate={moment.unix(to).toDate()}
            selected={moment.unix(from).toDate()}
            onChange={(date): void => {
              date && setFrom(moment(date.toString()).unix())
            }}
          />
        </View>
        <View>
          <FormText fontType="R14">To</FormText>
          <DatePicker
            minDate={moment.unix(from).toDate()}
            maxDate={moment.unix(from).add(12, 'months').toDate()}
            selected={moment.unix(to).toDate()}
            onChange={(date): void => {
              date && setTo(moment(date.toString()).unix())
            }}
          />
        </View>
        <View style={{ minWidth: 160 }}>
          <FormText fontType="R14">Return Type</FormText>
          {token_0_Symbol && (
            <Select
              options={options}
              defaultValue={options[0]}
              isSearchable={false}
              onChange={(sel): void => {
                sel && setReturnTokenType(sel.value)
              }}
            />
          )}
        </View>
      </StyledSettingBox>
      {token_0_ContractOrDenom && (
        <SimulateLpAmount
          inputLp={UTIL.microfy(inputValue as Token) as uLP}
          pairContract={pairContract}
          token_0_ContractOrDenom={token_0_ContractOrDenom}
          token_0_Symbol={token_0_Symbol}
          token_1_Symbol={token_1_Symbol}
        />
      )}
      <MyResponsiveLine
        data={data}
        returnTypeSymbol={
          options.find((x) => x.value === returnTokenType)?.label || ''
        }
      />
    </StyledContainer>
  )
}

export default Analytics
