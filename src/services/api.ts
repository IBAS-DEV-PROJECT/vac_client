import axios from 'axios'
import { tokenStore } from '@/store/auth'
import { BASE_URL } from '@/utils/env'

export const api = axios.create({
  baseURL: BASE_URL,
})

// 요청마다 access token 주입
api.interceptors.request.use((config) => {
  const token = tokenStore.getAccessToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

interface RefreshedTokens {
  accessToken: string
  refreshToken: string
}

// 토큰 없이 호출되는 공개 인증 API. 이 경로들의 401은 자격 증명 오류일 뿐
// 세션 만료가 아니므로, 아래 인터셉터의 강제 로그아웃/리다이렉트 대상에서 제외한다.
const PUBLIC_AUTH_PATHS = ['/auth/login', '/auth/signup', '/auth/id/check']

function isPublicAuthRequest(url: string | undefined): boolean {
  if (!url) return false
  return PUBLIC_AUTH_PATHS.some((path) => url.includes(path))
}

// 여러 요청이 동시에 401을 받아도 /auth/refresh는 한 번만 호출한다.
// refresh token은 재발급 시 회전(rotate)되어 이미 사용된 토큰으로 재요청하면
// 서버가 전체 세션을 강제 로그아웃시키므로, 동시 refresh 호출 자체를 막아야 한다.
let refreshPromise: Promise<RefreshedTokens> | null = null

function refreshTokens(): Promise<RefreshedTokens> {
  if (!refreshPromise) {
    const refreshToken = tokenStore.getRefreshToken()
    refreshPromise = axios
      .post(`${BASE_URL}/auth/refresh`, { refreshToken })
      .then(({ data }) => {
        tokenStore.setAccessToken(data.data.accessToken)
        tokenStore.setRefreshToken(data.data.refreshToken)
        return data.data as RefreshedTokens
      })
      .finally(() => {
        refreshPromise = null
      })
  }
  return refreshPromise
}

// 401 시 refresh → 재시도, 실패 시 로그아웃
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config

    if (
      error.response?.status === 401 &&
      !original._retry &&
      !isPublicAuthRequest(original?.url)
    ) {
      original._retry = true

      if (!tokenStore.getRefreshToken()) {
        tokenStore.clear()
        if (window.location.pathname !== '/') window.location.href = '/'
        return Promise.reject(error)
      }

      try {
        const { accessToken } = await refreshTokens()
        original.headers.Authorization = `Bearer ${accessToken}`
        return api(original)
      } catch {
        tokenStore.clear()
        if (window.location.pathname !== '/') window.location.href = '/'
        return Promise.reject(error)
      }
    }

    return Promise.reject(error)
  },
)
