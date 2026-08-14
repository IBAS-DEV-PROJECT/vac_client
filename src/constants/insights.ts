export type TopicKey = '일' | '관계' | '돈' | '건강' | '나' | '기타'

export const TOPIC_LABELS: Record<TopicKey, string> = {
  일: '일·진로',
  관계: '관계',
  돈: '돈',
  건강: '건강·몸',
  나: '나 자신',
  기타: '기타',
}

export const TOPIC_OPTIONS: { key: TopicKey | '전체'; label: string }[] = [
  { key: '전체', label: '전체' },
  { key: '일', label: '일·진로' },
  { key: '관계', label: '관계' },
  { key: '돈', label: '돈' },
  { key: '건강', label: '건강·몸' },
  { key: '나', label: '나 자신' },
  { key: '기타', label: '기타' },
]

export type ValueKey =
  | 'growth'
  | 'stability'
  | 'autonomy'
  | 'connection'
  | 'recognition'
  | 'fun'
  | 'efficiency'
  | 'meaning'
  | 'responsibility'

export type CategoryKey = 'work'
// 카테고리 추가 시 여기에 union 타입으로 추가

export const CATEGORY_CONFIG: Record<CategoryKey, { emoji: string }> = {
  work: { emoji: '💼' },
}

export const VALUE_LABELS: Record<ValueKey, string> = {
  growth: '성장',
  stability: '안정',
  autonomy: '자율',
  connection: '연결',
  recognition: '인정',
  fun: '재미',
  efficiency: '효율',
  meaning: '의미',
  responsibility: '책임',
}

export const TOPIC_ICONS: Record<TopicKey, string> = {
  일: '💼',
  관계: '❤️',
  돈: '💰',
  건강: '💪',
  나: '🌱',
  기타: '📌',
}

export type PeriodOption =
  '최근 1년' | '오늘' | '최근 7일' | '최근 30일' | '캘린더'
export type TopicOption = '전체' | TopicKey

export interface InsightFilters {
  period: PeriodOption
  topics: TopicOption[]
  values: (ValueKey | 'all')[]
}

export const DEFAULT_FILTERS: InsightFilters = {
  period: '최근 7일',
  topics: ['전체'],
  values: ['all'],
}
