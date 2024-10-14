import { Table } from '@phosphor-icons/react'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'form',
  title: 'Form',
  type: 'document',
  icon: Table,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'formFields',
      title: 'Form Fields',
      type: 'array',
      of: [{ type: 'formFields' }],
    }),
    defineField({
      name: 'inbox',
      title: 'Inbox',
      type: 'reference',
      to: [{ type: 'inbox' }],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare: ({ title }) => ({
      title: title || 'Untitled',
    }),
  },
})
