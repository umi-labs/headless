import './globals.css'

import { Space_Grotesk } from 'next/font/google'
import localFont from 'next/font/local'
import { loadThemeSettings } from '@/sanity/loader/loadQuery'
import React from 'react'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

const satoshi = localFont({
  src: '../assets/fonts/Satoshi.woff2',
  variable: '--font-satoshi',
})

const satoshiItalic = localFont({
  src: '../assets/fonts/SatoshiItalic.woff2',
  variable: '--font-satoshi-italic',
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [{ data: themeSettings }] = await Promise.all([loadThemeSettings()])

  const styles = {
    '--background-color': themeSettings?.background?.hex,
    '--foreground-color': themeSettings?.foreground?.hex,
    '--accent-color': themeSettings?.accent?.hex,
  } as React.CSSProperties

  return (
    <html
      lang="en"
      className={`${satoshi.variable} ${satoshiItalic.variable} ${spaceGrotesk.variable} font-sans`}
      style={styles}
    >
      <head>
        <title></title>
        <link
          rel="apple-touch-icon"
          href={themeSettings?.favicon?.appleTouchIcon?.asset?.url}
          sizes="180x180"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={themeSettings?.favicon?.favicon32?.asset?.url}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={themeSettings?.favicon?.favicon32?.asset?.url}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href={themeSettings?.favicon?.androidChrome192?.asset?.url}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
