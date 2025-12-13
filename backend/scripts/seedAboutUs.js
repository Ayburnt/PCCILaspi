import 'dotenv/config'
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_TOKEN,
  apiVersion: process.env.SANITY_API_VERSION,
})

async function seedAboutUs() {
  try {
    // First, let's upload placeholder images
    console.log('📤 Uploading images...')
    
    // Upload Who We Are image
    const whoWeAreImageResponse = await fetch(
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032&auto=format&fit=crop'
    )
    const whoWeAreImageBuffer = await whoWeAreImageResponse.arrayBuffer()
    const whoWeAreImageAsset = await client.assets.upload('image', Buffer.from(whoWeAreImageBuffer), {
      filename: 'who-we-are.jpg',
    })

    // Upload Hero background image
    const heroImageResponse = await fetch(
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop'
    )
    const heroImageBuffer = await heroImageResponse.arrayBuffer()
    const heroImageAsset = await client.assets.upload('image', Buffer.from(heroImageBuffer), {
      filename: 'hero-background.jpg',
    })

    console.log('✅ Images uploaded successfully')

    // Delete existing document first
    try {
      await client.delete('aboutUs-singleton')
      console.log('🗑️ Deleted existing document')
    } catch (e) {
      // Document doesn't exist, that's ok
    }

    // Create the singleton About Us document
    const result = await client.create({
      _type: 'aboutUs',
      _id: 'aboutUs-singleton',

      // Who We Are Section
      whoWeAreTitle: 'Who We Are',
      whoWeAreMainText:
        'The Philippine Chamber of Commerce and Industry (PCCI) Las Piñas City, Inc. is a non-stock, non-profit, non-government business organization.',
      whoWeAreDescriptionText:
        'We are comprised of small, medium, and large enterprises representing various sectors of business, all working together to foster a healthier Philippine economy and improve the viability of business in the community.',
      whoWeAreImage: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: whoWeAreImageAsset._id,
        },
      },
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
          description:
            'Support capability building for local chambers and industry associations.',
          icon: 'Building2',
        },
      ],

      // Hero Section
      heroBadgeText: 'Las Piñas City Chapter',
      heroBackgroundImage: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: heroImageAsset._id,
        },
      },
    })

    console.log('✅ About Us content seeded successfully:', result._id)
    console.log('📋 Document created with all fields populated')
    
    // Verify the data was written
    const verify = await client.fetch(`*[_id == "aboutUs-singleton"][0]{
      whoWeAreTitle,
      whoWeAreMainText,
      whoWeAreDescriptionText,
      affiliationText,
      visionStatement,
      missionStatement,
      thrustsSubtitle,
      "thrustsCount": count(thrusts),
      "hasWhoWeAreImage": defined(whoWeAreImage),
      "hasHeroImage": defined(heroBackgroundImage)
    }`)
    
    console.log('\n📊 Verification:')
    console.log(JSON.stringify(verify, null, 2))
    
  } catch (error) {
    console.error('❌ Error seeding About Us content:', error)
    console.error('Error details:', error.message)
    process.exit(1)
  }
}

seedAboutUs()