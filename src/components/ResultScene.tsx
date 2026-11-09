import mascotImg from '../assets/maskot.png';
import backgroundImg from '../assets/bg2.jpeg';

import GameButton from './GameButton';
import Stars from './Stars';
import { POINTS } from '../utils/scoring';
import type { LevelResult } from '../types';

import '../styles/ui.css';
import '../styles/result-scene.css';

interface ResultSceneProps {
  result: LevelResult;
  hasNext: boolean;
  onContinue: () => void;
  onRetry: () => void;
  onMap: () => void;
}

// Posisi confetti tetap (tanpa Math.random) supaya render stabil
const CONFETTI = [
  { left: 6, delay: 0.0, color: '#ff5c8a' }, { left: 16, delay: 0.5, color: '#ffd23f' },
  { left: 27, delay: 0.2, color: '#3ec96a' }, { left: 38, delay: 0.8, color: '#2f8cff' },
  { left: 49, delay: 0.1, color: '#ffd23f' }, { left: 60, delay: 0.6, color: '#ff5c8a' },
  { left: 71, delay: 0.3, color: '#2f8cff' }, { left: 82, delay: 0.9, color: '#3ec96a' },
  { left: 93, delay: 0.4, color: '#ffd23f' },
];

export default function ResultScene({ result, hasNext, onContinue, onRetry, onMap }: ResultSceneProps) {
  const { breakdown } = result;
  const mustRetry = result.stars === 1;

  return (
    <section className="game-screen result-scene" aria-label="Hasil level">
      <img className="result-scene__bg" src={backgroundImg} alt="" draggable={false} />
      <div className="result-scene__confetti" aria-hidden="true">
        {CONFETTI.map((c, i) => (
          <span key={i} style={{ left: `${c.left}%`, animationDelay: `${c.delay}s`, background: c.color }} />
        ))}
      </div>

      <div className="result-scene__hero">
        <Stars value={result.stars} size={64} animate className="result-scene__stars" />
        <h1 className="game-ribbon game-ribbon--lg">Level Selesai!</h1>
        <img className="result-scene__mascot" src={mascotImg} alt="Maskot Segitiga merayakan" draggable={false} />
      </div>

      <div className="result-card">
        <dl className="result-card__grid">
          <div className="result-card__stat">
            <dt><span aria-hidden="true">⭐</span> Skor</dt>
            <dd>{result.score}</dd>
          </div>
          <div className="result-card__stat">
            <dt><span aria-hidden="true">🪙</span> Koin</dt>
            <dd>{result.coins}</dd>
          </div>
          <div className="result-card__stat">
            <dt><span aria-hidden="true">✨</span> XP</dt>
            <dd>+{result.xp}</dd>
          </div>
          <div className="result-card__stat result-card__stat--answers">
            <dt><span aria-hidden="true">✅</span> Jawaban</dt>
            <dd>{result.correct} benar / {result.total}</dd>
          </div>
        </dl>

        <ul className="result-card__breakdown">
          <li><span>Jawaban benar ({POINTS.correctAnswer}/soal)</span><b>+{breakdown.answers}</b></li>
          <li><span>Bonus eksplorasi</span><b>+{breakdown.explore}</b></li>
          <li><span>Bonus tanpa petunjuk</span><b>+{breakdown.noHint}</b></li>
        </ul>
      </div>

      <div className="result-scene__actions">
        {mustRetry ? (
          <>
            <p className="result-scene__retry-note" role="status">
              Dapatkan minimal 2 bintang untuk membuka level berikutnya.
            </p>
            <GameButton variant="green" block onClick={onRetry}>Ulangi level</GameButton>
          </>
        ) : (
          <>
            <GameButton variant="green" block onClick={hasNext ? onContinue : onMap}>
              {hasNext ? 'Lanjutkan' : 'Kembali ke Peta'}
            </GameButton>
            <GameButton variant="white" block onClick={onRetry}>Ulangi level</GameButton>
          </>
        )}
        {hasNext && !mustRetry && (
          <button type="button" className="result-scene__link" onClick={onMap}>Kembali ke peta</button>
        )}
      </div>
    </section>
  );
}
