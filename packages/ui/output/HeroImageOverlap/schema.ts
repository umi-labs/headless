import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'heroimageoverlap',
  title: 'HeroImageOverlap',
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
        title: 'HeroImageOverlap',
      }
    },
  },
})
