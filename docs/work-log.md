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

- Git 초기화, Vercel 배포
- 카카오 JavaScript SDK 연동 (카카오톡 공유 실제 구현)
- OG 이미지 생성 (결과 공유용)
- 정답 유사도 임계값 튜닝
