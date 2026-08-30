// Access token은 메모리에 보관 (페이지 새로고침 시 초기화)
// Refresh token은 로그인 완성 전 개발용으로 localStorage 사용
// → 로그인 구현 완료 후 HttpOnly Cookie 방식으로 교체 예정

import type { AuthUser } from '@/types/auth'
import { BASE_URL } from '@/utils/env'

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

async function devAutoLogin(): Promise<void> {
  const id = import.meta.env.VITE_DEV_LOGIN_ID
  const password = import.meta.env.VITE_DEV_LOGIN_PASSWORD
  if (!id || !password) return

  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, password }),
    })
    if (!res.ok) return
    const { data } = await res.json()
    if (
      typeof data?.accessToken !== 'string' ||
      typeof data?.refreshToken !== 'string'
    )
      return
    tokenStore.setRefreshToken(data.refreshToken)
    tokenStore.setAccessToken(data.accessToken)
  } catch {
    tokenStore.clear()
    // 개발 자동 로그인 실패는 무시 — 앱 렌더링에 영향 없음
  }
}

export async function initAuth(): Promise<void> {
  const refreshToken = tokenStore.getRefreshToken()

  if (refreshToken) {
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
      return
    } catch {
      tokenStore.clear()
      userStore.set(null)
    }
  }

  if (import.meta.env.DEV) {
    await devAutoLogin()
  }
}
