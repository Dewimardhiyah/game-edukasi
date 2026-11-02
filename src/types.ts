/** Semua "layar" yang dikenal App.tsx. Lima yang pertama adalah tab navigasi bawah. */
export type Screen =
  | 'beranda'
  | 'peta'
  | 'prestasi'
  | 'materi'
  | 'profil'
  | 'detail'
  | 'explore'
  | 'quiz'
  | 'hasil';

export const TAB_SCREENS: Screen[] = ['beranda', 'peta', 'prestasi', 'materi', 'profil'];

/** Hasil fase Eksplorasi (Scene 4) */
export interface ExploreOutcome {
  shapes: number;
  shapesTotal: number;
  coins: number;
}

/** Hasil fase Soal (Scene 5) */
export interface QuizOutcome {
  firstTryCorrect: number; // benar pada percobaan pertama
  total: number;
  hintUsed: boolean;
}

/** Ringkasan akhir level (Scene 6) */
export interface LevelResult {
  level: number;
  score: number;
  stars: number; // 1-3
  coins: number;
  xp: number;
  correct: number;
  total: number;
  breakdown: { answers: number; explore: number; noHint: number };
}

export interface Wallet {
  stars: number;
  diamonds: number;
  coins: number;
  xp: number;
}
