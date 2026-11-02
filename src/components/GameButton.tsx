import type { ReactNode } from 'react';

interface GameButtonProps {
  variant?: 'yellow' | 'green' | 'white';
  onClick?: () => void;
  disabled?: boolean;
  block?: boolean;
  children: ReactNode;
}

export default function GameButton({ variant = 'yellow', onClick, disabled, block, children }: GameButtonProps) {
  return (
    <button
      type="button"
      className={`game-btn game-btn--${variant} ${block ? 'game-btn--block' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
