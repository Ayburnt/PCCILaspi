import 'dotenv/config'
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_TOKEN,
  apiVersion: process.env.SANITY_API_VERSION,
})

async function seedSiteSettings() {
  try {
    console.log('Starting Site Settings seed...')

    // Upload logo
    console.log('📤 Uploading logo...')
    const logoResponse = await fetch(
      'https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=200&auto=format&fit=crop'
    )
    const logoBuffer = await logoResponse.arrayBuffer()
    const logoAsset = await client.assets.upload('image', Buffer.from(logoBuffer), {
      filename: 'pcci-logo.png',
    })
    console.log('✅ Logo uploaded')

    // Delete existing document first
    try {
      await client.delete('siteSettings-singleton')
      console.log('🗑️ Deleted existing document')
    } catch (e) {
      // Document doesn't exist, that's ok
    }

    // Create the singleton Site Settings document
    const result = await client.create({
      _type: 'siteSettings',
      _id: 'siteSettings-singleton',

      // Branding
      logo: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: logoAsset._id,
        },
      },
      organizationName: 'PCCI',
      organizationSubtitle: 'Las Piñas City',

      // Contact Information
      contactPhone: '(02) 8-123-4567',
      contactPhone2: '+63 917 123 4567',
      contactEmail: 'secretariat@psmelaspinas.org',
      contactEmail2: 'info@pccilaspinas.org',

      // Address
      addressLine1: 'Herkings Corporation',
      addressLine2: 'Las Piñas City, Philippines',
      fullAddress: 'Unit 101, Pilar Village,\nLas Piñas City, 1740',

      // Business Hours
      businessHours: 'Mon - Fri: 9:00 AM - 5:00 PM\nSat - Sun: Closed',

      // Social Media
      facebookUrl: 'https://www.facebook.com/PCCILasPinas',
      linkedinUrl: 'https://www.linkedin.com/company/pcci-laspinas',

      // Google Maps
      googleMapsEmbedUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15455.91361967532!2d120.99170295541992!3d14.428408100000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397d1e8304f75a1%3A0x1c68b907ad58778b!2sHerkings%20Corporation!5e0!3m2!1sen!2sph!4v1765593275807!5m2!1sen!2sph',

      // Footer About Text
      footerAboutText:
        'A non-stock, non-profit organization dedicated to the advancement of the business community in Las Piñas City.',
    })

    console.log('✅ Site Settings seeded successfully:', result._id)

    // Verify the data was written
    const verify = await client.fetch(`*[_id == "siteSettings-singleton"][0]{
      organizationName,
      organizationSubtitle,
      contactPhone,
      contactEmail,
      "hasLogo": defined(logo)
    }`)

    console.log('\n📊 Verification:')
    console.log(JSON.stringify(verify, null, 2))
  } catch (error) {
    console.error('❌ Error seeding Site Settings:', error.message)
    console.error('Full error:', error)
    process.exit(1)
  }
}

seedSiteSettings()
