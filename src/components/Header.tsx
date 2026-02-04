import React from 'react';
import { Briefcase, DollarSign, Trophy, Calendar, MapPin, Save } from 'lucide-react';
import { GameState } from '../types';
import { CALENDAR_EVENTS, PROVINCES } from '../constants';
import { formatMoney } from '../../utils';

interface HeaderProps {
  gameState: GameState;
  onOpenSaveLoad: () => void;
}

const Header: React.FC<HeaderProps> = ({ gameState, onOpenSaveLoad }) => {
  const provinceName = PROVINCES.find((p) => p.id === gameState.province)?.name;

  return (
    <header className="z-20 flex h-14 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 py-2 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-indigo-600 p-1.5">
            <Briefcase className="text-white" size={20} />
          </div>
          <span className="text-lg font-bold text-slate-800">{gameState.agencyName}</span>
        </div>

        {provinceName && (
          <>
            <div className="mx-1 h-4 w-px bg-slate-300"></div>
            <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1">
              <MapPin size={14} className="text-indigo-500" />
              <span className="text-sm font-bold text-slate-700">{provinceName}</span>
            </div>
          </>
        )}
        <div className="mx-2 h-4 w-px bg-slate-300"></div>
        <div className="flex gap-4 font-mono text-base">
          <span className="text-slate-500">第 {gameState.year} 赛季</span>
          <span className="font-bold text-slate-800">第 {gameState.week} 周</span>
        </div>

        {(() => {
          const nextEventWeek = Object.keys(CALENDAR_EVENTS)
            .map(Number)
            .sort((a, b) => a - b)
            .find((w) => w > gameState.week);
          if (nextEventWeek) {
            const event = CALENDAR_EVENTS[nextEventWeek];
            const weeksLeft = nextEventWeek - gameState.week;
            const isUrgent = weeksLeft <= 1;
            return (
              <div
                className={`ml-2 flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm transition-colors ${
                  isUrgent
                    ? 'animate-pulse border-red-100 bg-red-50 text-red-600'
                    : 'border-indigo-100 bg-indigo-50 text-indigo-600'
                }`}
              >
                <Calendar size={14} />
                <span>
                  距离 {event.name} 还有 <span className="font-bold">{weeksLeft}</span> 周
                </span>
              </div>
            );
          }
          return null;
        })()}
      </div>

      <div className="flex items-center gap-6">
        <button
          onClick={onOpenSaveLoad}
          className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-800"
          title="存档/读档"
        >
          <Save size={16} />
          <span>进度</span>
        </button>

        <div
          className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-base"
          title={`资金：用于支付房租和活动费用。归零则游戏结束。`}
        >
          <DollarSign size={16} className="text-emerald-600" />
          <span className="text-sm font-medium text-slate-500">资金</span>
          <span className="font-mono font-bold">{formatMoney(gameState.cash)}</span>
        </div>
        <div
          className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-base"
          title="声望：通过比赛获得，用于招募高等级学生。归零则游戏结束。"
        >
          <Trophy size={16} className="text-amber-500" />
          <span className="text-sm font-medium text-slate-500">声望</span>
          <span className="font-mono font-bold">{Math.floor(gameState.reputation)}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
