// backend/schemaTypes/event.js
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'event',
  title: 'Event', // This is what shows up in the button
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Event Title',
      type: 'string',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'date',
      title: 'Date of Event',
      type: 'date', // Adds a nice calendar picker
      options: {
        dateFormat: 'YYYY-MM-DD',
      }
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'National Event', value: 'National Event' },
          { title: 'Chapter Event', value: 'Chapter Event' },
          { title: 'Technical Seminar', value: 'Technical' },
        ],
      },
    }),
    defineField({
      name: 'image',
      title: 'Event Poster/Image',
      type: 'image',
      options: {
        hotspot: true, // Allows you to crop images nicely
      },
    }),
  ],
})