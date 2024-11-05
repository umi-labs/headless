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
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'misc',
      title: 'MISC',
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
      group: 'content',
    }),
    defineField({
      name: 'blocks',
      description: 'Used to add blocks to the home page',
      title: 'Blocks',
      type: 'blocks',
      group: 'content',
    }),
    defineField({
      name: 'metaData',
      type: 'metaData',
      group: 'seo',
    }),
    defineField({
      name: 'postType',
      type: 'reference',
      to: [{ type: 'postType' }],
      group: 'misc',
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
