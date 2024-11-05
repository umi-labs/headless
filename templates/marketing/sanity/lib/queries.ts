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
    blocks[]->{
      ...,
      inbox->,
    },
    metaData,
    title,
    "slug": slug.current,
  }
`

export const pagesBySlugQuery2 = groq`
  *[_type == "postType" && slug.current == $slug][-1] {
    title,
    contentType,
    children[]-> { _type, title, slug, content }
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

export const themeSettingsQuery = groq`
  *[_type == "themeSettings"][0]{
    logo,
    favicon {
      favicon32 {
        asset ->
      },
      appleTouchIcon {
        asset ->
      },
      androidChrome192 {
        asset ->
      }
    },
    background,
    foreground,
    accent,
  }
`
