'use client'
/**
 * This config is used to set up Sanity Studio that's mounted on the `app/studio/[[...index]]/page.tsx` route
 */

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { presentationTool } from 'sanity/presentation'
import { structureTool } from 'sanity/structure'
import {
  dashboardTool,
  projectUsersWidget,
  projectInfoWidget,
} from '@sanity/dashboard'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import { tags } from 'sanity-plugin-tags'
import { media } from 'sanity-plugin-media'
import { vercelDeployTool } from 'sanity-plugin-vercel-deploy'
import { RocketIcon, CodeIcon } from '@sanity/icons'
import { Desk } from '@/sanity/lib/desk'

import { apiVersion, dataset, projectId, studioUrl } from '@/sanity/lib/api'
import * as resolve from '@/sanity/plugins/resolve'
import { singletonPlugin } from '@/sanity/plugins/settings'
import { schema, singletons } from './sanity/schemas'
import { ProductionNavbar, DevelopmentNavbar } from '@/sanity/lib/studio'
const title = process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || 'Test Site'

export default defineConfig([
  {
    name: 'studio',
    basePath: `${studioUrl}/production`,
    projectId: projectId || '',
    dataset: dataset || '',
    title: `${title} - Production`,
    subtitle: 'production',
    icon: RocketIcon,
    schema: {
      // @ts-ignore
      types: schema,
    },
    plugins: [
      structureTool({
        structure: Desk,
      }),
      presentationTool({
        resolve,
        previewUrl: {
          previewMode: {
            enable: '/api/draft',
          },
        },
      }),
      // Configures the global "new document" button, and document actions, to suit the Settings document singleton
      singletonPlugin(
        singletons.map((singleton) =>
          typeof singleton === 'string' ? singleton : singleton.name,
        ),
      ),
      // Add an image asset source for Unsplash
      unsplashImageAsset(),
      // Vision lets you query your content with GROQ in the studio
      // https://www.sanity.io/docs/the-vision-plugin
      visionTool({ defaultApiVersion: apiVersion }),
      tags({}),
      media(),
      vercelDeployTool(),
      dashboardTool({
        widgets: [projectUsersWidget(), projectInfoWidget()],
      }),
    ],
    studio: {
      components: {
        navbar: ProductionNavbar,
      },
    },
  },
  {
    name: 'studio-development',
    basePath: `${studioUrl}/development`,
    projectId: projectId || '',
    dataset: 'development' || '',
    title: `${title} - Development`,
    subtitle: 'development',
    icon: CodeIcon,
    schema: {
      types: schema,
    },
    plugins: [
      structureTool({
        structure: Desk,
      }),
      presentationTool({
        resolve,
        previewUrl: {
          previewMode: {
            enable: '/api/draft',
          },
        },
      }),
      // Configures the global "new document" button, and document actions, to suit the Settings document singleton
      singletonPlugin(
        singletons.map((singleton) =>
          typeof singleton === 'string' ? singleton : singleton.name,
        ),
      ),
      // Add an image asset source for Unsplash
      unsplashImageAsset(),
      // Vision lets you query your content with GROQ in the studio
      // https://www.sanity.io/docs/the-vision-plugin
      visionTool({ defaultApiVersion: apiVersion }),
      tags({}),
      media(),
      vercelDeployTool(),
    ],
    studio: {
      components: {
        navbar: DevelopmentNavbar,
      },
    },
  },
])
