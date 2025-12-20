// backend/scripts/seedAdvocacy.js
// Script to seed initial advocacy data into Sanity
// Run: node scripts/seedAdvocacy.js

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

// Helper function to create block with key
const createBlock = (text) => ({
  _type: 'block',
  _key: nanoid(),
  style: 'normal',
  children: [
    {
      _type: 'span',
      _key: nanoid(),
      text,
    },
  ],
})

// Advocacy programs
const advocacyPrograms = [
  {
    _key: nanoid(),
    order: 1,
    localTitle: 'Malayang Daloy',
    engTitle: 'Toward a Flood-Free Las Piñas',
    slug: { _type: 'slug', current: 'flood-free-las-pinas' },
    icon: 'Waves',
    content: [
      createBlock(
        'Flooding remains one of the biggest threats to businesses in Las Piñas, causing disruptions along major roads like Alabang-Zapote, damaging inventory, and leading to lost productivity. Malayang Daloy (Free Flow) is our flagship campaign to restore and maintain the natural flow of all waterways — from the Las Piñas and Zapote Rivers to local creeks and canals.'
      ),
      createBlock(
        'Through clean-ups, easement enforcement, dredging advocacy, and corporate "Adopt-a-Waterway" programs, we partner with the city government, DPWH, and community stakeholders to prevent clogging and siltation. By incentivizing private sector participation with proposed tax credits and recognition, we aim for a flood-resilient city where businesses operate without fear of seasonal disruptions.'
      ),
    ],
    isActive: true,
  },
  {
    _key: nanoid(),
    order: 2,
    localTitle: 'Walang Hadlang sa Negosyo',
    engTitle: 'Streamlining Ease of Doing Business',
    slug: { _type: 'slug', current: 'ease-of-doing-business' },
    icon: 'FileCheck',
    content: [
      createBlock(
        'In a competitive economy, bureaucratic delays can hinder growth and deter investments. Our advocacy Walang Hadlang sa Negosyo (No Barriers to Business) pushes for faster, simpler business permitting and renewals in Las Piñas.'
      ),
      createBlock(
        'We collaborate with the local government to implement one-stop shops, online applications, and reduced processing times, while monitoring compliance with national standards. This initiative aims to elevate Las Piñas\' ranking in ease of doing business indexes, attracting more entrepreneurs and ensuring existing members can focus on growth rather than paperwork.'
      ),
    ],
    isActive: true,
  },
  {
    _key: nanoid(),
    order: 3,
    localTitle: 'Bawal ang Red Tape',
    engTitle: 'Full Support for ARTA Reforms',
    slug: { _type: 'slug', current: 'arta-reforms' },
    icon: 'Ban',
    content: [
      createBlock(
        'Red tape continues to frustrate businesses nationwide, but the Anti-Red Tape Authority (ARTA) is leading the charge for change. PCCI-Las Piñas proudly supports Bawal ang Red Tape by advocating local alignment with ARTA\'s 2025 initiatives, including digitalization of services, the EODB Dashboard for real-time monitoring, and stricter enforcement against fixers and delays.'
      ),
      createBlock(
        'Following ARTA\'s recent EODB Convention emphasizing efficiency, accountability, and AI-driven complaints management, we urge the city to adopt these tools for transparent governance. By eliminating unnecessary bureaucracy, we create a business-friendly environment.'
      ),
    ],
    isActive: true,
  },
  {
    _key: nanoid(),
    order: 4,
    localTitle: 'Digital Negosyo',
    engTitle: 'Empowering MSMEs Through Digital Transformation',
    slug: { _type: 'slug', current: 'digital-transformation' },
    icon: 'Smartphone',
    content: [
      createBlock(
        'Micro, small, and medium enterprises (MSMEs) form the backbone of Las Piñas\' economy, yet many lag in digital adoption. Digital Negosyo advocates for training programs, affordable financing, and tools to help MSMEs go online — from e-commerce platforms to digital marketing and payments.'
      ),
      createBlock(
        'Partnering with DTI and private providers, we support initiatives like digital literacy workshops and low-interest loans, aligning with national efforts to close the digital divide. In 2025, with growing partnerships like Converge-DTI for connectivity, this advocacy ensures MSMEs gain access to wider markets.'
      ),
    ],
    isActive: true,
  },
  {
    _key: nanoid(),
    order: 5,
    localTitle: 'Mentor para sa Bagong Negosyante',
    engTitle: 'Startups Mentoring & Go Negosyo',
    slug: { _type: 'slug', current: 'startups-mentoring' },
    icon: 'Users',
    content: [
      createBlock(
        'Aspiring entrepreneurs need guidance to turn ideas into viable businesses. Through Mentor para sa Bagong Negosyante, PCCI-Las Piñas strengthens its partnership with Go Negosyo to provide free mentoring, workshops, and networking for startups.'
      ),
      createBlock(
        'Building on the Go Negosyo Act and ongoing collaborations with PCCI nationally, we co-organize mentoring sessions focusing on the 3Ms: Money, Markets, and Mentoring. This program helps young and new businesses navigate challenges, access funding, and scale up.'
      ),
    ],
    isActive: true,
  },
  {
    _key: nanoid(),
    order: 6,
    localTitle: 'Linis na Daloy ng Trapiko',
    engTitle: 'Solving Traffic Congestion',
    slug: { _type: 'slug', current: 'traffic-congestion' },
    icon: 'CarFront',
    content: [
      createBlock(
        'Heavy traffic along Alabang-Zapote Road and other corridors costs businesses time and money daily. Linis na Daloy ng Trapiko (Clear Traffic Flow) advocates for infrastructure improvements, including support for the LRT-1 extension, better traffic management, and potential flyovers or alternate routes.'
      ),
      createBlock(
        'We engage with DPWH, MMDA, and nearby cities for coordinated solutions, while promoting business-led carpooling and flexible hours. Reducing congestion means smoother logistics, lower operational costs, and a more attractive city for commerce and investment.'
      ),
    ],
    isActive: true,
  },
  {
    _key: nanoid(),
    order: 7,
    localTitle: 'Kabataang Negosyante',
    engTitle: 'Youth Entrepreneurship',
    slug: { _type: 'slug', current: 'youth-entrepreneurship' },
    icon: 'GraduationCap',
    content: [
      createBlock(
        'The youth represent our future workforce and innovators. Kabataang Negosyante focuses on equipping young Las Piñeros with entrepreneurial skills through school partnerships, mentorship programs, and events inspired by national initiatives like the National Youth Entrepreneurship Challenge.'
      ),
      createBlock(
        'We advocate for integrating entrepreneurship in local curricula, job fairs, and startup incubators to address youth unemployment and inspire the next generation of business leaders. By nurturing young talent, we build a pipeline of skilled entrepreneurs.'
      ),
    ],
    isActive: true,
  },
]

