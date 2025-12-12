import { 
  CalendarIcon, 
  DocumentTextIcon, 
  UsersIcon, 
  DocumentIcon, 
  HeartIcon,
  CogIcon 
} from '@sanity/icons'

const singletonIds = ['membershipInfo', 'whyJoinUs']

const deskStructure = (S: any) =>
  S.list()
    .title('PSME-CMS Content')
    .items([
      // Events Section
      S.listItem()
        .title('📅 Events')
        .icon(CalendarIcon)
        .child(
          S.list()
            .title('Events Management')
            .items([
              S.listItem()
                .title('All Events')
                .icon(CalendarIcon)
                .child(S.documentTypeList('event').title('All Events')),
              S.divider(),
              S.listItem()
                .title('Upcoming Events')
                .icon(CalendarIcon)
                .child(
                  S.documentList()
                    .title('Upcoming Events')
                    .filter('_type == "event" && eventType == "upcoming"')
                    .defaultOrdering([{ field: 'date', direction: 'asc' }])
                ),
              S.listItem()
                .title('Past Events')
                .icon(CalendarIcon)
                .child(
                  S.documentList()
                    .title('Past Events')
                    .filter('_type == "event" && eventType == "past"')
                    .defaultOrdering([{ field: 'date', direction: 'desc' }])
                ),
            ])
        ),

      S.divider(),

      // News Section
      S.listItem()
        .title('📰 News & Updates')
        .icon(DocumentTextIcon)
        .child(
          S.documentTypeList('news')
            .title('All News Articles')
            .defaultOrdering([{ field: 'date', direction: 'desc' }])
        ),

      S.divider(),

      // Members Section
      S.listItem()
        .title('👥 Members')
        .icon(UsersIcon)
        .child(
          S.list()
            .title('Members Management')
            .items([
              S.listItem()
                .title('All Members')
                .icon(UsersIcon)
                .child(S.documentTypeList('member').title('All Members')),
              S.divider(),
              S.listItem()
                .title('Featured Members')
                .icon(UsersIcon)
                .child(
                  S.documentList()
                    .title('Featured Members')
                    .filter('_type == "member" && featured == true')
                ),
              S.listItem()
                .title('Corporate Members')
                .icon(UsersIcon)
                .child(
                  S.documentList()
                    .title('Corporate Members')
                    .filter('_type == "member" && membershipType == "Corporate Membership"')
                ),
              S.listItem()
                .title('Individual Members')
                .icon(UsersIcon)
                .child(
                  S.documentList()
                    .title('Individual Members')
                    .filter('_type == "member" && membershipType == "Individual Membership"')
                ),
            ])
        ),

      S.divider(),

      // Settings/Content Pages Section
      S.listItem()
        .title('⚙️ Site Content & Settings')
        .icon(CogIcon)
        .child(
          S.list()
            .title('Site Content Pages')
            .items([
              S.listItem()
                .title('How to Become a Member')
                .icon(DocumentIcon)
                .child(
                  S.document()
                    .schemaType('membershipInfo')
                    .documentId('membershipInfo')
                ),
              S.listItem()
                .title('Why Join Us')
                .icon(HeartIcon)
                .child(
                  S.document()
                    .schemaType('whyJoinUs')
                    .documentId('whyJoinUs')
                ),
            ])
        ),
    ])

export default deskStructure
