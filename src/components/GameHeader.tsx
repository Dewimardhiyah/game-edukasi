import PlayerProfile from './PlayerProfile';
import ResourceCounter from './ResourceCounter';

interface GameHeaderProps {
  stars?: number;
  diamonds?: number;
  playerLevel?: number;
  xpPercent?: number;
}

export default function GameHeader({ stars, diamonds, playerLevel, xpPercent }: GameHeaderProps) {
  return (
    <header className="game-header">
      <PlayerProfile level={playerLevel} xpPercent={xpPercent} />
      <ResourceCounter stars={stars} diamonds={diamonds} />
    </header>
  );
}
