import { defineType } from 'sanity'

export default defineType({
  name: 'basicHero',
  title: 'Basic Hero',
  type: 'object',
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Basic Hero',
      }
    },
  },
})
