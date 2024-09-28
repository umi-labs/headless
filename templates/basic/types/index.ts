import type { PortableTextBlock } from 'next-sanity'
import type { Image } from 'sanity'
import { HomeHeroProps } from '@/components/shared/Heros/HomeHero'
import { PrimaryHeroProps } from '@/components/shared/Heros/PrimaryHero'

export interface MenuItem {
  _type: string
  slug?: string
  title?: string
}

export interface MainNav {
  id: string;
  _type: string;
  title: string;
  displayList: boolean;
  items: NavItem[];
}

export interface NavItem {
  _type: string;
  _key: string;
  name: string;
  navItemUrl: {
    _type: string;
    displayExternal: boolean;
    externalUrl: string;
    internalLink?: {
      _type: string;
      title: string;
      slug?: string;
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

