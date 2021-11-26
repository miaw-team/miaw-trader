import { ReactElement } from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import {
  ConnectType,
  useWallet,
  WalletStatus,
} from '@terra-money/wallet-provider'
import { IconAlertCircle, IconX } from '@tabler/icons'
import { isDesktop, isChrome, isEdgeChromium } from 'react-device-detect'

import { COLOR, STYLE } from 'consts'
import { View, FormText, Modal, Row } from 'components'
import appStore from 'store/appStore'
import FormImage from 'components/FormImage'

import terraPng from 'images/terra.png'
import wallet_connectPng from 'images/wallet_connect.png'
import useLink from 'hooks/common/useLink'

const StyledContainer = styled(View)`
  height: 100%;
  @media ${STYLE.media.tablet} {
    justify-content: flex-end;
  }
`

const StyledWalletBox = styled(View)`
  ${STYLE.setMediaWidth('sm')}
  margin: auto;
  background-color: ${COLOR.gray._900};
  padding: 29px;
  border-radius: 15px;
  @media ${STYLE.media.tablet} {
    border-radius: 15px 15px 0 0;
    padding-bottom: 50px;
  }
`

const StyledTitle = styled(View)`
  position: relative;
  align-items: center;
  margin-bottom: 40px;
`

const StyledCloseBtn = styled(View)`
  ${STYLE.clickable};
  position: absolute;
  right: 0;
  top: 8px;
`

const StyledConnectBtn = styled(Row)<{ disabled?: boolean }>`
  ${STYLE.clickable};
  height: 76px;
  padding: 0 28px;
  border-radius: 15px;
  border: 1px solid;
  cursor: ${({ disabled }): string => (disabled ? 'default' : 'pointer')};
  border-color: ${({ disabled }): string =>
    disabled ? '#363A3D' : COLOR.gray._930};
  justify-content: space-between;
  align-items: center;
  background-color: ${({ disabled }): string =>
    disabled ? 'tranparent' : COLOR.gray._930};
  transition: all 0.3s ease 0s;
  :hover {
    opacity: 1;
    border-color: ${({ disabled }): string =>
      disabled ? '#363A3D' : COLOR.primary._400};
  }
`

const ErrorMessage = ({
  message,
  linkMessage,
  onClick,
}: {
  message: string
  linkMessage: string
  onClick?: () => void
}): ReactElement => {
  return (
    <Row
      style={{
        alignItems: 'center',
        cursor: onClick ? 'pointer' : 'not-allowed',
      }}
      onClick={onClick}
    >
      <IconAlertCircle size={14} color={COLOR.error} />
      <FormText fontType={'R14'} color={COLOR.error}>
        &nbsp;{message}&nbsp;
      </FormText>
      <FormText
        fontType={'R14'}
        color={COLOR.error}
        style={{ textDecoration: 'underline' }}
      >
        {linkMessage}
      </FormText>
    </Row>
  )
}

const SelectWallet = (): ReactElement => {
  const [isOpen, setIsOpen] = useRecoilState(appStore.isOpenSelectWallet)
  const { connect, availableInstallTypes, install, status } = useWallet()
  const { openLink } = useLink()
  const availableExtBrowser = isDesktop && (isChrome || isEdgeChromium)

  const availableExt =
    status !== WalletStatus.INITIALIZING &&
    false === availableInstallTypes.includes(ConnectType.EXTENSION) &&
    availableExtBrowser

  const errorMessage: {
    message: string
    linkMessage: string
    onClick?: () => void
  } = { message: '', linkMessage: '' }

  if (false === availableExtBrowser) {
    errorMessage.message = 'Available for desktop'
    errorMessage.linkMessage = 'Chrome'
    errorMessage.onClick = (): void => {
      openLink('https://www.google.com/chrome')
    }
  } else if (false === availableExt) {
    errorMessage.message = 'Download'
    errorMessage.linkMessage = 'Terra Station Extension'
    errorMessage.onClick = (): void => {
      install(ConnectType.EXTENSION)
    }
  }

  const connectTo = (connectType: ConnectType): void => {
    connect(connectType)
    setIsOpen(false)
  }

  return (
    <Modal isOpen={isOpen}>
      <StyledContainer>
        <StyledWalletBox>
          <StyledTitle>
            <FormText fontType={'R20'} color={COLOR.gray._50}>
              Connect Wallet
            </FormText>
            <StyledCloseBtn
              onClick={(): void => {
                setIsOpen(false)
              }}
            >
              <IconX color={COLOR.gray._300} size={14} />
            </StyledCloseBtn>
          </StyledTitle>

          <View style={{ marginBottom: 15 }}>
            <StyledConnectBtn
              disabled={false === availableExt}
              onClick={(): void => {
                availableExt && connectTo(ConnectType.EXTENSION)
              }}
            >
              <View>
                <FormText
                  fontType={'R16'}
                  color={COLOR.primary._400}
                  style={{
                    flexDirection: 'row',
                    opacity: availableExt ? 1 : 0.3,
                  }}
                >
                  Terra Station<b>&nbsp;Extension</b>
                </FormText>
                {errorMessage.message && <ErrorMessage {...errorMessage} />}
              </View>
              <FormImage
                src={terraPng}
                size={24}
                style={{ opacity: availableExt ? 1 : 0.3 }}
              />
            </StyledConnectBtn>
          </View>
          <StyledConnectBtn
            onClick={(): void => {
              connectTo(ConnectType.WALLETCONNECT)
            }}
          >
            <FormText
              fontType={'R16'}
              color={COLOR.primary._400}
              style={{ flexDirection: 'row' }}
            >
              Terra Station<b>&nbsp;Mobile</b>
            </FormText>
            <FormImage src={wallet_connectPng} size={24} />
          </StyledConnectBtn>
        </StyledWalletBox>
      </StyledContainer>
    </Modal>
  )
}

export default SelectWallet
