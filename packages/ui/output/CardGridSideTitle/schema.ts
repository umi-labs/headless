import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'cardgridsidetitle',
  title: 'CardGridSideTitle',
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
        title: 'CardGridSideTitle',
      }
    },
  },
})
