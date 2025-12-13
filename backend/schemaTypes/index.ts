// backend/schemaTypes/index.ts
import event from './event'
import news from "./news"
import member from './member'
import membershipInfo from './membershipInfo'
import whyJoinUs from './whyJoinUs'
import { leadershipBoard } from './leadership'
import aboutUs from './aboutUs'

export const schemaTypes = [
	leadershipBoard,
	aboutUs,
	event,
	news,
	member,
	membershipInfo,
	whyJoinUs,
]