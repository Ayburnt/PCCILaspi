import 'dotenv/config';
import { createClient } from '@sanity/client';
import slugify from 'slugify';
import { nanoid } from 'nanoid'; // small unique ID generator

const client = createClient({
  projectId: '2svpsi6g',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
  apiVersion: '2023-05-03',
});

// Helper to sanitize document ID for Sanity
function sanitizeId(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Helper to add _key to all blocks
function addKeysToBlocks(blocks) {
  return blocks.map(block => ({
    ...block,
    _key: nanoid(), // generates unique string
    children: block.children.map(child => ({
      ...child,
      _key: nanoid(),
    })),
  }));
}

// News items to seed
const newsData = [
  {
    title: 'PSME Launches New Website',
    date: '2025-12-13',
    category: 'news-update',
    image: {},
    description: 'The Philippine Society of Mechanical Engineers (PSME) launched its new website to improve member engagement.',
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: 'The new website aims to provide better accessibility and updated content for all members.' }
        ],
      },
    ],
  },
  {
    title: 'PSME Advisory on Holiday Schedule',
    date: '2025-12-10',
    category: 'advisory',
    image: {},
    description: 'PSME announces schedule adjustments for the upcoming holidays.',
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: 'All offices will be closed from December 24 to December 27 in observance of the holidays.' }
        ],
      },
    ],
  },
  {
    title: 'PSME Press Release: Annual Meeting Highlights',
    date: '2025-12-05',
    category: 'press-release',
    image: {},
    description: 'Highlights from the recently concluded annual meeting of PSME members.',
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: 'The meeting covered key updates, initiatives, and awards for outstanding members.' }
        ],
      },
    ],
  },
];

async function seedNews() {
  try {
    // Delete all existing news
    const existingNews = await client.fetch(`*[_type == "news"]{_id}`);
    for (const doc of existingNews) {
      await client.delete(doc._id);
      console.log(`Deleted news: ${doc._id}`);
    }

    // Seed new news data
    for (const news of newsData) {
      const doc = {
        _type: 'news',
        title: news.title,
        slug: { _type: 'slug', current: slugify(news.title, { lower: true }) },
        date: news.date,
        category: news.category,
        image: news.image,
        description: news.description,
        body: addKeysToBlocks(news.body),
      };

      await client.createOrReplace({
        _id: `news-${sanitizeId(news.title)}`,
        ...doc,
      });
      console.log(`Seeded: ${news.title}`);
    }

    console.log('✅ News seeding complete!');
  } catch (err) {
    console.error('Error seeding news:', err);
  }
}

seedNews();
