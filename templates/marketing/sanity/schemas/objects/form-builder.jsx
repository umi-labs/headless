import { defineType } from 'sanity'
import { ComposeIcon } from '@sanity/icons'

export default defineType({
  name: 'formBuilder',
  title: 'Form Builder',
  icon: ComposeIcon,
  type: 'object',
  fields: [
    {
      name: 'formFields',
      title: 'Form Fields',
      type: 'array',
      of: [{ type: 'formFields' }],
    },
  ],
  preview: {
    prepare() {
      return {
        title: `Custom form setup`,
        subtitle: `Form Builder`,
        media: ComposeIcon,
      }
    },
  },
})
