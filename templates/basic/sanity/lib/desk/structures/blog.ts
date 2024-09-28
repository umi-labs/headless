import { PenNib, NotePencil } from "@phosphor-icons/react";

export const Blog = (S) =>
    S.listItem()
        .title('Blog')
        .icon(PenNib)
        .child(
            S.list()
                .title('Blog')
                .items([
                    S.listItem()
                        .title('Add Post')
                        .icon(NotePencil)
                        .child(
                            S.document().schemaType('post').title('Add Post'),
                        ),
                    S.divider(),

                    S.documentTypeListItem('post').title('Posts'),
                ])
        )