import { useEffect, useState, useMemo } from 'react'

import { STYLE } from 'consts'

const useLayout = (): {
  isDesktopWidth: boolean
  isTabletWidth: boolean
  isMobileWidth: boolean
} => {
  const [isMobileWidth, setIsMobileWidth] = useState<boolean>(
    window.innerWidth < STYLE.MOBILE
  )
  const [isTabletWidth, setIsTabletWidth] = useState<boolean>(
    window.innerWidth < STYLE.TABLET
  )

  const isDesktopWidth = useMemo(() => {
    return false === isTabletWidth && false === isMobileWidth
  }, [isTabletWidth, isMobileWidth])

  const updateSize = (): void => {
    setIsMobileWidth(window.innerWidth < STYLE.MOBILE)
    setIsTabletWidth(window.innerWidth < STYLE.TABLET)
  }

  useEffect(() => {
    window.addEventListener('resize', updateSize)
    updateSize()

    return (): void => {
      window.removeEventListener('resize', updateSize)
    }
  }, [])

  return {
    isTabletWidth,
    isMobileWidth,
    isDesktopWidth,
  }
}

export default useLayout
