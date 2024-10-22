import { defineType } from 'sanity'

export default defineType({
  name: 'button',
  title: 'Button',
  type: 'object',
  fields: [
    {
          name: 'label',
          title: 'Label',
          type: 'string'
        },
    {
          name: 'onClick',
          title: 'OnClick',
          type: 'object'
        },
    {
          name: 'variant',
          title: 'Variant',
          type: 'object'
        }
  ],
  preview: {
    prepare() {
      return {
        title: 'Button',
      }
    },
  },
})
