import { useState } from 'react'
import HomeHeader from '@/components/home/HomeHeader'
import ConcernCard from '@/components/home/ConcernCard'
import ConcernItem from '@/components/home/ConcernItem'
import MonthlyValueSection from '@/components/home/MonthlyValueSection'
import EmptyState from '@/components/home/EmptyState'
import Button from '@/components/common/button/Button'
import RecordItem from '@/components/common/record/RecordItem'
import BottomNav, {
  type NavValue,
} from '@/components/common/navigation/BottomNav'
import PencilIcon from '@/assets/pencil.svg'
import ClockIcon from '@/assets/clock.svg'
import { type TopicKey } from '@/constants/insights'
import { VALUE_KEY_BY_LABEL } from '@/constants/values'

const SECTION_TITLE =
  'text-[13px] font-extrabold uppercase leading-[14.56px] tracking-[1.04px] text-[#201E1D]'

// TODO: GET /home 연결 전 임시 데이터
// 빈 상태 확인용 → ongoingConcerns: [], recentRecords: [], topValue: null 로 바꿔서 확인
const MOCK_HOME = {
  nickname: '닉네임',
  ongoingConcernCount: 3,
  ongoingConcerns: [
    {
      concernId: '1',
      concern: '헬스 다시 시작할까',
      topic: '건강' as TopicKey,
      lastRecordDate: '2026-07-18',
    },
    {
      concernId: '2',
      concern: '자취방 계약할까',
      topic: '돈' as TopicKey,
      lastRecordDate: '2026-07-20',
    },
    {
      concernId: '3',
      concern: 'A사 vs B사',
      topic: '일' as TopicKey,
      lastRecordDate: '2026-07-24',
    },
  ],
  monthlyValueHighlight: {
    topValue: '성장' as string | null,
    changeRateVsLastMonth: 12,
  },
  recentRecords: [
    {
      recordId: '1',
      decision: 'A로 마음이 기움',
      date: '2026-07-27',
      value: '성장',
    },
    {
      recordId: '2',
      decision: '오늘은 그냥 쉬기로',
      date: '2026-07-26',
      value: '안정',
    },
    {
      recordId: '3',
      decision: '연락 먼저 하기로',
      date: '2026-07-24',
      value: '연결',
    },
  ],
}

function Home() {
  const [activeNav, setActiveNav] = useState<NavValue>('home')

  const data = MOCK_HOME
  const {
    ongoingConcerns,
    ongoingConcernCount,
    monthlyValueHighlight,
    recentRecords,
  } = data

  const hasConcern = ongoingConcerns.length > 0

  // TODO: 라우터 도입 후 고민 기록 페이지(새 고민 탭)로 이동
  const handleGoToRecord = () => console.log('새 고민 탭으로 이동')
  const handleContinue = (concernId: string) =>
    console.log('이어쓰기', concernId)

  return (
    // TODO: 라우터 도입 시 바깥 래퍼 + BottomNav를 MainLayout으로 이동
    <div className="min-h-screen w-full bg-[#E1F5FE]">
      <div className="mx-auto w-full max-w-[400px] pb-32">
        <HomeHeader />

        <div className="flex flex-col gap-6 px-6 py-6">
          {/* 인삿말 */}
          <h1 className="text-[15px] font-semibold leading-none text-[#201E1D]">
            {data.nickname} 님, 안녕하세요.
          </h1>

          {/* 고민 */}
          <section className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between">
              <h2 className={SECTION_TITLE}>고민</h2>
              <span className="text-[11px] text-[#2A1F1C]/55">
                {ongoingConcernCount}건
              </span>
            </div>

            {ongoingConcerns.length === 0 ? (
              <EmptyState
                icon={<img src={PencilIcon} alt="" className="h-10 w-10" />}
                title="아직 진행 중인 고민이 없어요"
                description="지금 갈림길에 선 고민이 있다면 가볍게 하나만 적어보세요."
              />
            ) : ongoingConcerns.length === 1 ? (
              <ConcernCard
                concern={ongoingConcerns[0].concern}
                lastRecordDate={ongoingConcerns[0].lastRecordDate}
                onContinue={() => handleContinue(ongoingConcerns[0].concernId)}
              />
            ) : (
              <div className="flex flex-col rounded-xl border border-[#3E2723]/22 bg-white px-4 [&>*:last-child]:border-b-0">
                {ongoingConcerns.map((item) => (
                  <ConcernItem
                    key={item.concernId}
                    title={item.concern}
                    topic={item.topic}
                    lastRecordDate={item.lastRecordDate}
                    onContinue={() => handleContinue(item.concernId)}
                  />
                ))}
              </div>
            )}
          </section>

          {/* 기록 버튼 */}
          <Button onClick={handleGoToRecord}>
            {hasConcern ? '오늘 기록하기' : '새 고민 작성하기'}
          </Button>

          {/* 이번 달 가치 분포 */}
          <section className="flex flex-col gap-2">
            <h2 className={SECTION_TITLE}>이번 달 가치 분포</h2>
            <MonthlyValueSection
              topValue={monthlyValueHighlight?.topValue ?? null}
              changeRateVsLastMonth={
                monthlyValueHighlight?.changeRateVsLastMonth ?? 0
              }
            />
          </section>

          {/* 최근 기록 */}
          <section className="flex flex-col gap-2">
            <h2 className={SECTION_TITLE}>최근 기록</h2>

            {recentRecords.length === 0 ? (
              <EmptyState
                icon={<img src={ClockIcon} alt="" className="h-10 w-10" />}
                title="아직 남긴 기록이 없어요"
                description="기록을 남기면 여기서 최근 기록을 볼 수 있어요."
              />
            ) : (
              <div className="flex flex-col">
                {recentRecords.map((record) => (
                  <RecordItem
                    key={record.recordId}
                    valueKey={VALUE_KEY_BY_LABEL[record.value]}
                    title={record.decision}
                    date={record.date}
                  />
                ))}
              </div>
            )}
          </section>
        </div>

        {/* 하단 네비바 */}
        <div className="fixed bottom-5 left-1/2 z-20 w-full max-w-[400px] -translate-x-1/2 px-6">
          <BottomNav value={activeNav} onChange={setActiveNav} />
        </div>
      </div>
    </div>
  )
}

export default Home
