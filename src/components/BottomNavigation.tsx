import homeIcon from '../assets/home.png';
import mapIcon from '../assets/map.png';
import trophyIcon from '../assets/trophy.png';
import materiIcon from '../assets/materi.png';
import profilIcon from '../assets/profil.png';

interface BottomNavigationProps {
  activeTab: string;
  onChangeTab: (tab: string) => void;
}

export default function BottomNavigation({ activeTab, onChangeTab }: BottomNavigationProps) {
  const navItems = [
    { id: 'beranda', label: 'Beranda', icon: homeIcon },
    { id: 'peta', label: 'Peta', icon: mapIcon },
    { id: 'prestasi', label: 'Prestasi', icon: trophyIcon },
    { id: 'materi', label: 'Materi', icon: materiIcon },
    { id: 'profil', label: 'Profil', icon: profilIcon },
  ];

  return (
    <nav className="bottom-navigation">
      {navItems.map((item) => (
        <button
          key={item.id}
          className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
          onClick={() => onChangeTab(item.id)}
        >
          <img src={item.icon} alt={item.label} className="nav-icon-img" />
          <span className="nav-label">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}