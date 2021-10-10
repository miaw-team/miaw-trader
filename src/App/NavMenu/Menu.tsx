import { ReactElement, useState } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import { useLocation } from 'react-router-dom'

import logo from 'images/miaw/cat_logo.png'

import { COLOR, STYLE } from 'consts'

import { FormText, Row, FormImage, View, Modal } from 'components'

import { RoutePath } from 'types'
import useRoute from 'hooks/common/useRoute'
import useLayout from 'hooks/common/useLayout'
import { IconChevronDown } from '@tabler/icons'

const StyledContainer = styled(Row)`
  align-items: center;
`

const StyledBrand = styled(Row)`
  ${STYLE.clickable};
  align-items: center;
`

const StyledMenu = styled(Row)`
  padding-left: 10px;
`
const StyledMenuItem = styled(Row)`
  ${STYLE.clickable};
  align-items: center;
  padding-right: 19px;
  text-transform: uppercase;

  @media ${STYLE.media.tablet} {
    padding-right: 0;
    padding: 20px 0;
    justify-content: space-between;
  }
`

const Menu = (): ReactElement => {
  const { push } = useRoute()
  const location = useLocation()
  const { pathname } = location
  const { isTabletWidth } = useLayout()
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false)

  let menuList = [
    {
      to: RoutePath.lpTower,
      title: 'Lp Tower',
    },
    {
      to: RoutePath.say_miaw,
      title: 'Say Miaw',
    },
    {
      to: RoutePath.send,
      title: 'Send Miaw',
    },
    {
      to: RoutePath.miaw_paper,
      title: 'Miaw Paper',
    },
  ]

  const selectedMenu = menuList.find((x) =>
    x.to.includes(pathname.split('/')[1])
  )

  return isTabletWidth ? (
    <>
      <Row style={{ alignItems: 'center' }}>
        <FormImage src={logo} size={26} style={{ marginRight: 6 }} />
        <Row
          onClick={(): void => {
            setIsOpenMobileMenu(true)
          }}
          style={{ alignItems: 'center' }}
        >
          <FormText fontType="B14" color={COLOR.primary._400}>
            {selectedMenu?.title || 'Menu'}
          </FormText>

          <IconChevronDown
            color={COLOR.gray._900}
            size={21}
            style={{
              marginLeft: 4,
              border: `2px solid ${COLOR.gray._900}`,
              borderRadius: 8,
            }}
          />
        </Row>
      </Row>
      <Modal isOpen={isOpenMobileMenu}>
        <View style={{ backgroundColor: COLOR.white }}>
          <Row
            style={{ alignItems: 'center', height: 60, padding: '0 16px' }}
            onClick={(): void => {
              push(RoutePath.home)
              setIsOpenMobileMenu(false)
            }}
          >
            <FormImage src={logo} size={30} style={{ marginRight: 6 }} />
            <FormText fontType="B14">Miaw Trader</FormText>
          </Row>
          <View style={{ padding: '0 22px' }}>
            {_.map(menuList, (menu, index) => {
              const isActive = menu.to.includes(pathname.split('/')[1])

              return (
                <StyledMenuItem
                  key={`menuList-${index}`}
                  onClick={(): void => {
                    push(menu.to)
                    setIsOpenMobileMenu(false)
                  }}
                >
                  <FormText
                    fontType="B16"
                    style={{
                      borderBottom: isActive
                        ? `1px solid ${COLOR.primary._600}`
                        : '1px solid #eeeeee00',
                    }}
                  >
                    {menu.title}
                  </FormText>
                </StyledMenuItem>
              )
            })}
          </View>
        </View>
      </Modal>
    </>
  ) : (
    <StyledContainer>
      <StyledBrand onClick={(): void => push(RoutePath.home)}>
        <FormImage src={logo} size={30} style={{ marginRight: 6 }} />
        <FormText
          fontType={{ default: 'B24', mobile: 'B20' }}
          color={COLOR.primary._400}
        >
          Miaw Trader
        </FormText>
      </StyledBrand>

      <StyledMenu>
        {_.map(menuList, (menu, index) => {
          const isActive = menu.to.includes(pathname.split('/')[1])

          return (
            <StyledMenuItem
              key={`menuList-${index}`}
              onClick={(): void => {
                push(menu.to)
              }}
            >
              <FormText
                fontType="B16"
                style={{
                  borderBottom: isActive
                    ? `1px solid ${COLOR.primary._600}`
                    : '1px solid #eeeeee00',
                }}
              >
                {menu.title}
              </FormText>
            </StyledMenuItem>
          )
        })}
      </StyledMenu>
    </StyledContainer>
  )
}

export default Menu
