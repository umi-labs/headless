import {
  Gear,
  NavigationArrow,
  Palette,
  Sliders,
  Target,
} from '@phosphor-icons/react'
import { Forms } from '@/sanity/lib/desk/structures/forms'

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
          S.listItem()
            .title('Navigation')
            .icon(NavigationArrow)
            .child(S.document().schemaType('navigation').title('Navigation')),
          S.divider(),
          S.listItem()
            .title('Custom Post Types')
            .icon(Palette)
            .child(
              S.documentList()
                .schemaType('postType')
                .title('Post Types')
                .filter('_type == "postType"'),
            ),
          Forms(S),
        ]),
    )
