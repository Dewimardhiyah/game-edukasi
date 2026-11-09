interface PlayerProfileProps {
  level: number;
  xpPercent: number;
}

export default function PlayerProfile({ level, xpPercent }: PlayerProfileProps) {
  return (
    <div className="player-profile">
      <div className="avatar-wrapper">
        <img
          src="https://api.dicebear.com/7.x/bottts/svg?seed=Rizki"
          alt="Avatar Rizki"
          className="avatar-img"
        />
      </div>
      <div className="profile-info">
        <span className="role-label">Siswa</span>
        <span className="user-name">Dewi</span>
        <div className="xp-bar-container">
          <div className="xp-bar-fill" style={{ width: `${xpPercent}%` }} />
        </div>
        <span className="level-text">Level {level}</span>
      </div>
    </div>
  );
}
