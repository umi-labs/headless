import { Mailbox, Textbox } from '@phosphor-icons/react'

export const Media = (S) =>
  S.listItem()
    .title('Media')
    .icon(Mailbox)
    .child(
      S.list()
        .title('Media')
        .items([
          S.listItem()
            .title('Add Media')
            .icon(Textbox)
            .child(
              S.documentListItem().schemaType('assets').title('Add Media'),
            ),
          S.divider(),
          S.documentTypeListItem('form').title('Forms'),
        ]),
    )
