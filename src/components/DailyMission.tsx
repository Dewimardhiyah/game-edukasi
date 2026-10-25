import Icon from './Icon';

export default function DailyMission() {
  return (
    <section className="daily-mission-card">
      <div className="mission-icon">
        <Icon name="mission" />
      </div>
      <div className="mission-content">
        <div className="mission-title">Misi Hari Ini</div>
        <div className="mission-desc">Selesaikan 3 level dengan nilai sempurna</div>
        <div className="mission-progress-bar">
          <div className="mission-progress-fill" style={{ width: '33%' }} />
        </div>
      </div>
      <div className="mission-status">
        <span>1/3</span>
        <span className="chevron-icon">›</span>
      </div>
    </section>
  );
}