import valueMoney from '@/assets/valueMoney.png'
import valueMyself from '@/assets/valueMyself.png'
import valueHealth from '@/assets/valueHealth.png'

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

export const TOPIC_IMAGES: Partial<Record<TopicKey, string>> = {
  돈: valueMoney,
  건강: valueHealth,
  나: valueMyself,
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
