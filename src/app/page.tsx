'use client';

import { useState, useCallback } from 'react';
import {
  Difficulty,
  STAGE_COUNTS,
  easyTeeniepings,
  mediumTeeniepings,
  hardTeeniepings,
  extremeQuestions,
  Teenieping,
  PrincessQuestion,
} from '@/data/teenieping';
import { isSimilarEnough } from '@/lib/similarity';
import { shareKakao } from '@/lib/kakao';

type GamePhase = 'select' | 'playing' | 'result';

type Question = {
  image: string;
  answer: string;
  aliases: string[];
  displayName: string;
  choices: string[]; // 다지선다 보기 (극악은 빈 배열)
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// 난이도별 보기 수
const CHOICE_COUNT: Record<Difficulty, number> = {
  easy: 2,
  medium: 3,
  hard: 5,
  extreme: 0,
};

// 오답 보기 뽑기용 전체 풀
const allTeeniepings: Teenieping[] = [
  ...easyTeeniepings,
  ...hardTeeniepings, // medium은 easy를 포함하므로 중복 방지
];

function buildChoices(answer: string, count: number): string[] {
  const wrongs = shuffle(
    allTeeniepings.map((t) => t.name).filter((n) => n !== answer)
  ).slice(0, count - 1);
  return shuffle([answer, ...wrongs]);
}

function buildQuestions(difficulty: Difficulty): Question[] {
  const count = STAGE_COUNTS[difficulty];
  const choiceCount = CHOICE_COUNT[difficulty];

  if (difficulty === 'extreme') {
    return shuffle(extremeQuestions)
      .slice(0, count)
      .map((q: PrincessQuestion) => ({
        image: q.image,
        answer: q.answer,
        aliases: q.aliases,
        displayName: q.princess,
        choices: [],
      }));
  }

  const pool: Teenieping[] =
    difficulty === 'easy'
      ? easyTeeniepings
      : difficulty === 'medium'
      ? mediumTeeniepings
      : hardTeeniepings;

  return shuffle(pool)
    .slice(0, count)
    .map((t: Teenieping) => ({
      image: t.image,
      answer: t.name,
      aliases: [],
      displayName: t.name,
      choices: buildChoices(t.name, choiceCount),
    }));
}

const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: '쉬움',
  medium: '중간',
  hard: '어려움',
  extreme: '극악',
};

const DIFFICULTY_DESC: Record<Difficulty, string> = {
  easy: '2지선다 · 5문제',
  medium: '3지선다 · 10문제',
  hard: '5지선다 · 15문제',
  extreme: '타이핑 · 15문제 (로미 프린세스)',
};

const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  easy: 'bg-green-100 border-green-400 hover:bg-green-200',
  medium: 'bg-yellow-100 border-yellow-400 hover:bg-yellow-200',
  hard: 'bg-orange-100 border-orange-400 hover:bg-orange-200',
  extreme: 'bg-red-100 border-red-400 hover:bg-red-200',
};

const DIFFICULTY_EMOJI: Record<Difficulty, string> = {
  easy: '😊',
  medium: '🙂',
  hard: '😤',
  extreme: '💀',
};

