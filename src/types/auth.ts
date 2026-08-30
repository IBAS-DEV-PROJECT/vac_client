export type AuthErrorCode =
  | 'INVALID_CREDENTIALS'
  | 'DUPLICATE_ID'
  | 'TOKEN_EXPIRED'
  | 'REFRESH_TOKEN_REUSED'

export interface AuthUser {
  id: string
  loginId: string
  nickname: string
}

export interface CheckIdData {
  available: boolean
}

export interface SignupRequest {
  id: string
  nickname: string
  password: string
  passwordConfirm: string
}

export interface SignupData {
  userId: string
}

export interface LoginRequest {
  id: string
  password: string
}

export interface LoginData {
  accessToken: string
  refreshToken: string
  user: AuthUser
  activateOnboarding: boolean
}

export interface RefreshData {
  accessToken: string
  refreshToken: string
}
