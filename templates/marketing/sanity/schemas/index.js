// import type { SchemaTypeDefinition } from 'sanity'

// Singletons
import { blocks, home, seoSettings, siteSettings, themeSettings } from '@/sanity/schemas/singletons'

// Documents
import page from '@/sanity/schemas/documents/page'
import post from '@/sanity/schemas/documents/post'
import contactForm from '@/sanity/schemas/documents/contact-form'
import form from '@/sanity/schemas/documents/form'
import inbox from '@/sanity/schemas/documents/inbox'
import navigation from '@/sanity/schemas/documents/navigation'

// Objects
import formBuilder from '@/sanity/schemas/objects/form-builder'
import formFields from '@/sanity/schemas/objects/form-fields'
import primaryHero from '@/sanity/schemas/objects/primary-hero'
import basicHero from '@/sanity/schemas/objects/basic-hero'
import imageWithText from '@/sanity/schemas/objects/image-with-text'
import contactFormBlock from '@/sanity/schemas/objects/contact-form-block'
import metaData from '@/sanity/schemas/objects/meta-data'
import navItem from '@/sanity/schemas/objects/navigation/nav-item'
import navList from '@/sanity/schemas/objects/navigation/nav-list'
import link from '@/sanity/schemas/objects/navigation/link'
import favicon from '@/sanity/schemas/objects/favicon'
import postType from '@/sanity/schemas/documents/post-type'

export const schema = [
  // Singletons
  home,
  siteSettings,
  themeSettings,
  seoSettings,
  blocks,

  // Documents
  page,
  post,
  postType,
  contactForm,
  form,
  inbox,
  navigation,

  // Objects
  primaryHero,
  basicHero,
  imageWithText,
  contactFormBlock,
  formBuilder,
  formFields,
  metaData,
  navItem,
  navList,
  link,
  favicon,
]

export const singletons = [
  home,
  siteSettings.name,
  themeSettings.name,
  seoSettings.name,
]
