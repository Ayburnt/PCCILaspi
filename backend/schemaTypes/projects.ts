import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'projectsPage',
  title: 'Projects Page',
  type: 'document',
  fields: [
    defineField({
      name: 'header',
      title: 'Header Section',
      type: 'object',
      fields: [
        defineField({
          name: 'badgeText',
          title: 'Badge Text',
          type: 'string',
          initialValue: 'Institutional Portfolio',
        }),
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'Key Initiatives & Projects',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
          initialValue: 'A record of our strategic engagements, community development programs, and economic milestones.',
        }),
        defineField({
          name: 'highlightedText',
          title: 'Highlighted Text (Accent Color)',
          type: 'string',
          initialValue: 'Economic Growth',
          description: 'This text appears in yellow/accent color on a new line',
        }),
        defineField({
          name: 'backgroundImage',
          title: 'Background Image (Optional)',
          type: 'image',
          options: {
            hotspot: true
          }
        })
      ],
    }),

    defineField({
      name: 'projectsSection',
      title: 'Projects Section Header',
      type: 'object',
      fields: [
        defineField({
          name: 'label',
          title: 'Section Label',
          type: 'string',
          initialValue: 'Project Highlights',
        }),
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: "We've Done Lot's of Awesome Projects",
        }),
      ],
    }),

    defineField({
      name: 'projects',
      title: 'Projects',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Project Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'category',
              title: 'Category',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'status',
              title: 'Status',
              type: 'string',
              validation: (Rule) => Rule.required(),
              options: {
                list: [
                  { title: 'Active', value: 'Active' },
                  { title: 'Recurring', value: 'Recurring' },
                  { title: 'Monthly', value: 'Monthly' },
                  { title: 'Upcoming', value: 'Upcoming' },
                  { title: 'Completed', value: 'Completed' },
                ],
              },
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Project Image',
              type: 'image',
              options: { hotspot: true },
              fields: [
                { name: 'alt', type: 'string', title: 'Alternative text' },
              ],
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'category', media: 'image' },
          },
        },
      ],
    }),

    defineField({
      name: 'footer',
      title: 'Footer Section',
      type: 'object',
      fields: [
        defineField({
          name: 'quote',
          title: 'Inspirational Quote',
          type: 'text',
          rows: 2,
          initialValue: 'Building a sustainable future through strategic infrastructure and community-focused development.',
        }),
        defineField({
          name: 'registryLabel',
          title: 'Registry Label',
          type: 'string',
          initialValue: 'Official Project Registry',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'header.title',
    },
    prepare(selection) {
      return {
        title: selection.title || 'Projects Page',
      }
    },
  },
})
