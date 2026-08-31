import { useState, type ChangeEvent, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import Input from '@/components/common/input/Input'
import IdInput from '@/components/auth/IdInput'
import Header from '@/components/common/header/Header'
import ErrorToast from '@/components/auth/ErrorToast'
import InputAlert from '@/components/auth/InputAlert'

import {
  validateNickname,
  validatePassword,
  validatePasswordConfirm,
  validateUserId,
} from '@/utils/validation'
import { checkId, signup, getAuthErrorMessage } from '@/services/auth'

type DuplicateCheckResult = 'available' | 'unavailable' | null

export default function Register() {
  const navigate = useNavigate()

  const [userId, setUserId] = useState('')
  const [checkResult, setCheckResult] = useState<DuplicateCheckResult>(null)
  const [checkedId, setCheckedId] = useState<string | null>(null)
  const [isChecking, setIsChecking] = useState(false)

  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const [apiError, setApiError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [showToast, setShowToast] = useState(false)

  const handleInputAlertConfirm = () => {
    setShowToast(!showToast)
  }

  const handleUserIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value)
    setCheckResult(null) // 입력이 바뀌면 이전 확인 결과 무효화
  }

  // checkedId와 userId가 다르면(입력이 바뀐 뒤 이전 요청이 늦게 도착한 경우 등)
  // 화면에 남아있는 checkResult를 신뢰하지 않는다.
  const currentCheckResult = checkedId === userId ? checkResult : null

  const idFormat = validateUserId(userId)
  const idStatus = currentCheckResult ?? idFormat.status
  const idMessage =
    currentCheckResult === 'available'
      ? '사용 가능한 아이디예요.'
      : currentCheckResult === 'unavailable'
        ? '이미 사용 중인 아이디예요. 다시 입력해주세요.'
        : idFormat.message

  const handleCheckDuplicate = async () => {
    if (isChecking) return
    const idToCheck = userId
    setApiError('')
    setIsChecking(true)
    try {
      const available = await checkId(idToCheck)
      setCheckedId(idToCheck)
      setCheckResult(available ? 'available' : 'unavailable')
    } catch (err) {
      setApiError(getAuthErrorMessage(err))
    } finally {
      setIsChecking(false)
    }
  }

  const nicknameResult = validateNickname(nickname)
  const passwordResult = validatePassword(password)
  const passwordConfirmResult = validatePasswordConfirm(
    password,
    passwordConfirm,
  )

  const canSubmit =
    idFormat.status === 'ready' &&
    currentCheckResult === 'available' &&
    nicknameResult.status === 'success' &&
    passwordResult.status === 'success' &&
    passwordConfirmResult.status === 'success'

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!canSubmit || isSubmitting) {
      handleInputAlertConfirm()
      return
    }

    setApiError('')
    setIsSubmitting(true)
    try {
      await signup({ id: userId, nickname, password, passwordConfirm })
      navigate('/onBoarding', { replace: true })
    } catch (err) {
      setApiError(getAuthErrorMessage(err))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-[100%] h-[100%]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-stretch min-h-screen bg-[#E1F5FE] pt-[34px]"
      >
        <Header title="회원가입" onBack={() => navigate(-1)} />
        <div className="grow-1 flex flex-col justify-between px-[28px] py-[48px]">
          <div>
            <section className="flex w-[344px] flex-col gap-5 mb-[28px]">
              <section className="flex w-[344px] flex-col gap-3">
                <IdInput
                  placeholder="아이디"
                  value={userId}
                  onChange={handleUserIdChange}
                  status={idStatus}
                  message={idMessage}
                  onCheckDuplicate={handleCheckDuplicate}
                />
              </section>

              <Input
                label="닉네임"
                placeholder="닉네임"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                {...nicknameResult}
              />

              <Input
                label="비밀번호"
                placeholder="비밀번호"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                {...passwordResult}
              />

              <Input
                label="비밀번호 확인"
                placeholder="비밀번호 확인"
                type="password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                {...passwordConfirmResult}
              />

              <p className="text-[12px] font-[400] text-[#2A1F1C8C]">
                비밀번호를 잊으면 계정을 되찾을 수 없어요. 이메일은 받지 않아요.
              </p>
            </section>

            {apiError && (
              <div className="mb-[16px]">
                <ErrorToast message={apiError} />
              </div>
            )}

            <button
              type="submit"
              className="w-[100%] h-[46px] rounded-[9px] text-[14px] font-[800] text-[#E1F5FE] bg-[#3E2723] disabled:opacity-50"
            >
              {isSubmitting ? '가입 중...' : '회원가입'}
            </button>
          </div>
          <center>
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="w-[159px] h-[18px] rounded-[9px] text-[13px] font-[800] text-[#3E2723]"
            >
              이미 계정이 있어요, 로그인
            </button>
          </center>
        </div>
      </form>
      <InputAlert isVisible={showToast} onConfirm={handleInputAlertConfirm} />
    </div>
  )
}
