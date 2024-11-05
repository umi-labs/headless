// Externals
import { structureTool } from 'sanity/structure'
import { presentationTool } from 'sanity/presentation'
import * as resolve from '@/sanity/plugins/resolve'
import { colorInput } from '@sanity/color-input'
import { singletonPlugin } from '@/sanity/plugins/settings'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import { visionTool } from '@sanity/vision'
import { tags } from 'sanity-plugin-tags'
import { media } from 'sanity-plugin-media'
import { vercelDeployTool } from 'sanity-plugin-vercel-deploy'
import {
  dashboardTool,
  projectInfoWidget,
  projectUsersWidget,
} from '@sanity/dashboard'

// Internals
import {
  apiVersion,
  dataset as db,
  Desk,
  Navbar,
  projectId,
  studioUrl,
  theme,
} from '@/sanity/lib'
import { schema, singletons } from '@/sanity/schemas'

export interface Config {
  name: string
  subtitle: string
  title: string
  dataset?: string
  icon: React.ComponentType
}

const title = process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || 'Test Site'

export function configGenerator({
  name,
  subtitle,
  title: baseTitle,
  dataset = db,
  icon,
}: Config) {
  return {
    name: name,
    basePath: `${studioUrl}/${subtitle}`,
    title: `${title} - ${baseTitle}`,
    subtitle: subtitle,
    projectId: projectId || '',
    dataset: dataset || '',
    theme: theme,
    icon: icon,
    schema: {
      // @ts-ignore
      types: schema,
    },
    studio: {
      components: {
        navbar: Navbar,
      },
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
      colorInput(),
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
  }
}
