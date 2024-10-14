import { groq } from 'next-sanity'

export const homePageQuery = groq`
  *[_type == "home"][0]{
    _id,
    overview,
    hero,
    blocks,
    metaData,
    title,
  }
`

export const pagesBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    hero,
    blocks,
    metaData,
    title,
    "slug": slug.current,
  }
`

export const settingsQuery = groq`
  *[_type == "siteSettings"][0]{
    name,
    initials,
    socialLinks[],
    mainNav->{
      ...,
      title,
      items[] {
        ...,
        navItemUrl {
          ...,
          internalLink-> {
            _type,
            "slug": slug.current,
            title
          }
        }
      }
    },
    customCursor,
    ogImage,
  }
`

export const seoSettingsQuery = groq`
  *[_type == "seoSettings"][0]{
    metaData,
  }
`
