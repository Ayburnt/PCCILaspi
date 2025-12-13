// Script to seed initial members data into Sanity
// Run this with: node scripts/seedMembers.js

import 'dotenv/config'   // Load environment variables from .env
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_TOKEN, // now picked up from .env
  apiVersion: process.env.SANITY_API_VERSION,
})
const members = [
  {
    _type: 'member',
    company: 'A. V. ALVAIRA Brokerage Corporation',
    membershipType: 'Corporate Membership',
    category: 'Custom House Brokers',
    description: 'Customs Brokerage',
    overview: 'A. V. ALVAIRA Brokerage Corporation has been a trusted partner in international trade for over 30 years. We provide comprehensive customs brokerage services to businesses of all sizes, ensuring efficient and compliant import/export operations.',
    location: 'Customs Brokerage Mercantile Insurance Bldg., Gen. Luna Street. Intramuros, Manila',
    keyServices: ['Custom House Brokers', 'Import Documentation', 'Customs Clearance', 'Trade Compliance'],
    email: 'contact@avalvaira.com',
    phone: '(02) 8527-1234',
    website: null,
    memberSince: '2018',
    keyRepresentative: {
      name: 'Alejandro V. Alvaira',
      position: 'President & CEO',
    },
    businessHours: {
      monday: '9:00 AM - 5:00 PM',
      tuesday: '9:00 AM - 5:00 PM',
      wednesday: '9:00 AM - 5:00 PM',
      thursday: '9:00 AM - 5:00 PM',
      friday: '9:00 AM - 5:00 PM',
      saturday: 'Closed',
      sunday: 'Closed',
    },
    featured: true,
    status: 'active',
  },
  {
    _type: 'member',
    company: 'A.R. Chan Customs Brokerage',
    membershipType: 'Corporate Membership',
    category: 'Other',
    description: 'Customs Brokerage',
    overview: 'A.R. Chan Customs Brokerage has been serving the business community with professional and efficient customs brokerage services. We handle all aspects of customs documentation and clearance.',
    location: 'Rm.335 Padilla de Los Reyes Bldg., Juan Luna, Binondo, Manila',
    keyServices: ['Brokerage', 'Import/Export Services', 'Documentation'],
    email: 'contact@archan.com',
    phone: '(02) 8241-5678',
    website: null,
    memberSince: '2019',
    keyRepresentative: {
      name: 'Alfonso R. Chan',
      position: 'Managing Director',
    },
    businessHours: {
      monday: '8:00 AM - 6:00 PM',
      tuesday: '8:00 AM - 6:00 PM',
      wednesday: '8:00 AM - 6:00 PM',
      thursday: '8:00 AM - 6:00 PM',
      friday: '8:00 AM - 6:00 PM',
      saturday: '9:00 AM - 1:00 PM',
      sunday: 'Closed',
    },
    status: 'active',
  },
  {
    _type: 'member',
    company: 'Benchstone Ent., Inc (BEI)',
    membershipType: 'Corporate Membership',
    category: 'Other',
    description: 'Benchstone Enterprises, Inc. (BEI) is a POEA-licensed overseas manpower recruitment and staffing agency established in the year 1993.',
    overview: 'As a 100% Filipino-owned company, we seek to partner with clients with the aim to support their staffing needs. We have decades of experience in international recruitment and placement.',
    location: '2687 BEI Bldg., Arellano Avenue, Sta. Ana, Manila',
    keyServices: ['Manpower Recruitment', 'Staffing Services', 'Overseas Employment'],
    email: 'info@benchstone.com',
    website: 'https://www.benchstone.com',
    memberSince: '1993',
    keyRepresentative: {
      name: 'Benjamin Stone',
      position: 'CEO',
    },
    businessHours: {
      monday: '8:00 AM - 5:00 PM',
      tuesday: '8:00 AM - 5:00 PM',
      wednesday: '8:00 AM - 5:00 PM',
      thursday: '8:00 AM - 5:00 PM',
      friday: '8:00 AM - 5:00 PM',
      saturday: 'Closed',
      sunday: 'Closed',
    },
    featured: false,
    status: 'active',
  },
  {
    _type: 'member',
    company: 'CJT Builders Corp',
    membershipType: 'Corporate Membership',
    category: 'Construction',
    description: 'Construction Design and Supply. Other Businesses: Sumitomo Rubber Dampers Inc (Japan) Country Rep.',
    overview: 'CJT Builders Corp specializes in construction design and supply services. We are also the country representative for Sumitomo Rubber Dampers Inc from Japan, bringing innovative construction solutions to the Philippines.',
    location: 'CJT - 214 Concha Cruz Drive Las Pinas City',
    keyServices: ['Construction Design', 'Supply', 'Rubber Dampers'],
    email: 'info@cjtbuilders.com',
    phone: '(02) 8874-5522',
    memberSince: '2015',
    keyRepresentative: {
      name: 'Carlos J. Torres',
      position: 'General Manager',
    },
    businessHours: {
      monday: '8:00 AM - 5:00 PM',
      tuesday: '8:00 AM - 5:00 PM',
      wednesday: '8:00 AM - 5:00 PM',
      thursday: '8:00 AM - 5:00 PM',
      friday: '8:00 AM - 5:00 PM',
      saturday: 'Closed',
      sunday: 'Closed',
    },
    status: 'active',
  },
  {
    _type: 'member',
    company: 'Beauty and Health Republic',
    membershipType: 'Corporate Membership',
    category: 'Retail',
    description: 'Beauty and Health Products distributor specializing in vitamins, supplements, and medical supplies.',
    overview: 'Beauty and Health Republic is your trusted source for quality health and wellness products. We distribute a wide range of vitamins, supplements, and medical supplies to pharmacies and retailers across Metro Manila.',
    location: '222 Shaw Blvd. corner Bonifacio, Mandaluyong City',
    keyServices: ['Vitamins', 'Supplements', 'Medical Supplies'],
    email: 'sales@beautyhealthrepublic.com',
    phone: '(02) 8631-8899',
    memberSince: '2020',
    keyRepresentative: {
      name: 'Anna Beatriz',
      position: 'President',
    },
    businessHours: {
      monday: '9:00 AM - 6:00 PM',
      tuesday: '9:00 AM - 6:00 PM',
      wednesday: '9:00 AM - 6:00 PM',
      thursday: '9:00 AM - 6:00 PM',
      friday: '9:00 AM - 6:00 PM',
      saturday: '10:00 AM - 3:00 PM',
      sunday: 'Closed',
    },
    status: 'active',
  },
]

async function seedMembers() {
  console.log('Starting to seed members...')

  try {
    // 1️⃣ Delete all existing members first
    const existingMembers = await client.fetch(`*[_type == "member"]{_id}`)
    if (existingMembers.length) {
      console.log(`Deleting ${existingMembers.length} existing members...`)
      await Promise.all(existingMembers.map(member => client.delete(member._id)))
      console.log('✅ All existing members deleted!')
    }

    // 2️⃣ Create new members
    for (const member of members) {
      const result = await client.create(member)
      console.log(`✓ Created member: ${member.company} (${result._id})`)
    }

    console.log('\n✅ Successfully seeded all members!')
  } catch (error) {
    console.error('❌ Error seeding members:', error.message)
  }
}

seedMembers()