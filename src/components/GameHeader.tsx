import PlayerProfile from './PlayerProfile';
import ResourceCounter from './ResourceCounter';

export default function GameHeader() {
  return (
    <header className="game-header">
      <PlayerProfile />
      <ResourceCounter />
    </header>
  );
}