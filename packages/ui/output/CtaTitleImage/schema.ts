import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'ctatitleimage',
  title: 'CtaTitleImage',
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
        title: 'CtaTitleImage',
      }
    },
  },
})
