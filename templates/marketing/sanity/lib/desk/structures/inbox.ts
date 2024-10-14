import { Mailbox, Tray } from '@phosphor-icons/react'

export const Inbox = (S) =>
  S.listItem()
    .title('Inbox')
    .icon(Mailbox)
    .child(
      S.list()
        .title('Inbox')
        .items([
          S.listItem()
            .title('Add Inbox')
            .icon(Tray)
            .child(S.document().schemaType('inbox').title('Add Inbox')),
          S.divider(),
          S.documentTypeListItem('inbox').title('Inbox'),
        ]),
    )
