import useLayout from 'hooks/common/useLayout'
import { HTMLAttributes, ReactElement, ReactNode } from 'react'

import Text from './Text'

export type FontType =
  | 'B32'
  | 'R32'
  | 'B24'
  | 'R24'
  | 'B20'
  | 'R20'
  | 'B18'
  | 'R18'
  | 'B16'
  | 'R16'
  | 'B14'
  | 'R14'
  | 'B12'
  | 'R12'

type FormTextProps = {
  fontType?: FontType | { default: FontType; mobile?: FontType }
  children: ReactNode
  color?: string
} & HTMLAttributes<HTMLDivElement>

const getFontStyle = (
  fontType: FontType
): {
  fontSize: number
  fontWeight: number
} => {
  switch (fontType) {
    case 'B32':
      return { fontSize: 32, fontWeight: 700 }
    case 'R32':
      return { fontSize: 32, fontWeight: 400 }
    case 'B24':
      return { fontSize: 24, fontWeight: 700 }
    case 'R24':
      return { fontSize: 24, fontWeight: 400 }
    case 'B20':
      return { fontSize: 20, fontWeight: 700 }
    case 'R20':
      return { fontSize: 20, fontWeight: 400 }
    case 'B18':
      return { fontSize: 18, fontWeight: 700 }
    case 'R18':
      return { fontSize: 18, fontWeight: 400 }
    case 'B16':
      return { fontSize: 16, fontWeight: 700 }
    case 'R16':
      return { fontSize: 16, fontWeight: 400 }
    case 'B14':
      return { fontSize: 14, fontWeight: 700 }
    case 'R14':
      return { fontSize: 14, fontWeight: 400 }
    case 'B12':
      return { fontSize: 12, fontWeight: 700 }
    case 'R12':
      return { fontSize: 12, fontWeight: 400 }
  }
}

const FormText = ({
  fontType = 'R18',
  children,
  color,
  style,
  ...rest
}: FormTextProps): ReactElement => {
  const { isMobileWidth } = useLayout()

  let _fontType: FontType
  if (typeof fontType === 'object') {
    _fontType = isMobileWidth
      ? fontType.mobile || fontType.default
      : fontType.default
  } else {
    _fontType = fontType
  }

  const fontStyle = getFontStyle(_fontType)

  return (
    <Text
      style={{ color, ...fontStyle, ...style }}
      children={children}
      {...rest}
    />
  )
}

export default FormText
