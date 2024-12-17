import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'herowithmedia',
  title: 'HeroWithMedia',
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
        title: 'HeroWithMedia',
      }
    },
  },
})