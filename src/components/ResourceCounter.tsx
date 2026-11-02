import Icon from './Icon';

interface ResourceCounterProps {
  stars?: number;
  diamonds?: number;
}

export default function ResourceCounter({ stars = 120, diamonds = 45 }: ResourceCounterProps) {
  return (
    <div className="resource-counter">
      <div className="stat-badge star-badge">
        <Icon name="star" />
        <span className="stat-value">{stars}</span>
        <button className="add-btn">+</button>
      </div>

      <div className="stat-badge diamond-badge">
        <Icon name="diamond" />
        <span className="stat-value">{diamonds}</span>
        <button className="add-btn">+</button>
      </div>

      <button className="settings-btn" aria-label="Settings">
        <Icon name="settings" />
      </button>
    </div>
  );
}
