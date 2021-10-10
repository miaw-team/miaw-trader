import useLCD from '../useLCD'
import { ContractAddr, TokenDenomEnum, terraswap, uToken, uUST } from 'types'
import { UTIL } from 'consts'

const useSimulate = (): {
  simulate: (props: {
    amount: uToken
    pairContract: ContractAddr
    tokenContract: ContractAddr | TokenDenomEnum
  }) => Promise<terraswap.SimulationResponse<uUST>>
  reverseSimulate: <T extends uToken, RT extends uToken = T>(props: {
    amount: uToken
    pairContract: ContractAddr
    tokenContract: ContractAddr | TokenDenomEnum
  }) => Promise<terraswap.ReverseSimulationResponse<T, RT>>
} => {
  const { wasmFetch } = useLCD()

  const simulate = ({
    amount,
    pairContract,
    tokenContract,
  }: {
    amount: uToken
    pairContract: ContractAddr
    tokenContract: ContractAddr | TokenDenomEnum
  }): Promise<terraswap.SimulationResponse<uUST>> => {
    const info = UTIL.isNativeDenom(tokenContract)
      ? {
          native_token: {
            denom: tokenContract as TokenDenomEnum,
          },
        }
      : {
          token: { contract_addr: tokenContract as ContractAddr },
        }

    return wasmFetch<
      terraswap.Simulation<uToken>,
      terraswap.SimulationResponse<uUST>
    >({
      contract: pairContract,
      msg: {
        simulation: {
          offer_asset: {
            amount,
            info,
          },
        },
      },
    })
  }

  const reverseSimulate = <T extends uToken, RT extends uToken = T>({
    amount,
    pairContract,
    tokenContract,
  }: {
    amount: uToken
    pairContract: ContractAddr
    tokenContract: ContractAddr | TokenDenomEnum
  }): Promise<terraswap.ReverseSimulationResponse<T, RT>> => {
    const info = UTIL.isNativeDenom(tokenContract)
      ? {
          native_token: {
            denom: tokenContract as TokenDenomEnum,
          },
        }
      : {
          token: { contract_addr: tokenContract as ContractAddr },
        }
    return wasmFetch<
      terraswap.ReverseSimulation<uToken>,
      terraswap.ReverseSimulationResponse<T, RT>
    >({
      contract: pairContract,
      msg: {
        reverse_simulation: {
          ask_asset: {
            amount,
            info,
          },
        },
      },
    })
  }

  return {
    simulate,
    reverseSimulate,
  }
}

export default useSimulate
