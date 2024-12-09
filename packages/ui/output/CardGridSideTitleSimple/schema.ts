import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'cardgridsidetitlesimple',
  title: 'CardGridSideTitleSimple',
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
        title: 'CardGridSideTitleSimple',
      }
    },
  },
})
