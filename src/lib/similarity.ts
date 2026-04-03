// 한글 유사도 매칭 - 자모 분해 기반 Levenshtein distance

function decomposeHangul(char: string): string[] {
  const code = char.charCodeAt(0);
  if (code < 0xAC00 || code > 0xD7A3) return [char];
  const base = code - 0xAC00;
  const cho = Math.floor(base / (21 * 28));
  const jung = Math.floor((base % (21 * 28)) / 28);
  const jong = base % 28;
  const choList = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
  const jungList = ['ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ','ㅖ','ㅗ','ㅘ','ㅙ','ㅚ','ㅛ','ㅜ','ㅝ','ㅞ','ㅟ','ㅠ','ㅡ','ㅢ','ㅣ'];
  const jongList = ['','ㄱ','ㄲ','ㄳ','ㄴ','ㄵ','ㄶ','ㄷ','ㄹ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ','ㅁ','ㅂ','ㅄ','ㅅ','ㅆ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
  const result = [choList[cho], jungList[jung]];
  if (jong > 0) result.push(jongList[jong]);
  return result;
}

function toJamo(str: string): string {
  return str.split('').flatMap(decomposeHangul).join('');
}

function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

export function isSimilarEnough(input: string, answer: string, aliases: string[] = []): boolean {
  const normalize = (s: string) => s.trim().replace(/\s/g, '').toLowerCase();
  const inputN = normalize(input);
  const candidates = [answer, ...aliases].map(normalize);

  for (const candidate of candidates) {
    if (inputN === candidate) return true;
    // 자모 분해 유사도
    const inputJamo = toJamo(inputN);
    const candidateJamo = toJamo(candidate);
    const dist = levenshtein(inputJamo, candidateJamo);
    const maxLen = Math.max(inputJamo.length, candidateJamo.length);
    if (maxLen === 0) return true;
    const similarity = 1 - dist / maxLen;
    if (similarity >= 0.75) return true;
  }
  return false;
}
