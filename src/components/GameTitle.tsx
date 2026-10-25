import judulImg from '../assets/judul.png';

export default function GameTitle() {
  return (
    <div className="game-title-container">
      <img src={judulImg} alt="Petualangan Bangun Datar" className="game-title-img" />
    </div>
  );
}