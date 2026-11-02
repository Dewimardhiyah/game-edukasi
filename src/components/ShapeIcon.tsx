import { SHAPE_META } from '../data/shapes';
import type { ShapeKind } from '../data/shapes';

interface ShapeIconProps {
  kind: ShapeKind;
  size?: number;
  muted?: boolean; // abu-abu (belum dikumpulkan)
  className?: string;
}

/** Ikon bentuk dasar berupa SVG, dipakai di HUD, kuis, dan hasil. */
export default function ShapeIcon({ kind, size = 28, muted = false, className = '' }: ShapeIconProps) {
  const meta = SHAPE_META[kind];
  const fill = muted ? '#c3ccd6' : meta.fill;
  const stroke = muted ? '#98a4b1' : meta.stroke;

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 32 32"
      role="img"
      aria-label={meta.label}
    >
      {kind === 'segitiga' && <polygon points="16,4 29,27 3,27" fill={fill} stroke={stroke} strokeWidth="2" strokeLinejoin="round" />}
      {kind === 'persegi' && <rect x="5" y="5" width="22" height="22" rx="3" fill={fill} stroke={stroke} strokeWidth="2" />}
      {kind === 'persegi-panjang' && <rect x="2" y="8" width="28" height="16" rx="3" fill={fill} stroke={stroke} strokeWidth="2" />}
      {kind === 'lingkaran' && <circle cx="16" cy="16" r="12" fill={fill} stroke={stroke} strokeWidth="2" />}
    </svg>
  );
}
