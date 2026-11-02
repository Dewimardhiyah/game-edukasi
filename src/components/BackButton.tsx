interface BackButtonProps {
  onClick: () => void;
  label?: string;
}

export default function BackButton({ onClick, label = 'Kembali' }: BackButtonProps) {
  return (
    <button type="button" className="game-round-btn" onClick={onClick} aria-label={label}>
      <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M15 4 7 12l8 8" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
