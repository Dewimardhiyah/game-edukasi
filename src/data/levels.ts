import type { ShapeKind } from './shapes';
import { BANK, LEVEL_TITLES } from './bankSoal';
import { PULAU1_META, PULAU1_QUESTIONS } from './pulau1';

/* ============ Tipe ============ */

export interface ChoiceOption {
  id: string;
  label: string;
  correct: boolean;
  shape?: ShapeKind; // ikon bentuk di sisi kiri (mode list)
  emoji?: string; // emoji benda (cadangan jika tidak ada gambar)
  image?: string; // gambar benda dari src/assets (mode grid)
}

export interface QuizQuestion {
  id: string;
  type: 'single' | 'multi';
  layout: 'list' | 'grid';
  prompt: string;
  visual?: { emoji?: string; shape?: ShapeKind; image?: string };
  options: ChoiceOption[];
  optionsImageOnly?: boolean;
  explanation: string; // muncul setelah menjawab (benar maupun salah)
}

export interface Platform { x: number; y: number; w: number }
export interface Point { x: number; y: number }
export interface Spike { x: number; y: number; w: number }
export interface ShapeItem { kind: ShapeKind; x: number; y: number }

/** Peta level Eksplorasi. Dunia berlebar tetap WORLD_W, naik ke atas (y kecil = tinggi). */
export interface ExploreLevel {
  worldHeight: number;
  start: Point;
  platforms: Platform[]; // platforms[0] = tanah
  shapes: ShapeItem[];
  coins: Point[];
  spikes: Spike[];
  checkpoints: Point[];
  goal: Point;
}

export interface LevelConfig {
  number: number;
  title: string;
  subtitle: string;
  goal: string;
  duration: string;
  explore: ExploreLevel;
  questions: QuizQuestion[];
}

/* ============ Konstanta dunia ============ */

export const WORLD_W = 360;
export const TOTAL_LEVELS = 15;

const ISLAND_NAMES = [
  'Pulau Bentuk',
  'Hutan Segi Empat',
  'Pegunungan Segitiga',
  'Danau Lingkaran',
  'Kastil Geometri',
];
export const islandNameOf = (level: number) =>
  ISLAND_NAMES[Math.min(ISLAND_NAMES.length - 1, Math.floor((level - 1) / 3))];

/* ============ Peta Eksplorasi: Level 1 ============ */

const LEVEL1_EXPLORE: ExploreLevel = {
  worldHeight: 1400,
  start: { x: 60, y: 1340 },
  platforms: [
    { x: 0, y: 1340, w: 360 }, // tanah
    { x: 40, y: 1250, w: 100 },
    { x: 200, y: 1170, w: 110 },
    { x: 60, y: 1080, w: 100 },
    { x: 210, y: 990, w: 110 },
    { x: 30, y: 900, w: 110 },
    { x: 180, y: 815, w: 100 },
    { x: 30, y: 730, w: 100 },
    { x: 190, y: 645, w: 110 },
    { x: 60, y: 560, w: 100 },
    { x: 210, y: 475, w: 100 },
    { x: 70, y: 390, w: 110 },
    { x: 200, y: 305, w: 100 },
    { x: 100, y: 215, w: 160 }, // platform bendera
  ],
  shapes: [
    { kind: 'segitiga', x: 255, y: 1138 },
    { kind: 'persegi', x: 265, y: 958 },
    { kind: 'lingkaran', x: 230, y: 783 },
    { kind: 'persegi-panjang', x: 110, y: 528 },
    { kind: 'segitiga', x: 250, y: 273 },
  ],
  coins: [
    { x: 90, y: 1220 }, { x: 110, y: 1050 }, { x: 85, y: 870 }, { x: 100, y: 700 },
    { x: 240, y: 615 }, { x: 260, y: 445 }, { x: 150, y: 360 }, { x: 150, y: 185 },
  ],
  spikes: [
    { x: 34, y: 730, w: 28 }, // di ujung jauh: hanya kena jika melompat kelewatan
    { x: 74, y: 390, w: 28 },
  ],
  checkpoints: [
    { x: 60, y: 900 },
    { x: 90, y: 560 },
  ],
  goal: { x: 190, y: 215 },
};

