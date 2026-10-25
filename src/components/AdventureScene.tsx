import GameTitle from './GameTitle';
import Tombol from './Tombol';
import Icon from './Icon';
import ExplorerCharacter from './ExplorerCharacter';
import ExploreSign from './ExploreSign';

type AdventureSceneProps = {
  onStartAdventure?: () => void;
};

export default function AdventureScene({ onStartAdventure }: AdventureSceneProps) {
  return (
    <section className="adventure-scene" aria-label="Area Utama Game">
      <div className="adventure-scene__intro">
        <GameTitle />
        <Tombol
          className="adventure-scene__start"
          icon={<Icon name="play" />}
          onClick={onStartAdventure}
        >
          Mulai Petualangan
        </Tombol>
      </div>
      <ExplorerCharacter />
      <ExploreSign />
    </section>
  );
}