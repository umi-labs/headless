import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'button',
  title: 'Button',
  type: 'object',
  fields: [
    defineField({
          name: 'title',
          title: 'Title',
          type: 'string'
        }),
    defineField({
          name: 'link',
          title: 'Link',
          type: 'object'
        }),
    defineField({
          name: 'type',
          title: 'Type',
          type: 'object'
        })
  ],
  preview: {
    prepare() {
      return {
        title: 'Button',
      }
    },
  },
})
