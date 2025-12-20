import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {colorInput} from '@sanity/color-input'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'PCCILaspi',
  projectId: '2svpsi6g',
  dataset: 'production',
  plugins: [
    colorInput(),
    structureTool({
      structure: (S) =>
        S.list()
          .title('Admin')
          .items([
            // Content Management Section
            S.listItem()
              .title('Content Management')
              .child(
                S.list()
                  .title('Content Management')
                  .items([
                    S.listItem()
                      .title('Site Settings')
                      .child(S.document().schemaType('siteSettings').documentId('siteSettings-singleton')),
                    S.divider(),
                    S.listItem()
                      .title('Banner Section')
                      .child(S.document().schemaType('hero').documentId('hero')),
                    S.listItem()
                      .title('About Us')
                      .child(S.document().schemaType('aboutUs').documentId('aboutUs')),
                    S.listItem()
                      .title('Our History')
                      .child(S.document().schemaType('historyPage').documentId('historyPage')), 
// backend/sanity.config.ts - Update the advocacy section
S.listItem()
  .title('Advocacy Page')
  .child(S.document().schemaType('advocacyPage').documentId('advocacyPage')),
                    S.listItem()
                      .title('Leadership Board')
                      .child(S.document().schemaType('leadershipBoard').documentId('leadershipBoard')),
                    S.listItem()
                      .title('How to Become a Member')
                      .child(S.document().schemaType('membershipInfo').documentId('membershipInfo')),
                    S.listItem()
                      .title('Why Join Us')
                      .child(S.document().schemaType('whyJoinUs').documentId('whyJoinUs')),
                  ])
              ),
            
            S.divider(),
            
            // Programs Section
            S.documentTypeListItem('advocacyPage').title('Advocacy Programs'),
            
            S.divider(),
            
            S.documentTypeListItem('news').title('News Management'),
            
            // --- NEW PARTNERSHIP ENTRY ---
            S.documentTypeListItem('partner').title('Partners & Sponsors'), // <--- ADDED HERE
            // -----------------------------

            S.divider(),
            
            // Members Section
            S.documentTypeListItem('member').title('Members Directory'),
          ]),
    }),
    visionTool(), 
  ],
  schema: {
    types: schemaTypes,
  },
})