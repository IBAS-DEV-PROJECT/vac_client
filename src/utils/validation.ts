import type { ValidationResult } from '@/types/input'

const NICKNAME_PATTERN = /^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9]+$/
const PASSWORD_PATTERN = /^(?=.*[a-zA-Z])(?=.*\d)\S{10,}$/
const USER_ID_PATTERN = /^[a-z0-9]+$/
const USER_ID_MIN_LENGTH = 1
const USER_ID_MAX_LENGTH = 10
const USER_ID_GUIDE = '10자 이내, 영문 소문자 및 숫자만 가능, 공백 및 중복 불가'

export function validateNickname(value: string): ValidationResult {
  if (!value) {
    return {
      status: 'default',
      message: '10자 이내, 특수문자 사용 불가 · 중복 닉네임 사용 가능',
    }
  }
  if (!NICKNAME_PATTERN.test(value) || value.length > 10) {
    return {
      status: 'error',
      message:
        '특수문자는 사용할 수 없어요. 10자 이내, 특수문자 없이 다시 입력해주세요.',
    }
  }
  return { status: 'success', message: '사용 가능한 닉네임이에요.' }
}

export function validatePassword(value: string): ValidationResult {
  if (!value) {
    return { status: 'default', message: '' }
  }
  if (!PASSWORD_PATTERN.test(value)) {
    return {
      status: 'error',
      message:
        '최소 10자 이상으로 영문·숫자를 포함해주세요. (특수문자 권장, 공백 불가)',
    }
  }
  return { status: 'success', message: '사용 가능한 비밀번호예요.' }
}

export function validatePasswordConfirm(
  password: string,
  confirm: string,
): ValidationResult {
  if (!confirm) {
    return { status: 'default', message: '' }
  }
  if (password !== confirm) {
    return {
      status: 'error',
      message: '일치하지 않는 번호이니 다시 입력해주세요.',
    }
  }
  return { status: 'success', message: '일치합니다.' }
}

export function validateUserId(value: string): {
  status: 'idle' | 'invalid' | 'ready'
  message: string
} {
  if (!value) return { status: 'idle', message: USER_ID_GUIDE }

  if (!USER_ID_PATTERN.test(value) || value.length > USER_ID_MAX_LENGTH) {
    return { status: 'invalid', message: USER_ID_GUIDE }
  }
  if (value.length < USER_ID_MIN_LENGTH) {
    return { status: 'idle', message: USER_ID_GUIDE }
  }
  return { status: 'ready', message: USER_ID_GUIDE }
}
