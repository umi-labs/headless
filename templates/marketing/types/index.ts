import type { PortableTextBlock } from 'next-sanity'
import type { Image } from 'sanity'
import { HomeHeroProps } from '@/app/_components/shared/Heros/HomeHero'
import { PrimaryHeroProps } from '@/app/_components/shared/Heros/PrimaryHero'

export interface MenuItem {
  _type: string
  slug?: string
  title?: string
}

export interface MainNav {
  id: string
  _type: string
  title: string
  displayList: boolean
  items: NavItem[]
}

export interface NavItem {
  _type: string
  _key: string
  name: string
  navItemUrl: {
    _type: string
    displayExternal: boolean
    externalUrl: string
    internalLink?: {
      _type: string
      title: string
      slug?: string
    }
  }
}

export interface SocialLinkItem {
  _key: string
  _type: string
  link?: string
  title?: string
}

export interface MetaData {
  title?: string
  description?: string
  ogImage?: Image
  keywords?: string[]
}

export interface HeroProps {
  HomeHero?: HomeHeroProps[]
  PrimaryHero?: PrimaryHeroProps[]
}

// Page payloads

export interface HomePagePayload {
  hero?: HeroProps[]
  blocks?: PortableTextBlock[]
  footer?: PortableTextBlock[]
  overview?: PortableTextBlock[]
  metaData?: MetaData
  title?: string
}

export interface PagePayload {
  hero?: PortableTextBlock[]
  blocks?: PortableTextBlock[]
  body?: PortableTextBlock[]
  name?: string
  overview?: PortableTextBlock[]
  metaData?: MetaData
  title?: string
  slug?: string
}

export interface SettingsPayload {
  name?: string
  initials?: string
  socialLinks?: SocialLinkItem[]
  customCursor?: boolean
  footer?: PortableTextBlock[]
  menuItems?: MenuItem[]
  mainNav?: MainNav
  ogImage?: Image
}

export interface SEOSettingsPayload {
  metaData?: MetaData
}

type Color = {
  _type: string
  hex: string
  alpha: number
  hsl: {
    _type: 'hslaColor'
    h: number
    s: number
    l: number
    a: number
  }
  hsv: {
    _type: 'hsvaColor'
    h: number
    s: number
    v: number
    a: number
  }
  rgb: {
    _type: 'rgbaColor'
    r: number
    g: number
    b: number
    a: number
  }
}

type Favicon = {
  favicon32?: {
    asset?: {
      url: string
    }
  }
  appleTouchIcon?: {
    asset?: {
      url: string
    }
  }
  androidChrome192?: {
    asset?: {
      url: string
    }
  }
}

export interface ThemeSettingsPayload {
  logo?: Image
  favicon?: Favicon
  background?: Color
  foreground?: Color
  accent?: Color
}
