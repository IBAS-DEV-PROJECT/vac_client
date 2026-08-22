// Access token은 메모리에 보관 (페이지 새로고침 시 초기화)
// Refresh token은 로그인 완성 전 개발용으로 localStorage 사용
// → 로그인 구현 완료 후 HttpOnly Cookie 방식으로 교체 예정

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