/** Cermin kiri-kanan supaya Level 2 terasa baru tanpa menggambar ulang peta. */
function mirror(level: ExploreLevel, kinds: ShapeKind[]): ExploreLevel {
  const mx = (x: number, w = 0) => WORLD_W - x - w;
  return {
    ...level,
    start: { x: mx(level.start.x), y: level.start.y },
    platforms: level.platforms.map((p) => ({ ...p, x: mx(p.x, p.w) })),
    shapes: level.shapes.map((s, i) => ({ kind: kinds[i], x: mx(s.x), y: s.y })),
    coins: level.coins.map((c) => ({ x: mx(c.x), y: c.y })),
    spikes: level.spikes.map((s) => ({ ...s, x: mx(s.x, s.w) })),
    checkpoints: level.checkpoints.map((c) => ({ x: mx(c.x), y: c.y })),
    goal: { x: mx(level.goal.x), y: level.goal.y },
  };
}

/* ============ Konfigurasi level ============ */

/** Varian peta: ganti jenis bentuk yang dikumpulkan, dan/atau cerminkan kiri-kanan. */
function variant(level: ExploreLevel, kinds: ShapeKind[], flip: boolean): ExploreLevel {
  if (flip) return mirror(level, kinds);
  return { ...level, shapes: level.shapes.map((s, i) => ({ ...s, kind: kinds[i] })) };
}

/** Peta eksplorasi Pulau 1: Level 1 asli, Level 2-6 adalah variasinya. */
const PULAU1_EXPLORE: Record<number, ExploreLevel> = {
  1: LEVEL1_EXPLORE,
  2: variant(LEVEL1_EXPLORE, ['segitiga', 'persegi-panjang', 'segitiga', 'persegi-panjang', 'segitiga'], true),
  3: variant(LEVEL1_EXPLORE, ['lingkaran', 'persegi-panjang', 'segitiga', 'lingkaran', 'persegi-panjang'], false),
  4: variant(LEVEL1_EXPLORE, ['persegi', 'segitiga', 'persegi-panjang', 'lingkaran', 'persegi'], true),
  5: variant(LEVEL1_EXPLORE, ['lingkaran', 'segitiga', 'persegi', 'lingkaran', 'persegi-panjang'], false),
  6: variant(LEVEL1_EXPLORE, ['segitiga', 'persegi', 'lingkaran', 'persegi-panjang', 'lingkaran'], true),
};

/* ============ Konfigurasi level ============ */

/* ============ Soal dari bank ============ */

/** Pengacak deterministik: urutan pilihan selalu sama untuk soal yang sama. */
function seededShuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = seed * 9301 + 49297;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function bankQuestions(level: number): QuizQuestion[] {
  return (BANK[level] ?? []).map(([no, prompt, correct, wrong]) => {
    const labels = seededShuffle([correct, ...wrong], no);
    return {
      id: `${level}-${no}`,
      type: 'single',
      layout: 'list',
      prompt,
      options: labels.map((label, i) => ({ id: 'abcd'[i], label, correct: label === correct })),
      explanation: `Jawaban yang benar: ${correct}.`,
    } as QuizQuestion;
  });
}

/** Level 4-15 mengambil lima soal yang disiapkan khusus untuk tiap level. */
export function getLevelConfig(level: number): LevelConfig {
  const firstOriginalLevel = level * 2 - 1;
  const secondOriginalLevel = level * 2;
  const isFirstIsland = level <= 3;
  const firstTitle = LEVEL_TITLES[firstOriginalLevel] ?? islandNameOf(level);
  const secondTitle = LEVEL_TITLES[secondOriginalLevel] ?? islandNameOf(level);
  const exploreLevel = isFirstIsland ? firstOriginalLevel : level % 2 === 1 ? 3 : 4;
  const questions = isFirstIsland
    ? [...PULAU1_QUESTIONS[level]]
    : bankQuestions(level);

  return {
    number: level,
    title: `Level ${level}`,
    subtitle: isFirstIsland ? PULAU1_META[firstOriginalLevel].subtitle : firstTitle,
    goal: isFirstIsland
      ? `${PULAU1_META[firstOriginalLevel].goal} ${PULAU1_META[secondOriginalLevel].goal}`
      : `Selesaikan tantangan: ${firstTitle} dan ${secondTitle}.`,
    duration: '5-7 menit',
    explore: PULAU1_EXPLORE[exploreLevel],
    questions,
  };
}
