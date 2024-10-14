'use client'

import React from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import type { SettingsPayload } from '@/types'

import Menu from './Menu'

interface NavbarProps {
  data: SettingsPayload
}

const MenuLine = {
  default: cn(
    'h-[2px] bg-black transition-all duration-300 ease w-8 lg:first-of-type:w-6 lg:group-hover:first-of-type:w-8 lg:group-hover:last-of-type:w-6',
  ),
  open: cn(
    'w-8 lg:first-of-type:w-8 lg:group-hover:last-of-type:w-8 transform first-of-type:rotate-45 first-of-type:translate-y-[200%] last-of-type:-rotate-45 last-of-type:-translate-y-[200%] delay-150',
  ),
}

export default function NavbarLayout(props: NavbarProps) {
  const { data } = props

  const [menu, setMenu] = React.useState(false)

  return (
    <nav className="fixed top-0 z-[1000] flex w-full justify-between items-center px-8 lg:pr-12 py-4 bg-transparent backdrop-blur-sm">
      <div>
        <Link
          href={'/'}
          className={cn(
            'navbar__home flex whitespace-nowrap justify-center items-center font-semibold overflow-x-hidden text-black interactable',
          )}
        >
          <span className={''}>{data.name}</span>
        </Link>
      </div>
      {data?.mainNav?.items && data.mainNav.items.length > 0 && (
        <>
          <button
            aria-label="menu-button"
            onClick={() => setMenu(!menu)}
            className={cn(
              'interactable z-[100] flex flex-col items-center justify-center lg:items-start lg:justify-start gap-[4px] w-8 p-4 transition-all duration-300 ease group',
              menu ? 'open' : 'closed',
            )}
          >
            <div className={cn(MenuLine.default, menu && MenuLine.open)} />
            <div className={cn(MenuLine.default, menu && MenuLine.open)} />
          </button>
          <Menu data={data} show={menu} setShow={setMenu} />
        </>
      )}
    </nav>
  )
}
