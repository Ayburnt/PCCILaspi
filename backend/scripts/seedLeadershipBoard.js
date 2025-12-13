/**
 * Seed Leadership Board + Members
 * Run: node scripts/seedLeadershipBoard.js
 */

import 'dotenv/config'
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_TOKEN,
  apiVersion: process.env.SANITY_API_VERSION,
})

async function seed() {
  try {
    // Check if the singleton already exists
    const existing = await client.fetch(`*[_type == "leadershipBoard"][0]`)

    const doc = {
      _type: 'leadershipBoard',
      title: 'Executive Board',
      description: 'Our dedicated team of business leaders guiding PCCI Las Piñas toward success',
      members: [
        {
          name: 'John Doe',
          role: 'President',
          bio: 'Leading with vision and integrity.',
          image: {}, // empty object, can upload later in Sanity Studio
          order: 1,
        },
        {
          name: 'Jane Smith',
          role: 'Vice President',
          bio: 'Committed to excellence and teamwork.',
          image: {},
          order: 2,
        },
        {
          name: 'Alice Johnson',
          role: 'Treasurer',
          bio: 'Ensuring financial stability and transparency.',
          image: {},
          order: 3,
        },
        {
          name: 'Bob Lee',
          role: 'Secretary',
          bio: 'Organized and detail-oriented.',
          image: {},
          order: 4,
        },
      ],
    }

    if (existing) {
      // Update existing singleton
      await client
        .patch(existing._id)
        .set(doc)
        .commit({ autoGenerateArrayKeys: true })
      console.log('Leadership Board updated successfully!')
    } else {
      // Create new singleton
      await client.create(doc)
      console.log('Leadership Board seeded successfully!')
    }
  } catch (err) {
    console.error('Error seeding Leadership Board:', err)
  }
}

seed()