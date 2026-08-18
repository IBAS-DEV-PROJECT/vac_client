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
  ...(Object.keys(TOPIC_LABELS) as TopicKey[]).map((key) => ({
    key,
    label: TOPIC_LABELS[key],
  })),
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
  dateRange?: { start: Date; end: Date }
  topics: TopicOption[]
  values: (ValueKey | 'all')[]
}

export const DEFAULT_FILTERS: InsightFilters = {
  period: '최근 7일',
  topics: ['전체'],
  values: ['all'],
}

export interface TrendDataPoint {
  period: string
  [key: string]: number | string
}

export interface ChangeEntry {
  key: ValueKey
  change: number
}

export const VALUE_KEY_MAP = Object.fromEntries(
  (Object.entries(VALUE_LABELS) as [ValueKey, string][]).map(([k, v]) => [
    v,
    k,
  ]),
) as Record<string, ValueKey>

export const VALUE_COLORS: Record<ValueKey, string> = {
  growth: '#2bb673',
  stability: '#3ab0d9',
  autonomy: '#f5a623',
  connection: '#ff6f91',
  recognition: '#ffc845',
  fun: '#ff8a3d',
  efficiency: '#17a398',
  meaning: '#8b5fbf',
  responsibility: '#3e2723',
}
