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
    valueKey: 'autonomy',
    date: '2026-07-18',
  },
  {
    id: '2',
    decision: '오늘은 쉬어가기',
    concern: '헬스 다시 시작할까',
    topic: '건강',
    valueKey: 'stability',
    date: '2026-07-12',
  },
  {
    id: '3',
    decision: '식단 다시 챙기기',
    concern: '식단 관리 어떻게 할까',
    topic: '건강',
    valueKey: 'growth',
    date: '2026-07-06',
  },
  {
    id: '4',
    decision: '수면 시간 늘리기',
    concern: '수면 습관 고칠까',
    topic: '건강',
    valueKey: 'stability',
    date: '2026-06-29',
  },
  {
    id: '5',
    decision: '러닝 다시 시작',
    concern: '운동 루틴 재정비',
    topic: '건강',
    valueKey: 'autonomy',
    date: '2026-06-22',
  },
  {
    id: '6',
    decision: '병원 예약하기',
    concern: '허리 통증 어떻게 할까',
    topic: '건강',
    valueKey: 'responsibility',
    date: '2026-06-15',
  },
  {
    id: '7',
    decision: '식단 조절 시작',
    concern: '체중 관리 방법',
    topic: '건강',
    valueKey: 'growth',
    date: '2026-06-08',
  },
  {
    id: '8',
    decision: '헬스장 등록',
    concern: '운동 다시 시작할까',
    topic: '건강',
    valueKey: 'growth',
    date: '2026-06-01',
  },
]
