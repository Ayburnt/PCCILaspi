import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { colorInput } from '@sanity/color-input'
import { schemaTypes } from './schemaTypes'

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
            // =========================
            // Content Management
            // =========================
            S.listItem()
              .title('Content Management')
              .child(
                S.list()
                  .title('Content Management')
                  .items([
                    S.listItem()
                      .title('Site Settings')
                      .child(
                        S.document()
                          .schemaType('siteSettings')
                          .documentId('siteSettings-singleton'),
                      ),
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
                    S.listItem()
                      .title('Leadership Board')
                      .child(
                        S.document()
                          .schemaType('leadershipBoard')
                          .documentId('leadershipBoard'),
                      ),
                    S.listItem()
                      .title('How to Become a Member')
                      .child(
                        S.document()
                          .schemaType('membershipInfo')
                          .documentId('membershipInfo'),
                      ),
                    S.listItem()
                      .title('Why Join Us')
                      .child(S.document().schemaType('whyJoinUs').documentId('whyJoinUs')),
                    S.listItem()
                      .title('Join Page')
                      .child(S.document().schemaType('joinPage').documentId('joinPage')),
                    S.listItem()
                      .title('Company Gallery')
                      .child(
                        S.document()
                          .schemaType('gallery')
                          .documentId('companyGallery'),
                      ),
                  ])
              ),

            S.divider(),

            // =========================
            // Programs Section (NEW)
            // =========================
            S.listItem()
              .title('Programs Management')
              .child(
                S.list()
                  .title('Programs')
                  .items([
                    S.listItem()
                      .title('Programs Page')
                      .child(
                        S.document()
                          .schemaType('programsPage')
                          .documentId('programsPage'),
                      ),
                    S.listItem()
                      .title('Services Page')
                      .child(
                        S.document()
                          .schemaType('servicesPage')
                          .documentId('servicesPage'),
                      ),
                    S.listItem()
                      .title('Advocacy Page')
                      .child(
                        S.document()
                          .schemaType('advocacyPage')
                          .documentId('advocacyPage'),
                      ),
                    S.listItem()
                      .title('Projects Page')
                      .child(
                        S.document()
                          .schemaType('projectsPage')
                          .documentId('projectsPage'),
                      ),
                  ])
              ),

            S.divider(),

            // =========================
            // Other Sections
            // =========================
            S.documentTypeListItem('news').title('News Management'),
            S.documentTypeListItem('event').title('Events Management'),

            S.divider(),

            S.documentTypeListItem('partner').title('Partners & Sponsors'),

            S.divider(),

            S.documentTypeListItem('member').title('Members Directory'),
          ]),
    }),

    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
