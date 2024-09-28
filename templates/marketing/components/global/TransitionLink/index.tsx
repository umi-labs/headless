'use client'
import './transition-link.module.css'

import clsx from 'clsx'
import Link, { LinkProps } from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { UrlObject } from 'url'

import { animatePageOut } from '@/lib/utils'

interface Props {
  name?: string
  href: string | UrlObject
  classes?: React.ComponentProps<'div'>['className']
  children?: React.ReactNode
}

function StyledLink({ name, href, classes, children }: Props) {
  return (
    <Link
      className={clsx('link interactable', classes)}
      href={href}
      aria-label={`${name} page`}
    >
      {children ? children : <span>{name}</span>}
    </Link>
  )
}

interface TransitionLinkProps extends React.ComponentPropsWithoutRef<'a'> {
  href: string
  label?: string
  children?: React.ReactNode
  classes?: string
}

function TransitionLink({
  href = '',
  label,
  children,
  classes,
  ...props
}: TransitionLinkProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleClick = () => {
    animatePageOut(href, router, pathname)
  }

  return (
    <button
      className={clsx('link interactable cursor-pointer', classes)}
      // @ts-ignore
      onClick={handleClick}
      {...props}
    >
      {label ? label : children}
    </button>
  )
}

export { StyledLink, TransitionLink }
