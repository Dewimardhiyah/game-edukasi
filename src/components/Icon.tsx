interface IconProps {
  name: string;
  className?: string;
}

export default function Icon({ name, className = '' }: IconProps) {
  const icons: Record<string, string> = {
    star: '⭐',
    diamond: '💎',
    coin: '🪙',
    settings: '⚙️',
    mission: '📋',
    play: '▶',
  };

  return <span className={`game-icon ${className}`}>{icons[name] || ''}</span>;
}