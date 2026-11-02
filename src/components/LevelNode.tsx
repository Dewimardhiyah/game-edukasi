import React from 'react';

export type LevelStatus = 'completed' | 'unlocked' | 'locked';

interface LevelNodeProps {
  level: number;
  status: LevelStatus;
  stars?: number; // 0-3, ditampilkan di atas node yang sudah selesai
  onClick?: (level: number) => void;
  style?: React.CSSProperties;
}

export default function LevelNode({
  level,
  status,
  stars = 0,
  onClick,
  style,
}: LevelNodeProps) {
  return (
    <button
      type="button"
      className={`level-node level-node--${status}`}
      style={style}
      disabled={status === 'locked'}
      onClick={() => onClick?.(level)}
      aria-label={
        status === 'locked'
          ? `Level ${level} terkunci`
          : `Level ${level}${status === 'completed' ? `, ${stars} bintang` : ''}`
      }
    >
      {status === 'completed' && (
        <span className="level-node__stars" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span key={i} className={i < stars ? 'is-on' : 'is-off'}>★</span>
          ))}
        </span>
      )}

      {status === 'locked' && (
        <span className="level-lock">🔒</span>
      )}

      <span>{level}</span>
    </button>
  );
}
