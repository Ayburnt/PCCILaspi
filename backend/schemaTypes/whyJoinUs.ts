import {defineField, defineType} from 'sanity'
import { HeartIcon } from '@sanity/icons'

export default defineType({
  name: 'whyJoinUs',
  title: 'Why Join Us Content',
  type: 'document',
  icon: HeartIcon,
  // @ts-expect-error Sanity allows this property for action control on singletons
  __experimental_actions: ['update', 'publish'],
  preview: {
    select: {
      title: 'heroTitle',
    },
    prepare({title}) {
      return {
        title: title || 'Why Join Us Content',
        subtitle: 'Singleton document – only one exists',
      }
    },
  },
  fields: [
    // HERO SECTION
    defineField({
      name: 'heroBadgeText',
      title: 'Hero Badge Text',
      type: 'string',
      initialValue: 'WHY JOIN US?',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Main Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroHighlight',
      title: 'Hero Highlighted Text',
      type: 'string',
      description: 'The gradient text part (e.g., "In The Financial Capital")',
    }),
    defineField({
      name: 'heroTagline',
      title: 'Hero Tagline',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'heroBackgroundImage',
      title: 'Hero Background Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'heroCTAText',
      title: 'Hero CTA Button Text',
      type: 'string',
      initialValue: 'Become a Member',
    }),

    // CORE PILLARS SECTION
    defineField({
      name: 'pillarsTitle',
      title: 'Core Pillars Section Title',
      type: 'string',
      initialValue: 'Why Join PCCI Makati?',
    }),
    defineField({
      name: 'pillarsDescription',
      title: 'Core Pillars Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'corePillars',
      title: 'Core Pillars (Preferably 4 items)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'pillar',
          fields: [
            {name: 'title', title: 'Title', type: 'string'},
            {name: 'description', title: 'Description', type: 'text'},
            {
              name: 'icon',
              title: 'Icon Name',
              type: 'string',
              description: 'Lucide icon name (e.g., Network, Scale, Lightbulb, Heart)',
            },
            {
              name: 'iconColor',
              title: 'Icon Color (Tailwind class)',
              type: 'string',
              description: 'e.g., text-blue-600',
              initialValue: 'text-blue-600',
            },
            {
              name: 'bgColor',
              title: 'Background Color (Tailwind class)',
              type: 'string',
              description: 'e.g., bg-blue-50',
              initialValue: 'bg-blue-50',
            },
          ],
        },
      ],
    }),

    // GOVERNMENT RELATIONS SECTION
    defineField({
      name: 'govSectionBadge',
      title: 'Government Section Badge',
      type: 'string',
      initialValue: 'Strategic Advantage',
    }),
    defineField({
      name: 'govSectionTitle',
      title: 'Government Section Title',
      type: 'string',
    }),
    defineField({
      name: 'govSectionDescription',
      title: 'Government Section Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'govAdvantages',
      title: 'Government Advantages (3 items)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', title: 'Title', type: 'string'},
            {name: 'description', title: 'Description', type: 'text'},
            {
              name: 'icon',
              title: 'Icon Name',
              type: 'string',
              description: 'Lucide icon name (e.g., Gavel, Eye, Laptop)',
            },
            {
              name: 'iconColor',
              title: 'Icon Color (Tailwind class)',
              type: 'string',
              initialValue: 'text-blue-400',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'governmentCouncilsTitle',
      title: 'Government Councils Card Title',
      type: 'string',
      initialValue: 'We Sit On The Boards Of:',
    }),
    defineField({
      name: 'governmentCouncils',
      title: 'Government Councils List',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'name', title: 'Council Name', type: 'string'},
            {
              name: 'icon',
              title: 'Icon Name',
              type: 'string',
              description: 'Lucide icon name (e.g., Building2, ShieldCheck, Landmark)',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'agenciesTitle',
      title: 'Agencies Section Title',
      type: 'string',
      initialValue: 'Productive Relationships With Agencies',
    }),
    defineField({
      name: 'agencies',
      title: 'Government Agencies',
      type: 'array',
      of: [{type: 'string'}],
      description: 'List of agency names (e.g., DTI, DOLE, DSWD)',
    }),

    // CTA SECTION
    defineField({
      name: 'ctaTitle',
      title: 'CTA Section Title',
      type: 'string',
    }),
    defineField({
      name: 'ctaDescription',
      title: 'CTA Section Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'ctaButtonText',
      title: 'CTA Button Text',
      type: 'string',
      initialValue: 'Apply for Membership',
    }),
  ],
})
