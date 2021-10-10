import { ReactElement, useState } from 'react'
import styled from 'styled-components'
import { IconCopy, IconWallet } from '@tabler/icons'
import { useConnectedWallet, useWallet } from '@terra-money/wallet-provider'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import ClickAwayListener from 'react-click-away-listener'
import { toast } from 'react-toastify'

import finderLogo from 'images/finder_logo.svg'

import { COLOR, STYLE, UTIL } from 'consts'

import {
  FormText,
  View,
  Row,
  Card,
  Hr,
  FormImage,
  LinkFinder,
} from 'components'

import useSelectWallet from 'hooks/common/useSelectWallet'
import useMyBalance from 'hooks/common/useMyBalance'
import { TokenDenomEnum } from 'types'

const StyledSelectWallet = styled(Row)`
  ${STYLE.clickable};
`

const StyledUserWalletBtn = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
`

const StyledUserWalletFloat = styled(View)`
  z-index: 1;
  position: absolute;
  top: 50px;
  right: 40px;
  @media ${STYLE.media.tablet} {
    right: 24px;
  }
`

const StyledCard = styled(Card)`
  align-items: flex-start;
  padding: 20px 0 0;
  box-shadow: 0 10px 40px 0 rgba(0, 0, 0, 0.2);
  @media ${STYLE.media.tablet} {
    width: 240px;
  }
`

const StyledLinkToFinder = styled(View)`
  padding: 10px;
  flex-direction: row;
  align-items: center;
  border: 1px solid ${COLOR.primary._600};
  margin-bottom: 15px;
  @media ${STYLE.media.tablet} {
  }
`

const StyledCopyAddress = styled(View)`
  ${STYLE.clickable};
  padding-bottom: 10px;
`

const StyledDisconnectWallet = styled(View)`
  ${STYLE.clickable};
  padding: 13px 24px;
  align-items: center;
`

const Wallet = (): ReactElement => {
  const [showWalletInfo, setShowWalletInfo] = useState(false)

  const { disconnect } = useWallet()
  const connectedWallet = useConnectedWallet()
  const { openSelectWallet } = useSelectWallet()

  const { getTokenBalance } = useMyBalance()

  const onClickCopyAddress = (): void => {
    toast(`Copied Miaw!`, {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
  }

  const disconnectWallet = (): void => {
    disconnect()
  }

  if (connectedWallet) {
    return (
      <ClickAwayListener
        onClickAway={(): void => {
          setShowWalletInfo(false)
        }}
      >
        <View>
          <StyledUserWalletBtn
            onClick={(): void => {
              setShowWalletInfo(true)
            }}
          >
            <IconWallet size={16} color={COLOR.gray._600} />
            <FormText fontType="B16" color={COLOR.gray._600}>
              {UTIL.formatAmount(getTokenBalance(TokenDenomEnum.uusd))} UST
            </FormText>
          </StyledUserWalletBtn>
          {showWalletInfo && (
            <StyledUserWalletFloat>
              <StyledCard>
                <View style={{ width: '100%' }}>
                  <View style={{ padding: '0 24px' }}>
                    <StyledCopyAddress>
                      <CopyToClipboard
                        text={connectedWallet.walletAddress}
                        onCopy={onClickCopyAddress}
                      >
                        <Row
                          style={{
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}
                        >
                          <FormText fontType="R16" color={COLOR.gray._800}>
                            {UTIL.truncate(connectedWallet.walletAddress)}
                          </FormText>
                          <IconCopy size={16} />
                        </Row>
                      </CopyToClipboard>
                    </StyledCopyAddress>
                    <LinkFinder
                      address={connectedWallet.walletAddress}
                      type="address"
                      title={
                        <StyledLinkToFinder>
                          <FormImage
                            src={finderLogo}
                            size={16}
                            style={{
                              marginRight: 5,
                              backgroundColor: COLOR.primary._600,
                              borderRadius: '50%',
                              border: `1px solid ${COLOR.primary._600}`,
                            }}
                          />
                          <FormText fontType="R12" color={COLOR.gray._800}>
                            View on Terra Finder
                          </FormText>
                        </StyledLinkToFinder>
                      }
                    />
                  </View>
                  <Hr type="dashed" />
                  <StyledDisconnectWallet onClick={disconnectWallet}>
                    <FormText fontType="B14" color={COLOR.error}>
                      Disconnect
                    </FormText>
                  </StyledDisconnectWallet>
                </View>
              </StyledCard>
            </StyledUserWalletFloat>
          )}
        </View>
      </ClickAwayListener>
    )
  }

  return (
    <StyledSelectWallet onClick={openSelectWallet}>
      <FormText fontType="R14">Connect Wallet </FormText>
    </StyledSelectWallet>
  )
}

export default Wallet
