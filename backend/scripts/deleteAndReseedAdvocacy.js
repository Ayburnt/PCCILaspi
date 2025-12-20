// Script to delete old advocacy programs and reseed with corrected data
// Run: node scripts/deleteAndReseedAdvocacy.js

import 'dotenv/config'
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_TOKEN,
  apiVersion: process.env.SANITY_API_VERSION,
})

const advocacyIds = [
  'advocacy-flood',
  'advocacy-eodb',
  'advocacy-arta',
  'advocacy-digital',
  'advocacy-mentor',
  'advocacy-traffic',
  'advocacy-youth'
]

async function deleteAndReseed() {
  console.log('🗑️  Deleting old advocacy programs...')
  
  try {
    // Delete all existing advocacy documents
    for (const id of advocacyIds) {
      try {
        await client.delete(id)
        console.log(`✅ Deleted: ${id}`)
      } catch (error) {
        if (error.statusCode === 404) {
          console.log(`⚠️  Not found: ${id}`)
        } else {
          throw error
        }
      }
    }
    
    console.log('\n✨ All old documents deleted!')
    console.log('Now run: node scripts/seedAdvocacy.js')
    
  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

deleteAndReseed()