export default function Home() {
  const [phase, setPhase] = useState<GamePhase>('select');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [input, setInput] = useState('');
  const [results, setResults] = useState<boolean[]>([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);

  const startGame = useCallback((diff: Difficulty) => {
    setDifficulty(diff);
    const qs = buildQuestions(diff);
    setQuestions(qs);
    setCurrent(0);
    setInput('');
    setResults([]);
    setShowAnswer(false);
    setSelectedChoice(null);
    setPhase('playing');
  }, []);

  const handleAnswer = useCallback(
    (answer: string) => {
      if (showAnswer) return;
      const q = questions[current];
      const correct =
        difficulty === 'extreme'
          ? isSimilarEnough(answer, q.answer, q.aliases)
          : answer === q.answer;
      const newResults = [...results, correct];
      setResults(newResults);
      setSelectedChoice(answer);
      setShowAnswer(true);

      setTimeout(() => {
        if (current + 1 >= questions.length) {
          setPhase('result');
        } else {
          setCurrent(current + 1);
          setInput('');
          setShowAnswer(false);
          setSelectedChoice(null);
        }
      }, 1200);
    },
    [questions, current, results, showAnswer, difficulty]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleAnswer(input);
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(window.location.origin).then(() => {
      alert('게임 주소가 복사되었습니다! 친구들에게 공유해보세요 🎉');
    });
  };

  // ── 난이도 선택 ──────────────────────────────────────
  if (phase === 'select') {
    return (
      <main className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-100 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="text-6xl mb-3">🌟</div>
            <h1 className="text-4xl font-black text-pink-600 mb-2">매치 티니핑!</h1>
            <p className="text-gray-500">티니핑 이미지를 보고 이름을 맞춰보세요</p>
          </div>
          <div className="space-y-3">
            {(['easy', 'medium', 'hard', 'extreme'] as Difficulty[]).map((diff) => (
              <button
                key={diff}
                onClick={() => startGame(diff)}
                className={`w-full p-4 rounded-2xl border-2 text-left transition-all active:scale-95 ${DIFFICULTY_COLORS[diff]}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xl font-bold text-gray-800">
                      {DIFFICULTY_EMOJI[diff]} {DIFFICULTY_LABELS[diff]}
                    </span>
                    <p className="text-sm text-gray-500 mt-0.5">{DIFFICULTY_DESC[diff]}</p>
                  </div>
                  <span className="text-gray-400 font-bold">→</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>
    );
  }

  // ── 게임 진행 ──────────────────────────────────────
  if (phase === 'playing') {
    const q = questions[current];
    const isExtreme = difficulty === 'extreme';
    const lastResult = results[results.length - 1];

    return (
      <main className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-100 flex flex-col items-center p-4">
        <div className="max-w-sm w-full pt-4">
          {/* 헤더 */}
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => setPhase('select')}
              className="text-gray-400 hover:text-gray-600 text-sm px-2 py-1"
            >
              ← 나가기
            </button>
            <span className="text-sm font-medium text-gray-600">
              {current + 1} / {questions.length}
            </span>
            <span className="text-sm text-pink-600 font-bold">
              {DIFFICULTY_EMOJI[difficulty]} {DIFFICULTY_LABELS[difficulty]}
            </span>
          </div>

          {/* 진행 바 */}
          <div className="w-full bg-pink-200 rounded-full h-2 mb-5">
            <div
              className="bg-pink-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(current / questions.length) * 100}%` }}
            />
          </div>

          {/* 이미지 카드 */}
          <div className="bg-white rounded-3xl shadow-md p-5 mb-4">
            {isExtreme && (
              <p className="text-center text-xs text-gray-400 mb-2">
                {q.displayName} — 합체한 티니핑은?
              </p>
            )}
            <div className="w-full flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={q.image}
                alt={isExtreme ? '로미 프린세스' : '티니핑'}
                className="max-w-[220px] max-h-[220px] w-full h-auto object-contain rounded-2xl"
              />
            </div>
          </div>

          {/* 다지선다 보기 */}
          {!isExtreme && (
            <div
              className={`grid gap-2 mb-4 ${
                q.choices.length === 2
                  ? 'grid-cols-2'
                  : q.choices.length === 3
                  ? 'grid-cols-3'
                  : 'grid-cols-2 sm:grid-cols-3'
              }`}
            >
              {q.choices.map((choice) => {
                const isSelected = selectedChoice === choice;
                const isCorrect = choice === q.answer;
                let btnClass =
                  'py-3 px-2 rounded-2xl font-bold text-base transition-all active:scale-95 border-2 ';

                if (!showAnswer) {
                  btnClass += 'bg-white border-pink-200 hover:border-pink-400 hover:bg-pink-50 text-gray-800';
                } else if (isCorrect) {
                  btnClass += 'bg-green-100 border-green-500 text-green-800';
                } else if (isSelected && !isCorrect) {
                  btnClass += 'bg-red-100 border-red-400 text-red-700';
                } else {
                  btnClass += 'bg-gray-50 border-gray-200 text-gray-400';
                }

                return (
                  <button
                    key={choice}
                    onClick={() => handleAnswer(choice)}
                    disabled={showAnswer}
                    className={btnClass}
                  >
                    {showAnswer && isCorrect && '✅ '}
                    {showAnswer && isSelected && !isCorrect && '❌ '}
                    {choice}
                  </button>
                );
              })}
            </div>
          )}

          {/* 극악 타이핑 입력 */}
          {isExtreme && (
            <div className="space-y-3 mb-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="합체한 티니핑 이름을 입력하세요"
                disabled={showAnswer}
                className="w-full px-4 py-3 rounded-2xl border-2 border-pink-300 focus:border-pink-500 focus:outline-none text-center text-lg bg-white disabled:bg-gray-50 disabled:text-gray-400"
                autoFocus
              />
              {showAnswer ? (
                <div
                  className={`text-center py-3 rounded-2xl font-bold text-lg ${
                    lastResult ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}
                >
                  {lastResult ? `정답! 🎉 ${q.answer}` : `오답 😢 정답: ${q.answer}`}
                </div>
              ) : (
                <button
                  onClick={() => handleAnswer(input)}
                  disabled={!input.trim()}
                  className="w-full py-3 bg-pink-500 hover:bg-pink-600 active:bg-pink-700 disabled:bg-pink-200 text-white rounded-2xl font-bold text-lg transition-colors"
                >
                  확인
                </button>
              )}
            </div>
          )}

          {/* 결과 점 */}
          <div className="flex gap-1 flex-wrap justify-center">
            {results.map((r, i) => (
              <span key={i} className="text-base">
                {r ? '🟢' : '🔴'}
              </span>
            ))}
          </div>
        </div>
      </main>
    );
  }

  // ── 결과 화면 ──────────────────────────────────────
  const score = results.filter(Boolean).length;
  const total = results.length;
  const pct = Math.round((score / total) * 100);

  const getResultEmoji = () => {
    if (pct === 100) return '🏆';
    if (pct >= 80) return '🌟';
    if (pct >= 60) return '😊';
    if (pct >= 40) return '😅';
    return '😢';
  };

  const getResultMsg = () => {
    if (pct === 100) return '완벽해요! 티니핑 박사!';
    if (pct >= 80) return '아주 잘했어요!';
    if (pct >= 60) return '꽤 잘했어요!';
    if (pct >= 40) return '조금 더 연습해봐요!';
    return '티니핑을 더 공부해봐요!';
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-sm w-full bg-white rounded-3xl shadow-lg p-8 text-center">
        <div className="text-6xl mb-3">{getResultEmoji()}</div>
        <h2 className="text-2xl font-bold text-pink-600 mb-1">{getResultMsg()}</h2>
        <div className="text-6xl font-black text-gray-800 my-4">
          {pct}
          <span className="text-2xl font-bold text-gray-400">%</span>
        </div>
        <p className="text-gray-500 mb-1">
          {total}문제 중 <span className="font-bold text-pink-600">{score}개</span> 정답
        </p>
        <p className="text-sm text-gray-400 mb-5">
          {DIFFICULTY_EMOJI[difficulty]} {DIFFICULTY_LABELS[difficulty]} 모드
        </p>

        <div className="flex gap-1 justify-center mb-6 flex-wrap">
          {results.map((r, i) => (
            <span key={i} className="text-xl">
              {r ? '🟢' : '🔴'}
            </span>
          ))}
        </div>

        <div className="space-y-3">
          <button
            onClick={() => startGame(difficulty)}
            className="w-full py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-2xl font-bold text-lg transition-colors"
          >
            다시 도전
          </button>
          <button
            onClick={() => setPhase('select')}
            className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-2xl font-bold transition-colors"
          >
            난이도 선택
          </button>
          <button
            onClick={copyUrl}
            className="w-full py-3 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-2xl font-bold transition-colors"
          >
            🔗 친구에게 공유하기
          </button>
          <button
            onClick={() => shareKakao(score, total, DIFFICULTY_LABELS[difficulty])}
            className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-2xl font-bold transition-colors md:hidden"
          >
            💬 카카오톡으로 공유
          </button>
        </div>
      </div>
    </main>
  );
}
