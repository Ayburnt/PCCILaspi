// backend/scripts/seedProjects.js
// Seed Projects page content into Sanity
// Run: node scripts/seedProjects.js

import 'dotenv/config'
import { createClient } from '@sanity/client'
import { nanoid } from 'nanoid'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_TOKEN,
  apiVersion: process.env.SANITY_API_VERSION,
})

const projects = [
  {
    _key: nanoid(),
    title: 'Jobs Las Pinas Portal',
    category: 'Digital Infrastructure',
    status: 'Active',
    description:
      'A dedicated job portal designed for our members and applicants, providing a seamless platform for job seekers to connect with potential employers. This resource offers a wide range of employment opportunities, career resources, and networking possibilities, empowering both job seekers and businesses in the Quezon City community.',
    image: null,
  },
  {
    _key: nanoid(),
    title: 'Annual Business Conference',
    category: 'Strategic Event',
    status: 'Recurring',
    description:
      'Join us for the remarkable Annual Quezon City Business Conference, a premier event in collaboration with the Quezon City Local Government Unit. This conference brings together industry leaders, innovators, and local entrepreneurs to share insights, foster partnerships, and explore new opportunities for growth and development in our vibrant community. Don\'t miss this chance to connect and collaborate!',
    image: null,
  },
  {
    _key: nanoid(),
    title: 'General Membership Meeting',
    category: 'Governance',
    status: 'Monthly',
    description:
      'We host a monthly General Membership Meeting that includes engaging learning sessions and valuable networking opportunities for our members. Each event features insightful topics and high-caliber speakers, ensuring a rich experience for all attendees. Join us to expand your knowledge and connect with like-minded professionals!',
    image: null,
  },
  {
    _key: nanoid(),
    title: 'SME Development Workshop',
    category: 'Education',
    status: 'Upcoming',
    description:
      'A series of technical workshops aimed at digitizing small businesses and ensuring compliance with new tax regulations.',
    image: null,
  },
]

const projectsPage = {
  _type: 'projectsPage',
  _id: 'projectsPage',
  header: {
    _type: 'object',
    badgeText: 'Institutional Portfolio',
    title: 'Key Initiatives & Projects',
    description:
      'A record of our strategic engagements, community development programs, and economic milestones.',
  },
  projectsSection: {
    _type: 'object',
    label: 'Project Highlights',
    title: "We've Done Lot's of Awesome Projects",
  },
  projects,
  footer: {
    _type: 'object',
    quote:
      'Building a sustainable future through strategic infrastructure and community-focused development.',
    registryLabel: 'Official Project Registry',
  },
}

async function seedProjects() {
  console.log('🌱 Seeding Projects page...')

  try {
    const existing = await client.fetch(
      `*[_type == "projectsPage" && _id == "projectsPage"][0]`
    )

    if (existing) {
      console.log('🗑️  Existing projectsPage found. Deleting...')
      await client.delete('projectsPage')
      console.log('✅ Deleted old projectsPage')
    }

    await client.create(projectsPage)
    console.log('✅ Created projectsPage document')
    console.log('\n📝 Note: You can upload project images for each project in the Studio.')
    console.log('   Go to Content Management > Projects Page to add images.')
  } catch (err) {
    console.error('❌ Error seeding projects page:', err)
    process.exit(1)
  }
}

seedProjects()
