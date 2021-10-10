import { useConnectedWallet } from '@terra-money/wallet-provider'
import useLayout from 'hooks/common/useLayout'
import useSelectWallet from 'hooks/common/useSelectWallet'
import { ReactElement } from 'react'

import Button, { ButtonProps } from './Button'

const AuthButton = (props: ButtonProps): ReactElement => {
  const connectedWallet = useConnectedWallet()
  const { openSelectWallet } = useSelectWallet()
  const { isTabletWidth } = useLayout()
  return connectedWallet ? (
    <Button {...props} />
  ) : (
    <Button style={props.style} onClick={openSelectWallet}>
      {isTabletWidth ? 'Connect' : 'Connect Wallet'}
    </Button>
  )
}

export default AuthButton
