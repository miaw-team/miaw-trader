import { ReactElement, ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Modal from 'react-modal'
import { RecoilRoot } from 'recoil'
import { WalletProvider, NetworkInfo } from '@terra-money/wallet-provider'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

Modal.setAppElement('#root')
const queryClient = new QueryClient()

const mainnet: NetworkInfo = {
  name: 'columbus',
  chainID: 'columbus-5',
  lcd: 'https://lcd.terra.dev',
}

const testnet: NetworkInfo = {
  name: 'bombay',
  chainID: 'bombay-12',
  lcd: 'https://bombay-lcd.terra.dev',
}

const walletConnectChainIds: Record<number, NetworkInfo> = {
  0: testnet,
  1: mainnet,
}

const AppProvider = ({ children }: { children: ReactNode }): ReactElement => {
  return (
    <WalletProvider
      connectorOpts={{ bridge: 'https://walletconnect.terra.dev/' }}
      defaultNetwork={mainnet}
      walletConnectChainIds={walletConnectChainIds}
    >
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>{children}</BrowserRouter>
        </QueryClientProvider>
      </RecoilRoot>
      <ToastContainer />
    </WalletProvider>
  )
}

export default AppProvider
