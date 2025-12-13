const {createClient} = require('@sanity/client')
require('dotenv').config()

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_TOKEN,
  apiVersion: process.env.SANITY_API_VERSION,
})

const whyJoinUsData = {
  _id: 'whyJoinUs',
  _type: 'whyJoinUs',
  
  // Hero Section
  heroBadgeText: 'WHY JOIN US?',
  heroTitle: 'Grow Your Business with',
  heroHighlight: 'PCCI Las Piñas',
  heroTagline: 'Connect with government leaders, influence policy, and expand your enterprise through the premier business chamber in Las Piñas City.',
  heroCTAText: 'Become a Member',
  
  // Core Pillars Section - Currently displayed as 3-column grid
  pillarsTitle: 'Why Join PCCI Las Piñas?',
  pillarsDescription: 'Unlock the ecosystem you need to thrive in the competitive Las Piñas landscape.',
  corePillars: [
    {
      _type: 'pillar',
      _key: 'pillar1',
      title: 'Advocacy',
      description: 'The PCCI Las Piñas Chapter actively advocates for policies that support business growth and sustainability. We work closely with local government to ensure business-friendly environments, addressing issues from taxation to infrastructure development.',
      icon: 'Megaphone',
      iconColor: 'text-red-500',
      bgColor: 'bg-red-50',
    },
    {
      _type: 'pillar',
      _key: 'pillar2',
      title: 'Networking Opportunities',
      description: 'By becoming a member, you gain access to a network of local and national business leaders. This network facilitates potential partnerships, mentorship opportunities, and business referrals which can be pivotal for your business\'s growth.',
      icon: 'Network',
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      _type: 'pillar',
      _key: 'pillar3',
      title: 'Educational Workshops',
      description: 'We offer regular workshops, seminars, and training sessions aimed at enhancing your business acumen. Topics range from digital marketing to financial management, tailored to help you navigate the complexities of modern business operations.',
      icon: 'Lightbulb',
      iconColor: 'text-amber-500',
      bgColor: 'bg-amber-50',
    },
    {
      _type: 'pillar',
      _key: 'pillar4',
      title: 'Business Development Services',
      description: 'Our chapter provides direct support through business counseling, market research assistance, and introductions to potential investors or partners. This is designed to help members expand their market reach and operational capabilities.',
      icon: 'Briefcase',
      iconColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      _type: 'pillar',
      _key: 'pillar5',
      title: 'Community Engagement',
      description: 'Through various CSR initiatives, we strive to give back to the community of Las Piñas. Members can participate in or lead projects that range from environmental conservation to educational programs, enhancing your brand\'s image.',
      icon: 'Heart',
      iconColor: 'text-rose-500',
      bgColor: 'bg-rose-50',
    },
    {
      _type: 'pillar',
      _key: 'pillar6',
      title: 'Representation',
      description: 'As a member, you\'ll have representation in higher echelons of business policy-making through PCCI\'s national and regional councils, giving you a voice where it counts.',
      icon: 'Gavel',
      iconColor: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
    {
      _type: 'pillar',
      _key: 'pillar7',
      title: 'Exclusive Member Benefits',
      description: 'Enjoy discounts on products, services, and event participation through partnerships with various companies and service providers exclusive to PCCI members.',
      icon: 'Gift',
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
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
  
  // Final CTA Section
  ctaTitle: 'Ready to Elevate Your Business?',
  ctaDescription: 'Join hundreds of successful businesses in Las Piñas. Your growth journey starts here.',
  ctaButtonText: 'Go to Membership Form',
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
