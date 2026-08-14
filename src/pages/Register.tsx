import { useState, type ChangeEvent } from 'react'

import LayerLogo from '../assets/LayerLogo.png'
import Input from '@/components/common/input/Input'
import IdInput from '@/components/auth/IdInput'
import Header from '@/components/common/header/Header'
import AlertBox from '@/components/auth/AlertBox'

import {
  validateNickname,
  validatePassword,
  validatePasswordConfirm,
  validateUserId,
} from '@/utils/validation'

const TAKEN_IDS = ['admin', 'test']

type DuplicateCheckResult = 'available' | 'unavailable' | null


export default function Register () {

  const [id] = useState('')
  const [password, setPassword] = useState('')
  
  const [userId, setUserId] = useState('')
  const [checkResult, setCheckResult] = useState<DuplicateCheckResult>(null)

  const [passwordConfirm, setPasswordConfirm] = useState('')

  const handleUserIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value)
    setCheckResult(null) // 입력이 바뀌면 이전 확인 결과 무효화
  }
  
  const idFormat = validateUserId(userId)
  const idStatus = checkResult ?? idFormat.status
  const idMessage =
    checkResult === 'available'
      ? '사용 가능한 아이디예요.'
      : checkResult === 'unavailable'
        ? '이미 사용 중인 아이디예요. 다시 입력해주세요.'
        : idFormat.message

  const handleCheckDuplicate = () => {
    setCheckResult(TAKEN_IDS.includes(userId) ? 'unavailable' : 'available')
  }

  return (
    <div className="w-[100%] h-[100%]">
      <div className="flex flex-col items-stretch min-h-screen bg-[#E1F5FE] pt-[34px]">
        <Header
          title="회원가입"
          onBack={() => console.log('뒤로가기')}
        />
        <div className="grow-1 flex flex-col justify-between px-[28px] py-[48px]">
          <div>
            <section className="flex w-[344px] flex-col gap-5 mb-[28px]">
              <Input
                label="아이디"
                placeholder="아이디"
                value={id}
              />

              <section className="flex w-[344px] flex-col gap-3">
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

              <Input
                label="비밀번호"
                placeholder="비밀번호"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                {...validatePassword(password)}
              />

              <Input
                label="비밀번호 확인"
                placeholder="비밀번호 확인"
                type="password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                {...validatePasswordConfirm(password, passwordConfirm)}
              />

              <p className="text-[12px] font-[400] text-[#2A1F1C8C]">비밀번호를 잊으면 계정을 되찾을 수 없어요. 이메일은 받지 않아요.</p>
            </section>
            <button className="w-[100%] h-[46px] rounded-[9px] text-[14px] font-[800] text-[#E1F5FE] bg-[#3E2723]">회원가입</button>
          </div>
          <center><button className="w-[159px] h-[18px] rounded-[9px] text-[13px] font-[800] text-[#3E2723]">이미 계정이 있어요, 로그인</button></center>
        </div>
      </div>
      <AlertBox isVisible={false}/>
    </div>
  );
}