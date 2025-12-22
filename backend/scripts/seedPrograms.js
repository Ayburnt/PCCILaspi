// backend/scripts/seedPrograms.js
// Seed Programs page content into Sanity
// Run: node scripts/seedPrograms.js

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

const programTracks = [
  {
    _key: nanoid(),
    title: 'SME Development & Mentorship',
    description:
      "Technical assistance and 'Go Negosyo' style mentorship for Las Piñas micro-entrepreneurs to scale operations and improve market reach.",
    icon: 'Briefcase',
    badge: 'Public-Private Initiative',
  },
  {
    _key: nanoid(),
    title: 'Advocacy & Policy Roundtable',
    description:
      'Representing member interests in LGU legislative hearings, focusing on business-friendly ordinances and local tax reforms.',
    icon: 'Landmark',
    badge: 'Official Representation',
  },
  {
    _key: nanoid(),
    title: 'Regulatory Compliance Clinic',
    description:
      'Assistance with business permit renewals, DTI/SEC compliance, and understanding new national government mandates.',
    icon: 'ShieldCheck',
    badge: 'Technical Assistance',
  },
  {
    _key: nanoid(),
    title: 'Trade & Networking Exchange',
    description:
      'B2B matching events and trade fairs connecting local suppliers with larger supply chains across the NCR.',
    icon: 'Users',
    badge: 'Member Exclusive',
  },
]

const stats = [
  { _key: nanoid(), label: 'Active Members', value: '180+', detail: 'Businesses represented in Las Piñas' },
  { _key: nanoid(), label: 'LGU Resolutions', value: '12', detail: 'Advocacy papers submitted' },
  { _key: nanoid(), label: 'Partner Organizations', value: '25+', detail: 'Strategic network alliances' },
  { _key: nanoid(), label: 'Waterways Cleared', value: '8', detail: 'Malayang Daloy initiative sites' },
  { _key: nanoid(), label: 'Mentors/Mentees', value: '120', detail: 'Total program participants' },
  { _key: nanoid(), label: 'Start-ups Supported', value: '45', detail: 'Negosyo program beneficiaries' },
  { _key: nanoid(), label: 'Seminars & Trainings', value: '32', detail: 'Capacity building sessions' },
  { _key: nanoid(), label: 'Complaints Assisted', value: '85%', detail: 'Resolution rate for business hurdles' },
]

const roadmapSteps = [
  {
    _key: nanoid(),
    title: 'Consultation',
    text: 'Member businesses present specific constraints or regulatory hurdles to the Secretariat.',
  },
  {
    _key: nanoid(),
    title: 'Strategic Planning',
    text: 'Our board committees align requests with current LGU policies and Chamber resources.',
  },
  {
    _key: nanoid(),
    title: 'Mobilization',
    text: 'Execution of seminars, trade missions, or direct representation with government agencies.',
  },
  {
    _key: nanoid(),
    title: 'Evaluation',
    text: 'Review of outcomes to ensure long-term business sustainability for our members.',
  },
]

const programsPage = {
  _type: 'programsPage',
  _id: 'programsPage',
  header: {
    _type: 'object',
    badgeText: 'Official Programs',
    title: 'Advancing the Interests of Las Piñas City',
    description: 'Supports a competitive, sustainable, and responsible business community.',
  },
  programTracks,
  performance: {
    _type: 'object',
    sectionLabel: 'Chamber Performance',
    heading: 'Strategic Impact Data',
    stats,
    note: "* Figures based on the 2024 Annual Secretary's Report. Verified by the PCCI-NCR Membership Committee.",
  },
  roadmap: {
    _type: 'object',
    title: 'Service Implementation Roadmap',
    description:
      'PCCI-Las Piñas adheres to a disciplined delivery framework to ensure every program provides tangible value to the local business community.',
    steps: roadmapSteps,
  },
  callToAction: {
    _type: 'object',
    title: 'Collaborate with the Chamber',
    description: 'Join our specialized committees or enroll your business in our programs.',
    primaryText: 'Contact',
    primaryLink: '/contact',
    secondaryText: 'View FAQ',
    secondaryLink: '/faq',
  },
}

async function seedPrograms() {
  console.log('🌱 Seeding Programs page...')

  try {
    const existing = await client.fetch(
      `*[_type == "programsPage" && _id == "programsPage"][0]`
    )

    if (existing) {
      console.log('🗑️  Existing programsPage found. Deleting...')
      await client.delete('programsPage')
      console.log('✅ Deleted old programsPage')
    }

    await client.create(programsPage)
    console.log('✅ Created programsPage document')
    console.log('\n📝 Note: Icons use Lucide names (e.g., Briefcase, Landmark, Users).')
  } catch (err) {
    console.error('❌ Error seeding programs page:', err)
    process.exit(1)
  }
}

seedPrograms()
