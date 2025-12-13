// Script to seed initial events data into Sanity
// Run: node scripts/seedEvents.js

import 'dotenv/config'
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_TOKEN,
  apiVersion: process.env.SANITY_API_VERSION,
})

const events = [
  // --- PAST EVENTS ---
  {
    _type: 'event',
    title: 'Business Leadership Conference',
    slug: { current: 'business-leadership-conference' },
    eventType: 'past',
    date: '2024-11-15',
    category: 'Conference',
    location: 'PCCI Main Hall',
    attendees: 250,
    highlights: ['3 Keynote Speakers', '15 Business Leaders', 'Networking Mixer'],
    year: '2024',
    success: 'Achieved a record 95% attendee satisfaction rate.',
    description:
      'A comprehensive business leadership conference featuring keynote speakers and networking opportunities for business leaders.',
    registrationOpen: false,
    price: 'Completed',
  },
  {
    _type: 'event',
    title: 'Tech Innovation Expo',
    slug: { current: 'tech-innovation-expo' },
    eventType: 'past',
    date: '2024-10-20',
    category: 'Expo',
    location: 'Las Piñas Convention Ctr',
    attendees: 400,
    highlights: ['50+ Exhibitors', 'AI Demos', 'Startup Pitches'],
    year: '2024',
    success: 'Facilitated over ₱5M in potential startup funding.',
    description:
      'An expo showcasing the latest technology innovations with demonstrations and startup pitch opportunities.',
    registrationOpen: false,
    price: 'Completed',
  },
  {
    _type: 'event',
    title: 'SME Growth Summit',
    slug: { current: 'sme-growth-summit' },
    eventType: 'past',
    date: '2024-09-10',
    category: 'Summit',
    location: 'Business Hub',
    attendees: 180,
    highlights: ['Growth Strategies', 'Funding Ops', 'Expert Panel'],
    year: '2024',
    success: 'Empowered 180+ SMEs with actionable growth strategies.',
    description:
      'A summit dedicated to helping small and medium enterprises grow with expert strategies and funding opportunities.',
    registrationOpen: false,
    price: 'Completed',
  },
  {
    _type: 'event',
    title: 'Women in Business Gala',
    slug: { current: 'women-in-business-gala' },
    eventType: 'past',
    date: '2024-08-05',
    category: 'Gala',
    location: 'Grand Ballroom',
    attendees: 150,
    highlights: ['Award Ceremony', 'Inspiring Talks', 'Dinner'],
    year: '2024',
    success: 'Raised significant funds for female entrepreneurship grants.',
    description:
      'An elegant gala celebrating women leaders in business with awards, inspiring talks, and networking.',
    registrationOpen: false,
    price: 'Completed',
  },
  {
    _type: 'event',
    title: 'Digital Marketing Bootcamp',
    slug: { current: 'digital-marketing-bootcamp' },
    eventType: 'past',
    date: '2024-07-12',
    category: 'Bootcamp',
    location: 'Training Center',
    attendees: 90,
    highlights: ['SEO Strategies', 'Social Media', 'Content Creation'],
    year: '2024',
    success: 'Hands-on training resulting in immediate ROI for participants.',
    description:
      'An intensive bootcamp covering digital marketing essentials including SEO, social media, and content strategies.',
    registrationOpen: false,
    price: 'Completed',
  },

  // --- UPCOMING EVENTS ---
  {
    _type: 'event',
    title: 'Annual Business Excellence Awards',
    slug: { current: 'annual-business-excellence-awards' },
    eventType: 'upcoming',
    date: '2025-02-10',
    time: '18:00 - 22:00',
    category: 'Awards',
    location: 'Grand Ballroom, Las Piñas',
    attendees: 300,
    highlights: ['Award Ceremony', 'Prestigious Recognition', 'Networking'],
    success:
      'Celebrate outstanding achievements in business leadership and innovation. A night of prestige and networking.',
    description:
      'Celebrate outstanding achievements in business leadership and innovation. A night of prestige and networking.',
    registrationOpen: true,
    price: '₱2,500',
  },
  {
    _type: 'event',
    title: 'Startup Pitch Competition',
    slug: { current: 'startup-pitch-competition' },
    eventType: 'upcoming',
    date: '2025-02-20',
    time: '10:00 - 16:00',
    category: 'Competition',
    location: 'Innovation Center',
    attendees: 120,
    highlights: ['Investor Panel', 'Mentorship', 'Prize Pool'],
    success:
      'Entrepreneurs pitch their innovative ideas to a panel of investors and mentors. Witness the future of industry.',
    description:
      'Entrepreneurs pitch their innovative ideas to a panel of investors and mentors. Witness the future of industry.',
    registrationOpen: true,
    price: 'Free',
  },
  {
    _type: 'event',
    title: 'Financial Planning Masterclass',
    slug: { current: 'financial-planning-masterclass' },
    eventType: 'upcoming',
    date: '2025-03-05',
    time: '14:00 - 17:00',
    category: 'Masterclass',
    location: 'PCCI Training Room',
    attendees: 50,
    highlights: ['Expert Instructors', 'Practical Tools', 'Q&A Session'],
    success:
      'Master the art of corporate financial planning with top-tier industry experts and consultants.',
    description:
      'Master the art of corporate financial planning with top-tier industry experts and consultants.',
    registrationOpen: true,
    price: '₱1,000',
  },
  {
    _type: 'event',
    title: 'Supply Chain Optimization Summit',
    slug: { current: 'supply-chain-optimization-summit' },
    eventType: 'upcoming',
    date: '2025-03-15',
    time: '09:00 - 15:00',
    category: 'Summit',
    location: 'Business District Convention Center',
    attendees: 180,
    highlights: ['Logistics Experts', 'Case Studies', 'Networking'],
    success:
      'Learn cutting-edge strategies for supply chain efficiency, logistics, and cost reduction.',
    description:
      'Learn cutting-edge strategies for supply chain efficiency, logistics, and cost reduction.',
    registrationOpen: false,
    price: 'TBA',
  },
]

async function seedEvents() {
  try {
    console.log('🗑️ Deleting all previous events…')
    await client.delete({ query: '*[_type == "event"]' })
    console.log('✔️ Previous events removed.')
    console.log('🚀 Seeding new events…')

    for (const event of events) {
      try {
        await client.create(event)
        console.log(`Created: ${event.title}`)
      } catch (err) {
        console.error(`Error creating event "${event.title}":`, err.message)
      }
    }

    console.log('🎉 Event seeding completed!')
  } catch (err) {
    console.error('Fatal error during seeding:', err)
    process.exit(1)
  }
}

seedEvents()
