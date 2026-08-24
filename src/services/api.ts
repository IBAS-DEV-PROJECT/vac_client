import axios from 'axios'
import { tokenStore } from '@/store/auth'

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string

export const api = axios.create({
  baseURL: BASE_URL,
})

// 요청마다 access token 주입
api.interceptors.request.use((config) => {
  const token = tokenStore.getAccessToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// 401 시 refresh → 재시도, 실패 시 로그아웃
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true

      const refreshToken = tokenStore.getRefreshToken()
      if (!refreshToken) {
        tokenStore.clear()
        window.location.href = '/login'
        return Promise.reject(error)
      }

      try {
        const { data } = await axios.post(`${BASE_URL}/auth/refresh`, {
          refreshToken,
        })
        tokenStore.setAccessToken(data.data.accessToken)
        tokenStore.setRefreshToken(data.data.refreshToken)

        original.headers.Authorization = `Bearer ${data.data.accessToken}`
        return api(original)
      } catch {
        tokenStore.clear()
        window.location.href = '/login'
        return Promise.reject(error)
      }
    }

    return Promise.reject(error)
  },
)
