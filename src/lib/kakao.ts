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
}

export function shareKakao(score: number, total: number, difficulty: string) {
  const pct = Math.round((score / total) * 100);
  const url = window.location.origin;
  const imageUrl = `${url}/api/og?score=${score}&total=${total}&difficulty=${encodeURIComponent(difficulty)}`;

  if (!window.Kakao?.isInitialized()) {
    // SDK 미로드 시 fallback: 클립보드 복사
    navigator.clipboard.writeText(
      `매치 티니핑 ${difficulty} 모드: ${score}/${total}문제 (${pct}%) 🌟\n${url}`
    );
    alert('카카오톡을 불러오지 못했어요. 주소가 클립보드에 복사되었습니다!');
    return;
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
  });
}
