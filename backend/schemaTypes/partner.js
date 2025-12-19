export default {
  name: 'partner',
  title: 'Partner Logo',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Partner Name (e.g., Honeywell)',
      type: 'string',
      description: 'The full name of the partner for alt text and identification.',
      validation: Rule => Rule.required(),
    },
    {
      name: 'logo',
      title: 'Partner Logo Image',
      type: 'image',
      description: 'Upload the partner logo image here.',
      options: {
        hotspot: true, // Allows for cropping/positioning
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'website',
      title: 'Website URL',
      type: 'url',
      description: 'Public website or profile page for this partner (any URL).',
      validation: (Rule) => Rule.uri({ allowRelative: false, scheme: ['http', 'https'] }),
    },
    {
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      description: 'Use a number to control the display order (e.g., 1, 2, 3...)',
    }
  ],
  // Defines how the document looks when listed in the Studio
  preview: {
    select: {
      title: 'name',
      media: 'logo',
      subtitle: 'sortOrder',
    },
    prepare({ title, media, subtitle }) {
        return {
            title,
            media,
            subtitle: subtitle ? `Order: ${subtitle}` : 'No order set',
        };
    },
  },
}