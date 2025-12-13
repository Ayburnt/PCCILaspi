import { defineField, defineType } from 'sanity'
import { UsersIcon } from '@sanity/icons'

export const leadershipBoard = defineType({
  name: 'leadershipBoard',
  title: 'Leadership Board',
  type: 'document',
  icon: UsersIcon,
  // Singleton actions
  // @ts-expect-error Sanity allows this property for action control on singletons
  __experimental_actions: ['update', 'publish'],
  preview: {
    prepare() {
      return { title: 'Leadership Board', subtitle: 'Manage leadership members' }
    },
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Executive Board',
    }),
    defineField({
      name: 'description',
      title: 'Section Description',
      type: 'text',
      rows: 3,
      initialValue:
        'Our dedicated team of business leaders guiding PCCI Las Piñas toward success',
    }),
    defineField({
      name: 'members',
      title: 'Members',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Full Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'role',
              title: 'Role/Position',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'bio',
              title: 'Short Bio',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'image',
              title: 'Portrait Image',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({
              name: 'order',
              title: 'Display Order',
              type: 'number',
              description: 'Lower numbers appear first',
            }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'role', media: 'image' },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).warning('Add at least one member'),
    }),
  ],
})
