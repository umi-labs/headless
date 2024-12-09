import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'slider',
  title: 'Slider',
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
        title: 'Slider',
      }
    },
  },
})
