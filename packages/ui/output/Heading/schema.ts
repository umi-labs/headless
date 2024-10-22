import { defineType } from 'sanity'

export default defineType({
  name: 'heading',
  title: 'Heading',
  type: 'object',
  fields: [
    {
          name: 'children',
          title: 'Children',
          type: 'string'
        },
    {
          name: 'variant',
          title: 'Variant',
          type: 'object'
        },
    {
          name: 'classNames',
          title: 'ClassNames',
          type: 'object'
        }
  ],
  preview: {
    prepare() {
      return {
        title: 'Heading',
      }
    },
  },
})
