import { defineType } from 'sanity'

export default defineType({
  name: 'hero_1',
  title: 'Hero_1',
  type: 'object',
  fields: [
    {
          name: 'data',
          title: 'Data',
          type: 'object'
        },
    {
          name: 'textAlignHoz',
          title: 'TextAlignHoz',
          type: 'object'
        },
    {
          name: 'textAlignVer',
          title: 'TextAlignVer',
          type: 'object'
        },
    {
          name: 'variant',
          title: 'Variant',
          type: 'object'
        }
  ],
  preview: {
    prepare() {
      return {
        title: 'Hero_1',
      }
    },
  },
})
