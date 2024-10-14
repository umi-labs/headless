import { Sliders, Gear, Palette, Target } from '@phosphor-icons/react'

export const Settings = (S) =>
  S.listItem()
    .title('Settings')
    .icon(Sliders)
    .child(
      S.list()
        .title('Settings')
        .items([
          S.listItem()
            .title('Site Settings')
            .icon(Gear)
            .child(
              S.document().schemaType('siteSettings').title('Site Settings'),
            ),
          S.listItem()
            .title('Theme Settings')
            .icon(Palette)
            .child(
              S.document().schemaType('themeSettings').title('Theme Settings'),
            ),
          S.listItem()
            .title('SEO Settings')
            .icon(Target)
            .child(
              S.document().schemaType('seoSettings').title('SEO Settings'),
            ),
        ]),
    )
