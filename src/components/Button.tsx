import { ButtonHTMLAttributes, ReactElement } from 'react'
import styled from 'styled-components'

import { COLOR } from 'consts'

const StyledDefaultButton = styled.button<ButtonProps>`
  width: 100%;
  font-size: 18px;
  text-align: center;
  border-style: none;
  box-sizing: border-box;
  user-select: none;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: -0.3px;
  border-radius: 21px;
  height: 36px;
  cursor: pointer;
  :disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

const StyledPrimaryButton = styled(StyledDefaultButton)<ButtonProps>`
  color: ${COLOR.gray._50};
  background: ${COLOR.primary._400};

  :hover {
    color: ${COLOR.gray._50};
    background: ${COLOR.primary._600};
  }
  :active {
    color: ${COLOR.gray._50};
    background-color: ${COLOR.primary._600};
  }
  :disabled {
    opacity: 0.6;
    animation: none;
  }
`

const StyledOutlineButton = styled(StyledDefaultButton)<ButtonProps>`
  color: ${COLOR.gray._800};
  background: transparent;
  border: 1px solid ${COLOR.gray._800};

  :hover {
    color: ${COLOR.gray._950};
    border: 1px solid ${COLOR.primary._400};
  }
  :active {
    color: ${COLOR.gray._600};
    background: transparent;
  }
`

export type ButtonProps = {
  theme?: 'primary' | 'outline'
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({ theme = 'primary', ...rest }: ButtonProps): ReactElement => {
  switch (theme) {
    case 'outline':
      return <StyledOutlineButton type="button" theme={theme} {...rest} />
    default:
      return <StyledPrimaryButton type="button" theme={theme} {...rest} />
  }
}

export default Button
