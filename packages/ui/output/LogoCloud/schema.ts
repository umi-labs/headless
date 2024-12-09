import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'logocloud',
  title: 'LogoCloud',
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
        title: 'LogoCloud',
      }
    },
  },
})
