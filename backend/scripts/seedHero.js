// Script to seed Hero section content into Sanity
// Run with: node scripts/seedHero.js

import 'dotenv/config'
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_TOKEN,
  apiVersion: process.env.SANITY_API_VERSION,
})

async function seedHero() {
  try {
    const result = await client.createOrReplace({
      _type: 'hero',
      _id: 'hero-singleton',

      // Badge
      badgeText: 'Official Chapter Website',

      // Main Heading
      mainHeading: 'Building Champions.',

      // Highlighted Heading
      highlightedHeading: 'Engineering the Future.',

      // Intro Text
      introText:
        'We are pleased to extend an invitation for you to join the PSME Las Piñas Chapter. Uniting professionals to upgrade the practice of Mechanical Engineering in the southern metro.',

      // Primary Button
      primaryButton: {
        text: 'Become a Member',
        link: '#join',
      },

      // Secondary Button
      secondaryButton: {
        text: 'Learn More',
        link: '#about',
      },

      // Hero Height
      heroHeight: 'h-[80vh]',

      // Overlay Opacity
      overlayOpacity: 'bg-blue-900/80',
    })

    console.log('✅ Hero section seeded successfully:', result._id)
  } catch (error) {
    console.error('❌ Error seeding Hero section:', error.message)
    process.exit(1)
  }
}

seedHero()
