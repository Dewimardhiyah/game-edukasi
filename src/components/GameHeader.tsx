import PlayerProfile from './PlayerProfile';
import ResourceCounter from './ResourceCounter';

interface GameHeaderProps {
  stars: number;
  coins: number;
  playerLevel: number;
  xpPercent: number;
}

export default function GameHeader({ stars, coins, playerLevel, xpPercent }: GameHeaderProps) {
  return (
    <header className="game-header">
      <PlayerProfile level={playerLevel} xpPercent={xpPercent} />
      <ResourceCounter stars={stars} coins={coins} />
    </header>
  );
}
