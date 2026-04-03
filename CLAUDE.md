# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 상태

**배포 완료.** Next.js 16 + TypeScript + Tailwind CSS v4

## 배포 정보

- **배포 URL**: https://match-teenieping.vercel.app
- **GitHub**: https://github.com/rickykimjongwook/match-teenieping
- **Vercel 환경변수**: `NEXT_PUBLIC_KAKAO_JS_KEY`, `NEXT_PUBLIC_SITE_URL`

## 폴더 구조

```
match-teenieping/
├── src/
│   ├── app/
│   │   ├── page.tsx          ← 게임 메인 (select/playing/result)
│   │   ├── layout.tsx        ← 메타데이터, 카카오 SDK 초기화
│   │   └── api/og/route.tsx  ← OG 이미지 동적 생성 (edge)
│   ├── components/
│   │   └── KakaoInit.tsx     ← 카카오 SDK 초기화 클라이언트 컴포넌트
│   ├── data/
│   │   └── teenieping.ts     ← 티니핑 전체 데이터 (난이도별)
│   └── lib/
│       ├── similarity.ts     ← 한글 자모 유사도 매칭
│       └── kakao.ts          ← 카카오 공유 함수
├── public/
│   ├── images/teenieping/    ← 티니핑 이미지 (186개 webp)
│   └── images/princess/      ← 로미 프린세스 이미지 (34개 webp)
├── docs/                     ← work-log.md, docs.md, learning.md
└── variables/                ← 민감 정보 (gitignore)
```

## 게임 난이도

- **쉬움**: 로열 티니핑 5마리 (하츄핑, 바로핑, 아자핑, 라라핑, 해핑)
- **중간**: 로열 티니핑 10마리 (쉬움 + 5마리)
- **어려움**: 일반 티니핑 15마리
- **극악**: 로미 프린세스 이미지 → 합체 티니핑 맞추기 15문제

## 개발 명령어

```bash
npm run dev    # 개발 서버 (localhost:3000)
npm run build  # 프로덕션 빌드
```

## 문서

- `docs/work-log.md` — 작업 로그 (작업 완료 후 반드시 기록)
- `docs/docs.md` — 단계별 실습 가이드
- `docs/learning.md` — 개념 학습 정리
