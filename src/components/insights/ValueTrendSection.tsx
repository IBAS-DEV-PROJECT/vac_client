import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import { VALUE_COLORS, VALUE_LABELS, type ValueKey } from '@/constants/insights'
import { type ChangeEntry, type TrendDataPoint } from '@/types/insight'
import { eul } from '@/utils/korean'

interface ValueTrendSectionProps {
  data: TrendDataPoint[]
  valueKeys: ValueKey[]
  maxIncrease: ChangeEntry
  maxDecrease: ChangeEntry
}

function ValueTrendSection({
  data,
  valueKeys,
  maxIncrease,
  maxDecrease,
}: ValueTrendSectionProps) {
  const topLabel = VALUE_LABELS[maxIncrease.key]

  return (
    <section className="px-5">
      <div>
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          {valueKeys.map((key) => (
            <div key={key} className="flex items-center gap-1">
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: VALUE_COLORS[key] }}
              />
              <span className="text-xs text-gray-600">{VALUE_LABELS[key]}</span>
            </div>
          ))}
        </div>

        <div className="mt-3">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart
              data={data}
              margin={{ top: 5, right: 8, left: -20, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#f0f0f0"
                vertical={false}
              />
              <XAxis
                dataKey="period"
                tick={{ fontSize: 10, fill: '#9ca3af' }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tickFormatter={(v) => `${v}%`}
                tick={{ fontSize: 10, fill: '#9ca3af' }}
                tickLine={false}
                axisLine={false}
                domain={[0, 100]}
                ticks={[0, 25, 50, 75, 100]}
              />
              {valueKeys.map((key) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={VALUE_COLORS[key]}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-3 flex gap-2">
          <div className="flex-1 rounded-xl border border-gray-200 bg-white p-3">
            <p className="text-[11px] text-gray-400">가장 많이 증가</p>
            <div className="mt-1.5 flex items-center gap-1.5">
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: VALUE_COLORS[maxIncrease.key] }}
              />
              <span className="text-[15px] font-bold text-[#2A1F1C]">
                {VALUE_LABELS[maxIncrease.key]}
              </span>
              <span
                className="text-[15px] font-bold"
                style={{ color: VALUE_COLORS[maxIncrease.key] }}
              >
                +{maxIncrease.change}%p
              </span>
            </div>
          </div>
          <div className="flex-1 rounded-xl border border-gray-200 bg-white p-3">
            <p className="text-[11px] text-gray-400">가장 많이 감소</p>
            <div className="mt-1.5 flex items-center gap-1.5">
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: VALUE_COLORS[maxDecrease.key] }}
              />
              <span className="text-[15px] font-bold text-[#2A1F1C]">
                {VALUE_LABELS[maxDecrease.key]}
              </span>
              <span className="text-[15px] font-bold text-red-500">
                -{maxDecrease.change}%p
              </span>
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-start gap-2 rounded-xl border border-gray-100 bg-white p-3 opacity-60">
          <span className="text-sm">↗</span>
          <p className="text-[13px] leading-snug text-black">
            선택한 기간 동안{' '}
            <span
              className="font-bold"
              style={{ color: VALUE_COLORS[maxIncrease.key] }}
            >
              '{topLabel}'
            </span>
            {eul(topLabel)} 이전보다 더 자주 선택하고 있어요.
          </p>
        </div>
      </div>
    </section>
  )
}

export default ValueTrendSection
