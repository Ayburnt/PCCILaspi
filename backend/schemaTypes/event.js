import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'event',
  title: 'News & Events',
  type: 'document',
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
      title: 'Date',
      type: 'date',
      options: { dateFormat: 'YYYY-MM-DD' }
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
            { title: 'Press Release', value: 'Press Release' },
            { title: 'Event', value: 'Event' },
            { title: 'Advisory', value: 'Advisory' },
        ],
      },
    }),
    defineField({
      name: 'image',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),
    
    // --- NEW FIELD ADDED HERE ---
    defineField({
      name: 'description',
      title: 'Short Description',
      description: 'This text will appear on the News Grid. Keep it short (2-3 sentences).',
      type: 'text',
      rows: 3,
      validation: rule => rule.max(300).warning('Long descriptions may get cut off on the grid.')
    }),
    // ----------------------------

    defineField({
      name: 'body',
      title: 'Full Article Content',
      type: 'array', 
      of: [{type: 'block'}] // This allows Rich Text (Paragraphs, Bold, etc.)
    }),
  ],
})