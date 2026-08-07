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
