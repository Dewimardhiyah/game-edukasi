import GameButton from './GameButton';

interface PauseModalProps {
  onResume: () => void;
  onExit: () => void;
}

/** Dipakai oleh Eksplorasi dan Soal. */
export default function PauseModal({ onResume, onExit }: PauseModalProps) {
  return (
    <div className="game-modal-backdrop" role="dialog" aria-modal="true" aria-label="Permainan dijeda">
      <div className="game-modal">
        <h2 className="game-modal__title">Dijeda</h2>
        <p className="game-modal__text">Progres level ini belum tersimpan kalau kamu keluar.</p>
        <GameButton variant="green" block onClick={onResume}>Lanjutkan</GameButton>
        <GameButton variant="white" block onClick={onExit}>Keluar ke peta</GameButton>
      </div>
    </div>
  );
}
