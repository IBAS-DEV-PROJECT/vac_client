import axios from 'axios'
import { api } from '@/services/api'
import { tokenStore, userStore } from '@/store/auth'
import type { ApiErrorResponse, ApiResponse } from '@/types/api'
import type {
  CheckIdData,
  LoginData,
  LoginRequest,
  SignupData,
  SignupRequest,
} from '@/types/auth'

export async function checkId(id: string): Promise<boolean> {
  const { data } = await api.get<ApiResponse<CheckIdData>>('/auth/id/check', {
    params: { id },
  })
  return data.data.available
}

export async function signup(payload: SignupRequest): Promise<SignupData> {
  const { data } = await api.post<ApiResponse<SignupData>>(
    '/auth/signup',
    payload,
  )
  return data.data
}

export async function login(payload: LoginRequest): Promise<LoginData> {
  const { data } = await api.post<ApiResponse<LoginData>>(
    '/auth/login',
    payload,
  )
  const { accessToken, refreshToken, user } = data.data
  tokenStore.setAccessToken(accessToken)
  tokenStore.setRefreshToken(refreshToken)
  userStore.set(user)
  return data.data
}

export async function logout(): Promise<void> {
  const refreshToken = tokenStore.getRefreshToken()
  try {
    if (refreshToken) {
      await api.post('/auth/logout', { refreshToken })
    }
  } finally {
    tokenStore.clear()
    userStore.set(null)
  }
}

export async function deleteAccount(): Promise<void> {
  await api.delete('/auth/delete')
  tokenStore.clear()
  userStore.set(null)
}

export function getAuthErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as ApiErrorResponse | undefined
    if (data?.error?.message) return data.error.message
  }
  return '알 수 없는 오류가 발생했어요. 잠시 후 다시 시도해주세요.'
}
