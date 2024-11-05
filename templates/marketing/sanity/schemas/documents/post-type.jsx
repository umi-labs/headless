import { Files } from '@phosphor-icons/react'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'postType',
  title: 'Post Type',
  type: 'document',
  icon: Files,
  groups: [
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      description: 'This field is the title of your project.',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
    }),
    defineField({
      name: 'contentType',
      type: 'string',
      title: 'Content Type',
      options: {
        list: [
          { title: 'Page', value: 'page' },
          { title: 'Post', value: 'post' },
          { title: 'Nested Post Type', value: 'postType' },
        ],
      },
    }),
    defineField({
      name: 'children',
      type: 'array',
      title: 'Children',
      of: [
        {
          type: 'reference',
          to: [{ type: 'postType' }, { type: 'page' }, { type: 'post' }],
        },
      ],
      description: 'Add child post types, pages, or posts as needed.',
    }),
    defineField({
      name: 'metaData',
      type: 'metaData',
      group: 'seo',
    }),
  ],
})
