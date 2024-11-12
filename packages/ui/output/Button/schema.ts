import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'button',
  title: 'Button',
  type: 'object',
  fields: [
    defineField({
          name: 'label',
          title: 'Label',
          type: 'string'
        }),
    defineField({
          name: 'onClick',
          title: 'OnClick',
          type: 'object'
        }),
    defineField({
          name: 'variant',
          title: 'Variant',
          type: 'object'
        })
  ],
  preview: {
    prepare() {
      return {
        title: 'Button',
      }
    },
  },
})
