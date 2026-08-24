// Access token은 메모리에 보관 (페이지 새로고침 시 초기화)
// Refresh token은 로그인 완성 전 개발용으로 localStorage 사용
// → 로그인 구현 완료 후 HttpOnly Cookie 방식으로 교체 예정

import type { AuthUser } from '@/types/auth'

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string

let accessToken: string | null = null

export const tokenStore = {
  getAccessToken: () => accessToken,
  setAccessToken: (token: string | null) => {
    accessToken = token
  },
  getRefreshToken: () => localStorage.getItem('refreshToken'),
  setRefreshToken: (token: string | null) => {
    if (token) localStorage.setItem('refreshToken', token)
    else localStorage.removeItem('refreshToken')
  },
  clear: () => {
    accessToken = null
    localStorage.removeItem('refreshToken')
  },
}

let currentUser: AuthUser | null = null

export const userStore = {
  get: () => currentUser,
  set: (user: AuthUser | null) => {
    currentUser = user
  },
}

export async function initAuth(): Promise<void> {
  const refreshToken = tokenStore.getRefreshToken()
  if (!refreshToken) return

  try {
    const res = await fetch(`${BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    })
    if (!res.ok) throw new Error()
    const { data } = await res.json()
    tokenStore.setAccessToken(data.accessToken)
    tokenStore.setRefreshToken(data.refreshToken)
  } catch {
    tokenStore.clear()
    userStore.set(null)
  }
}
