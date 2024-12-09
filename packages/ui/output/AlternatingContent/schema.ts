import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'alternatingcontent',
  title: 'AlternatingContent',
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
        title: 'AlternatingContent',
      }
    },
  },
})
