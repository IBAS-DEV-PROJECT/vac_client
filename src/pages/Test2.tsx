import { useState, type ChangeEvent } from 'react'
import AlertModal from '@/components/common/modal/AlertModal'
import Button from '@/components/common/button/Button'
import CategoryButton from '@/components/common/button/CategoryButton'
import RecordValueButton from '@/components/common/button/RecordValueButton'
import ValueBadge from '@/components/common/badge/ValueBadge'
import RecordItem from '@/components/common/record/RecordItem'
import RecordTimelineItem from '@/components/common/record/RecordTimelineItem'
import BottomNav, {
  type NavValue,
} from '@/components/common/navigation/BottomNav'
import Header from '@/components/common/header/Header'
import Tab from '@/components/common/tab/Tab'
import Input from '@/components/common/input/Input'
import TextArea from '@/components/common/input/TextArea'
import IdInput from '@/components/auth/IdInput'
import {
  validateNickname,
  validatePassword,
  validatePasswordConfirm,
  validateUserId,
} from '@/utils/validation'
import { VALUE_LABELS, type ValueKey } from '@/constants/insights'
import { VALUE_DESCRIPTIONS } from '@/constants/values'

// 서버 연동 전 임시 데이터
const TAKEN_IDS = ['admin', 'test']

const RECENT_RECORDS: {
  id: number
  valueKey: ValueKey
  title: string
  date: string
}[] = [
  { id: 1, valueKey: 'growth', title: 'A로 마음이 기움', date: '7월 27일' },
  {
    id: 2,
    valueKey: 'stability',
    title: '오늘은 그냥 쉬기로',
    date: '7월 26일',
  },
  {
    id: 3,
    valueKey: 'connection',
    title: '연락 먼저 하기로',
    date: '7월 24일',
  },
]

const INSIGHT_RECORDS: {
  id: number
  valueKey: ValueKey
  title: string
  topic: string
  date: string
}[] = [
  {
    id: 1,
    valueKey: 'stability',
    title: '오늘은 쉬어가기',
    topic: '헬스 다시 시작할까',
    date: '7월 12일',
  },
  {
    id: 2,
    valueKey: 'growth',
    title: '식단 다시 챙기기',
    topic: '식단 관리 어떻게 할까',
    date: '7월 6일',
  },
  {
    id: 3,
    valueKey: 'stability',
    title: '수면 시간 늘리기',
    topic: '수면 습관 고칠까',
    date: '6월 29일',
  },
]

const TIMELINE_RECORDS: {
  id: number
  valueKey: ValueKey
  title: string
  date: string
}[] = [
  { id: 1, valueKey: 'stability', title: '오늘은 쉬어가기', date: '7월 12일' },
  { id: 2, valueKey: 'autonomy', title: '헬스 다시 시작', date: '7월 18일' },
]

const VALUE_KEYS = Object.keys(VALUE_LABELS) as ValueKey[]

const TAB_ITEMS = [
  { value: 'new', label: '새 고민' },
  { value: 'continue', label: '이어쓰기' },
] as const

