# VAC Client

아이박스 방학 프로젝트 프론트엔드 클라이언트입니다.

## 기술 스택

- React
- Vite
- Tailwind CSS
- ESLint + Prettier
- Husky + lint-staged

## 시작하기

Node.js LTS 버전을 설치한 뒤 아래 명령을 실행합니다.

```bash
npm install
npm run dev
```

개발 서버 실행 후 표시되는 주소로 접속합니다.

## 명령어

| 명령어                 | 설명               |
| ---------------------- | ------------------ |
| `npm run dev`          | 개발 서버 실행     |
| `npm run build`        | 프로덕션 빌드      |
| `npm run preview`      | 빌드 결과 미리보기 |
| `npm run lint`         | ESLint 검사        |
| `npm run lint:fix`     | ESLint 자동 수정   |
| `npm run format`       | Prettier 포맷 적용 |
| `npm run format:check` | Prettier 포맷 검사 |

커밋 시 Husky가 실행되며, 스테이징된 파일에 ESLint와 Prettier를 자동 적용합니다.

## 환경변수

환경변수는 `.env.local`에서 관리합니다. 새로 시작할 때는 아래처럼 복사해 사용합니다.

```bash
cp .env.example .env.local
```

브라우저에서 사용해야 하는 값은 반드시 `VITE_` 접두사를 사용합니다.

```env
VITE_API_BASE_URL=
```

`.env.local`은 Git에 포함하지 않습니다.

## 폴더 구조

```text
src/
├── assets/      # 이미지, 폰트 등 정적 리소스
├── components/  # 재사용 가능한 UI 컴포넌트
├── constants/   # 상수
├── hooks/       # 커스텀 훅
├── layouts/     # 공통 레이아웃
├── pages/       # 페이지 컴포넌트
├── services/    # API 및 외부 서비스 통신
├── store/       # 전역 상태 관리
├── styles/      # 공통 스타일
├── types/       # 타입 정의
└── utils/       # 공통 유틸리티
```

`@`는 `src`를 가리키는 절대경로 별칭입니다.

```jsx
import Button from '@/components/Button'
```
