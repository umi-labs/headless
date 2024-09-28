import './globals.css'

import { Space_Grotesk } from 'next/font/google'
import localFont from 'next/font/local'

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
  return (
    <html
      lang="en"
      className={`${satoshi.variable} ${satoshiItalic.variable} ${spaceGrotesk.variable} font-sans`}
    >
      <body>{children}</body>
    </html>
  )
}
