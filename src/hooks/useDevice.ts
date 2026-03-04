// hooks/useDevice.ts
import { useEffect, useState } from 'react'

const MOBILE_BREAKPOINT = 1200;

export function useDevice() {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isMobileWidth = width <= MOBILE_BREAKPOINT

  const isTouchDevice =
    'ontouchstart' in window || navigator.maxTouchPoints > 0

  const isWebView =
    navigator.userAgent.includes('wv') ||
    navigator.userAgent.includes('ReactNative')

  return {
    isMobile: isMobileWidth,
    isTouchDevice,
    isWebView,
    width
  }
}