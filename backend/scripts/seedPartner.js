// scripts/seedPartner.js

import { v4 as uuidv4 } from 'uuid';

export const partnerSeeds = [
  {
    _id: `partner-${uuidv4()}`,
    _type: 'partner',
    name: 'Tech Innovators Corp',
    // NOTE: You must manually upload this image asset to your Sanity Studio
    // and replace the placeholder _ref ID with a real one.
    logo: {
      _type: 'image',
      asset: {
        _ref: 'image-d9a6c7e2b7b545d9a9f23439e6a928c2e646271a-2048x1365-jpg', 
        _type: 'reference'
      }
    },
    sortOrder: 10,
  },
  {
    _id: `partner-${uuidv4()}`,
    _type: 'partner',
    name: 'Global Finance Solutions',
    logo: {
      _type: 'image',
      asset: {
        _ref: 'image-c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5-1024x768-png', 
        _type: 'reference'
      }
    },
    sortOrder: 20,
  },
  {
    _id: `partner-${uuidv4()}`,
    _type: 'partner',
    name: 'Local Manufacturing Hub',
    logo: {
      _type: 'image',
      asset: {
        _ref: 'image-1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b-1200x800-webp', 
        _type: 'reference'
      }
    },
    sortOrder: 30,
  }
];
