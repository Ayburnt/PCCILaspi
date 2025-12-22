import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'servicesPage',
  title: 'Services Page',
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
          initialValue: 'PCCI-Las Piñas Services',
        }),
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'Services',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
          initialValue: "PCCI-Las Piñas drives business growth and competitiveness.",
        }),
      ],
    }),

    defineField({
      name: 'services',
      title: 'Services Catalog',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Service Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'detail',
              title: 'Service Detail',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'category',
              title: 'Category',
              type: 'string',
            }),
            defineField({
              name: 'icon',
              title: 'Icon Image',
              type: 'image',
              options: { hotspot: true },
              fields: [
                { name: 'alt', type: 'string', title: 'Alternative text' },
              ],
            }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'category', media: 'icon' },
          },
        },
      ],
    }),

    defineField({
      name: 'assurances',
      title: 'Assurances',
      type: 'array',
      of: [{ type: 'string' }],
    }),

    defineField({
      name: 'approachBox',
      title: 'Approach & Protocol',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'Institutional Mandate',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 4,
          initialValue:
            "Our service delivery is anchored on the Chamber's commitment to creating a conducive environment for business expansion through formal mentorship and strategic promotion.",
        }),
      ],
    }),

    defineField({
      name: 'processImage',
      title: 'Process Illustration Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', type: 'string', title: 'Alternative text' },
      ],
    }),

    defineField({
      name: 'footerBanner',
      title: 'Footer Banner',
      type: 'object',
      fields: [
        defineField({
          name: 'quote',
          title: 'Quote / Headline',
          type: 'string',
          initialValue:
            '"Building a Dynamic Business Community for a Prosperous Las Piñas."',
        }),
        defineField({
          name: 'note',
          title: 'Supporting Note',
          type: 'text',
          rows: 3,
          initialValue:
            'For urgent business assistance or policy concerns, please contact our Technical Secretariat directly through our official channels.',
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Services Page Content' }
    },
  },
})
