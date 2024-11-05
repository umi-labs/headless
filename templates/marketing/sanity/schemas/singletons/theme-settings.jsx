import { Palette } from '@phosphor-icons/react'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'themeSettings',
  title: 'Theme Settings',
  type: 'document',
  icon: Palette,
  groups: [
    {
      name: 'branding',
      title: 'Branding',
    },
    {
      name: 'colours',
      title: 'Colours',
    },
    {
      name: 'misc',
      title: 'MISC',
    },
  ],
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      group: 'branding',
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'favicon',
      group: 'branding',
    }),
    defineField({
      name: 'foreground',
      title: 'Foreground',
      type: 'color',
      group: 'colours',
    }),
    defineField({
      name: 'background',
      title: 'Background',
      type: 'color',
      group: 'colours',
    }),
    defineField({
      name: 'accent',
      title: 'Accent',
      type: 'color',
      group: 'colours',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Theme Settings',
      }
    },
  },
})
