import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'membershipInfo',
  title: 'How to Become a Member Content',
  type: 'document',

  // Preview for editors
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Membership Content',
        subtitle: 'Singleton document – only one exists',
      }
    },
  },

  fields: [
    defineField({
      name: 'title',
      title: 'Hero Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Hero Tagline',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Hero Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'heroBackgroundImage',
      title: 'Hero Background Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'qualificationsTitle',
      title: 'Qualifications Title',
      type: 'string',
      initialValue: 'Membership Qualifications',
    }),
    defineField({
      name: 'qualifications',
      title: 'Membership Qualifications (Preferably 4 items)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'qualification',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
            {
              name: 'icon',
              title: 'Icon Name',
              type: 'string',
              description:
                'Lucide icon name (e.g., Building2, UserCheck). Leave blank to use default.',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'requirementsTitle',
      title: 'Requirements Title',
      type: 'string',
      initialValue: 'Documentary Requirements',
    }),
    defineField({
      name: 'requirements',
      title: 'Documentary Requirements',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'requirementsNote',
      title: 'Requirements Note',
      type: 'string',
      description: 'A small note shown below requirements.',
    }),
    defineField({
      name: 'processTitle',
      title: 'Application Process Title',
      type: 'string',
      initialValue: 'Application Process',
    }),
    defineField({
      name: 'processDescription',
      title: 'Application Process Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'bankDetailsTitle',
      title: 'Bank Details Title',
      type: 'string',
      initialValue: 'Bank Details for Payment',
    }),
    defineField({ name: 'bankName', title: 'Bank Name', type: 'string' }),
    defineField({ name: 'bankBranch', title: 'Bank Branch', type: 'string' }),
    defineField({ name: 'accountName', title: 'Account Name', type: 'string' }),
  ],
})
