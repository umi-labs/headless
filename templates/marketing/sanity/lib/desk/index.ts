import {
  Blog,
  Inbox,
  Pages,
  PostTypes,
  Settings,
} from '@/sanity/lib/desk/structures'

export const Desk = (S) =>
  S.list()
    .title('Content')
    .items([
      Settings(S),
      Inbox(S),
      S.divider(),
      Pages(S),
      Blog(S),
      PostTypes(S),
      S.divider(),
    ])
