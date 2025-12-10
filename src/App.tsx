
import React, { useState } from 'react';
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
    <div className="h-screen bg-slate-100 overflow-hidden flex flex-col font-sans text-slate-800">
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
    </div>
  );
};

export default App;
