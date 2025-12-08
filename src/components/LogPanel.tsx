import React, { useEffect, useRef } from 'react';
import { AlertCircle } from 'lucide-react';
import { GameState } from '../types';
import { calculateTuition } from '../hooks/useGameLogic';
import { formatMoney } from '../utils/format'; 

interface LogPanelProps {
  gameState: GameState;
}

const LogPanel: React.FC<LogPanelProps> = ({ gameState }) => {
  const scrollLogRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (scrollLogRef.current) scrollLogRef.current.scrollTop = scrollLogRef.current.scrollHeight;
  }, [gameState.history]);

  const rent = gameState.fixedCost;
  const totalTuition = gameState.students.reduce((sum, s) => sum + calculateTuition(s), 0);
  const netIncome = totalTuition - rent;

  return (
    <div className="col-span-3 flex flex-col gap-3 overflow-hidden h-full">
      {/* Finance Brief */}
      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm shrink-0">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">周收支预估</h3>
        <div className="space-y-1.5 text-sm">
           <div className="flex justify-between">
              <span className="text-slate-500">学费收入</span>
              <span className="text-emerald-500 font-mono">+{formatMoney(totalTuition)}</span>
           </div>
           <div className="flex justify-between">
              <span className="text-slate-500">房租</span>
              <span className="text-red-500 font-mono">-{formatMoney(rent)}</span>
           </div>
           <div className="border-t border-slate-100 pt-1 mt-1 flex justify-between font-bold">
              <span>净利</span>
              <span className={netIncome >= 0 ? 'text-emerald-600' : 'text-red-500'}>
                {netIncome >= 0 ? '+' : ''}{formatMoney(netIncome)}
              </span>
           </div>
        </div>
      </div>

      {/* Logs */}
      <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
        <div className="p-3 border-b border-slate-100 bg-slate-50">
          <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm">
            <AlertCircle size={16} /> 消息日志
          </h3>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-2" ref={scrollLogRef}>
          {gameState.history.slice().reverse().map((log) => (
            <div key={log.id} className={`text-xs p-2 rounded border ${
              log.type === 'success' ? 'bg-green-50 border-green-100 text-green-800' :
              log.type === 'danger' ? 'bg-red-50 border-red-100 text-red-800' :
              log.type === 'warning' ? 'bg-orange-50 border-orange-100 text-orange-800' :
              'bg-slate-50 border-slate-100 text-slate-600'
            }`}>
              <span className="font-mono opacity-50 mr-1">W{log.week}</span>
              {log.message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogPanel;
