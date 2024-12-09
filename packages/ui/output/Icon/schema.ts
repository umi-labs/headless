import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'icon',
  title: 'Icon',
  type: 'object',
  fields: [
    defineField({
          name: 'type',
          title: 'Type',
          type: 'object'
        }),
    defineField({
          name: 'weight',
          title: 'Weight',
          type: 'object'
        })
  ],
  preview: {
    prepare() {
      return {
        title: 'Icon',
      }
    },
  },
})
