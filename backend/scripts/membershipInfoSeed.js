import 'dotenv/config'
import { createClient } from '@sanity/client'
import { v4 as uuidv4 } from 'uuid' // for generating unique keys

const client = createClient({
  projectId: '2svpsi6g',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
  apiVersion: '2025-12-12',
})

async function seedMembershipInfo() {
  const doc = {
    _type: 'membershipInfo',
    title: 'Join PCCI Today!',
    tagline: 'Empowering businesses, connecting leaders, shaping the future.',
    heroBackgroundImage: {
  _type: 'image',
}, // leave blank for Studio upload
    qualificationsTitle: 'Membership Qualifications',
    qualifications: [
      {
        _type: 'qualification',
        _key: uuidv4(), // unique key
        title: 'Business Registration',
        description: 'Your business must be officially registered and in good standing.',
        icon: 'Building2',
      },
      {
        _type: 'qualification',
        _key: uuidv4(), // unique key
        title: 'Active Operations',
        description: 'Your business should be actively operating for at least 1 year.',
        icon: 'UserCheck',
      },
    ],
    requirementsTitle: 'Documentary Requirements',
    requirements: [
      'Copy of Business Registration',
      'Latest Financial Statement',
      'Certificate of Good Standing',
    ],
    requirementsNote: 'All documents must be submitted in PDF format.',
    processTitle: 'Application Process',
    processDescription:
      'Submit your documents, pay the membership fee, and wait for verification by our team.',
    bankDetailsTitle: 'Bank Details for Payment',
    bankName: 'Sample Bank',
    bankBranch: 'Main Branch',
    accountName: 'PCCI Membership Account',
  }

  try {
    // Delete existing documents
    const existing = await client.fetch(`*[_type == "membershipInfo"]{_id}`)
    for (const item of existing) {
      await client.delete(item._id)
      console.log(`Deleted existing membershipInfo: ${item._id}`)
    }

    // Create new document
    const created = await client.create(doc)
    console.log('Membership info seeded:', created._id)
  } catch (err) {
    console.error('Error seeding membership info:', err)
  }
}

seedMembershipInfo()
