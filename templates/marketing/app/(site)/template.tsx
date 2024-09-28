'use client'

import React from 'react'

import { animatePageIn } from '@/lib/utils'

export default function Template({ children }: { children: React.ReactNode }) {
  /* React.useEffect(() => {
    animatePageIn()
  }, []) */

  return (
    <div>
      {/* <div
        id="transition-element"
        className="fixed left-0 top-0 z-[1000] h-screen w-screen bg-black"
      ></div> */}
      {children}
    </div>
  )
}
