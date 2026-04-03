# Work Log — match-teenieping

## 로그 작성 형식

각 작업 세션마다 아래 형식으로 추가한다.

```
## [LOG-N] YYYY-MM-DD — 제목

### 프롬프트

### 왜 이렇게 프롬프팅했나

### Claude Code의 반응

### 배운 것 / 놀란 것

### 다음에 쓸 수 있는 프롬프트 패턴
```

---

## [LOG-1] 2026-04-03 — 프로젝트 세팅

### 행동

VVC CLAUDE.md의 새 프로젝트 추가 가이드에 따라 기본 폴더 구조 생성.

- `docs/`, `variables/`, `.claude/` 폴더 생성
- `.claude/settings.json` — 에이전트 자율 실행 권한 설정
- `docs/work-log.md`, `docs/docs.md`, `docs/learning.md` 생성
- `CLAUDE.md` 생성 (기술 스택 미정 상태)

### 다음 단계

기술 스택 결정 후 `create-next-app` 또는 다른 방식으로 코드 기반 생성.

---

## [LOG-2] 2026-04-03 — 데이터 수집 + Next.js 앱 구현

### 프롬프트

> 나무위키에서 티니핑 전체 목록 수집 → 정적 데이터 파일 생성 → Next.js 앱 생성 → 게임 흐름 구현

### 행동

**데이터 수집**
- 나무위키 두 페이지를 사용자가 직접 HTML로 다운로드 (`docs/materials/`)
- Python 스크립트로 HTML 파싱: 티니핑 이름 + 이미지 파일명 매핑 추출
  - 섹션 구조: `s-4.3.1`(1기) ~ `s-4.3.6`(6기) = 일반 티니핑 111마리
  - 로열 티니핑 23마리 (`s-4.1`)
  - 프린세스 로미 32가지 형태 (`span id="프린세스 XXX"` 패턴)
- 나무위키 이미지: 로컬 `_files/` 폴더에 저장된 .webp 파일 → `public/images/teenieping/`, `public/images/princess/` 로 복사

**유명도 기반 난이도 분류**
- 쉬움 (5): 1기 로열 핵심 — 하츄핑, 바로핑, 아자핑, 라라핑, 해핑
- 중간 (추가 5 = 총 10): 2~4기 로열 — 조아핑, 믿어핑, 나나핑, 포실핑, 빛나핑
- 어려움 (15): 1~3기 일반 티니핑 — 앙대핑, 차캐핑, 아잉핑 등
- 극악 (15): 프린세스 로미 이미지 → 합체 티니핑 이름 맞추기

**Next.js 앱 생성**
- `create-next-app` → TypeScript, Tailwind CSS, App Router, src/ 구조
- `/tmp`에 생성 후 프로젝트 디렉토리로 파일 이동 (CLAUDE.md 충돌 우회)
- 기술 스택: Next.js 16.2.2 (Turbopack), Tailwind CSS v4

**구현 파일**
- `src/data/teenieping.ts`: 전체 티니핑 데이터 (이름 + 이미지 경로), 난이도별 배열, 프린세스 데이터
- `src/lib/similarity.ts`: 한글 자모 분해 기반 유사도 매칭 (Levenshtein distance, 75% 임계값)
- `src/app/page.tsx`: 단일 페이지 게임 (select → playing → result)

**게임 흐름**
1. 난이도 선택 화면 (4가지: 쉬움/중간/어려움/극악)
2. 티니핑 이미지 → 이름 입력 (Enter 또는 확인 버튼)
3. 정답 판정 후 1.5초 딜레이 → 다음 문제
4. 결과 화면: 퍼센트 점수, 재시도 버튼, 주소 복사, 카카오톡 공유(모바일 전용)

### Claude Code의 반응

- 나무위키 직접 WebFetch 차단 (403) → 사용자가 HTML 다운로드로 해결
- HTML 구조 분석: `title` 속성에 이름, `src` 속성에 로컬 이미지 파일명 있음을 발견
- 프린세스 데이터: `<span id="프린세스 XXX">` 패턴으로 섹션 제목 추출
- `create-next-app`이 CLAUDE.md, variables/ 파일 때문에 현재 디렉토리 거부 → /tmp 우회 생성 후 복사

### 배운 것

- 나무위키는 저장된 HTML 오프라인 파싱이 가장 안정적
- 나무위키 구조: 섹션 id로 목록 찾고, `inline-block` div 내 이미지+이름 쌍
- `create-next-app`은 기존 파일이 있으면 거부 → /tmp 우회가 유효한 패턴
- Tailwind CSS v4는 별도 `tailwind.config.ts` 없이 `@import "tailwindcss"` 방식

