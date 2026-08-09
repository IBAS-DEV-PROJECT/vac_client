export type TopicKey = '일' | '관계' | '돈' | '건강' | '나' | '기타'

export const TOPIC_LABELS: Record<TopicKey, string> = {
  일: '일·진로',
  관계: '관계',
  돈: '돈',
  건강: '건강·몸',
  나: '나 자신',
  기타: '기타',
}

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
