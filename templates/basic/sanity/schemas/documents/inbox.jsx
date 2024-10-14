import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'inbox',
  title: 'Inbox',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
  ],
})
