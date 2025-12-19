// backend/schemas/partner.js

export default {
  // The name of the document type (used in GROQ queries, like *[_type == "partner"])
  name: 'partner',
  // The user-friendly title that appears in the Sanity Studio sidebar
  title: 'Partner Logo',
  // The type of document
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
      description: 'Public website or profile page for this partner.',
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