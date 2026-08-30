import { useState, type ChangeEvent, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import LayerLogo from '@/assets/LayerLogo.png'
import Exclamation from '@/assets/Exclamation.png'
import Input from '@/components/common/input/Input'
import Button from '@/components/common/button/Button'
import ErrorToast from '@/components/auth/ErrorToast'

import { login, getAuthErrorMessage } from '@/services/auth'
import { validatePassword } from '@/utils/validation'

export default function Login() {
  const navigate = useNavigate()

  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [showEmptyAlert, setShowEmptyAlert] = useState(false)
  const [apiError, setApiError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setApiError('')

    if (!id || !password) {
      setShowEmptyAlert(true)
      return
    }
    setShowEmptyAlert(false)

    setIsSubmitting(true)
    try {
      await login({ id, password })
      navigate('/', { replace: true })
    } catch (err) {
      setApiError(getAuthErrorMessage(err))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-stretch min-h-screen bg-[#E1F5FE] pt-[74px] z-1"
    >
      <header className="w-[344px] h-[74px] mb-[5px] px-[28px]">
        <img src={LayerLogo} alt="no image" className="h-[48px]" />
        <p className="text-[13px] font-[400] text-[#2A1F1C8C]">당신이 실제로 골라온 것을 봅니다.</p>
      </header>
      <div className="grow-1 flex flex-col justify-between px-[28px] py-[48px]">
        <div>
          <section className="flex w-[344px] flex-col gap-5 mb-[28px]">
            <Input
              label="아이디"
              placeholder="아이디"
              value={id}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setId(e.target.value)}
            />

            <Input
              label="비밀번호"
              placeholder="비밀번호"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              {...validatePassword(password)}
            />
          </section>

          {apiError && (
            <div className="mb-[16px]">
              <ErrorToast message={apiError} />
            </div>
          )}

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? '로그인 중...' : '로그인'}
          </Button>
        </div>
        <center>
          <button
            type="button"
            onClick={() => navigate('/register')}
            className="w-[159px] h-[18px] rounded-[9px] text-[13px] font-[800] text-[#3E2723]"
          >
            계정이 없으신가요? 회원가입
          </button>
        </center>
      </div>
      {/* alert tab */}
      <div
        className={`${showEmptyAlert ? '' : 'invisible'} fixed left-[0] bottom-[28px] w-[calc(100%-48px)] h-[48px] px-[16px] py-[14px] mx-[24px] rounded-[9px]  bg-[#3E2723]`}
      >
        <img className="inline-block align-baseline w-[16px] h-[16px]" src={Exclamation} alt="" />
        <p className="inline-block align-top text-[13px] font-[400] text-[#FFFFFF] ml-[10px]">모든 항목을 입력해주세요.</p>
      </div>
    </form>
  )
}
