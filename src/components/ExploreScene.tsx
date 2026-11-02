import { useCallback, useEffect, useRef, useState } from 'react';
import type { MouseEvent as ReactMouseEvent, PointerEvent as ReactPointerEvent } from 'react';

import playerImg from '../assets/maskot.png';
import backgroundImg from '../assets/bg2.jpeg';

import { ExploreEngine } from '../game/exploreEngine';
import type { LevelConfig } from '../data/levels';
import type { ExploreOutcome } from '../types';

import PauseButton from './PauseButton';
import PauseModal from './PauseModal';
import ShapeIcon from './ShapeIcon';

import '../styles/ui.css';
import '../styles/explore-scene.css';

interface ExploreSceneProps {
  config: LevelConfig;
  onExit: () => void;
  onComplete: (outcome: ExploreOutcome) => void;
}

const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Gagal memuat ${src}`));
    img.src = src;
  });

type HoldButton = 'left' | 'right';

export default function ExploreScene({ config, onExit, onComplete }: ExploreSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<ExploreEngine | null>(null);
  const coinsRef = useRef(0);
  const shapesRef = useRef(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const shapes = config.explore.shapes;
  const [collected, setCollected] = useState<boolean[]>(() => shapes.map(() => false));
  const [coins, setCoins] = useState(0);
  const [paused, setPaused] = useState(false);
  const [toast, setToast] = useState<{ id: number; text: string } | null>(null);
  const [loadError, setLoadError] = useState(false);

  const showToast = useCallback((text: string) => setToast({ id: Date.now(), text }), []);

  // Toast hilang otomatis
  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 2400);
    return () => window.clearTimeout(t);
  }, [toast]);

  // Siapkan mesin game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let cancelled = false;
    let observer: ResizeObserver | null = null;

    Promise.all([loadImage(playerImg), loadImage(backgroundImg)])
      .then(([player, background]) => {
        if (cancelled) return;
        const engine = new ExploreEngine(
          canvas,
          config.explore,
          { player, background },
          {
            onCollectShape: (kind, count) => {
              shapesRef.current = count;
              // tandai slot HUD pertama dengan jenis yang sama yang belum terisi
              setCollected((prev) => {
                const next = [...prev];
                const idx = shapes.findIndex((s, i) => s.kind === kind && !next[i]);
                if (idx >= 0) next[idx] = true;
                return next;
              });
            },
            onCollectCoin: (total) => {
              coinsRef.current = total;
              setCoins(total);
            },
            onHazard: () => showToast('Awas duri! Kembali ke checkpoint.'),
            onCheckpoint: () => showToast('Checkpoint tersimpan'),
            onGoalBlocked: (missing) => showToast(`Masih ada ${missing} bentuk yang belum terkumpul`),
            onGoal: () => {
              showToast('Kamu sampai di tantangan!');
              window.setTimeout(() => {
                onCompleteRef.current({
                  shapes: shapesRef.current,
                  shapesTotal: shapes.length,
                  coins: coinsRef.current,
                });
              }, 900);
            },
          },
        );
        engineRef.current = engine;
        engine.start();
        showToast('Gunakan tombol ← → untuk bergerak dan ↑ untuk melompat');

        observer = new ResizeObserver(() => engine.resize());
        observer.observe(canvas);
      })
      .catch(() => setLoadError(true));

    return () => {
      cancelled = true;
      observer?.disconnect();
      engineRef.current?.stop();
      engineRef.current = null;
    };
    // config tidak berubah selama scene hidup (App memakai key untuk mengulang)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Jeda
  useEffect(() => {
    engineRef.current?.setPaused(paused);
  }, [paused]);

  // Keyboard (desktop)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const e1 = engineRef.current;
      if (!e1 || e.repeat) return;
      if (e.key === 'ArrowLeft' || e.key === 'a') e1.setLeft(true);
      else if (e.key === 'ArrowRight' || e.key === 'd') e1.setRight(true);
      else if (e.key === 'ArrowUp' || e.key === 'w' || e.key === ' ') {
        e.preventDefault();
        e1.pressJump();
      }
    };
    const up = (e: KeyboardEvent) => {
      const e1 = engineRef.current;
      if (!e1) return;
      if (e.key === 'ArrowLeft' || e.key === 'a') e1.setLeft(false);
      else if (e.key === 'ArrowRight' || e.key === 'd') e1.setRight(false);
    };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, []);

  const hold = (button: HoldButton, value: boolean) => {
    if (button === 'left') engineRef.current?.setLeft(value);
    else engineRef.current?.setRight(value);
  };

  const holdProps = (button: HoldButton) => ({
    onPointerDown: (e: ReactPointerEvent<HTMLButtonElement>) => {
      e.currentTarget.setPointerCapture(e.pointerId);
      hold(button, true);
    },
    onPointerUp: () => hold(button, false),
    onPointerCancel: () => hold(button, false),
    onLostPointerCapture: () => hold(button, false),
    onContextMenu: (e: ReactMouseEvent) => e.preventDefault(),
  });

  const count = collected.filter(Boolean).length;

  return (
    <section className="game-screen explore-scene" aria-label="Eksplorasi dan kumpulkan bentuk">
      <canvas ref={canvasRef} className="explore-scene__canvas" aria-label="Area permainan" />

      <header className="explore-scene__hud">
        <PauseButton onClick={() => setPaused(true)} />
        <span className="game-chip"><span aria-hidden="true">🪙</span>{coins}</span>
      </header>

      <div className="explore-scene__goal" role="status" aria-live="polite">
        <p className="explore-scene__goal-title">Kumpulkan semua bentuk!</p>
        <div className="explore-scene__slots">
          {shapes.map((s, i) => (
            <ShapeIcon key={i} kind={s.kind} size={26} muted={!collected[i]} />
          ))}
          <span className="explore-scene__count">{count}/{shapes.length}</span>
        </div>
      </div>

      {toast && (
        <p key={toast.id} className="explore-scene__toast" role="status">{toast.text}</p>
      )}

      {loadError && (
        <p className="explore-scene__error">Gambar permainan gagal dimuat. Muat ulang halaman.</p>
      )}

      <div className="explore-scene__controls">
        <div className="explore-scene__dpad">
          <button type="button" className="game-pad" aria-label="Gerak ke kiri" {...holdProps('left')}>
            <svg width="30" height="30" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 4 7 12l8 8" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button type="button" className="game-pad" aria-label="Gerak ke kanan" {...holdProps('right')}>
            <svg width="30" height="30" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 4 8 8-8 8" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
        <button
          type="button"
          className="game-pad game-pad--jump"
          aria-label="Lompat"
          onPointerDown={() => engineRef.current?.pressJump()}
          onContextMenu={(e) => e.preventDefault()}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 15 12 7l8 8" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>

      {paused && <PauseModal onResume={() => setPaused(false)} onExit={onExit} />}
    </section>
  );
}
