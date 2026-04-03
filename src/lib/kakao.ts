declare global {
  interface Window {
    Kakao: {
      isInitialized: () => boolean;
      init: (key: string | undefined) => void;
      Share: {
        sendDefault: (options: KakaoShareOptions) => void;
      };
    };
  }
}

interface KakaoShareOptions {
  objectType: string;
  content: {
    title: string;
    description: string;
    imageUrl: string;
    link: { mobileWebUrl: string; webUrl: string };
  };
  buttons: Array<{
    title: string;
    link: { mobileWebUrl: string; webUrl: string };
  }>;
  fail?: (err: unknown) => void;
}

export function shareKakao(score: number, total: number, difficulty: string) {
  const pct = Math.round((score / total) * 100);
  const url = window.location.origin;
  const imageUrl = `${url}/api/og?score=${score}&total=${total}&difficulty=${encodeURIComponent(difficulty)}`;

  if (!window.Kakao) {
    alert('카카오 SDK가 로드되지 않았습니다. 잠시 후 다시 시도해주세요.');
    return;
  }

  if (!window.Kakao.isInitialized()) {
    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
  }

  window.Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: `매치 티니핑! — ${pct}% 달성 🌟`,
      description: `${difficulty} 모드에서 ${total}문제 중 ${score}개 맞혔어요! 너도 도전해봐~`,
      imageUrl,
      link: { mobileWebUrl: url, webUrl: url },
    },
    buttons: [
      {
        title: '나도 도전하기',
        link: { mobileWebUrl: url, webUrl: url },
      },
    ],
    fail: (err) => {
      console.error('[Kakao Share 오류]', err);
      alert(`공유 오류가 발생했습니다.\n에러 내용: ${JSON.stringify(err)}`);
    },
  });
}
