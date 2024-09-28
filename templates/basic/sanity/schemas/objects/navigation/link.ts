import { defineType } from "sanity"
import { Link, ArrowCircleUp } from "@phosphor-icons/react"

export default defineType({
    name: 'link',
    title: 'Link',
    type: 'object',
    fields: [
        {
            title: 'External Link?',
            name: 'displayExternal',
            type: 'boolean',
            initialValue: false,
            options: {
                layout: 'checkbox',
            }
        },
        {
            title: 'Internal Link',
            name: 'internalLink',
            description: 'Select pages for navigation',
            type: 'reference',
            to: [
                { type: 'page' },
                { type: 'post' },
            ],
            // Hide field if checkbox is true
            hidden: ({ parent, value }) => parent?.displayExternal
        },
        {
            name: 'externalUrl',
            title: 'External URL',
            type: 'url',
            description: 'Use fully qualified URLS for external link',
            // 
            // Hide field if checkbox is false
            hidden: ({ parent, value }) => !parent?.displayExternal
        },
    ],
    preview: {
        select: {
            internalLink: "internalLink.name",
            externalUrl: "externalUrl",
            displayExternal: "displayExternal",
        },
        prepare(selection) {
            const { internalLink, externalUrl, displayExternal } = selection
            const title = displayExternal ? externalUrl : internalLink
            return {
                title: title,
                // subtitle: externalUrl,
                // ! FIX:
                media: displayExternal ? ArrowCircleUp : Link
            }
        }
    }
});