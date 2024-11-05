import { Browsers } from '@phosphor-icons/react'

export const PostTypes = (S) => {
  return S.listItem()
    .title('Custom Post Types')
    .icon(Browsers)
    .child(
      S.documentList()
        .title('Post Types')
        .schemaType('postType')
        .menuItems(S.documentTypeList('postType').getMenuItems())
        .filter('_type == "postType"')
        .child(
          (
            id: string, // Returns the id for the selected post-type document
          ) => {
            console.log('id', id)
            return S.documentList()
              .title('Pages')
              .schemaType('page')
              .filter('_type == "page" && postType._ref == $id')
              .params({ id }) // use the id in the filter to return pages that has a reference to the postType
          },
        ),
    )
}
