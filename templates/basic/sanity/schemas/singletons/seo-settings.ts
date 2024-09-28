import { Target } from '@phosphor-icons/react'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
    name: 'seoSettings',
    title: 'SEO Settings',
    type: 'document',
    icon: Target,
    // Uncomment below to have edits publish automatically as you type
    // liveEdit: true,
    fields: [
        defineField({
            name: 'metaData', title: 'Meta Data', type: 'metaData',
        }),
    ],
    preview: {
        prepare() {
            return {
                title: 'SEO Settings',
            }
        },
    },
})
