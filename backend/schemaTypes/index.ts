// backend/schemaTypes/index.ts
import event from './event'
import news from "./news"
import member from './member'
import membershipInfo from './membershipInfo'
import whyJoinUs from './whyJoinUs'
import { leadershipBoard } from './leadership'

export const schemaTypes = [
	event,
	news,
	member,
	membershipInfo,
	whyJoinUs,
	leadershipBoard,
]