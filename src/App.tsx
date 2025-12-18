import React, { useState } from 'react';
import { Github } from 'lucide-react';
import Modal from './components/EventModal';
import ChatEventModal from './components/ChatEventModal';
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
    removeNotification,
    handleChatEventComplete,
  } = useGameLogic();

  const [showRecruitModal, setShowRecruitModal] = useState(false);

  const Footer = () => (
    <footer className="relative z-[60] shrink-0 border-t border-slate-200 bg-slate-100 py-1 text-center text-xs text-slate-500">
      <a
        href="https://github.com/Lyricus233/OIboss"
        target="_blank"
        className="inline-flex items-center gap-1 transition-colors hover:text-slate-600"
      >
        <Github size={12} />
        <span>OI-boss</span>
      </a>
    </footer>
  );

  const renderContent = () => {
    if (gameState.status === 'SETUP') {
      return (
        <SetupScreen setupForm={setupForm} setSetupForm={setSetupForm} startGame={startGame} />
      );
    }

    if (gameState.status === 'GAME_OVER') {
      return <GameOverScreen gameState={gameState} onRestart={() => window.location.reload()} />;
    }

    return (
      <>
        <Header gameState={gameState} />

        <NotificationContainer
          notifications={gameState.notifications || []}
          onRemove={removeNotification}
        />

        {/* Main Grid Layout */}
        <div className="grid flex-1 grid-cols-12 gap-3 overflow-hidden p-3">
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
            onClose={() =>
              setGameState((prev) => ({
                ...prev,
                status: 'PLAYING',
                modalContent: null,
              }))
            }
          />
        )}

        {gameState.currentEvent &&
          (gameState.currentEvent.type === 'CHAT' && gameState.currentEvent.activeChat ? (
            <ChatEventModal
              scenario={gameState.currentEvent.activeChat}
              eventDescription={gameState.currentEvent.text}
              onClose={() =>
                handleChatEventComplete({
                  success: false,
                  message: '你放弃了沟通',
                  reward: { reputation: -2 },
                })
              }
              onComplete={handleChatEventComplete}
              onError={(msg) =>
                setGameState((prev) => ({
                  ...prev,
                  notifications: [
                    ...prev.notifications,
                    { id: Date.now().toString(), message: msg, type: 'error' },
                  ],
                }))
              }
            />
          ) : (
            <Modal
              config={{
                type: 'EVENT',
                title: gameState.currentEvent.title,
                description: gameState.currentEvent.text,
                options: gameState.currentEvent.options?.map((opt) => ({
                  label: opt.label,
                  action: () => onEventOptionClick(gameState.currentEvent!.id, opt.id),
                })),
              }}
              onOptionSelect={(index) => {
                if (gameState.currentEvent?.options?.[index]) {
                  onEventOptionClick(
                    gameState.currentEvent.id,
                    gameState.currentEvent.options[index].id
                  );
                }
              }}
            />
          ))}
      </>
    );
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-slate-100 font-sans text-slate-800">
      <div className="relative flex flex-1 flex-col overflow-hidden">{renderContent()}</div>
      <Footer />
    </div>
  );
};

export default App;
