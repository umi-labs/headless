import { defineType } from 'sanity'

export default defineType({
  name: 'input',
  title: 'Input',
  type: 'object',
  fields: [
    {
          name: 'id',
          title: 'Id',
          type: 'string'
        },
    {
          name: 'name',
          title: 'Name',
          type: 'string'
        },
    {
          name: 'value',
          title: 'Value',
          type: 'object'
        },
    {
          name: 'type',
          title: 'Type',
          type: 'object'
        },
    {
          name: 'onChange',
          title: 'OnChange',
          type: 'object'
        },
    {
          name: 'classNames',
          title: 'ClassNames',
          type: 'object'
        },
    {
          name: 'register',
          title: 'Register',
          type: 'object'
        }
  ],
  preview: {
    prepare() {
      return {
        title: 'Input',
      }
    },
  },
})
