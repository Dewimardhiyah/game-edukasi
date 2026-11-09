import { useState } from 'react';
import type { CSSProperties } from 'react';

import type { ChoiceOption, LevelConfig, QuizQuestion } from '../data/levels';
import { SHAPE_META } from '../data/shapes';
import { POINTS } from '../utils/scoring';
import type { QuizOutcome } from '../types';

import GameButton from './GameButton';
import PauseButton from './PauseButton';
import PauseModal from './PauseModal';
import ShapeIcon from './ShapeIcon';

import '../styles/ui.css';
import '../styles/quiz-scene.css';

interface QuizSceneProps {
  config: LevelConfig;
  onExit: () => void;
  onComplete: (outcome: QuizOutcome) => void;
}

type Phase = 'answering' | 'correct' | 'wrong';

const isAnswerCorrect = (q: QuizQuestion, selected: string[]) => {
  const correctIds = q.options.filter((o) => o.correct).map((o) => o.id);
  return correctIds.length === selected.length && correctIds.every((id) => selected.includes(id));
};

export default function QuizScene({ config, onExit, onComplete }: QuizSceneProps) {
  const questions = config.questions;
  const total = questions.length;

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [phase, setPhase] = useState<Phase>('answering');
  const [failedBefore, setFailedBefore] = useState(false); // sudah pernah salah di soal ini
  const [removed, setRemoved] = useState<string[]>([]); // opsi yang disingkirkan petunjuk
  const [firstTry, setFirstTry] = useState(0);
  const [hintUsed, setHintUsed] = useState(false);
  const [paused, setPaused] = useState(false);

  const q = questions[index];
  const isLast = index === total - 1;
  const answering = phase === 'answering';

  const toggle = (opt: ChoiceOption) => {
    if (!answering || removed.includes(opt.id)) return;
    if (q.type === 'single') {
      setSelected([opt.id]);
    } else {
      setSelected((prev) => (prev.includes(opt.id) ? prev.filter((id) => id !== opt.id) : [...prev, opt.id]));
    }
  };

  const check = () => {
    if (isAnswerCorrect(q, selected)) {
      setPhase('correct');
      if (!failedBefore) setFirstTry((n) => n + 1);
    } else {
      setPhase('wrong');
      setFailedBefore(true);
    }
  };

  const retry = () => {
    setSelected([]);
    setPhase('answering');
  };

  const next = () => {
    if (isLast) {
      onComplete({ firstTryCorrect: firstTry, total, hintUsed });
      return;
    }
    setIndex((i) => i + 1);
    setSelected([]);
    setPhase('answering');
    setFailedBefore(false);
    setRemoved([]);
  };

  // Petunjuk: menyingkirkan satu jawaban salah (selalu menyisakan minimal satu pengecoh)
  const removable = q.options.filter((o) => !o.correct && !removed.includes(o.id));
  const canHint = answering && removable.length > 1;
  const useHint = () => {
    if (!canHint) return;
    const pick = removable[0];
    setRemoved((r) => [...r, pick.id]);
    setSelected((s) => s.filter((id) => id !== pick.id));
    setHintUsed(true);
  };

  const optionState = (opt: ChoiceOption) => {
    const isSelected = selected.includes(opt.id);
    if (removed.includes(opt.id)) return 'removed';
    if (phase === 'correct' && opt.correct) return 'correct';
    if (phase === 'wrong' && isSelected) return opt.correct ? 'correct' : 'wrong';
    if (isSelected) return 'selected';
    return 'idle';
  };

  const renderMark = (state: string) => {
    if (state === 'selected' || state === 'correct') return <span className="quiz-option__mark" aria-hidden="true">✓</span>;
    if (state === 'wrong') return <span className="quiz-option__mark" aria-hidden="true">✕</span>;
    return null;
  };

  const progress = ((index + (phase === 'correct' ? 1 : 0)) / total) * 100;

  return (
    <section className="game-screen quiz-scene" aria-label="Soal tantangan">
      <header className="quiz-scene__top">
        <PauseButton onClick={() => setPaused(true)} />
        <div className="quiz-scene__progress" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={index + (phase === 'correct' ? 1 : 0)}>
          <div className="quiz-scene__progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="quiz-scene__count">{index + 1}/{total}</span>
      </header>

      <div className="quiz-scene__body">
        <div className="quiz-card">
          <h1 className="quiz-card__prompt">{q.prompt}</h1>
          {q.type === 'multi' && <p className="quiz-card__note">Boleh memilih lebih dari satu jawaban.</p>}

          {q.visual && (
            <div className="quiz-card__visual" aria-hidden="true">
              {q.visual.image && <img className="quiz-card__img" src={q.visual.image} alt="" draggable={false} />}
              {q.visual.emoji && <span className="quiz-card__emoji">{q.visual.emoji}</span>}
              {q.visual.shape && <ShapeIcon kind={q.visual.shape} size={96} />}
            </div>
          )}

          <div
            className={`quiz-options quiz-options--${q.layout} ${q.optionsImageOnly ? 'quiz-options--image-only' : ''}`}
            role={q.type === 'multi' ? 'group' : 'radiogroup'}
          >
            {q.options.map((opt) => {
              const state = optionState(opt);
              const tone = opt.shape ? `quiz-option--tone-${opt.shape}` : '';
              return (
                <button
                  key={opt.id}
                  type="button"
                  className={`quiz-option quiz-option--${q.layout} quiz-option--${state} ${tone} ${
                    q.optionsImageOnly ? 'quiz-option--image-only' : ''
                  }`}
                  style={opt.shape ? ({ '--tone': SHAPE_META[opt.shape].tint } as CSSProperties) : undefined}
                  onClick={() => toggle(opt)}
                  disabled={state === 'removed' || !answering}
                  aria-pressed={selected.includes(opt.id)}
                  aria-label={q.optionsImageOnly ? opt.label : undefined}
                >
                  {opt.image && <img className="quiz-option__img" src={opt.image} alt="" draggable={false} />}
                  {!opt.image && opt.emoji && <span className="quiz-option__emoji" aria-hidden="true">{opt.emoji}</span>}
                  {opt.shape && <ShapeIcon kind={opt.shape} size={q.optionsImageOnly ? 64 : 28} className="quiz-option__shape" />}
                  {!q.optionsImageOnly && <span className="quiz-option__label">{opt.label}</span>}
                  {renderMark(state)}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <footer className="quiz-scene__footer">
        {phase !== 'answering' && (
          <div className={`quiz-feedback quiz-feedback--${phase}`} role="status">
            <strong>
              {phase === 'correct'
                ? failedBefore
                  ? 'Benar! Kali ini tanpa poin.'
                  : `Hebat! +${POINTS.correctAnswer} poin`
                : 'Belum tepat, coba lagi ya.'}
            </strong>
            <p>{q.explanation}</p>
          </div>
        )}

        <div className="quiz-scene__actions">
          <button type="button" className="quiz-hint" onClick={useHint} disabled={!canHint} aria-label="Pakai petunjuk">
            <span aria-hidden="true">💡</span>
            <span>Petunjuk</span>
          </button>
          {answering && (
            <GameButton variant="green" onClick={check} disabled={selected.length === 0}>Periksa</GameButton>
          )}
          {phase === 'wrong' && <GameButton variant="yellow" onClick={retry}>Coba Lagi</GameButton>}
          {phase === 'correct' && (
            <GameButton variant="green" onClick={next}>{isLast ? 'Lihat Hasil' : 'Lanjut'}</GameButton>
          )}
        </div>
      </footer>

      {paused && <PauseModal onResume={() => setPaused(false)} onExit={onExit} />}
    </section>
  );
}
