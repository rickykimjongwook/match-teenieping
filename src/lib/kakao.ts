export async function shareKakao(score: number, total: number, difficulty: string) {
  const pct = Math.round((score / total) * 100);
  const url = window.location.origin;
  const text = `매치 티니핑 ${difficulty} 모드\n${total}문제 중 ${score}개 정답 (${pct}%) 🌟\n나도 도전해봐!`;

  // 1순위: Web Share API (모바일 전체 앱 공유 시트)
  if (navigator.share) {
    try {
      await navigator.share({ title: '매치 티니핑!', text, url });
      return;
    } catch {
      // 사용자가 공유 취소 시 아무 것도 하지 않음
      return;
    }
  }

  // 2순위 (PC 등 Web Share 미지원): 클립보드 복사
  try {
    await navigator.clipboard.writeText(`${text}\n${url}`);
    alert('주소가 복사되었습니다! 카카오톡에 붙여넣기 해보세요 🎉');
  } catch {
    alert(`공유 텍스트:\n${text}\n${url}`);
  }
}
