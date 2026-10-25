export default function PlayerProfile() {
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
        <span className="user-name">Rizki</span>
        <div className="xp-bar-container">
          <div className="xp-bar-fill" style={{ width: '60%' }} />
        </div>
        <span className="level-text">Level 3</span>
      </div>
    </div>
  );
}