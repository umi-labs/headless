'use client'
/**
 * This config is used to set up Sanity Studio that's mounted on the `app/studio/[[...index]]/page.tsx` route
 */

import { defineConfig } from 'sanity'
import { CodeIcon, RocketIcon } from '@sanity/icons'
import { configGenerator } from '@/sanity/lib'

export default defineConfig([
  {
    ...configGenerator({
      name: 'studio',
      subtitle: 'production',
      title: 'Production',
      icon: RocketIcon,
    }),
  },
  {
    ...configGenerator({
      name: 'studio-development',
      subtitle: 'development',
      title: 'Development',
      dataset: 'development',
      icon: CodeIcon,
    }),
  },
])
