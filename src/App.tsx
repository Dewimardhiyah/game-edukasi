import { useState } from 'react';

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

export default function App() {
  const [screen, setScreen] = useState<Screen>('beranda');

  // Progres pemain
  const [levelStars, setLevelStars] = useState<Record<number, number>>({});
  const [wallet, setWallet] = useState<Wallet>({ stars: 120, diamonds: 45, coins: 0, xp: 260 });
  const [missionDone, setMissionDone] = useState(1);

  // Sesi level yang sedang dimainkan
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [exploreOutcome, setExploreOutcome] = useState<ExploreOutcome | null>(null);
  const [result, setResult] = useState<LevelResult | null>(null);
  const [attempt, setAttempt] = useState(0); // naik setiap level diulang -> scene di-mount ulang

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

  const handleQuizComplete = (quiz: QuizOutcome) => {
    const outcome: ExploreOutcome = exploreOutcome ?? {
      shapes: 0,
      shapesTotal: config.explore.shapes.length,
      coins: 0,
    };
    const r = calcResult(selectedLevel, outcome, quiz);
    const previousBest = levelStars[selectedLevel] ?? 0;

    setLevelStars((s) => ({ ...s, [selectedLevel]: Math.max(previousBest, r.stars) }));
    setWallet((w) => ({
      ...w,
      stars: w.stars + Math.max(0, r.stars - previousBest), // hanya bintang baru yang dihitung
      coins: w.coins + r.coins,
      xp: w.xp + r.xp,
    }));
    if (r.stars === 3) setMissionDone((m) => Math.min(MISSION_TARGET, m + 1));

    setResult(r);
    setScreen('hasil');
  };

  const handleContinue = () => {
    const next = Math.min(TOTAL_LEVELS, selectedLevel + 1);
    setSelectedLevel(next);
    setScreen('detail');
  };

  /* ---------- Render ---------- */

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
