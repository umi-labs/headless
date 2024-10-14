'use client'

import React from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { resolveHref } from '@/sanity/lib/utils'
import type { MainNav, MenuItem, NavItem, SettingsPayload } from '@/types'

interface MenuProps {
  show: boolean
  setShow: any
  data: SettingsPayload
}

const MenuStyles = {
  default: cn(
    'bg-isabelline h-[80vh] w-full fixed top-0 left-0 overflow-hidden z-[90] transition-all translate-y-0 shadow-md duration-300 ease-in-out',
  ),
  closed: cn('translate-y-[-100%] shadow-none'),
}

export default function Menu({ data, show, setShow }: MenuProps) {
  React.useEffect(() => {
    /* document.body.style.overflowY = show ? "hidden" : "scroll"; */
  }, [show])

  const menu = data?.mainNav?.items || ([] as NavItem[])

  console.log('data: ', data)

  React.useEffect(() => {
    const keyDownHandler = (event: any) => {
      if (event.key === 'Escape' && show) {
        event.preventDefault()

        setShow(!show)
      }
    }

    document.addEventListener('keydown', keyDownHandler)

    return () => {
      document.removeEventListener('keydown', keyDownHandler)
    }
  }, [show, setShow])

  return (
    <>
      <div className={cn(MenuStyles.default, !show && MenuStyles.closed)}>
        {show && (
          <div className="h-full flex flex-col items-start justify-end col-span-3 uppercase p-8">
            <div className="text-8xl md:text-[12rem]">Menu</div>
            <ul className="list-none ml-0">
              {menu &&
                menu.map((menuItem, key) => {
                  const href = menuItem.navItemUrl.displayExternal
                    ? menuItem.navItemUrl.externalUrl
                    : resolveHref(
                        menuItem?.navItemUrl?.internalLink?._type,
                        menuItem?.navItemUrl?.internalLink?.slug,
                      )
                  if (!href) {
                    return null
                  }
                  return (
                    <li
                      className="uppercase text-4xl md:text-6xl"
                      onClick={() => setShow(!show)}
                      key={key}
                    >
                      <Link className="uppercase" href={href}>
                        {menuItem.name}
                      </Link>
                    </li>
                  )
                })}
            </ul>
          </div>
        )}
      </div>
      {show && (
        <div
          onClick={() => setShow(!show)}
          className="absolute top-0 w-screen h-screen bg-black opacity-30 z-[89] left-0 overflow-hidden"
        />
      )}
    </>
  )
}
