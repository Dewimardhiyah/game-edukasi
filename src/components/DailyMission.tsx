import Icon from './Icon';

interface DailyMissionProps {
  current?: number;
  target?: number;
}

export default function DailyMission({ current = 1, target = 3 }: DailyMissionProps) {
  const percent = Math.min(100, (current / target) * 100);
  return (
    <section className="daily-mission-card">
      <div className="mission-icon">
        <Icon name="mission" />
      </div>
      <div className="mission-content">
        <div className="mission-title">Misi Hari Ini</div>
        <div className="mission-desc">Selesaikan {target} level dengan nilai sempurna</div>
        <div className="mission-progress-bar">
          <div className="mission-progress-fill" style={{ width: `${percent}%` }} />
        </div>
      </div>
      <div className="mission-status">
        <span>{current}/{target}</span>
        <span className="chevron-icon">›</span>
      </div>
    </section>
  );
}
