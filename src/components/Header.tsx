import React from 'react';
import { Briefcase, DollarSign, Trophy, Calendar } from 'lucide-react';
import { GameState } from '../types';
import { CALENDAR_EVENTS } from '../constants';
import { formatMoney } from '../../utils';

interface HeaderProps {
  gameState: GameState;
}

const Header: React.FC<HeaderProps> = ({ gameState }) => {
  return (
    <header className="bg-white border-b border-slate-200 px-4 py-2 flex justify-between items-center shrink-0 h-14 shadow-sm z-20">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-indigo-600 rounded-lg">
            <Briefcase className="text-white" size={20} />
          </div>
          <span className="font-bold text-slate-800 text-lg">{gameState.agencyName}</span>
        </div>
        <div className="h-4 w-px bg-slate-300 mx-2"></div>
        <div className="flex gap-4 text-base font-mono">
          <span className="text-slate-500">第 {gameState.year} 赛季</span>
          <span className="text-slate-800 font-bold">第 {gameState.week} 周</span>
        </div>

        {(() => {
          const nextEventWeek = Object.keys(CALENDAR_EVENTS).map(Number).sort((a, b) => a - b).find(w => w > gameState.week);
          if (nextEventWeek) {
             const event = CALENDAR_EVENTS[nextEventWeek];
             const weeksLeft = nextEventWeek - gameState.week;
             const isUrgent = weeksLeft <= 1;
             return (
               <div className={`flex items-center gap-1.5 text-sm px-3 py-1 rounded-full border ml-2 transition-colors
                 ${isUrgent 
                   ? 'text-red-600 bg-red-50 border-red-100 animate-pulse' 
                   : 'text-indigo-600 bg-indigo-50 border-indigo-100'}`}>
                 <Calendar size={14} />
                 <span>距离 {event.name} 还有 <span className="font-bold">{weeksLeft}</span> 周</span>
               </div>
             );
          }
          return null;
        })()}
      </div>

      <div className="flex items-center gap-3">
         <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-full border border-slate-200 text-base" title={`资金：用于支付房租和活动费用。归零则游戏结束。`}>
            <DollarSign size={16} className="text-emerald-600"/>
            <span className="text-slate-500 text-sm font-medium">资金</span>
            <span className="font-bold font-mono">{formatMoney(gameState.cash)}</span>
         </div>
         <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-full border border-slate-200 text-base" title="声望：通过比赛获得，用于招募高等级学生。归零则游戏结束。">
            <Trophy size={16} className="text-amber-500"/>
            <span className="text-slate-500 text-sm font-medium">声望</span>
            <span className="font-bold font-mono">{Math.floor(gameState.reputation)}</span>
         </div>
      </div>
    </header>
  );
};

export default Header;
