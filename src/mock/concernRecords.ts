import type { TopicKey, ValueKey } from '@/constants/insights'

export interface ConcernRecord {
  id: string
  decision: string
  concern: string
  topic: TopicKey
  valueKey: ValueKey
  date: string
}

export const MOCK_CONCERN_RECORDS: ConcernRecord[] = [
  {
    id: '1',
    decision: '헬스 다시 시작',
    concern: '헬스 다시 시작할까',
    topic: '건강',
    valueKey: 'growth',
    date: '2026-08-19',
  },
  {
    id: '2',
    decision: '오늘은 쉬어가기',
    concern: '헬스 다시 시작할까',
    topic: '건강',
    valueKey: 'stability',
    date: '2026-08-16',
  },
  {
    id: '3',
    decision: '사이드 프로젝트 시작',
    concern: '지금 사이드 프로젝트 할 여유가 있을까',
    topic: '일',
    valueKey: 'autonomy',
    date: '2026-08-13',
  },
  {
    id: '4',
    decision: '친구에게 먼저 연락하기',
    concern: '먼저 연락해야 할까',
    topic: '관계',
    valueKey: 'growth',
    date: '2026-08-10',
  },
  {
    id: '5',
    decision: '병원 예약하기',
    concern: '허리 통증 어떻게 할까',
    topic: '건강',
    valueKey: 'responsibility',
    date: '2026-08-01',
  },
  {
    id: '6',
    decision: '야근 거절하기',
    concern: '이번 야근 해야 할까',
    topic: '일',
    valueKey: 'stability',
    date: '2026-07-25',
  },
  {
    id: '7',
    decision: '식단 조절 시작',
    concern: '체중 관리 방법',
    topic: '건강',
    valueKey: 'growth',
    date: '2026-07-10',
  },
  {
    id: '8',
    decision: '모임 참석하기',
    concern: '오랜만에 모임에 나가볼까',
    topic: '관계',
    valueKey: 'autonomy',
    date: '2026-06-20',
  },
]
