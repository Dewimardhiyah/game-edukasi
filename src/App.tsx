import { Preferences } from '@capacitor/preferences';
import { useEffect, useState } from 'react';

import LivesBar from './components/LivesBar';
import GameHeader from './components/GameHeader';
import DailyMission from './components/DailyMission';
import AdventureScene from './components/AdventureScene';
import BottomNavigation from './components/BottomNavigation';
import MapScene from './components/MapScene';
import ComingSoonScene from './components/ComingSoonScene';
import LevelDetailScene from './components/LevelDetailScene';
import ExploreScene from './components/ExploreScene';
import QuizScene from './components/QuizScene';
import ResultScene from './components/ResultScene';

import { getLevelConfig, TOTAL_LEVELS } from './data/levels';
import { calcResult, xpToLevel } from './utils/scoring';
import { TAB_SCREENS } from './types';
import type { ExploreOutcome, LevelResult, QuizOutcome, Screen, Wallet } from './types';

import './App.css';

const MISSION_TARGET = 3;

const MAX_LIVES = 3;
const PROGRESS_KEY = 'game-edukasi-progress';
const PROGRESS_VERSION = 3;
const LEGACY_INITIAL_XP = 260;

interface PlayerProgress {
  version: typeof PROGRESS_VERSION;
  levelStars: Record<number, number>;
  wallet: Wallet;
  missionDone: number;
}

interface StoredPlayerProgress {
  version?: number;
  levelStars: Record<number, number>;
  wallet: Wallet & { diamonds?: number };
  missionDone: number;
}

const INITIAL_PROGRESS: PlayerProgress = {
  version: PROGRESS_VERSION,
  levelStars: {},
  wallet: { stars: 0, coins: 0, xp: 0 },
  missionDone: 1,
};

