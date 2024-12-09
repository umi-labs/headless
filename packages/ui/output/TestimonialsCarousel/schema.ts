import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'testimonialscarousel',
  title: 'TestimonialsCarousel',
  type: 'object',
  fields: [
    defineField({
          name: 'data',
          title: 'Data',
          type: 'object'
        })
  ],
  preview: {
    prepare() {
      return {
        title: 'TestimonialsCarousel',
      }
    },
  },
})
