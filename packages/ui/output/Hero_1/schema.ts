import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'hero_1',
  title: 'Hero_1',
  type: 'object',
  fields: [
    defineField({
          name: 'data',
          title: 'Data',
          type: 'object'
        }),
    defineField({
          name: 'textAlignHoz',
          title: 'TextAlignHoz',
          type: 'object'
        }),
    defineField({
          name: 'textAlignVer',
          title: 'TextAlignVer',
          type: 'object'
        }),
    defineField({
          name: 'variant',
          title: 'Variant',
          type: 'object'
        })
  ],
  preview: {
    prepare() {
      return {
        title: 'Hero_1',
      }
    },
  },
})
