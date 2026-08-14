import type { InsightData } from '@/types/api'

export const MOCK_INSIGHT: InsightData = {
  totalCount: 48,
  valueByTopic: [
    {
      topic: '일',
      valueDistribution: [
        { value: '성장', percentage: 62 },
        { value: '안정', percentage: 20 },
        { value: '자율', percentage: 12 },
        { value: '연결', percentage: 6 },
      ],
      count: 12,
    },
    {
      topic: '관계',
      valueDistribution: [
        { value: '연결', percentage: 45 },
        { value: '안정', percentage: 30 },
        { value: '성장', percentage: 15 },
        { value: '자율', percentage: 10 },
      ],
      count: 11,
    },
    {
      topic: '건강',
      valueDistribution: [
        { value: '안정', percentage: 50 },
        { value: '자율', percentage: 28 },
        { value: '성장', percentage: 22 },
      ],
      count: 9,
    },
  ],
  trend: [
    {
      startDate: '2026-06-30',
      endDate: '2026-07-06',
      valueDistribution: [
        { value: '성장', percentage: 45 },
        { value: '안정', percentage: 20 },
        { value: '자율', percentage: 5 },
        { value: '연결', percentage: 8 },
      ],
    },
    {
      startDate: '2026-07-07',
      endDate: '2026-07-13',
      valueDistribution: [
        { value: '성장', percentage: 80 },
        { value: '안정', percentage: 30 },
        { value: '자율', percentage: 12 },
        { value: '연결', percentage: 22 },
      ],
    },
    {
      startDate: '2026-07-14',
      endDate: '2026-07-20',
      valueDistribution: [
        { value: '성장', percentage: 74 },
        { value: '안정', percentage: 30 },
        { value: '자율', percentage: 8 },
        { value: '연결', percentage: 26 },
      ],
    },
    {
      startDate: '2026-07-21',
      endDate: '2026-07-27',
      valueDistribution: [
        { value: '성장', percentage: 90 },
        { value: '안정', percentage: 26 },
        { value: '자율', percentage: 10 },
        { value: '연결', percentage: 28 },
      ],
    },
  ],
  largestIncrease: [{ value: '성장', increaseRate: 16 }],
  largestDecrease: [{ value: '안정', decreaseRate: -4 }],
  insight: {
    mostTopic: ['일'],
    mostValue: ['성장'],
  },
}
