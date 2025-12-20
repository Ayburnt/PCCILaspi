import { defineField, defineType } from 'sanity'
import { CalendarIcon } from '@sanity/icons'

export default defineType({
  name: 'event',
  title: 'Event Management',
  type: 'document',
  icon: CalendarIcon,
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
      name: 'eventType',
      title: 'Event Type',
      type: 'string',
      options: {
        list: [
            { title: 'Upcoming', value: 'upcoming' },
            { title: 'Past', value: 'past' },
        ],
      },
      validation: rule => rule.required()
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
            { title: 'Conference', value: 'Conference' },
            { title: 'Turnover Ceremony', value: 'Turnover Ceremony' },
            { title: 'Summit', value: 'Summit' },
            { title: 'Gala', value: 'Gala' },
            { title: 'Bootcamp', value: 'Bootcamp' },
            { title: 'Masterclass', value: 'Masterclass' },
            { title: 'Awards', value: 'Awards' },
            { title: 'Competition', value: 'Competition' },
            { title: 'Workshop', value: 'Workshop' },
            { title: 'Webinar', value: 'Webinar' },
            { title: 'Networking', value: 'Networking' },
        ],
      },
      validation: rule => rule.required()
    }),
    defineField({
      name: 'time',
      title: 'Event Time',
      type: 'string',
      description: 'Format: HH:MM - HH:MM (e.g., 18:00 - 22:00)'
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'attendees',
      title: 'Number of Attendees',
      type: 'number',
      description: 'For past events: total attendees. For upcoming: spots available.'
    }),
    defineField({
      name: 'highlights',
      title: 'Event Highlights',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Key highlights or sessions at the event'
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      description: 'Year of the event (for past events)'
    }),
    defineField({
      name: 'success',
      title: 'Success Metric / Impact',
      type: 'text',
      rows: 3,
      description: 'For past events: outcome or success metric. For upcoming: expected impact or goal.'
    }),
    defineField({
      name: 'registrationOpen',
      title: 'Registration Open',
      type: 'boolean',
      description: 'For upcoming events: is registration currently open?'
    }),
    defineField({
      name: 'price',
      title: 'Entry Fee',
      type: 'string',
      description: 'E.g., "₱2,500", "Free", "TBA"'
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