function isPlayerProgress(value: unknown): value is StoredPlayerProgress {
  if (typeof value !== 'object' || value === null) return false;
  const progress = value as Record<string, unknown>;
  const wallet = progress.wallet;
  const levelStars = progress.levelStars;

  if (
    (progress.version !== undefined &&
      progress.version !== 1 &&
      progress.version !== PROGRESS_VERSION) ||
    typeof progress.missionDone !== 'number' ||
    !Number.isInteger(progress.missionDone) ||
    progress.missionDone < 0 ||
    progress.missionDone > MISSION_TARGET ||
    typeof wallet !== 'object' ||
    wallet === null ||
    typeof levelStars !== 'object' ||
    levelStars === null ||
    Array.isArray(levelStars)
  ) {
    return false;
  }

  const storedWallet = wallet as Record<string, unknown>;
  if (!['stars', 'coins', 'xp'].every(
    (key) => typeof storedWallet[key] === 'number' && Number.isFinite(storedWallet[key]),
  )) {
    return false;
  }

  if (
    storedWallet.diamonds !== undefined &&
    (typeof storedWallet.diamonds !== 'number' || !Number.isFinite(storedWallet.diamonds))
  ) {
    return false;
  }

  return Object.entries(levelStars).every(([level, stars]) =>
    Number.isInteger(Number(level)) &&
    Number(level) >= 1 &&
    Number(level) <= TOTAL_LEVELS &&
    typeof stars === 'number' &&
    Number.isInteger(stars) &&
    stars >= 0 &&
    stars <= 3,
  );
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('beranda');
  const [progress, setProgress] = useState<PlayerProgress>(INITIAL_PROGRESS);
  const [progressLoaded, setProgressLoaded] = useState(false);
  const { levelStars, wallet, missionDone } = progress;


  // Sesi level yang sedang dimainkan
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [exploreOutcome, setExploreOutcome] = useState<ExploreOutcome | null>(null);
  const [result, setResult] = useState<LevelResult | null>(null);
  const [lives, setLives] = useState(MAX_LIVES);
  const [attempt, setAttempt] = useState(0); // naik setiap level diulang -> scene di-mount ulang

  useEffect(() => {
    let active = true;

    const loadProgress = async () => {
      try {
        const { value } = await Preferences.get({ key: PROGRESS_KEY });
        if (value !== null) {
          const parsed: unknown = JSON.parse(value);
          if (isPlayerProgress(parsed)) {
            const needsMigration = parsed.version !== PROGRESS_VERSION;
            const migratedProgress: PlayerProgress = {
              ...parsed,
              version: PROGRESS_VERSION,
              wallet: {
                stars: Object.values(parsed.levelStars).reduce((total, stars) => total + stars, 0),
                coins: parsed.wallet.coins,
                xp: needsMigration
                  ? Math.max(
                    0,
                    parsed.wallet.xp -
                      (parsed.version === undefined || parsed.version === 1 ? LEGACY_INITIAL_XP : 0),
                  )
                  : parsed.wallet.xp,
              },
            };
            if (active) setProgress(migratedProgress);
            if (needsMigration) {
              try {
                await Preferences.set({
                  key: PROGRESS_KEY,
                  value: JSON.stringify(migratedProgress),
                });
              } catch (error) {
                console.error('Gagal memperbarui progres permainan.', error);
              }
            }
          } else {
            console.error('Data progres tersimpan tidak valid.');
          }
        }
      } catch (error) {
        console.error('Gagal memuat progres permainan.', error);
      } finally {
        if (active) setProgressLoaded(true);
      }
    };

    void loadProgress();
    return () => {
      active = false;
    };
  }, []);

  const config = getLevelConfig(selectedLevel);
  const isTabScreen = TAB_SCREENS.includes(screen);
  const { level: playerLevel, percent: xpPercent } = xpToLevel(wallet.xp);

  /* ---------- Alur: Peta -> Detail -> Eksplorasi -> Soal -> Hasil ---------- */

  const handleSelectLevel = (level: number) => {
    setSelectedLevel(level);
    setScreen('detail');
  };

  const handleStartLevel = () => {
    setExploreOutcome(null);
    setLives(MAX_LIVES);
    setAttempt((n) => n + 1);
    setScreen('explore');
  };

  const handleExploreComplete = (outcome: ExploreOutcome) => {
    setExploreOutcome(outcome);
    setScreen('quiz');
  };

  const handleWrongAnswer = () => setLives((remaining) => Math.max(0, remaining - 1));

  const handleQuizComplete = async (quiz: QuizOutcome) => {
    const outcome: ExploreOutcome = exploreOutcome ?? {
      shapes: 0,
      shapesTotal: config.explore.shapes.length,
      coins: 0,
    };
    const r = calcResult(selectedLevel, outcome, quiz);
    const previousBest = levelStars[selectedLevel] ?? 0;
    const nextLevelStars = {
      ...levelStars,
      [selectedLevel]: Math.max(previousBest, r.stars),
    };
    const nextProgress: PlayerProgress = {
      ...progress,
      levelStars: nextLevelStars,
      wallet: {
        ...wallet,
        stars: Object.values(nextLevelStars).reduce((total, stars) => total + stars, 0),
        coins: wallet.coins + r.coins,
        xp: wallet.xp + r.xp,
      },
      missionDone: r.stars === 3
        ? Math.min(MISSION_TARGET, missionDone + 1)
        : missionDone,
    };

    setProgress(nextProgress);
    try {
      await Preferences.set({
        key: PROGRESS_KEY,
        value: JSON.stringify(nextProgress),
      });
    } catch (error) {
      console.error('Gagal menyimpan progres permainan.', error);
    }
    setResult(r);
    setScreen('hasil');
  };

  const handleContinue = () => {
    if (result && result.stars < 2) return;
    const next = Math.min(TOTAL_LEVELS, selectedLevel + 1);
    setSelectedLevel(next);
    setScreen('detail');
  };

  /* ---------- Render ---------- */

  if (!progressLoaded) {
    return <div className="mobile-container">Memuat progres permainan...</div>;
  }

  return (
    <div
      className={`mobile-container ${screen === 'peta' ? 'mobile-container--map' : ''} ${
        isTabScreen ? '' : 'mobile-container--game'
      }`}
    >
      {isTabScreen && (
        <>
          <GameHeader
            stars={wallet.stars}
            coins={wallet.coins}
            playerLevel={playerLevel}
            xpPercent={xpPercent}
          />
          <DailyMission current={missionDone} target={MISSION_TARGET} />

          <main className="main-viewport">
            {screen === 'beranda' && <AdventureScene onStartAdventure={() => setScreen('peta')} />}
            {screen === 'peta' && <MapScene levelStars={levelStars} onSelectLevel={handleSelectLevel} />}
            {screen === 'prestasi' && <ComingSoonScene title="Prestasi" />}
            {screen === 'materi' && <ComingSoonScene title="Materi" />}
            {screen === 'profil' && <ComingSoonScene title="Profil" />}
          </main>

          <BottomNavigation activeTab={screen} onChangeTab={(tab) => setScreen(tab as Screen)} />
        </>
      )}

      {screen === 'detail' && (
        <LevelDetailScene
          config={config}
          bestStars={levelStars[selectedLevel] ?? 0}
          walletStars={wallet.stars}
          walletCoins={wallet.coins}
          onBack={() => setScreen('peta')}
          onStart={handleStartLevel}
        />
      )}

      {screen === 'explore' && (
        <ExploreScene
          key={`explore-${attempt}`}
          config={config}
          onExit={() => setScreen('peta')}
          onComplete={handleExploreComplete}
        />
      )}

      {screen === 'quiz' && (
        <QuizScene
          key={`quiz-${attempt}`}
          config={config}
          lives={lives}
          maxLives={MAX_LIVES}
          onWrongAnswer={handleWrongAnswer}
          onExit={() => setScreen('peta')}
          onComplete={handleQuizComplete}
        />
      )}

      {screen === 'quiz' && lives === 0 && (
        <div className="gameover-overlay">
          <div className="gameover-card" role="dialog" aria-modal="true" aria-labelledby="gameover-title">
            <LivesBar lives={0} max={MAX_LIVES} />
            <h2 id="gameover-title">Nyawa habis!</h2>
            <p>Mulai lagi permainan level ini untuk mencoba kembali.</p>
            <button type="button" className="gameover-card__button gameover-card__button--retry" onClick={handleStartLevel}>
              Main Lagi
            </button>
            <button type="button" className="gameover-card__button gameover-card__button--map" onClick={() => setScreen('peta')}>
              Kembali ke Peta
            </button>
          </div>
        </div>
      )}

      {screen === 'hasil' && result && (
        <ResultScene
          result={result}
          hasNext={selectedLevel < TOTAL_LEVELS}
          onContinue={handleContinue}
          onRetry={handleStartLevel}
          onMap={() => setScreen('peta')}
        />
      )}
    </div>
  );
}
