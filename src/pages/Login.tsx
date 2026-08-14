import { useState, type ChangeEvent } from 'react'

import LayerLogo from '@/assets/LayerLogo.png'
import Exclamation from '@/assets/Exclamation.png'
import Input from '@/components/common/input/Input'

import {
  validateNickname,
  validatePassword,
  validatePasswordConfirm,
  validateUserId,
} from '@/utils/validation'

export default function Login () {

  const [id] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="flex flex-col items-stretch min-h-screen bg-[#E1F5FE] pt-[74px] z-1">
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
          <button className="w-[100%] h-[46px] rounded-[9px] text-[14px] font-[800] text-[#E1F5FE] bg-[#3E2723]">로그인</button>
        </div>
        <center><button className="w-[159px] h-[18px] rounded-[9px] text-[13px] font-[800] text-[#3E2723]">계정이 없으신가요? 회원가입</button></center>
      </div>
      {/* alert tab */}
      <div className="invisible fixed left-[0] bottom-[28px] w-[calc(100%-48px)] h-[48px] px-[16px] py-[14px] mx-[24px] rounded-[9px]  bg-[#3E2723]">
        <img className="inline-block align-baseline w-[16px] h-[16px]" src={Exclamation} alt="" />
        <p className="inline-block align-top text-[13px] font-[400] text-[#FFFFFF] ml-[10px]">모든 항목을 입력해주세요.</p>
      </div>
    </div>
  );
}