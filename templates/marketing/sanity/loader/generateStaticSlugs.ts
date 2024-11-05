import 'server-only'

import { groq } from 'next-sanity'

import { client } from '@/sanity/lib/client'
import { token } from '@/sanity/lib/token'

// Used in `generateStaticParams`
export function generateStaticSlugs(type: string) {
  // Not using loadQuery as it's optimized for fetching in the RSC lifecycle
  return client
    .withConfig({
      token,
      perspective: 'published',
      useCdn: false,
      stega: false,
    })
    .fetch<string[]>(
      groq`*[_type == $type && defined(slug.current)]{"slug": slug.current}`,
      { type },
      {
        next: {
          tags: [type],
        },
      },
    )
}

export async function generateNestedStaticSlugs(type: string) {
  const paths = await fetchNestedSlugs(type)
  return paths.map((path) => ({ slug: path }))
}

// Utility function to recursively generate paths for nested post types
async function fetchNestedSlugs(type, parentSlug = []) {
  const data = await client
    .withConfig({
      token,
      perspective: 'published',
      useCdn: false,
      stega: false,
    })
    .fetch(
      groq`*[_type == $type && defined(slug.current)]{
        "slug": slug.current,
        "children": children[]->{"type": _type, "slug": slug.current}
      }`,
      { type },
    )

  // Generate paths recursively for each item
  const paths = []
  for (const item of data) {
    const currentPath = [...parentSlug, item.slug]

    // Add the current item path
    // @ts-expect-error: Type 'string[]' is not assignable to type 'string'.
    paths.push(currentPath)

    // Check for children and fetch their paths recursively
    if (item.children) {
      for (const child of item.children) {
        // Recursively fetch child paths
        // @ts-expect-error: Type 'string[]' is not assignable to type 'string'.
        const childPaths = await fetchNestedSlugs(child.type, currentPath)
        paths.push(...childPaths)
      }
    }
  }
  return paths
}
