// Test script to verify Sanity connection and token permissions
// Run: node scripts/testConnection.js

import 'dotenv/config'
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_TOKEN,
  apiVersion: process.env.SANITY_API_VERSION,
})

console.log('🔍 Testing Sanity Connection...\n')

console.log('Configuration:')
console.log(`  Project ID: ${process.env.SANITY_PROJECT_ID}`)
console.log(`  Dataset: ${process.env.SANITY_DATASET}`)
console.log(`  API Version: ${process.env.SANITY_API_VERSION}`)
console.log(`  Token: ${process.env.SANITY_TOKEN ? '***' + process.env.SANITY_TOKEN.slice(-4) : 'NOT SET'}`)
console.log('')

async function testConnection() {
  try {
    // Test 1: Read existing documents
    console.log('📖 Test 1: Testing READ permission...')
    const existingDocs = await client.fetch('*[_type == "advocacy"][0...3]')
    console.log(`✅ READ works! Found ${existingDocs.length} advocacy documents`)
    
    // Test 2: Try to create a test document
    console.log('\n✏️  Test 2: Testing CREATE permission...')
    const testDoc = {
      _type: 'advocacy',
      _id: 'test-connection-doc',
      order: 999,
      localTitle: 'Test Connection',
      engTitle: 'Test Document',
      slug: { current: 'test-connection' },
      icon: 'Building2',
      content: [{
        _type: 'block',
        children: [{
          _type: 'span',
          text: 'This is a test document to verify permissions.'
        }]
      }],
      isActive: false
    }
    
    await client.create(testDoc)
    console.log('✅ CREATE works! Test document created')
    
    // Clean up - delete the test document
    console.log('\n🗑️  Test 3: Testing DELETE permission...')
    await client.delete('test-connection-doc')
    console.log('✅ DELETE works! Test document removed')
    
    console.log('\n🎉 All tests passed! Your Sanity configuration is working perfectly.')
    console.log('\n✅ You can now run the seeder:')
    console.log('   node scripts/seedAdvocacy.js')
    
  } catch (error) {
    console.error('\n❌ Error:', error.message)
    
    if (error.message.includes('permission')) {
      console.log('\n⚠️  PERMISSION ERROR DETECTED')
      console.log('\nYour token doesn\'t have the required permissions.')
      console.log('\nTo fix this:')
      console.log('1. Go to: https://www.sanity.io/manage/personal/project/' + process.env.SANITY_PROJECT_ID)
      console.log('2. Navigate to: API → Tokens')
      console.log('3. Create a new token with Editor or Administrator role')
      console.log('4. Update backend/.env with the new token')
      console.log('5. Run this test again')
    } else if (error.message.includes('unauthorized') || error.message.includes('authentication')) {
      console.log('\n⚠️  AUTHENTICATION ERROR')
      console.log('\nYour token might be invalid or expired.')
      console.log('Please generate a new token in Sanity Manage.')
    } else if (error.message.includes('project not found')) {
      console.log('\n⚠️  PROJECT NOT FOUND')
      console.log('\nCheck that your SANITY_PROJECT_ID is correct:')
      console.log('Current value:', process.env.SANITY_PROJECT_ID)
    } else {
      console.log('\n⚠️  UNEXPECTED ERROR')
      console.log('Full error:', error)
    }
    
    process.exit(1)
  }
}

testConnection()
