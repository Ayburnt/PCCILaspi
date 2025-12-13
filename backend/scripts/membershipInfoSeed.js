// scripts/membershipInfoSeed.js
// Run with: node scripts/membershipInfoSeed.js

import 'dotenv/config'
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_TOKEN,
  apiVersion: process.env.SANITY_API_VERSION,
})

async function seedMembershipInfo() {
  try {
    console.log('🧹 Removing existing Membership Info documents...')

    // 1️⃣ Delete ALL existing membershipInfo docs
    const existingDocs = await client.fetch(
      `*[_type == "membershipInfo"]._id`
    )

    if (existingDocs.length > 0) {
      await Promise.all(
        existingDocs.map((id) => client.delete(id))
      )
      console.log(`🗑️ Deleted ${existingDocs.length} existing document(s)`)
    } else {
      console.log('ℹ️ No existing documents found')
    }

    console.log('🌱 Seeding fresh Membership Info singleton...')

    // 2️⃣ Create fresh singleton
    const result = await client.create({
      _type: 'membershipInfo',
      _id: 'membershipInfo', // MATCH your deskStructure documentId

      // Hero Section
      title: 'Join PCCI Today!',
      tagline: 'Empowering businesses, connecting leaders, shaping the future.',
      description:
        'Connect with industry leaders, influence policy, and grow your enterprise with the Philippine Chamber of Commerce and Industry - Las Piñas.',

      // Qualifications
      qualificationsTitle: 'Membership Qualifications',
      qualifications: [
        {
          _type: 'qualification',
          _key: 'qual1',
          title: 'Business Registration',
          description:
            'Your business must be officially registered and in good standing.',
          icon: 'Building2',
        },
        {
          _type: 'qualification',
          _key: 'qual2',
          title: 'Active Operations',
          description:
            'Your business should be actively operating for at least 1 year.',
          icon: 'UserCheck',
        },
        {
          _type: 'qualification',
          _key: 'qual3',
          title: 'Financial Capacity',
          description:
            'Demonstrate the financial capacity to sustain membership dues.',
          icon: 'ShieldCheck',
        },
        {
          _type: 'qualification',
          _key: 'qual4',
          title: 'Industry Alignment',
          description:
            'Be in an industry aligned with PCCI objectives and vision.',
          icon: 'Briefcase',
        },
      ],

      // Requirements
      requirementsTitle: 'Documentary Requirements',
      requirements: [
        'Copy of Business Registration (SEC/DTI)',
        'Latest Financial Statement (Last 2 years)',
        'Certificate of Good Standing',
        'Proof of Business Address',
        'Government-issued ID of Business Owner',
        'Board Resolution or Authorization Letter',
      ],
      requirementsNote:
        'All documents must be submitted in PDF format. Original copies may be requested for verification.',

      // Process
      processTitle: 'Application Process',
      processDescription:
        'Submit your documents, pay the membership fee, and wait for verification by our team. The entire process typically takes 5–10 business days.',

      // Bank Details
      bankDetailsTitle: 'Bank Details for Payment',
      bankName: 'Banco de Oro (BDO)',
      bankBranch: 'Arnaiz San Lorenzo Branch',
      accountName:
        'Philippine Chamber of Commerce and Industry – Las Piñas City, Inc.',
    })

    console.log('✅ Membership Info seeded successfully:', result._id)
  } catch (error) {
    console.error('❌ Error seeding Membership Info:', error)
    process.exit(1)
  }
}

seedMembershipInfo()
