import './LivesBar.css';

interface LivesBarProps {
  lives: number; // nyawa tersisa
  max?: number; // default 3
}

export default function LivesBar({ lives, max = 3 }: LivesBarProps) {
  return (
    <div className="lives-bar" aria-label={`Nyawa tersisa ${lives} dari ${max}`}>
      {Array.from({ length: max }, (_, i) => {
        const alive = i < lives;
        return (
          <svg
            key={i}
            className={`lives-bar__heart ${alive ? 'is-alive' : 'is-lost'}`}
            viewBox="0 0 24 24"
            width="28"
            height="28"
            aria-hidden="true"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        );
      })}
    </div>
  );
}
