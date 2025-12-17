// frontend/src/sanityClient.js
import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

// Paste your details here
export const client = createClient({
  projectId: '2svpsi6g', // From step 1
  dataset: 'production',
  useCdn: true, // fast response
  apiVersion: '2023-05-03',
})

const builder = createImageUrlBuilder(client);
export function urlFor(source) {
  return builder.image(source)
}
