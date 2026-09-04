import EmptyState from '@/components/home/EmptyState'
import GraphIcon from '@/assets/graph.svg'
import { VALUE_KEY_BY_LABEL } from '@/constants/values'

interface MonthlyValueSectionProps {
  topValue: string | null
  changeRateVsLastMonth: number
}

function MonthlyValueSection({
  topValue,
  changeRateVsLastMonth,
}: MonthlyValueSectionProps) {
  if (!topValue) {
    return (
      <EmptyState
        icon={<img src={GraphIcon} alt="" className="h-10 w-10" />}
        title="이번 달엔 아직 쌓인 가치 분포가 없어요"
        description="기록을 남기면 이번 달의 가치 분포가 여기에 보여요."
      />
    )
  }

  const color = `var(--color-${VALUE_KEY_BY_LABEL[topValue]})`

  return (
    <div
      className="flex gap-2 rounded-xl border border-[#3E2723]/22 px-4 py-3"
      style={{ backgroundColor: `color-mix(in srgb, ${color} 14%, white)` }}
    >
      <span aria-hidden="true">💡</span>
      <div className="flex flex-col gap-1">
        <p className="text-[13px] text-[#201E1D]">
          이번 달에는{' '}
          <span className="font-bold" style={{ color }}>
            '{topValue}'
          </span>{' '}
          가치를 가장 많이 선택했어요.
        </p>
        {changeRateVsLastMonth >= 0 && (
          <p className="text-[11px] text-[#2A1F1C]/55">
            {changeRateVsLastMonth > 0 ? (
              <>
                지난달보다 {topValue} 가치 선택이{' '}
                <span className="font-bold" style={{ color }}>
                  {changeRateVsLastMonth}%
                </span>{' '}
                증가했어요!
              </>
            ) : (
              <>지난달과 동일해요.</>
            )}
          </p>
        )}
      </div>
    </div>
  )
}

export default MonthlyValueSection
