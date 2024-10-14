import { Bell } from '@phosphor-icons/react'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contactForm',
  title: 'Contact Form',
  type: 'document',
  icon: Bell,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
  ],
})
