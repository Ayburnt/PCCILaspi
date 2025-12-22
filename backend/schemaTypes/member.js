import {defineField, defineType} from 'sanity'
import {UsersIcon} from '@sanity/icons'

export default defineType({
  name: 'member',
  title: 'Members Directory',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'company',
      title: 'Company Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    // FIXED: Changed definefiled to defineField and added type: 'slug'
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Click "Generate" to create a unique URL based on the company name',
      options: {
        source: 'company',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'membershipType',
      title: 'Membership Type',
      type: 'string',
      options: {
        list: [
          {title: 'Corporate Membership', value: 'Corporate Membership'},
          {title: 'Individual Membership', value: 'Individual Membership'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Business Category',
      type: 'string',
      options: {
        list: [
          {title: 'Custom House Brokers', value: 'Custom House Brokers'},
          {title: 'Construction', value: 'Construction'},
          {title: 'Consulting', value: 'Consulting'},
          {title: 'Manufacturing', value: 'Manufacturing'},
          {title: 'Retail', value: 'Retail'},
          {title: 'Technology', value: 'Technology'},
          {title: 'Food & Beverage', value: 'Food & Beverage'},
          {title: 'Logistics', value: 'Logistics'},
          {title: 'Other', value: 'Other'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'overview',
      title: 'Company Overview (Detailed)',
      type: 'text',
      rows: 5,
      description: 'Detailed description for the profile page',
    }),
    defineField({
      name: 'logo',
      title: 'Company Logo',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'location',
      title: 'Business Address',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url',
      description: 'Full URL including https://',
    }),
    defineField({
      name: 'keyServices',
      title: 'Services',
      type: 'array',
      of: [{type: 'string'}],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'products',
      title: 'Products',
      type: 'array',
      of: [{type: 'string'}],
      description: 'List of products offered by the company',
    }),
    defineField({
      name: 'memberSince',
      title: 'Member Since (Year)',
      type: 'string',
      description: 'Year when they joined (e.g., 2020)',
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        {name: 'facebook', title: 'Facebook', type: 'url'},
        {name: 'linkedin', title: 'LinkedIn', type: 'url'},
        {name: 'instagram', title: 'Instagram', type: 'url'},
        {name: 'twitter', title: 'X (Twitter)', type: 'url'},
        {name: 'viber', title: 'Viber', type: 'string'},
      ],
    }),
    defineField({
      name: 'keyRepresentative',
      title: 'Key Representative',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Full Name',
          type: 'string',
          validation: (rule) => rule.required(),
        },
        {
          name: 'position',
          title: 'Position/Title',
          type: 'string',
          validation: (rule) => rule.required(),
        },
        {
          name: 'photo',
          title: 'Photo',
          type: 'image',
          options: {hotspot: true},
        },
      ],
    }),
    defineField({
      name: 'businessHours',
      title: 'Business Hours',
      type: 'object',
      fields: [
        {
          name: 'monday',
          title: 'Monday',
          type: 'string',
          options: {
            list: [
              'Closed',
              '8:00 AM - 5:00 PM',
              '8:00 AM - 6:00 PM',
              '9:00 AM - 5:00 PM',
              '9:00 AM - 6:00 PM',
              '10:00 AM - 3:00 PM',
            ],
          },
        },
        {
          name: 'tuesday',
          title: 'Tuesday',
          type: 'string',
          options: {
            list: [
              'Closed',
              '8:00 AM - 5:00 PM',
              '8:00 AM - 6:00 PM',
              '9:00 AM - 5:00 PM',
              '9:00 AM - 6:00 PM',
              '10:00 AM - 3:00 PM',
            ],
          },
        },
        {
          name: 'wednesday',
          title: 'Wednesday',
          type: 'string',
          options: {
            list: [
              'Closed',
              '8:00 AM - 5:00 PM',
              '8:00 AM - 6:00 PM',
              '9:00 AM - 5:00 PM',
              '9:00 AM - 6:00 PM',
              '10:00 AM - 3:00 PM',
            ],
          },
        },
        {
          name: 'thursday',
          title: 'Thursday',
          type: 'string',
          options: {
            list: [
              'Closed',
              '8:00 AM - 5:00 PM',
              '8:00 AM - 6:00 PM',
              '9:00 AM - 5:00 PM',
              '9:00 AM - 6:00 PM',
              '10:00 AM - 3:00 PM',
            ],
          },
        },
        {
          name: 'friday',
          title: 'Friday',
          type: 'string',
          options: {
            list: [
              'Closed',
              '8:00 AM - 5:00 PM',
              '8:00 AM - 6:00 PM',
              '9:00 AM - 5:00 PM',
              '9:00 AM - 6:00 PM',
              '10:00 AM - 3:00 PM',
            ],
          },
        },
        {
          name: 'saturday',
          title: 'Saturday',
          type: 'string',
          options: {
            list: ['Closed', '8:00 AM - 12:00 PM', '9:00 AM - 1:00 PM', '10:00 AM - 3:00 PM'],
          },
        },
        {name: 'sunday', title: 'Sunday', type: 'string', options: {list: ['Closed']}},
      ],
    }),

    defineField({
      name: 'isNewMember',
      title: 'New Member',
      type: 'boolean',
      description: 'Mark this member as new',
      initialValue: false,
    }),

    defineField({
      name: 'featured',
      title: 'Featured Member',
      type: 'boolean',
      description: 'Highlight this member in the directory',
      initialValue: false,
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Active', value: 'active'},
          {title: 'Inactive', value: 'inactive'},
        ],
      },
      initialValue: 'active',
    }),
  ],
  preview: {
    select: {
      title: 'company',
      subtitle: 'membershipType',
      media: 'logo',
    },
  },
})
