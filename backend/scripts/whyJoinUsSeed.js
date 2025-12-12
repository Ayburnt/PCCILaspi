const {createClient} = require('@sanity/client')
require('dotenv').config()

const client = createClient({
  projectId: '2svpsi6g',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
  apiVersion: '2023-05-03',
})

const whyJoinUsData = {
  _id: 'whyJoinUs',
  _type: 'whyJoinUs',
  
  // Hero Section
  heroBadgeText: 'WHY JOIN US?',
  heroTitle: 'Powering Business',
  heroHighlight: 'In The Financial Capital',
  heroTagline: 'Connect with government leaders, influence policy, and expand your enterprise with PCCI Las Piñas.',
  heroCTAText: 'Become a Member',
  
  // Core Pillars Section
  pillarsTitle: 'Why Join PCCI Las Piñas?',
  pillarsDescription: 'We provide the ecosystem you need to thrive in the competitive Las Piñas landscape.',
  corePillars: [
    {
      _type: 'pillar',
      _key: 'pillar1',
      title: 'Extensive Network',
      description: 'Access an elite circle of business professionals. We facilitate high-level networking and collaboration.',
      icon: 'Network',
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      _type: 'pillar',
      _key: 'pillar2',
      title: 'Advocacy & Influence',
      description: 'We are the voice of business. We represent your interests in policy discussions to foster a favorable economy.',
      icon: 'Scale',
      iconColor: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
    {
      _type: 'pillar',
      _key: 'pillar3',
      title: 'Business Support',
      description: 'Empower growth with advisory services, mentorship, and funding access to seize new opportunities.',
      icon: 'Lightbulb',
      iconColor: 'text-amber-600',
      bgColor: 'bg-amber-50',
    },
    {
      _type: 'pillar',
      _key: 'pillar4',
      title: 'Community Engagement',
      description: 'Enhance your CSR footprint through our sustainable development and social welfare initiatives.',
      icon: 'Heart',
      iconColor: 'text-teal-600',
      bgColor: 'bg-teal-50',
    },
  ],
  
  // Government Relations Section
  govSectionBadge: 'Strategic Advantage',
  govSectionTitle: 'Direct Collaboration with Local Government',
  govSectionDescription: "One of the most powerful benefits of PCCI Las Piñas is our integration with the Las Piñas City Government. We don't just watch from the sidelines; we are part of the conversation.",
  govAdvantages: [
    {
      _type: 'object',
      _key: 'adv1',
      title: 'Policy Influence',
      description: 'We contribute insights to strategic directions through the Business Development Council.',
      icon: 'Gavel',
      iconColor: 'text-blue-400',
    },
    {
      _type: 'object',
      _key: 'adv2',
      title: 'Procurement Observers',
      description: 'Members can contribute to public transparency as observers in government bidding procedures.',
      icon: 'Eye',
      iconColor: 'text-amber-400',
    },
    {
      _type: 'object',
      _key: 'adv3',
      title: 'Digital Visibility',
      description: 'Access our interactive platform to promote your company and get real-time updates.',
      icon: 'Laptop',
      iconColor: 'text-green-400',
    },
  ],
  
  governmentCouncilsTitle: 'We Sit On The Boards Of:',
  governmentCouncils: [
    {
      _type: 'object',
      _key: 'council1',
      name: 'Las Piñas Business Development Council',
      icon: 'Building2',
    },
    {
      _type: 'object',
      _key: 'council2',
      name: 'Las Piñas Fire Safety Council',
      icon: 'ShieldCheck',
    },
    {
      _type: 'object',
      _key: 'council3',
      name: 'Las Piñas Environment Council',
      icon: 'Landmark',
    },
    {
      _type: 'object',
      _key: 'council4',
      name: 'Las Piñas Tourism Authority',
      icon: 'Landmark',
    },
    {
      _type: 'object',
      _key: 'council5',
      name: 'Las Piñas Parking Authority',
      icon: 'Briefcase',
    },
    {
      _type: 'object',
      _key: 'council6',
      name: 'Las Piñas TESDA Board',
      icon: 'Users',
    },
  ],
  
  agenciesTitle: 'Productive Relationships With Agencies',
  agencies: ['DTI', 'DOLE', 'DSWD'],
  
  // CTA Section
  ctaTitle: 'Ready to Elevate Your Business?',
  ctaDescription: 'Join hundreds of successful businesses in Las Piñas. Your growth journey starts here.',
  ctaButtonText: 'Apply for Membership',
}

async function seedWhyJoinUs() {
  try {
    console.log('🌱 Seeding Why Join Us content...')
    
    // Check if document already exists
    const existing = await client.fetch('*[_id == "whyJoinUs"][0]')
    
    if (existing) {
      console.log('⚠️  Why Join Us document already exists. Updating...')
      await client
        .patch('whyJoinUs')
        .set(whyJoinUsData)
        .commit()
      console.log('✅ Why Join Us content updated successfully!')
    } else {
      await client.create(whyJoinUsData)
      console.log('✅ Why Join Us content created successfully!')
    }
    
    console.log('\n📄 Sample data has been seeded to Sanity.')
    console.log('🎨 You can now edit it in Sanity Studio!')
  } catch (error) {
    console.error('❌ Error seeding Why Join Us:', error.message)
    process.exit(1)
  }
}

seedWhyJoinUs()
