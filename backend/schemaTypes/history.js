// backend/schemaTypes/history.js

// ADD 'Users' to the import list
import { Calendar, BookOpen, Clock, ListOrdered, Briefcase, Zap, Star, Users } from 'lucide-react';

export default {
  // Document configuration
  name: 'historyPage', // <-- Must be 'historyPage' to match config
  title: 'History Page Content',
  type: 'document',
  icon: BookOpen,
  
  __experimental_actions: ['update', 'publish', 'create'],

  fields: [
    // --- Hero Section Fields ---
    {
      name: 'heroSection',
      title: '1. Hero Section',
      type: 'object',
      fields: [
        { name: 'heroTitle', title: 'Hero Title', type: 'string', validation: Rule => Rule.required(), initialValue: 'A Proud History of Service and Growth' },
        { name: 'heroSubtitle', title: 'Hero Subtitle', type: 'text', rows: 2, description: 'A brief description shown below the main title.', initialValue: 'Tracing the journey that shaped our organization and community.' },
        { name: 'heroBadgeText', title: 'Badge Text', type: 'string', initialValue: 'Our Legacy' },
        { name: 'heroBackgroundImage', title: 'Hero Background Image', type: 'image', options: { hotspot: true }, description: 'High-resolution image for the top banner.', validation: Rule => Rule.required() },
      ],
    },

    // --- Brief History Section ---
    {
      name: 'briefHistorySection',
      title: '2. Brief History Section',
      type: 'object',
      fields: [
        { name: 'briefHistoryTitle', title: 'Title', type: 'string', initialValue: 'The Genesis of Our Organization' },
        { name: 'briefHistoryText', title: 'Main Content', type: 'array', of: [{ type: 'block' }], description: 'The main narrative about the organization\'s beginning.', validation: Rule => Rule.required() },
        { name: 'briefHistoryImage', title: 'Supporting Image', type: 'image', options: { hotspot: true } },
      ],
    },

    // --- Milestone Timeline Section ---
    {
      name: 'milestoneSection',
      title: '3. Milestone Timeline',
      type: 'object',
      fields: [
        { name: 'milestoneTitle', title: 'Title', type: 'string', initialValue: 'Major Historical Milestones' },
        { name: 'milestoneSubtitle', title: 'Subtitle', type: 'string', initialValue: 'Key dates and events that defined our trajectory over the decades.' },
        {
          name: 'milestones',
          title: 'Milestones',
          type: 'array',
          of: [
            {
              name: 'milestoneEvent',
              title: 'Timeline Event',
              type: 'object',
              icon: Clock,
              fields: [
                { name: 'year', title: 'Year/Date', type: 'string', description: 'e.g., "1995" or "Q3 2005"', validation: Rule => Rule.required() },
                { name: 'description', title: 'Description', type: 'text', rows: 3, validation: Rule => Rule.required() },
                { 
                  name: 'icon', 
                  title: 'Timeline Icon (Lucide)', 
                  type: 'string', 
                  options: { 
                    list: [ 
                      { title: 'Calendar', value: 'Calendar' }, 
                      { title: 'Lightning Bolt (Zap)', value: 'Zap' }, 
                      { title: 'Clock', value: 'Clock' }, 
                      { title: 'Briefcase', value: 'Briefcase' }, 
                      { title: 'Star', value: 'Star' }, 
                      { title: 'People (Users)', value: 'Users' }, // <--- NEW ICON ADDED HERE
                    ], 
                    layout: 'dropdown' 
                  }, 
                  initialValue: 'Clock' 
                }
              ]
            }
          ],
        },
      ],
    },

    // --- Key Achievements Section ---
    {
      name: 'keyAchievementsSection',
      title: '4. Key Achievements List',
      type: 'object',
      fields: [
        { name: 'keyAchievementsTitle', title: 'Title', type: 'string', initialValue: 'Notable Accomplishments' },
        { name: 'keyAchievementsSubtitle', title: 'Subtitle', type: 'string', initialValue: 'A look at the major successes achieved through collective effort.' },
        { name: 'keyAchievements', title: 'Achievements', type: 'array', of: [{ type: 'string', icon: ListOrdered }], description: 'A list of major successes or key initiatives.' },
      ],
    },
  ],

  preview: {
    select: { title: 'heroSection.heroTitle', subtitle: 'milestoneSection.milestoneTitle' },
    prepare({ title, subtitle }) { return { title: title || 'History Page', subtitle: subtitle ? `Milestones: ${subtitle}` : 'Setup in progress', media: BookOpen }; },
  },
};