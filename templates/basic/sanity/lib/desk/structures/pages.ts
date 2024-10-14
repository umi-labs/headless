import { Browsers, House, NotePencil } from '@phosphor-icons/react'

export const Pages = (S) =>
  S.listItem()
    .title('Pages')
    .icon(Browsers)
    .child(
      S.list()
        .title('Pages')
        .items([
          S.listItem()
            .title('Home')
            .icon(House)
            .child(S.document().schemaType('home').title('Home')),
          S.divider(),

          S.listItem()
            .title('Add Page')
            .icon(NotePencil)
            .child(S.document().schemaType('page').title('Add Page')),
          S.documentTypeListItem('page').title('Pages'),
        ]),
    )
