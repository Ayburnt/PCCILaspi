// backend/scripts/seedServices.js
// Seed Services page content into Sanity
// Run: node scripts/seedServices.js

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

const services = [
  {
    _key: nanoid(),
    name: 'Enterprise Development & Skills Upgrading',
    detail:
      'Elevating local competitiveness through professional training, advisory services, and one-on-one mentorship programs for SMEs.',
    category: 'Development',
  },
  {
    _key: nanoid(),
    name: 'Investment Promotion & Referrals',
    detail:
      'Organizing outbound and inbound trade missions, collateral development, and business referral services to strengthen local investment.',
    category: 'Growth',
  },
  {
    _key: nanoid(),
    name: 'Trade Promotion & Matchmaking',
    detail:
      'Physical and virtual trade fairs, B2B matchmaking, and e-commerce platform implementation for wider market access.',
    category: 'Trade',
  },
  {
    _key: nanoid(),
    name: 'Information & Communication (IEC)',
    detail:
      "Providing industry forums, conferences, and publications while managing a robust members' database and digital platform engagement.",
    category: 'Advocacy',
  },
  {
    _key: nanoid(),
    name: 'Corporate Social Responsibility (CSR)',
    detail:
      'Empowering specific sectors and local communities through dedicated social initiatives and community development endeavors.',
    category: 'Community',
  },
  {
    _key: nanoid(),
    name: 'Other Auxiliary Services',
    detail:
      'Business research, industry studies, awards and recognition, dispute resolution, and intellectual property registration assistance.',
    category: 'Support',
  },
]

const assurances = [
  'Official representation with local and national government units',
  'Access to PCCI National and Regional trade networks',
  'Standardized business advisory and mentorship playbooks',
  'Diplomatic handling of business disputes and policy advocacy',
]

const servicesPage = {
  _type: 'servicesPage',
  _id: 'servicesPage',
  header: {
    _type: 'object',
    badgeText: 'PCCI-Las Piñas Services',
    title: 'Services',
    description: 'PCCI-Las Piñas drives business growth and competitiveness.',
  },
  services,
  assurances,
  approachBox: {
    _type: 'object',
    title: 'Institutional Mandate',
    description:
      "Our service delivery is anchored on the Chamber's commitment to creating a conducive environment for business expansion through formal mentorship and strategic promotion.",
  },
  processImage: null,
  footerBanner: {
    _type: 'object',
    quote: '"Building a Dynamic Business Community for a Prosperous Las Piñas."',
    note:
      'For urgent business assistance or policy concerns, please contact our Technical Secretariat directly through our official channels.',
  },
}

async function seedServices() {
  console.log('🌱 Seeding Services page...')
  try {
    const existing = await client.fetch(
      `*[_type == "servicesPage" && _id == "servicesPage"][0]`
    )

    if (existing) {
      console.log('🗑️  Existing servicesPage found. Deleting...')
      await client.delete('servicesPage')
      console.log('✅ Deleted old servicesPage')
    }

    await client.create(servicesPage)
    console.log('✅ Created servicesPage document')
    console.log('\n📝 Note: You can upload icon images for each service in the Studio.')
  } catch (err) {
    console.error('❌ Error seeding services page:', err)
    process.exit(1)
  }
}

seedServices()
