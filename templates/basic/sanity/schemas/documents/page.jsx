import { Browser } from '@phosphor-icons/react'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  type: 'document',
  name: 'page',
  title: 'Page',
  icon: Browser,
  groups: [
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    defineField({
      type: 'string',
      name: 'title',
      title: 'Title',
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: 'slug',
      name: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'array',
      validation: (Rule) => Rule.max(1),
      of: [
        defineArrayMember({
          name: 'primaryHero',
          type: 'primaryHero',
        }),
        defineArrayMember({
          name: 'basicHero',
          type: 'basicHero',
        }),
      ],
    }),
    defineField({
      name: 'blocks',
      description: 'Used to add blocks to the home page',
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
        defineArrayMember({
          name: 'contactFormBlock',
          type: 'contactFormBlock',
        }),
      ],
    }),
    defineField({
      name: 'metaData',
      type: 'metaData',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        subtitle: 'Page',
        title,
      }
    },
  },
})
