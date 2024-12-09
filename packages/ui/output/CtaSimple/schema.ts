import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'ctasimple',
  title: 'CtaSimple',
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
        title: 'CtaSimple',
      }
    },
  },
})
