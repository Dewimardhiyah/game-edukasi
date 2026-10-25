import maskotImg from '../assets/maskot.png';

export default function ExplorerCharacter() {
  return (
    <div className="character-area">
      <img src={maskotImg} alt="Maskot Segitiga" className="mascot-img" />
    </div>
  );
}