
import React, { useState } from 'react';
import { Github } from 'lucide-react';
import Modal from './components/EventModal';
import NotificationContainer from './components/NotificationContainer';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import LogPanel from './components/LogPanel';
import SetupScreen from './components/SetupScreen';
import RecruitModal from './components/RecruitModal';
import GameOverScreen from './components/GameOverScreen';
import { useGameLogic } from './hooks/useGameLogic';

const App: React.FC = () => {
  const {
    gameState,
    setGameState,
    setupForm,
    setSetupForm,
    startGame,
    handleActionClick,
    endWeek,
    onEventOptionClick,
    recruitStudent,
    upgradeCoach,
    upgradeFacility,
    dismissStudent,
    renameStudent,
    removeNotification
  } = useGameLogic();

  const [showRecruitModal, setShowRecruitModal] = useState(false);

  const Footer = () => (
    <footer className="py-1 text-center text-slate-500 text-xs bg-slate-100 border-t border-slate-200 z-[60] relative shrink-0">
      <a 
        href="https://github.com/Lyricus233/OIboss" 
        target="_blank" 
        className="inline-flex items-center gap-1 hover:text-slate-600 transition-colors"
      >
        <Github size={12} />
        <span>OI-boss</span>
      </a>
    </footer>
  );

  const renderContent = () => {
    if (gameState.status === 'SETUP') {
      return (
        <SetupScreen 
          setupForm={setupForm} 
          setSetupForm={setSetupForm} 
          startGame={startGame} 
        />
      );
    }

    if (gameState.status === 'GAME_OVER') {
      return (
        <GameOverScreen 
          gameState={gameState} 
          onRestart={() => window.location.reload()} 
        />
      );
    }

    return (
      <>
        <Header gameState={gameState} />

        <NotificationContainer notifications={gameState.notifications || []} onRemove={removeNotification} />

        {/* Main Grid Layout */}
        <div className="flex-1 p-3 grid grid-cols-12 gap-3 overflow-hidden">
          <Sidebar 
            gameState={gameState} 
            setGameState={setGameState} 
            onRename={renameStudent}
            onDismiss={dismissStudent}
          />
          
          <Dashboard 
            gameState={gameState}
            handleActionClick={handleActionClick}
            endWeek={endWeek}
            onEventOptionClick={onEventOptionClick}
            onOpenRecruit={() => setShowRecruitModal(true)}
            upgradeCoach={upgradeCoach}
            upgradeFacility={upgradeFacility}
          />

          <LogPanel gameState={gameState} />
        </div>

        {showRecruitModal && (
          <RecruitModal 
            gameState={gameState}
            onClose={() => setShowRecruitModal(false)}
            onRecruit={recruitStudent}
          />
        )}

        {gameState.status === 'MODAL' && gameState.modalContent && (
          <Modal 
            config={gameState.modalContent} 
            onOptionSelect={(index) => {
              if (gameState.modalContent?.options?.[index]) {
                gameState.modalContent.options[index].action();
              }
            }} 
            onClose={() => setGameState(prev => ({ ...prev, status: 'PLAYING', modalContent: null }))}
          />
        )}
      </>
    );
  };

  return (
    <div className="h-screen bg-slate-100 overflow-hidden flex flex-col font-sans text-slate-800">
      <div className="flex-1 overflow-hidden flex flex-col relative">
        {renderContent()}
      </div>
      <Footer />
    </div>
  );
};

export default App;
