import { defineField, defineType } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

export default defineType({
  name: 'news',
  title: 'News Management',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Headline',
      type: 'string',
      validation: rule => rule.required()
    }),

    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: rule => rule.required()
    }),

    defineField({
      name: 'date',
      title: 'Published Date',
      type: 'date',
      options: { dateFormat: 'YYYY-MM-DD' },
      validation: rule => rule.required()
    }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Press Release', value: 'press-release' },
          { title: 'News Update', value: 'news-update' },
          { title: 'Advisory', value: 'advisory' },
        ],
      },
      validation: rule => rule.required()
    }),

    defineField({
      name: 'image',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true }
    }),

    defineField({
      name: 'description',
      title: 'Short Description',
      description: 'This appears on the News Grid. Keep it concise (2–3 sentences).',
      type: 'text',
      rows: 3,
      validation: rule =>
        rule.max(300).warning('Long text may be cut off in the grid layout.')
    }),

    defineField({
      name: 'body',
      title: 'Full Article Content',
      type: 'array',
      of: [{ type: 'block' }] // Rich text
    }),
  ],
})
