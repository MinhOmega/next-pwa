'use client'

import { useEffect } from 'react'
import Script from 'next/script'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => console.log('Service Worker registered'))
        .catch((error) => console.log('Service Worker registration failed:', error))
    }
  }, [])

  return (
    <>
      <Script src="/pwa.js" strategy="afterInteractive" />
      {children}
    </>
  )
}