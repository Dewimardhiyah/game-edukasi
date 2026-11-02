import backgroundImg from '../assets/bg.png.jpeg';
import mascotImg from '../assets/maskot.png';

import BackButton from './BackButton';
import GameButton from './GameButton';
import Stars from './Stars';
import type { LevelConfig } from '../data/levels';

import '../styles/ui.css';
import '../styles/detail-scene.css';

interface LevelDetailSceneProps {
  config: LevelConfig;
  bestStars: number; // bintang terbaik di level ini (0 = belum pernah main)
  walletStars: number;
  walletCoins: number;
  onBack: () => void;
  onStart: () => void;
}

export default function LevelDetailScene({
  config,
  bestStars,
  walletStars,
  walletCoins,
  onBack,
  onStart,
}: LevelDetailSceneProps) {
  return (
    <section className="game-screen detail-scene" aria-label={`Detail ${config.title}`}>
      <img className="detail-scene__bg" src={backgroundImg} alt="" draggable={false} />

      <header className="detail-scene__top">
        <BackButton onClick={onBack} label="Kembali ke peta" />
        <div className="detail-scene__chips">
          <span className="game-chip"><span aria-hidden="true">⭐</span>{walletStars}</span>
          <span className="game-chip"><span aria-hidden="true">🪙</span>{walletCoins}</span>
        </div>
      </header>

      <div className="detail-scene__heading">
        <h1 className="game-ribbon">{config.title}</h1>
        <p className="detail-scene__subtitle">{config.subtitle}</p>
      </div>

      <div className="detail-scene__card">
        <p className="detail-scene__goal-label">Tujuan:</p>
        <p className="detail-scene__goal">{config.goal}</p>
        <Stars value={bestStars} size={38} className="detail-scene__stars" />
        <ul className="detail-scene__facts">
          <li><span aria-hidden="true">⏱️</span>{config.duration}</li>
          <li><span aria-hidden="true">🎯</span>{config.questions.length} soal</li>
        </ul>
      </div>

      <img className="detail-scene__mascot" src={mascotImg} alt="Maskot Segitiga siap berpetualang" draggable={false} />

      <div className="detail-scene__action">
        <GameButton variant="yellow" block onClick={onStart}>Mulai</GameButton>
      </div>
    </section>
  );
}
