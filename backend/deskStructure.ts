import { DocumentIcon } from '@sanity/icons'

const singletonIds = ['membershipInfo', 'whyJoinUs']

const deskStructure = (S: any) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('How to Become a Member Content')
        .icon(DocumentIcon)
        .child(
          S.document()
            .schemaType('membershipInfo')
            .documentId('membershipInfo')
        ),
      S.listItem()
        .title('Why Join Us Content')
        .icon(DocumentIcon)
        .child(
          S.document()
            .schemaType('whyJoinUs')
            .documentId('whyJoinUs')
        ),
      // hide the singletons from the rest of the list
      ...S.documentTypeListItems().filter((listItem: any) => !singletonIds.includes(listItem.getId())),
    ])

export default deskStructure
