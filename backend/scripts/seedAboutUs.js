import 'dotenv/config'   // Load environment variables from .env
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '2svpsi6g',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_TOKEN, // now picked up from .env
  apiVersion: '2024-01-01',
})

async function seedAboutUs() {
  try {
    // Create or update the singleton About Us document
    const result = await client.createOrReplace({
      _type: 'aboutUs',
      _id: 'aboutUs-singleton', // Fixed ID for singleton

      // Who We Are Section
      whoWeAreTitle: 'Who We Are',
      whoWeAreMainText:
        'The Philippine Chamber of Commerce and Industry (PCCI) Las Piñas City, Inc. is a non-stock, non-profit, non-government business organization.',
      whoWeAreDescriptionText:
        'We are comprised of small, medium, and large enterprises representing various sectors of business, all working together to foster a healthier Philippine economy and improve the viability of business in the community.',
      affiliationTitle: 'Trusted Affiliation',
      affiliationText:
        'PCCI Las Piñas City Inc. is a proud affiliate organization of the national Philippine Chamber of Commerce and Industry (PCCI).',

      // Vision & Mission Section
      visionTitle: 'Our Vision',
      visionStatement:
        'PCCI is the recognized voice of Philippine business among government and international institutions. As a proactive catalyst for development, it promotes globally competitive Philippine enterprises through strong partnerships with government, local chambers, and other business organizations.',
      missionTitle: 'Our Mission',
      missionStatement:
        'To provide focused advocacy for business growth and sustainable development by delivering essential business services that advance grassroots entrepreneurship, chamber development, international trade relations, business innovation, and operational efficiency.',

      // Organizational Thrusts
      thrustsTitle: 'Organizational Thrusts',
      thrustsSubtitle:
        'To operationalize our MISSION and VISION, PCCI adopts the following strategic thrusts:',
     thrusts: [
  {
    _key: 'thrust1',
    title: 'MSME Support',
    description:
      'Steadfast support for the promotion and growth of micro, small and medium enterprises nationwide.',
    icon: 'Users',
  },
  {
    _key: 'thrust2',
    title: 'Policy Reform',
    description:
      'Pioneer policy reform initiatives to improve the business climate and sustain socio-economic development.',
    icon: 'Scale',
  },
  {
    _key: 'thrust3',
    title: 'Global Networking',
    description:
      'Spearhead national and international networking through business matching, trade missions, and information sharing.',
    icon: 'Globe',
  },
  {
    _key: 'thrust4',
    title: 'Capability Building',
    description: 'Support capability building for local chambers and industry associations.',
    icon: 'Building2',
  },
],

      // Hero Section
      heroBadgeText: 'Las Piñas City Chapter',
    })

    console.log('✅ About Us content seeded successfully:', result._id)
  } catch (error) {
    console.error('❌ Error seeding About Us content:', error.message)
    process.exit(1)
  }
}

seedAboutUs()
