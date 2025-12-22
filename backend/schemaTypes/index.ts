// backend/schemaTypes/index.ts
import event from './event'
import news from "./news"
import member from './member'
import membershipInfo from './membershipInfo'
import whyJoinUs from './whyJoinUs'
import aboutUs from './aboutUs'
import { leadershipBoard } from './leadership'
import hero from './hero'
import siteSettings from './siteSettings'
import history from './history' 
import partner from './partner'
import advocacyPage from './advocacy'
import joinPage from './joinPage'
import galleryImage from './galleryImage'

export const schemaTypes = [
    siteSettings,
    hero,
    aboutUs,
    history,
    leadershipBoard,
    partner,
    advocacyPage,
    joinPage,
    event,
    news,
    member,
    membershipInfo,
    whyJoinUs,
    galleryImage,
]