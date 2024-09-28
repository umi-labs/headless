import { Palette } from '@phosphor-icons/react'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
    name: 'themeSettings',
    title: 'Theme Settings',
    type: 'document',
    icon: Palette,
    // Uncomment below to have edits publish automatically as you type
    // liveEdit: true,
    fields: [
        defineField({ name: 'name', title: 'Name', type: 'string' }),
    ],
    preview: {
        prepare() {
            return {
                title: 'Theme Settings',
            }
        },
    },
})
