import { css, FlattenSimpleInterpolation } from 'styled-components'

const CAT_EMOJI = '🐱'

const DESKTOP_WIDE = 1440
const TABLET = 1024
const MOBILE = 481

const media = {
  mobile: `(max-width: ${MOBILE - 1}px)`,
  tablet: `(max-width: ${TABLET - 1}px)`,
}

const setMediaWidth = (type?: 'sm' | 'lg'): FlattenSimpleInterpolation => css`
  margin: 0 auto;
  width: ${type === 'lg' ? DESKTOP_WIDE : type === 'sm' ? MOBILE : TABLET}px;
  max-width: 100%;
  @media ${media.tablet} {
    width: auto;
    margin: 0;
  }
`

const clickable = css`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`

export default {
  TABLET,
  MOBILE,
  CAT_EMOJI,
  setMediaWidth,
  media,
  clickable,
}
