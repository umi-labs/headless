import { defineType } from 'sanity'
import { ListPlus } from '@phosphor-icons/react'

export default defineType({
  name: 'navItem',
  title: 'Navigation Item',
  type: 'object',
  icon: ListPlus,
  fields: [
    {
      name: 'name',
      title: 'Navigation Text',
      type: 'string',
    },
    {
      name: 'navItemUrl',
      title: 'Navigation Item URL',
      type: 'link',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'name',
    },
    prepare: ({ title }) => ({
      title,
    }),
  },
})
