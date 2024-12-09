import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'bloggrid',
  title: 'BlogGrid',
  type: 'object',
  fields: [
    defineField({
          name: 'data',
          title: 'Data',
          type: 'object'
        })
  ],
  preview: {
    prepare() {
      return {
        title: 'BlogGrid',
      }
    },
  },
})
