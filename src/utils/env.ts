const rawBaseUrl = import.meta.env.VITE_API_BASE_URL as string

// 프로덕션에서 http:// 등으로 잘못 설정되면 로그인 자격 증명·토큰이 평문으로
// 전송될 수 있어 빌드 시점에 막는다. 개발 환경은 Vite 프록시 경로(예: /vac/api/v1)
// 같은 상대경로도 써야 하므로 검사에서 제외한다.
if (
  import.meta.env.PROD &&
  (typeof rawBaseUrl !== 'string' || !rawBaseUrl.startsWith('https://'))
) {
  throw new Error(
    `VITE_API_BASE_URL must start with https:// in production (got: "${rawBaseUrl}")`,
  )
}

export const BASE_URL = rawBaseUrl
