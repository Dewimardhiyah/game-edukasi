import Icon from './Icon';

interface ResourceCounterProps {
  stars: number;
  coins: number;
}

export default function ResourceCounter({ stars, coins }: ResourceCounterProps) {
  return (
    <div className="resource-counter">
      <div className="stat-badge star-badge" aria-label={`${stars} bintang`}>
        <Icon name="star" />
        <span className="stat-value">{stars}</span>
        <button className="add-btn">+</button>
      </div>

      <div className="stat-badge diamond-badge" aria-label={`${coins} koin`}>
        <Icon name="coin" />
        <span className="stat-value">{coins}</span>
        <button className="add-btn">+</button>
      </div>

      <button className="settings-btn" aria-label="Settings">
        <Icon name="settings" />
      </button>
    </div>
  );
}
