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
  const moralePenalty = gameState.coachMorale < 50 ? 2000 : 0;
  const totalTuition = gameState.students.reduce((sum, s) => sum + calculateTuition(s), 0);
  const netIncome = totalTuition - rent - moralePenalty;

  return (
    <div className="col-span-3 flex h-full flex-col gap-3 overflow-hidden">
      {/* Finance Brief */}
      <div className="shrink-0 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
        <h3 className="mb-2 text-sm font-bold tracking-wider text-slate-400 uppercase">
          周收支预估
        </h3>
        <div className="space-y-1.5 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-500">学费收入</span>
            <span className="font-mono text-emerald-500">+{formatMoney(totalTuition)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">房租</span>
            <span className="font-mono text-red-500">-{formatMoney(rent)}</span>
          </div>
          {moralePenalty > 0 && (
            <div className="flex justify-between">
              <span className="text-slate-500">士气低落损耗</span>
              <span className="font-mono text-red-500">-{formatMoney(moralePenalty)}</span>
            </div>
          )}
          <div className="mt-1 flex justify-between border-t border-slate-100 pt-1 font-bold">
            <span>净利</span>
            <span className={netIncome >= 0 ? 'text-emerald-600' : 'text-red-500'}>
              {netIncome >= 0 ? '+' : ''}
              {formatMoney(netIncome)}
            </span>
          </div>
        </div>
      </div>

      {/* Logs */}
      <div className="flex flex-1 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 bg-slate-50 p-3">
          <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800">
            <AlertCircle size={16} /> 消息日志
          </h3>
        </div>
        <div className="flex-1 space-y-2 overflow-y-auto p-2" ref={scrollLogRef}>
          {gameState.history
            .slice()
            .reverse()
            .map((log) => (
              <div
                key={log.id}
                className={`rounded border p-2 text-xs ${
                  log.type === 'success'
                    ? 'border-green-100 bg-green-50 text-green-800'
                    : log.type === 'danger'
                      ? 'border-red-100 bg-red-50 text-red-800'
                      : log.type === 'warning'
                        ? 'border-orange-100 bg-orange-50 text-orange-800'
                        : 'border-slate-100 bg-slate-50 text-slate-600'
                }`}
              >
                <span className="mr-1 font-mono opacity-50">W{log.week}</span>
                {log.message}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default LogPanel;
