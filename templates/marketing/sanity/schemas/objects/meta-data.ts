import { defineField, defineType } from "sanity";

export default defineType({
    name: 'metaData',
    title: 'Meta Data',
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
            name: 'title',
            title: 'Title',
            type: 'string',
            description:
                'Used for the <meta> title tag for SEO.',
            group: 'basic',
        }),
        defineField({
            name: 'description',
            description:
                'Used for the <meta> description tag for SEO.',
            title: 'Description',
            type: 'text',
            validation: (rule) => rule.max(155).required(),
            group: 'basic',
        }),
        defineField({
            name: 'ogImage',
            title: 'Open Graph Image',
            type: 'image',
            description: 'Displayed on social cards and search engine results.',
            options: {
                hotspot: true,
            },
            group: 'advanced',
        }),
        defineField({
            name: 'keywords',
            title: 'Keywords',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Used for the <meta> keywords tag for SEO.',
            group: 'advanced',
        }),
    ],
})