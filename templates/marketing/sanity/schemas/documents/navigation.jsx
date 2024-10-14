import { defineType } from 'sanity'
import { NavigationArrow } from '@phosphor-icons/react'

export default defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  icon: NavigationArrow,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'displayList',
      title: 'Navigation List?',
      type: 'boolean',
      description:
        'Choose this if you need navigation within a parent e.g., England > Counties, NOTE: This will only display on Main / Footer Menus',
      initialValue: false,
      options: {
        layout: 'checkbox',
      },
    },
    {
      name: 'itemsList',
      type: 'array',
      title: 'Navigation List',
      of: [{ type: 'navList' }],
      hidden: ({ parent }) => !parent?.displayList,
    },
    {
      name: 'items',
      type: 'array',
      title: 'Navigation items',
      of: [{ type: 'navItem' }],
      hidden: ({ parent }) => parent?.displayList,
    },
  ],
})
