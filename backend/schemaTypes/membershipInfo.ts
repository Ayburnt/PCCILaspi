import { defineField, defineType } from 'sanity'
import { DocumentIcon } from '@sanity/icons'

export default defineType({
  name: 'membershipInfo',
  title: 'How to Become a Member',
  type: 'document',
  icon: DocumentIcon,
  // Singleton document - only one exists
  // @ts-expect-error Sanity allows this property for action control on singletons
  __experimental_actions: ['update', 'publish'],
  preview: {
    prepare() {
      return { title: 'How to Become a Member', subtitle: 'Singleton document – only one exists' }
    },
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Hero Title',
      type: 'string',
      initialValue: 'Join PCCI Today!',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Hero Tagline',
      type: 'text',
      rows: 3,
      initialValue: 'Empowering businesses, connecting leaders, shaping the future.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Hero Description',
      type: 'text',
      rows: 4,
      initialValue: 'Connect with industry leaders, influence policy, and grow your enterprise with the Philippine Chamber of Commerce and Industry - Las Piñas.',
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
            { name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'description', title: 'Description', type: 'text', validation: (Rule) => Rule.required() },
            {
              name: 'icon',
              title: 'Icon Name',
              type: 'string',
              description: 'Icon name (e.g., Building2, UserCheck, ShieldCheck, Briefcase)',
              initialValue: 'Building2',
            },
          ],
          preview: {
            select: {
              title: 'title',
              icon: 'icon',
            },
            prepare({ title, icon }) {
              return {
                title: title,
                subtitle: icon ? `Icon: ${icon}` : 'No icon',
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).warning('Add at least one qualification'),
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
      initialValue: [
        'Copy of Business Registration',
        'Latest Financial Statement',
        'Certificate of Good Standing',
      ],
    }),
    defineField({
      name: 'requirementsNote',
      title: 'Requirements Note',
      type: 'string',
      description: 'A small note shown below requirements.',
      initialValue: 'All documents must be submitted in PDF format.',
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
      initialValue: 'Submit your documents, pay the membership fee, and wait for verification by our team.',
    }),
    defineField({
      name: 'bankDetailsTitle',
      title: 'Bank Details Title',
      type: 'string',
      initialValue: 'Bank Details for Payment',
    }),
    defineField({
      name: 'bankName',
      title: 'Bank Name',
      type: 'string',
      initialValue: 'Banco de Oro (BDO)',
    }),
    defineField({
      name: 'bankBranch',
      title: 'Bank Branch',
      type: 'string',
      initialValue: 'Arnaiz San Lorenzo Branch',
    }),
    defineField({
      name: 'accountName',
      title: 'Account Name',
      type: 'string',
      initialValue: 'Philippine Chamber of Commerce and Industry – Las Piñas City, Inc.',
    }),
  ],
})
