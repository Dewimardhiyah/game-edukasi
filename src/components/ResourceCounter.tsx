import Icon from './Icon';

export default function ResourceCounter() {
  return (
    <div className="resource-counter">
      <div className="stat-badge star-badge">
        <Icon name="star" />
        <span className="stat-value">120</span>
        <button className="add-btn">+</button>
      </div>

      <div className="stat-badge diamond-badge">
        <Icon name="diamond" />
        <span className="stat-value">45</span>
        <button className="add-btn">+</button>
      </div>

      <button className="settings-btn" aria-label="Settings">
        <Icon name="settings" />
      </button>
    </div>
  );
}