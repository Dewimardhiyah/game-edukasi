interface PauseButtonProps {
  onClick: () => void;
}

export default function PauseButton({ onClick }: PauseButtonProps) {
  return (
    <button type="button" className="game-round-btn game-round-btn--blue" onClick={onClick} aria-label="Jeda">
      <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="5" y="4" width="5" height="16" rx="1.5" fill="currentColor" />
        <rect x="14" y="4" width="5" height="16" rx="1.5" fill="currentColor" />
      </svg>
    </button>
  );
}
