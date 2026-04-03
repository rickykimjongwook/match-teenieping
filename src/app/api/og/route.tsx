import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const score = Number(searchParams.get('score') ?? 0);
  const total = Number(searchParams.get('total') ?? 5);
  const difficulty = searchParams.get('difficulty') ?? '쉬움';
  const pct = Math.round((score / total) * 100);

  const emoji =
    pct === 100 ? '🏆' : pct >= 80 ? '🌟' : pct >= 60 ? '😊' : pct >= 40 ? '😅' : '😢';

  const dotRow = Array.from({ length: total }, (_, i) => (
    <span
      key={i}
      style={{ fontSize: 28, marginRight: 4 }}
    >
      {i < score ? '🟢' : '🔴'}
    </span>
  ));

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #fce7f3 0%, #ede9fe 100%)',
          fontFamily: 'sans-serif',
          padding: 60,
        }}
      >
        {/* 타이틀 */}
        <div style={{ fontSize: 36, fontWeight: 900, color: '#db2777', marginBottom: 8 }}>
          매치 티니핑!
        </div>
        <div style={{ fontSize: 20, color: '#6b7280', marginBottom: 32 }}>
          {difficulty} 모드
        </div>

        {/* 점수 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            marginBottom: 24,
          }}
        >
          <span style={{ fontSize: 100, fontWeight: 900, color: '#1f2937', lineHeight: 1 }}>
            {pct}
          </span>
          <span style={{ fontSize: 40, color: '#6b7280', marginLeft: 4 }}>%</span>
          <span style={{ fontSize: 60, marginLeft: 16 }}>{emoji}</span>
        </div>

        {/* 서브 텍스트 */}
        <div style={{ fontSize: 22, color: '#4b5563', marginBottom: 28 }}>
          {total}문제 중 {score}개 정답
        </div>

        {/* 결과 점들 */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 4 }}>
          {dotRow}
        </div>

        {/* 하단 CTA */}
        <div
          style={{
            marginTop: 40,
            padding: '12px 32px',
            background: '#ec4899',
            borderRadius: 9999,
            color: 'white',
            fontSize: 22,
            fontWeight: 700,
          }}
        >
          나도 도전해보기 →
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
