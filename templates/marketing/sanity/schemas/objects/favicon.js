import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'favicon',
  title: 'Favicon',
  type: 'object',
  groups: [
    {
      name: 'basic',
      title: 'Basic',
    },
    {
      name: 'advanced',
      title: 'Advanced',
    },
  ],
  fields: [
    defineField({
      name: 'favicon32',
      title: 'Favicon - (32x32)',
      type: 'image',
      description: 'Basic favicon for the site.',
      options: {
        accept: 'image/png',
      },
      group: 'basic',
    }),
    defineField({
      name: 'appleTouchIcon',
      title: 'Apple Touch Icon - (180x180)',
      type: 'image',
      description: 'Apple touch icon for the site.',
      options: {
        accept: 'image/png',
      },
      group: 'basic',
    }),
    defineField({
      name: 'androidChrome192',
      title: 'Android Chrome 192x192',
      type: 'image',
      description: 'Android chrome touch icon for the site.',
      options: {
        accept: 'image/png',
      },
      group: 'advanced',
    }),
  ],
})
