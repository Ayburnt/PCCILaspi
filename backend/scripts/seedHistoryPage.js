// scripts/seedHistoryPage.js

import { v4 as uuidv4 } from 'uuid';

export const historyPageSeed = {
  _id: 'historyPage',
  _type: 'historyPage',
  
  heroSection: {
    heroTitle: "A Proud History of Service and Growth",
    heroSubtitle: "Tracing the journey that shaped our organization and community, building on decades of dedication.",
    heroBadgeText: "Our Legacy",
    // NOTE: Replace with actual asset reference ID and URL if needed, 
    // or upload a placeholder image manually in Sanity Studio.
    heroBackgroundImage: { 
      _type: 'image', 
      asset: { 
        _ref: 'image-f85b67828065d6c8e3cc009139886ed289569b76-4032x3024-jpg', // Placeholder image asset ID
        _type: 'reference' 
      } 
    },
  },
  
  briefHistorySection: {
    briefHistoryTitle: "The Genesis of Our Organization",
    briefHistoryText: [
      {
        _key: uuidv4(),
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: uuidv4(),
            _type: 'span',
            marks: [],
            text: 'Founded in the late 1990s amidst a period of rapid urbanization, our chamber was established by a consortium of visionary local entrepreneurs. Their goal was simple yet ambitious: to provide a unified voice for the business community and foster sustainable economic development within the city.',
          },
        ],
      },
      {
        _key: uuidv4(),
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: uuidv4(),
            _type: 'span',
            marks: [],
            text: 'We have since grown into the primary advocate for businesses, representing sectors from retail and service to manufacturing and technology.',
          },
        ],
      },
    ],
    briefHistoryImage: { 
      _type: 'image', 
      asset: { 
        _ref: 'image-d9a6c7e2b7b545d9a9f23439e6a928c2e646271a-2048x1365-jpg', // Placeholder image asset ID
        _type: 'reference' 
      } 
    },
  },
  
  milestoneSection: {
    milestoneTitle: "Major Historical Milestones",
    milestoneSubtitle: "Key dates and events that defined our trajectory over the decades, marking periods of significant growth and influence.",
    milestones: [
      {
        _key: uuidv4(),
        _type: 'milestoneEvent',
        year: '1998',
        description: 'Official incorporation and formal recognition by the national federation of chambers of commerce. This established our legal and advocacy foundation.',
        icon: 'Calendar',
      },
      {
        _key: uuidv4(),
        _type: 'milestoneEvent',
        year: '2005',
        description: 'Launch of the first major business incubation program, supporting over 20 new local startups in their first two years of operation.',
        icon: 'Zap',
      },
      {
        _key: uuidv4(),
        _type: 'milestoneEvent',
        year: '2012',
        description: 'Led the successful lobby for local government tax incentives benefiting small and medium enterprises (SMEs).',
        icon: 'Briefcase',
      },
      {
        _key: uuidv4(),
        _type: 'milestoneEvent',
        year: '2020',
        description: 'Pivoted operations entirely online, offering digital training and support to help members navigate the global economic slowdown.',
        icon: 'Clock',
      },
    ],
  },

  keyAchievementsSection: {
    keyAchievementsTitle: "Notable Accomplishments",
    keyAchievementsSubtitle: "A look at the major successes achieved through collective effort and strategic partnerships.",
    keyAchievements: [
      "Secured funding for a city-wide digitalization project impacting over 500 member businesses.",
      "Awarded 'Best Local Chamber for Economic Development' for three consecutive years (2018-2020).",
      "Hosted the annual International Business Summit, attracting foreign investors and trade missions.",
      "Developed a scholarship program for dependents of member business owners, funding 50 college students annually.",
    ],
  },
};

// Exporting the document for use in a general seed script
// If you run this script directly, you'll need the Sanity client setup.

/* // Example of how to use this in your main seeding logic:
import { historyPageSeed } from './seedHistoryPage.js';
// ...
client.createIfNotExists(historyPageSeed)
// ...
*/