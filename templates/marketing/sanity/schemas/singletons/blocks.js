import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'blocks',
  title: 'blocks',
  type: 'array',
  of: [
    defineArrayMember({
      name: 'imageWithText',
      type: 'imageWithText',
    }),
    defineArrayMember({
      name: 'formBuilder',
      type: 'formBuilder',
    }),
    defineField({
      name: 'form',
      title: 'Form',
      type: 'reference',
      to: [{ type: 'form' }],
    }),
    defineArrayMember({
      name: 'contactFormBlock',
      type: 'contactFormBlock',
    }),
  ],
})
