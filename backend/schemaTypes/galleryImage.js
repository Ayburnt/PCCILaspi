export default {
  name: "gallery",
  title: "Company Gallery",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Section Main Title",
      type: "string",
      description: "Example: 'Our Professional Journey' or 'Company Gallery'",
      initialValue: "Our Company Gallery",
    },
    {
      name: "subtitle",
      title: "Section Subtitle/Description",
      type: "text",
      rows: 3,
      description: "A short paragraph appearing next to the title.",
    },
    {
      name: "images",
      title: "Gallery Images",
      type: "array",
      description: "Add and reorder images for the slider",
      of: [
        {
          type: "image",
          options: { 
            hotspot: true // Allows you to crop images directly in Sanity
          },
          fields: [
            {
              name: "title",
              title: "Image Caption",
              type: "string",
              description: "This text appears on the glassmorphism overlay.",
            },
            {
              name: "alt",
              title: "Alternative Text",
              type: "string",
              description: "Important for SEO and accessibility.",
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    },
  ],
};