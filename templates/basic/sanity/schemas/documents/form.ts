import { Table } from '@phosphor-icons/react'
import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'form',
    title: 'Form',
    type: 'document',
    icon: Table,
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'formFields',
            title: 'Form Fields',
            type: 'array',
            of: [{ type: 'formFields' }],
        }),
    ],
    preview: {
        select: {
            title: 'title',
        },
        prepare: ({ title }) => ({
            title: title || 'Untitled',
        }),
    },
})