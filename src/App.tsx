import { Preferences } from '@capacitor/preferences';
import { useEffect, useState } from 'react';

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
const PROGRESS_KEY = 'game-edukasi-progress';

interface PlayerProgress {
  levelStars: Record<number, number>;
  wallet: Wallet;
  missionDone: number;
}

const INITIAL_PROGRESS: PlayerProgress = {
  levelStars: {},
  wallet: { stars: 120, diamonds: 45, coins: 0, xp: 260 },
  missionDone: 1,
};

function isPlayerProgress(value: unknown): value is PlayerProgress {
  if (typeof value !== 'object' || value === null) return false;
  const progress = value as Record<string, unknown>;
  const wallet = progress.wallet;
  const levelStars = progress.levelStars;

  if (
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
  if (!['stars', 'diamonds', 'coins', 'xp'].every(
    (key) => typeof storedWallet[key] === 'number' && Number.isFinite(storedWallet[key]),
  )) {
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
  const [attempt, setAttempt] = useState(0); // naik setiap level diulang -> scene di-mount ulang

  useEffect(() => {
    let active = true;

    const loadProgress = async () => {
      try {
        const { value } = await Preferences.get({ key: PROGRESS_KEY });
        if (value !== null) {
          const parsed: unknown = JSON.parse(value);
          if (isPlayerProgress(parsed)) {
            if (active) setProgress(parsed);
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
    setAttempt((n) => n + 1);
    setScreen('explore');
  };

  const handleExploreComplete = (outcome: ExploreOutcome) => {
    setExploreOutcome(outcome);
    setScreen('quiz');
  };

  const handleQuizComplete = async (quiz: QuizOutcome) => {
    const outcome: ExploreOutcome = exploreOutcome ?? {
      shapes: 0,
      shapesTotal: config.explore.shapes.length,
      coins: 0,
    };
    const r = calcResult(selectedLevel, outcome, quiz);
    const previousBest = levelStars[selectedLevel] ?? 0;
    const nextProgress: PlayerProgress = {
      ...progress,
      levelStars: {
        ...levelStars,
        [selectedLevel]: Math.max(previousBest, r.stars),
      },
      wallet: {
        ...wallet,
        stars: wallet.stars + Math.max(0, r.stars - previousBest),
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
            diamonds={wallet.diamonds}
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
          onExit={() => setScreen('peta')}
          onComplete={handleQuizComplete}
        />
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
