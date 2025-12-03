import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Feed } from './components/Feed';
import { Tracker } from './components/Tracker';
import { Leaderboard } from './components/Leaderboard';
import { Profile } from './components/Profile';
import { AICoach } from './components/AICoach';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('feed');

  const renderContent = () => {
    switch (activeTab) {
      case 'feed':
        return <Feed />;
      case 'tracker':
        return <Tracker />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'profile':
        return <Profile />;
      case 'coach':
        return <AICoach />;
      default:
        return <Feed />;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-red-500/30">
      <div className="max-w-md mx-auto min-h-screen bg-zinc-950 relative shadow-2xl shadow-black">
        <main className="min-h-screen">
            {renderContent()}
        </main>
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
};

export default App;