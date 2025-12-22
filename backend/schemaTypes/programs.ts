import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'programsPage',
  title: 'Programs Page',
  type: 'document',
  fields: [
    defineField({
      name: 'header',
      title: 'Header',
      type: 'object',
      fields: [
        defineField({
          name: 'badgeText',
          title: 'Badge Text',
          type: 'string',
          initialValue: 'Official Programs',
        }),
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'Advancing the Interests of Las Piñas City',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
          initialValue: 'Supports a competitive, sustainable, and responsible business community.',
        }),
      ],
    }),

    defineField({
      name: 'programTracks',
      title: 'Program Tracks',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'badge',
              title: 'Badge',
              type: 'string',
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'Choose a icon.',
              options: {
                list: [
                  { title: 'Briefcase', value: 'Briefcase' },
                  { title: 'Landmark', value: 'Landmark' },
                  { title: 'Users', value: 'Users' },
                  { title: 'ShieldCheck', value: 'ShieldCheck' },
                  { title: 'Award', value: 'Award' },
                  { title: 'ChevronRight', value: 'ChevronRight' },
                ],
              },
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'badge' },
          },
        },
      ],
    }),

    defineField({
      name: 'performance',
      title: 'Performance Signals',
      type: 'object',
      fields: [
        defineField({
          name: 'sectionLabel',
          title: 'Section Label',
          type: 'string',
          initialValue: 'Chamber Performance',
        }),
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
          initialValue: 'Strategic Impact Data',
        }),
        defineField({
          name: 'stats',
          title: 'Strategic Impact Data',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() }),
                defineField({ name: 'value', title: 'Value', type: 'string', validation: (Rule) => Rule.required() }),
                defineField({ name: 'detail', title: 'Detail', type: 'string' }),
              ],
              preview: { select: { title: 'label', subtitle: 'value' } },
            },
          ],
        }),
        defineField({
          name: 'note',
          title: 'Note',
          type: 'text',
          rows: 3,
          initialValue:
            "* Figures based on the 2024 Annual Secretary's Report. Verified by the PCCI-NCR Membership Committee.",
        }),
      ],
    }),

    defineField({
      name: 'roadmap',
      title: 'Implementation Roadmap',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'Service Implementation Roadmap',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
          initialValue:
            'PCCI-Las Piñas adheres to a disciplined delivery framework to ensure every program provides tangible value to the local business community.',
        }),
        defineField({
          name: 'steps',
          title: 'Roadmap Steps',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
                defineField({ name: 'text', title: 'Description', type: 'text', rows: 3, validation: (Rule) => Rule.required() }),
              ],
              preview: { select: { title: 'title', subtitle: 'text' } },
            },
          ],
        }),
      ],
    }),

    defineField({
      name: 'callToAction',
      title: 'Call To Action',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'Collaborate with the Chamber',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
          initialValue: 'Join our specialized committees or enroll your business in our programs.',
        }),
        defineField({
          name: 'primaryText',
          title: 'Primary Button Text',
          type: 'string',
          initialValue: 'Contact',
        }),
        defineField({
          name: 'primaryLink',
          title: 'Primary Button Link',
          type: 'string',
          initialValue: '/contact',
        }),
        defineField({
          name: 'secondaryText',
          title: 'Secondary Button Text',
          type: 'string',
          initialValue: 'View FAQ',
        }),
        defineField({
          name: 'secondaryLink',
          title: 'Secondary Button Link',
          type: 'string',
          initialValue: '/faq',
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Programs Page Content' }
    },
  },
})
