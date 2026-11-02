export type ShapeKind = 'segitiga' | 'persegi' | 'persegi-panjang' | 'lingkaran';

export interface ShapeMeta {
  label: string;
  fill: string;
  stroke: string;
  tint: string; // warna latar lembut untuk baris jawaban
}

export const SHAPE_META: Record<ShapeKind, ShapeMeta> = {
  segitiga: { label: 'Segitiga', fill: '#ffcf33', stroke: '#c98f00', tint: '#ffe58a' },
  persegi: { label: 'Persegi', fill: '#2f8cff', stroke: '#124fa8', tint: '#cfe5ff' },
  'persegi-panjang': { label: 'Persegi Panjang', fill: '#3ec96a', stroke: '#1b8a3e', tint: '#cdf3d7' },
  lingkaran: { label: 'Lingkaran', fill: '#ff5c8a', stroke: '#b81f4d', tint: '#ffd3e0' },
};
