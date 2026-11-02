import type { LevelStatus } from '../components/LevelNode';

import island1 from '../assets/1_pulau.png';
import island2 from '../assets/2_pulau.png';
import island3 from '../assets/3_pulau.png';
import island4 from '../assets/4_pulau.png';
import island5 from '../assets/5_pulau.png';

export interface MapLevel {
  number: number;
  x: number; // % dari lebar kotak pulau
  y: number; // % dari tinggi kotak pulau
}

export interface MapIsland {
  id: number;
  image: string;
  side: 'left' | 'right'; // zig-zag
  levels: MapLevel[];
}

/* ---------- Pengaturan tata letak (sama untuk pulau 1-5) ---------- */
export const ISLAND_ASPECT = 0.86;   // tinggi / lebar kotak pulau (harus sama dengan CSS)
const MAX_ISLAND_W = 0.52;           // lebar pulau maksimum (% lebar peta)
const SIDE_MARGIN = 0.02;            // jarak pulau dari tepi layar
const LABEL_ROOM = 0.08;             // ruang label di atas pulau 1 (x tinggi pulau)
const MIN_STEP = 0.52;               // jarak antar pulau minimum (x tinggi pulau)

// Dua baris tiga level - posisi sama di semua pulau
const GRID: [number, number][] = [
  [25, 43], [50, 43], [75, 43],
  [25, 63], [50, 63], [75, 63],
];

const createLevels = (from: number): MapLevel[] =>
  GRID.map(([x, y], i) => ({
    number: from + i,
    x,
    y,
  }));

const images = [island1, island2, island3, island4, island5];

// Zig-zag: kiri, kanan, kiri, kanan, kiri. Level 1-6, 7-12, ... 25-30
export const mapIslands: MapIsland[] = images.map((image, i) => ({
  id: i + 1,
  image,
  side: i % 2 === 0 ? 'left' : 'right',
  levels: createLevels(i * 6 + 1),
}));

export interface IslandLayout {
  left: number;
  top: number;
  width: number;
  height: number;
}

/**
 * Hitung ukuran & posisi (px) semua pulau dari ukuran area peta.
 * Pulau dibuat sebesar mungkin supaya lima pulau muat tanpa scroll,
 * dengan jarak vertikal yang SAMA antar pulau 1-5.
 */
export function computeLayout(w: number, h: number) {
  const n = mapIslands.length;
  // tinggi pulau terbesar yang masih muat: h = ih * (LABEL_ROOM + 1 + (n-1)*MIN_STEP)
  const ihByHeight = h / (LABEL_ROOM + 1 + (n - 1) * MIN_STEP);
  const iw = Math.min(ihByHeight / ISLAND_ASPECT, w * MAX_ISLAND_W);
  const ih = iw * ISLAND_ASPECT;
  const firstTop = ih * LABEL_ROOM;
  const step = (h - ih - firstTop) / (n - 1); // sama untuk semua pulau
  const margin = w * SIDE_MARGIN;

  const islands: IslandLayout[] = mapIslands.map((island, i) => ({
    left: island.side === 'left' ? margin : w - margin - iw,
    top: firstTop + i * step,
    width: iw,
    height: ih,
  }));
  return { islands, iw, ih };
}

/**
 * Status level dihitung dari progres pemain:
 * sudah dimainkan -> 'completed', level 1 / setelah level yang selesai -> 'unlocked'.
 */
export function getLevelStatus(level: number, levelStars: Record<number, number>): LevelStatus {
  if (levelStars[level] !== undefined) return 'completed';
  if (level === 1 || levelStars[level - 1] !== undefined) return 'unlocked';
  return 'locked';
}
