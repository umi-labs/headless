// import { Gear } from '@phosphor-icons/react'
import { CogIcon } from '@sanity/icons'

import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    {
      name: 'navbar',
      title: 'Navbar',
    },
    {
      name: 'social',
      title: 'Social',
    },
    {
      name: 'misc',
      title: 'MISC',
    },
  ],
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string' }),
    defineField({
      name: 'mainNav',
      title: 'Main Navigation',
      description: 'Main navigation list displayed on the header of your site.',
      type: 'reference',
      to: [
        {
          type: 'navigation',
          validation: (Rule) => Rule.unique(),
        },
      ],
      group: 'navbar',
    }),
    defineField({
      name: 'customCursor',
      title: 'Custom Cursor',
      type: 'boolean',
      description: 'If true, the custom cursor will be displayed.',
      initialValue: false,
      group: 'misc',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media',
      description: 'Social media links associated with the site.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'Social Link',
          title: 'Social Link',
          fields: [
            { type: 'string', name: 'title', title: 'Title' },
            {
              type: 'url',
              name: 'link',
              title: 'Link',
              validation: (rule) =>
                rule.uri({
                  scheme: ['http', 'https', 'mailto', 'tel'],
                }),
            },
          ],
        },
      ],
      group: 'social',
    }),
  ],
})
