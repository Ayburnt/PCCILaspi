// backend/schemaTypes/advocacy.ts
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'advocacyPage',
  title: 'Advocacy Page',
  type: 'document',
  fields: [
    // HERO SECTION
    defineField({
      name: 'heroSection',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({
          name: 'badge',
          title: 'Badge Text',
          type: 'string',
          initialValue: 'Chamber Advocacy Series 2025',
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'title',
          title: 'Main Title',
          type: 'string',
          initialValue: 'Building a Resilient',
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'highlightedText',
          title: 'Highlighted Text (Yellow)',
          type: 'string',
          initialValue: 'Business Community',
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'text',
          rows: 3,
          initialValue: 'PCCI-Las Piñas is dedicated to shaping policies that foster economic growth, sustainability, and innovation in the city.',
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'backgroundImage',
          title: 'Background Image (Optional)',
          type: 'image',
          options: {
            hotspot: true
          }
        })
      ]
    }),

    // EXECUTIVE SUMMARY SECTION
    defineField({
      name: 'executiveSummary',
      title: 'Executive Summary Section',
      type: 'object',
      fields: [
        defineField({
          name: 'mandateTitle',
          title: 'Mandate Title',
          type: 'string',
          initialValue: 'Our Mandate',
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'mandateSubtitle',
          title: 'Mandate Subtitle',
          type: 'string',
          initialValue: 'Mission Statement',
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'quoteText',
          title: 'Quote Text',
          type: 'text',
          rows: 4,
          initialValue: 'The Philippine Chamber of Commerce and Industry - Las Piñas is committed to advocating for policies that support local businesses. Our agenda is designed to create a more resilient, efficient, and prosperous city for all stakeholders.',
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'agendaPdf',
          title: 'Agenda PDF File',
          type: 'file',
          options: {
            accept: '.pdf'
          }
        }),
        defineField({
          name: 'downloadAgendaLabel',
          title: 'Download Agenda Button Label',
          type: 'string',
          initialValue: 'Download 2025 Agenda (PDF)'
        }),
        defineField({
          name: 'printSummaryLabel',
          title: 'Print Summary Button Label',
          type: 'string',
          initialValue: 'Print Summary'
        })
      ]
    }),

    // ADVOCACY PROGRAMS ARRAY
    defineField({
      name: 'programs',
      title: 'Advocacy Programs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'order',
              title: 'Display Order',
              type: 'number',
              validation: Rule => Rule.required().min(1)
            }),
            defineField({
              name: 'localTitle',
              title: 'Local Title (Tagalog)',
              type: 'string',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'engTitle',
              title: 'English Title',
              type: 'string',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'slug',
              title: 'Slug',
              type: 'slug',
              options: {
                source: 'engTitle',
                maxLength: 96
              },
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'icon',
              title: 'Icon Name',
              type: 'string',
              description: 'Lucide icon name (e.g., Waves, FileCheck, Ban)',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'image',
              title: 'Featured Image',
              type: 'image',
              options: {
                hotspot: true
              },
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alternative text',
                  description: 'Important for SEO and accessibility'
                }
              ],
            }),
            defineField({
              name: 'content',
              title: 'Content',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [
                    { title: 'Normal', value: 'normal' },
                    { title: 'H2', value: 'h2' },
                    { title: 'H3', value: 'h3' },
                    { title: 'Quote', value: 'blockquote' }
                  ],
                  marks: {
                    decorators: [
                      { title: 'Strong', value: 'strong' },
                      { title: 'Emphasis', value: 'em' }
                    ]
                  }
                }
              ],
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'positionPaper',
              title: 'Position Paper (PDF)',
              type: 'file',
              options: {
                accept: '.pdf'
              }
            }),
            defineField({
              name: 'isActive',
              title: 'Active',
              type: 'boolean',
              initialValue: true
            })
          ],
          preview: {
            select: {
              title: 'localTitle',
              subtitle: 'engTitle',
              media: 'image',
              order: 'order'
            },
            prepare(selection) {
              const { title, subtitle, media, order } = selection;
              return {
                title: `${order}. ${title}`,
                subtitle,
                media
              };
            }
          }
        }
      ]
    }),

    // CALL TO ACTION SECTION
    defineField({
      name: 'callToAction',
      title: 'Call to Action Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'Partner with Us for Change',
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
          initialValue: 'Are you a business owner in Las Piñas? Join our committees and help shape the policies that affect your industry.',
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'primaryButtonText',
          title: 'Primary Button Text',
          type: 'string',
          initialValue: 'Become a Member'
        }),
        defineField({
          name: 'primaryButtonLink',
          title: 'Primary Button Link',
          type: 'string',
          initialValue: '/join'
        }),
        defineField({
          name: 'secondaryButtonText',
          title: 'Secondary Button Text',
          type: 'string',
          initialValue: 'Contact Secretariat'
        }),
        defineField({
          name: 'secondaryButtonLink',
          title: 'Secondary Button Link',
          type: 'string',
          initialValue: '/contact'
        })
      ]
    })
  ],
  preview: {
    prepare() {
      return {
        title: 'Advocacy Page Content'
      };
    }
  }
});