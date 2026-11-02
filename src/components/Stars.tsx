interface StarsProps {
  value: number; // jumlah bintang terisi
  max?: number;
  size?: number;
  animate?: boolean; // munculkan satu per satu (layar hasil)
  className?: string;
}

const STAR_POINTS = '16,2 20.2,11.2 30,12.3 22.7,19 24.8,28.8 16,23.8 7.2,28.8 9.3,19 2,12.3 11.8,11.2';

export default function Stars({ value, max = 3, size = 32, animate = false, className = '' }: StarsProps) {
  return (
    <div className={`stars ${className}`} role="img" aria-label={`${value} dari ${max} bintang`}>
      {Array.from({ length: max }, (_, i) => {
        const filled = i < value;
        return (
          <svg
            key={i}
            className={`stars__item ${filled ? 'stars__item--on' : 'stars__item--off'} ${animate && filled ? 'stars__item--pop' : ''}`}
            style={animate ? { animationDelay: `${0.25 + i * 0.28}s` } : undefined}
            width={size}
            height={size}
            viewBox="0 0 32 32"
            aria-hidden="true"
          >
            <polygon
              points={STAR_POINTS}
              fill={filled ? '#ffd23f' : '#9fb4c8'}
              stroke={filled ? '#d9951a' : '#7c93a8'}
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        );
      })}
    </div>
  );
}