// Full advocacy page
const advocacyPageData = {
  _type: 'advocacyPage',
  _id: 'advocacyPage',

  heroSection: {
    _type: 'object',
    badge: 'Chamber Advocacy Series 2025',
    title: 'Building a Resilient',
    highlightedText: 'Business Community',
    subtitle:
      'PCCI-Las Piñas is dedicated to shaping policies that foster economic growth, sustainability, and innovation in the city.',
  },

  executiveSummary: {
    _type: 'object',
    mandateTitle: 'Our Mandate',
    mandateSubtitle: 'Mission Statement',
    quoteText:
      'The Philippine Chamber of Commerce and Industry - Las Piñas is committed to advocating for policies that support local businesses. Our agenda is designed to create a more resilient, efficient, and prosperous city for all stakeholders.',
    downloadAgendaLabel: 'Download 2025 Agenda (PDF)',
    printSummaryLabel: 'Print Summary',
  },

  programs: advocacyPrograms,

  callToAction: {
    _type: 'object',
    title: 'Partner with Us for Change',
    description:
      'Are you a business owner in Las Piñas? Join our committees and help shape the policies that affect your industry.',
    primaryButtonText: 'Become a Member',
    primaryButtonLink: '/join',
    secondaryButtonText: 'Contact Secretariat',
    secondaryButtonLink: '/contact',
  },
}

// Seed function (delete old data first)
async function seedAdvocacy() {
  console.log('🌱 Starting advocacy page seeding...')

  try {
    const existing = await client.fetch(
      `*[_type == "advocacyPage" && _id == "advocacyPage"][0]`
    )

    if (existing) {
      console.log('🗑️  Existing advocacy page found. Deleting...')
      await client.delete('advocacyPage')
      console.log('✅ Deleted old advocacy page')
    }

    await client.create(advocacyPageData)
    console.log('✅ Created fresh advocacy page')

    console.log('\n🎉 Advocacy page seeding completed successfully!')
    console.log('\n📝 Note: Images and PDFs should be uploaded manually in Sanity Studio.')
    console.log('   Go to Content Management > Advocacy Page to add:')
    console.log('   - Hero background image (optional)')
    console.log('   - Agenda PDF file')
    console.log('   - Images for each advocacy program')
    console.log('   - Position papers for each program (optional)')
  } catch (error) {
    console.error('❌ Error seeding advocacy:', error)
    process.exit(1)
  }
}

seedAdvocacy()