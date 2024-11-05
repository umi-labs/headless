import '@/app/globals.css'

import { Analytics } from '@vercel/analytics/react'
import type { Metadata, Viewport } from 'next'
import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import React, { Suspense } from 'react'

import { Cursor } from '@/app/_components/global/Cursor/Cursor'
import { Footer } from '@/app/_components/global/Footer'
import { Navbar } from '@/app/_components/global/Navbar'
import { urlForOpenGraphImage } from '@/sanity/lib/utils'
import {
  loadHomePage,
  loadSEOSettings,
  loadSettings,
} from '@/sanity/loader/loadQuery'
import { config } from '@/lib/config'
import NavbarSkeleton from '@/app/_components/global/Navbar/NavbarSkeleton'

const LiveVisualEditing = dynamic(
  () => import('@/sanity/loader/LiveVisualEditing'),
)

export async function generateMetadata(): Promise<Metadata> {
  const [{ data: settings }, { data: homePage }, { data: seoSettings }] =
    await Promise.all([loadSettings(), loadHomePage(), loadSEOSettings()])

  const seo = seoSettings?.metaData

  const ogImage = urlForOpenGraphImage(seo?.ogImage)
  return {
    title: seo?.title
      ? {
          template: `%s | ${seo.title}`,
          default: seo.title || config.name,
        }
      : {
          template: `%s | ${settings?.name}`,
          default: settings?.name || config.name,
        },
    description: seo?.description ? seo.description : undefined,
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
    keywords: seo?.keywords ? seo.keywords : undefined,
  }
}

export const viewport: Viewport = {
  themeColor: '--background-color',
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const [{ data: settings }] = await Promise.all([loadSettings()])

  return (
    <>
      <div
        className={`flex min-h-screen flex-col font-space-grotesk ${settings?.customCursor ? 'custom-cursor' : ''}`}
      >
        <Suspense fallback={<NavbarSkeleton />}>
          <Navbar />
        </Suspense>
        <div className="flex-grow">
          <Suspense>{children}</Suspense>
        </div>
        <Suspense>
          <Footer />
        </Suspense>
        <Suspense>{settings?.customCursor && <Cursor />}</Suspense>
        <Suspense>
          <Analytics />
        </Suspense>
      </div>
      {draftMode().isEnabled && <LiveVisualEditing />}
    </>
  )
}
