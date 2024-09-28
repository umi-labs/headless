import { defineType } from 'sanity'

export default defineType({
  name: 'contactFormBlock',
  title: 'Contact Form Block',
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
        title: 'Contact Form',
      }
    },
  },
})
