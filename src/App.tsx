import { useState } from 'react';
import GameHeader from './components/GameHeader';
import DailyMission from './components/DailyMission';
import AdventureScene from './components/AdventureScene';
import BottomNavigation from './components/BottomNavigation';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('beranda');

  const handleStartAdventure = () => {
    // Belum masuk tahap aksi tombol
  };

  return (
    <div className="mobile-container">
      <GameHeader />
      <DailyMission />

      {/* Tampilan Utama Beranda */}
      <main className="main-viewport">
        <AdventureScene onStartAdventure={handleStartAdventure} />
      </main>

      {/* Navigasi Bawah (Hanya mengubah status aktif) */}
      <BottomNavigation activeTab={activeTab} onChangeTab={setActiveTab} />
    </div>
  );
}