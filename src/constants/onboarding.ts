export const CATEGORY_OPTIONS = [
  { value: 'work', title: '일·진로', description: '취업, 이직, 업무 판단' },
  {
    value: 'relationship',
    title: '관계',
    description: '친구, 연인, 가족, 동료',
  },
  { value: 'money', title: '돈', description: '소비, 저축, 투자' },
  { value: 'health', title: '건강·몸', description: '운동, 수면, 컨디션' },
  { value: 'self', title: '나 자신', description: '성격, 원칙, 새로운 시도' },
  { value: 'etc', title: '기타', description: '위 어디에도 해당 없음' },
] as const

export type CategoryValue = (typeof CATEGORY_OPTIONS)[number]['value']