### 다음 단계

- ~~Git 초기화, Vercel 배포~~ ✅
- ~~카카오 JavaScript SDK 연동~~ ✅
- ~~OG 이미지 생성~~ ✅
- 정답 유사도 임계값 튜닝

---

## [LOG-3] 2026-04-03 — 카카오 공유 + OG 이미지 + 배포

### 행동

**카카오톡 공유 구현**
- 카카오 JavaScript SDK 2.7.2 로드 (`next/script`, `afterInteractive`)
- `onLoad` 이벤트 핸들러를 Server Component에 직접 사용 불가 → `KakaoInit.tsx` Client Component로 분리
- `src/lib/kakao.ts`: `shareKakao()` 함수 — 점수/난이도 포함 피드 메시지 공유
  - SDK 미로드 시 fallback: 클립보드 복사
- 카카오 앱 키: `NEXT_PUBLIC_KAKAO_JS_KEY` 환경변수로 관리

**OG 이미지 동적 생성**
- `src/app/api/og/route.tsx` — Edge Runtime + `@vercel/og`
- 쿼리 파라미터: `score`, `total`, `difficulty`
- 결과 퍼센트, 이모지, 🟢🔴 점 행렬, CTA 버튼 포함한 1200×630 이미지 자동 생성
- 카카오 공유 시 OG 이미지 URL을 `/api/og?score=...` 동적 URL로 설정

**GitHub + Vercel 배포**
- GitHub: `rickykimjongwook/match-teenieping`
- Vercel: `https://match-teenieping.vercel.app`
- 환경변수: `NEXT_PUBLIC_KAKAO_JS_KEY`, `NEXT_PUBLIC_SITE_URL`
- 카카오 플랫폼 Web 도메인 등록 완료

### 배운 것 / 막혔던 것

- Next.js App Router에서 `<Script onLoad>` — Server Component에서 이벤트 핸들러 불가 → Client Component 래퍼 필요
- `metadataBase` 없으면 OG 이미지 URL 경고 발생 → `new URL(siteUrl)` 설정으로 해결
- `.env.local`은 `.gitignore`에 자동 포함 → Vercel에 환경변수 별도 입력 필요

### 현재 상태

🟢 **라이브** — https://match-teenieping.vercel.app

---

## [LOG-4] 2026-04-03 — 다지선다 전환 + 카카오 공유 제거

### 프롬프트

> 난이도별로 다지선다 방식 도입. 쉬움 2지선다, 중간 3지선다, 어려움 5지선다, 극악은 타이핑 유지.
> 카카오톡 공유 error 4019 발생 → SDK 디버깅 → 결국 기능 제거.

### 행동

**다지선다 전환**
- `Question` 타입에 `choices: string[]` 필드 추가
- `CHOICE_COUNT` 맵으로 난이도별 보기 수 관리 (easy: 2, medium: 3, hard: 5, extreme: 0)
- `buildChoices()`: 정답 1개 + 오답 N-1개를 전체 풀에서 랜덤 추출 후 셔플
- UI: 보기 수에 따라 `grid-cols-2` / `grid-cols-3` 자동 전환
- 선택 즉시 정답(초록) / 오답(빨강) 시각 피드백, 1.2초 후 다음 문제
- 극악 난이도만 기존 타이핑 입력 방식 유지

**카카오톡 공유 오류 대응**
- 증상: 모바일에서 `Kakao.Share.sendDefault()` 호출 시 error code 4019
- 4019 원인: Kakao SDK의 도메인 검증 실패 (KA 헤더 불일치)
- 시도 1: `fail` 콜백 추가 + 에러 내용 alert으로 노출 (디버깅용)
- 시도 2: Web Share API(`navigator.share`)로 교체 → 사용자가 SDK 방식 유지 원함
- 최종 결론: 기능 전체 제거 (버튼, `kakao.ts` import, `KakaoInit` 스크립트 로드)

### 배운 것 / 막혔던 것

- Kakao JS SDK error 4019: 도메인 등록 여부와 무관하게 KA 헤더 검증 실패 발생 가능 — 원인 불명확할 경우 SDK 자체를 포기하는 게 빠른 의사결정
- 다지선다 오답 보기 풀: 같은 난이도 풀만 쓰면 보기 수가 부족할 수 있어 `hardTeeniepings`를 공통 풀로 사용
- `navigator.share()` (Web Share API)는 모든 모바일 앱으로 공유 가능하지만, 사용자 경험(공유 시트 UI)이 카카오 피드 카드와 다름

### 현재 상태

🟢 **라이브** — https://match-teenieping.vercel.app
- 공유: URL 복사 버튼만 유지
