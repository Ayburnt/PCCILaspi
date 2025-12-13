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
      initialValue: 'Why Join PCCI Las Piñas?',
    }),
    defineField({
      name: 'pillarsDescription',
      title: 'Core Pillars Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'corePillars',
      title: 'Core Pillars / Benefits',
      type: 'array',
      description: 'Benefits and reasons to join PCCI Las Piñas. Displayed in a responsive grid (3 columns on desktop).',
      of: [
        {
          type: 'object',
          name: 'pillar',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'Select an icon from the list',
              validation: (Rule) => Rule.required(),
              options: {
                list: [
                  {title: '🌐 Network', value: 'Network'},
                  {title: '💡 Lightbulb', value: 'Lightbulb'},
                  {title: '❤️ Heart', value: 'Heart'},
                  {title: '🏢 Building', value: 'Building2'},
                  {title: '👥 Users', value: 'Users'},
                  {title: '💼 Briefcase', value: 'Briefcase'},
                  {title: '⚖️ Gavel', value: 'Gavel'},
                  {title: '🎁 Gift', value: 'Gift'},
                  {title: '📢 Megaphone', value: 'Megaphone'},
                  {title: '⚖️ Scale', value: 'Scale'},
                  {title: '👁️ Eye', value: 'Eye'},
                  {title: '💻 Laptop', value: 'Laptop'},
                  {title: '🛡️ Shield Check', value: 'ShieldCheck'},
                  {title: '🏛️ Landmark', value: 'Landmark'},
                  {title: '➡️ Arrow Right', value: 'ArrowRight'},
                  {title: '📊 Bar Chart', value: 'BarChart'},
                  {title: '🎯 Target', value: 'Target'},
                  {title: '🔧 Settings', value: 'Settings'},
                  {title: '📈 Trending Up', value: 'TrendingUp'},
                  {title: '🌟 Star', value: 'Star'},
                  {title: '🎓 Graduation Cap', value: 'GraduationCap'},
                  {title: '🤝 Handshake', value: 'Handshake'},
                  {title: '🏆 Trophy', value: 'Trophy'},
                  {title: '🔒 Lock', value: 'Lock'},
                  {title: '🌍 Globe', value: 'Globe'},
                ],
                layout: 'dropdown',
              },
            },
            {
              name: 'iconColor',
              title: 'Icon Color',
              type: 'string',
              description: 'Choose the icon color',
              initialValue: 'text-blue-600',
              options: {
                list: [
                  {title: '🔵 Blue', value: 'text-blue-600'},
                  {title: '🔴 Red', value: 'text-red-500'},
                  {title: '🟠 Orange/Amber', value: 'text-amber-500'},
                  {title: '🟢 Green/Emerald', value: 'text-emerald-600'},
                  {title: '🌸 Rose/Pink', value: 'text-rose-500'},
                  {title: '🟣 Purple', value: 'text-purple-600'},
                  {title: '🔵 Indigo', value: 'text-indigo-600'},
                  {title: '💙 Light Blue', value: 'text-sky-500'},
                  {title: '🟡 Yellow', value: 'text-yellow-500'},
                  {title: '🟢 Teal', value: 'text-teal-600'},
                  {title: '⚫ Slate/Gray', value: 'text-slate-600'},
                ],
                layout: 'dropdown',
              },
            },
            {
              name: 'bgColor',
              title: 'Background Color',
              type: 'string',
              description: 'Choose the background color',
              initialValue: 'bg-blue-50',
              options: {
                list: [
                  {title: '🔵 Blue (Light)', value: 'bg-blue-50'},
                  {title: '🔴 Red (Light)', value: 'bg-red-50'},
                  {title: '🟠 Orange/Amber (Light)', value: 'bg-amber-50'},
                  {title: '🟢 Green/Emerald (Light)', value: 'bg-emerald-50'},
                  {title: '🌸 Rose/Pink (Light)', value: 'bg-rose-50'},
                  {title: '🟣 Purple (Light)', value: 'bg-purple-50'},
                  {title: '🔵 Indigo (Light)', value: 'bg-indigo-50'},
                  {title: '💙 Light Blue (Light)', value: 'bg-sky-50'},
                  {title: '🟡 Yellow (Light)', value: 'bg-yellow-50'},
                  {title: '🟢 Teal (Light)', value: 'bg-teal-50'},
                  {title: '⚪ Slate/Gray (Light)', value: 'bg-slate-50'},
                ],
                layout: 'dropdown',
              },
            },
          ],
          preview: {
            select: {
              title: 'title',
              icon: 'icon',
            },
            prepare({title, icon}) {
              return {
                title: title,
                subtitle: icon ? `Icon: ${icon}` : 'No icon',
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).warning('At least one benefit should be added'),
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
        {
          name: 'title',
          title: 'Title',
          type: 'string',
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
        },
        {
          name: 'icon',
          title: 'Icon',
          type: 'string',
          description: 'Select an icon from the list',
          options: {
            list: [
              { title: '🌐 Network', value: 'Network' },
              { title: '💡 Lightbulb', value: 'Lightbulb' },
              { title: '❤️ Heart', value: 'Heart' },
              { title: '🏢 Building', value: 'Building2' },
              { title: '👥 Users', value: 'Users' },
              { title: '💼 Briefcase', value: 'Briefcase' },
              { title: '⚖️ Gavel', value: 'Gavel' },
              { title: '🎁 Gift', value: 'Gift' },
              { title: '📢 Megaphone', value: 'Megaphone' },
              { title: '⚖️ Scale', value: 'Scale' },
              { title: '👁️ Eye', value: 'Eye' },
              { title: '💻 Laptop', value: 'Laptop' },
              { title: '🛡️ Shield Check', value: 'ShieldCheck' },
              { title: '🏛️ Landmark', value: 'Landmark' },
              { title: '➡️ Arrow Right', value: 'ArrowRight' },
              { title: '📊 Bar Chart', value: 'BarChart' },
              { title: '🎯 Target', value: 'Target' },
              { title: '🔧 Settings', value: 'Settings' },
              { title: '📈 Trending Up', value: 'TrendingUp' },
              { title: '🌟 Star', value: 'Star' },
              { title: '🎓 Graduation Cap', value: 'GraduationCap' },
              { title: '🤝 Handshake', value: 'Handshake' },
              { title: '🏆 Trophy', value: 'Trophy' },
              { title: '🔒 Lock', value: 'Lock' },
              { title: '🌍 Globe', value: 'Globe' },
            ],
            layout: 'dropdown',
          },
        },
        {
          name: 'iconColor',
          title: 'Icon Color',
          type: 'string',
          initialValue: 'text-blue-400',
          options: {
            list: [
              { title: '🔵 Blue', value: 'text-blue-600' },
              { title: '💙 Light Blue', value: 'text-blue-400' },
              { title: '🔴 Red', value: 'text-red-500' },
              { title: '🟠 Orange', value: 'text-amber-500' },
              { title: '🟢 Green', value: 'text-emerald-600' },
              { title: '🌸 Rose', value: 'text-rose-500' },
              { title: '🟣 Purple', value: 'text-purple-600' },
              { title: '🔵 Indigo', value: 'text-indigo-600' },
              { title: '🟢 Teal', value: 'text-teal-600' },
              { title: '⚫ Slate', value: 'text-slate-600' },
            ],
            layout: 'dropdown',
          },
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
