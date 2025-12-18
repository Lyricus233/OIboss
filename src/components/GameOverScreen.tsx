import React from 'react';
import { RefreshCw, Trophy, AlertTriangle } from 'lucide-react';
import { GameState } from '../types';

interface GameOverScreenProps {
  gameState: GameState;
  onRestart: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ gameState, onRestart }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/90 p-4">
      <div className="animate-in fade-in zoom-in w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl duration-300">
        <div className="border-b border-slate-200 bg-slate-100 p-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-500">
            <AlertTriangle size={32} />
          </div>
          <h2 className="mb-1 text-2xl font-bold text-slate-800">游戏结束</h2>
          <p className="text-slate-500">{gameState.gameOverReason}</p>
        </div>

        <div className="p-6">
          <div className="mb-8 flex items-center justify-center gap-3">
            <Trophy className="text-yellow-500" size={24} />
            <span className="text-3xl font-bold text-slate-800">{gameState.finalScore || 0}</span>
            <span className="text-sm font-bold tracking-wider text-slate-400 uppercase">
              最终得分
            </span>
          </div>

          <div className="mb-8 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">存活周数</span>
              <span className="font-bold text-slate-800">{gameState.totalWeeks} 周</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">最终资金</span>
              <span className="font-bold text-slate-800">¥{gameState.cash.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">机构声望</span>
              <span className="font-bold text-slate-800">{gameState.reputation}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">学生规模</span>
              <span className="font-bold text-slate-800">{gameState.students.length} 人</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">获得奖牌</span>
              <span className="font-bold text-slate-800">{gameState.totalMedals || 0} 枚</span>
            </div>
          </div>

          <button
            onClick={onRestart}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 font-bold text-white transition-colors hover:bg-indigo-700"
          >
            <RefreshCw size={18} />
            重新开始
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverScreen;
