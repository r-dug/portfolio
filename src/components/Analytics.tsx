import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export function Analytics() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.gtag?.('event', 'page_view', {
      page_path: pathname,
      page_title: document.title,
    })
  }, [pathname])

  return null
}