const CATEGORY_OPTIONS = [
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

type TabValue = (typeof TAB_ITEMS)[number]['value']
type CategoryValue = (typeof CATEGORY_OPTIONS)[number]['value']
type DuplicateCheckResult = 'available' | 'unavailable' | null

const sectionTitleClass =
  'border-b border-gray-300 pb-1 text-sm font-bold text-gray-500'

function Test2() {
  const [activeTab, setActiveTab] = useState<TabValue>('new')
  const [activeNav, setActiveNav] = useState<NavValue>('home')
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryValue | null>(null)
  const [selectedValue, setSelectedValue] = useState<ValueKey | null>(null)
  const [isAlertOpen, setIsAlertOpen] = useState(false)

  const [topic, setTopic] = useState('')
  const [reason, setReason] = useState('')

  const [userId, setUserId] = useState('')
  const [checkResult, setCheckResult] = useState<DuplicateCheckResult>(null)

  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const idFormat = validateUserId(userId)
  const idStatus = checkResult ?? idFormat.status
  const idMessage =
    checkResult === 'available'
      ? '사용 가능한 아이디예요.'
      : checkResult === 'unavailable'
        ? '이미 사용 중인 아이디예요. 다시 입력해주세요.'
        : idFormat.message

  const handleUserIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value)
    setCheckResult(null) // 입력이 바뀌면 이전 확인 결과 무효화
  }

  const handleCheckDuplicate = () => {
    setCheckResult(TAKEN_IDS.includes(userId) ? 'unavailable' : 'available')
  }

  return (
    <div className="min-h-screen bg-[#E1F5FE]">
      <div className="flex justify-center gap-16">
        <div className="w-[400px] shrink-0">
          <Header
            title="새 고민"
            onBack={() => console.log('뒤로가기')}
            rightSlot="1/3"
          />
          <Tab items={TAB_ITEMS} value={activeTab} onChange={setActiveTab} />

          <div className="flex flex-col gap-10 px-6 py-10">
            <p className="text-sm text-[#2A1F1C]">
              {activeTab === 'new'
                ? '새 고민 탭 내용 영역'
                : '이어쓰기 탭 내용 영역'}
            </p>

            {/* TextArea */}
            <section className="flex w-[352px] flex-col gap-5">
              <h2 className={sectionTitleClass}>TextArea</h2>

              <TextArea
                label="무슨 고민인가요?"
                placeholder="예: A사 vs B사"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                maxLength={50}
              />

              <TextArea
                label="그건 왜인가요?"
                placeholder="한 줄이면 충분해요"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                maxLength={100}
                rows={3}
              />
            </section>

            {/* Button */}
            <section className="flex w-[341px] flex-col gap-3">
              <h2 className={sectionTitleClass}>Button</h2>
              <Button onClick={() => console.log('로그인 클릭')}>로그인</Button>
            </section>

            {/* CategoryButton */}
            <section className="flex w-[352px] flex-col gap-3">
              <h2 className={sectionTitleClass}>CategoryButton</h2>
              <div className="flex flex-col gap-2">
                {CATEGORY_OPTIONS.map((option) => (
                  <CategoryButton
                    key={option.value}
                    title={option.title}
                    description={option.description}
                    isSelected={selectedCategory === option.value}
                    onClick={() => setSelectedCategory(option.value)}
                  />
                ))}
              </div>
            </section>

            {/* RecordValueButton */}
            <section className="flex w-[352px] flex-col gap-3">
              <h2 className={sectionTitleClass}>RecordValueButton</h2>
              <div className="flex flex-col gap-2">
                {VALUE_KEYS.map((key) => (
                  <RecordValueButton
                    key={key}
                    valueKey={key}
                    title={VALUE_LABELS[key]}
                    description={VALUE_DESCRIPTIONS[key]}
                    isSelected={selectedValue === key}
                    onClick={() => setSelectedValue(key)}
                  />
                ))}
              </div>
            </section>
          </div>
        </div>

        <div className="flex w-[400px] shrink-0 flex-col gap-10 py-10">
          {/* IdInput */}
          <section className="flex w-[254px] flex-col gap-3">
            <h2 className={sectionTitleClass}>IdInput</h2>
            <IdInput
              placeholder="아이디"
              value={userId}
              onChange={handleUserIdChange}
              status={idStatus}
              message={idMessage}
              onCheckDuplicate={handleCheckDuplicate}
            />
            <p className="text-[11px] text-gray-500">
              임시 확인용: admin, test 입력 시 중복 처리
            </p>
          </section>

          {/* Input */}
          <section className="flex w-[254px] flex-col gap-5">
            <h2 className={sectionTitleClass}>Input</h2>

            <Input
              label="닉네임"
              placeholder="닉네임"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              {...validateNickname(nickname)}
            />

            <Input
              label="비밀번호"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              {...validatePassword(password)}
            />

            <Input
              label="비밀번호 확인"
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              {...validatePasswordConfirm(password, passwordConfirm)}
            />
          </section>

          {/* ValueBadge */}
          <section className="flex flex-col gap-3">
            <h2 className={sectionTitleClass}>ValueBadge</h2>
            <div className="flex flex-wrap gap-2">
              {VALUE_KEYS.map((key) => (
                <ValueBadge key={key} valueKey={key} />
              ))}
            </div>
          </section>

          {/* RecordItem — 홈 (주제 없음) */}
          <section className="flex w-[352px] flex-col gap-3">
            <h2 className={sectionTitleClass}>RecordItem — 홈</h2>
            <div className="flex flex-col">
              {RECENT_RECORDS.map((record) => (
                <RecordItem
                  key={record.id}
                  valueKey={record.valueKey}
                  title={record.title}
                  date={record.date}
                />
              ))}
            </div>
          </section>

          {/* RecordItem — 인사이트 (주제 포함) */}
          <section className="flex w-[352px] flex-col gap-3">
            <h2 className={sectionTitleClass}>RecordItem — 인사이트</h2>
            <div className="flex flex-col">
              {INSIGHT_RECORDS.map((record) => (
                <RecordItem
                  key={record.id}
                  valueKey={record.valueKey}
                  title={record.title}
                  topic={record.topic}
                  date={record.date}
                />
              ))}
            </div>
          </section>

          {/* RecordTimelineItem */}
          <section className="flex w-[352px] flex-col gap-3">
            <h2 className={sectionTitleClass}>RecordTimelineItem</h2>
            <div className="flex flex-col">
              {TIMELINE_RECORDS.map((record) => (
                <RecordTimelineItem
                  key={record.id}
                  valueKey={record.valueKey}
                  title={record.title}
                  date={record.date}
                />
              ))}
            </div>
          </section>

          {/* AlertModal */}
          <section className="flex flex-col gap-3">
            <h2 className={sectionTitleClass}>AlertModal</h2>
            <button
              type="button"
              onClick={() => setIsAlertOpen(true)}
              className="h-9 w-fit rounded-lg bg-gray-700 px-4 text-sm font-bold text-white"
            >
              모달 열기
            </button>
          </section>

          {/* BottomNav */}
          <section className="flex w-[360px] flex-col gap-3">
            <h2 className={sectionTitleClass}>BottomNav</h2>
            <BottomNav value={activeNav} onChange={setActiveNav} />
          </section>
        </div>
      </div>

      <AlertModal
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        message="모달 컴포넌트 테스트입니다."
      />
    </div>
  )
}

export default Test2
