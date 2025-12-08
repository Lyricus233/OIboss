import React from 'react';
import { RefreshCw, Trophy, AlertTriangle } from 'lucide-react';
import { GameState } from '../types';

interface GameOverScreenProps {
  gameState: GameState;
  onRestart: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ gameState, onRestart }) => {
  return (
    <div className="fixed inset-0 bg-slate-900/90 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="bg-slate-100 p-6 text-center border-b border-slate-200">
          <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-1">游戏结束</h2>
          <p className="text-slate-500">{gameState.gameOverReason}</p>
        </div>
        
        <div className="p-6">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Trophy className="text-yellow-500" size={24} />
            <span className="text-3xl font-bold text-slate-800">{gameState.finalScore || 0}</span>
            <span className="text-sm text-slate-400 uppercase tracking-wider font-bold">最终得分</span>
          </div>

          <div className="space-y-3 mb-8">
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
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
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