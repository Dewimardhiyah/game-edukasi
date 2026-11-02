import type { ExploreOutcome, LevelResult, QuizOutcome } from '../types';

/** Sesuai tabel "Ringkasan Rule & Scoring" di storyboard. */
export const POINTS = {
  correctAnswer: 100, // jawaban benar pada percobaan pertama
  collectible: 10, // per bentuk yang dikumpulkan
  noHintBonus: 50, // tidak memakai petunjuk sama sekali
} as const;

export const XP_PER_CORRECT = 20; // 5 benar = +100 XP
export const COINS_PER_STAR = 5; // hadiah koin tambahan per bintang

export function calcResult(
  level: number,
  explore: ExploreOutcome,
  quiz: QuizOutcome,
): LevelResult {
  const answers = quiz.firstTryCorrect * POINTS.correctAnswer;
  const exploreBonus = explore.shapes * POINTS.collectible;
  const noHint = quiz.hintUsed ? 0 : POINTS.noHintBonus;
  const score = answers + exploreBonus + noHint;

  const maxScore =
    quiz.total * POINTS.correctAnswer +
    explore.shapesTotal * POINTS.collectible +
    POINTS.noHintBonus;
  const ratio = maxScore > 0 ? score / maxScore : 0;

  // Menyelesaikan level selalu menghasilkan minimal 1 bintang
  const stars = ratio >= 0.9 ? 3 : ratio >= 0.6 ? 2 : 1;

  return {
    level,
    score,
    stars,
    coins: explore.coins + stars * COINS_PER_STAR,
    xp: quiz.firstTryCorrect * XP_PER_CORRECT,
    correct: quiz.firstTryCorrect,
    total: quiz.total,
    breakdown: { answers, explore: exploreBonus, noHint },
  };
}

/** XP total -> level pemain & persentase bar (100 XP per level). */
export function xpToLevel(xp: number) {
  return { level: Math.floor(xp / 100) + 1, percent: xp % 100 };
}
