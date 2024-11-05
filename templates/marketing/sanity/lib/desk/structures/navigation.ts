import { NavigationArrow } from '@phosphor-icons/react'

export const Navigation = (S) =>
  S.listItem()
    .title('Navigation')
    .icon(NavigationArrow)
    .child(
      S.list()
        .title('Navigation')
        .items([
          S.listItem()
            .title('Menus')
            .icon(NavigationArrow)
            .child(S.document().schemaType('navigation').title('Navigation')),
        ]),
    )
