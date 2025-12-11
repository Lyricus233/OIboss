import React from 'react';
import { PlayCircle, UserPlus, TrendingUp, ArrowRight, Building } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, Tooltip } from 'recharts';
import { GameState } from '../types';
import { AGENCY_ACTIONS, COACH_UPGRADE_COSTS, FACILITY_CONFIG } from '../constants';

interface DashboardProps {
  gameState: GameState;
  handleActionClick: (actionId: string) => void;
  endWeek: () => void;
  onOpenRecruit: () => void;
  upgradeCoach: () => void;
  upgradeFacility: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  gameState, 
  handleActionClick,
  endWeek,
  onOpenRecruit,
  upgradeCoach,
  upgradeFacility
}) => {
  const nextLevelCost = COACH_UPGRADE_COSTS[gameState.coachLevel];
  const nextFacility = FACILITY_CONFIG[gameState.facilityLevel + 1];

  return (
    <div className="col-span-6 flex flex-col gap-3 overflow-hidden h-full">
      {/* Stats Row 1: Basic Info */}
      <div className="grid grid-cols-2 gap-3 shrink-0">
         <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <div className="text-sm text-slate-500">学生总数 / 容量</div>
              <div className="text-2xl font-bold text-slate-800">
                {gameState.students.length} 
                <span className="text-lg text-slate-400 font-normal"> / {gameState.maxStudents}</span>
              </div>
              <div className="text-xs text-slate-400 mt-1">
                {FACILITY_CONFIG[gameState.facilityLevel]?.label}
              </div>
            </div>
            <div className="flex gap-2">
              {nextFacility && (
                <button 
                  onClick={upgradeFacility}
                  className="p-2 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 transition-colors relative group"
                  title={`升级场地: ${nextFacility.label} (¥${nextFacility.cost.toLocaleString()})`}
                >
                  <Building size={24} />
                  <div className="absolute right-0 top-full mt-2 w-48 bg-slate-800 text-white text-xs p-2 rounded z-10 hidden group-hover:block">
                    <div className="font-bold mb-1">升级至 {nextFacility.label}</div>
                    <div>容量: {nextFacility.maxStudents}人</div>
                    <div>租金: +¥{nextFacility.rent}/周</div>
                    <div className="text-amber-400 mt-1">费用: ¥{nextFacility.cost.toLocaleString()}</div>
                  </div>
                </button>
              )}
              <button 
                onClick={onOpenRecruit}
                className="p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors"
                title="招募学生"
              >
                <UserPlus size={24} />
              </button>
            </div>
         </div>
         <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <div className="text-sm text-slate-500">教练等级</div>
              <div className="text-2xl font-bold text-slate-800">Lv.{gameState.coachLevel}</div>
            </div>
            <button 
               onClick={upgradeCoach}
               className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
               title={`提升教练等级 (¥${nextLevelCost?.toLocaleString() || 'MAX'})`}
               disabled={!nextLevelCost}
            >
               <TrendingUp size={24} />
            </button>
         </div>
      </div>

      {/* Stats Row 2: Agency Stats */}
      <div className="grid grid-cols-3 gap-3 shrink-0">
         <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-xs text-slate-500 mb-1">教练士气</div>
            <div className="flex items-center gap-2">
               <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${gameState.coachMorale < 30 ? 'bg-red-500' : 'bg-blue-500'}`} 
                    style={{ width: `${gameState.coachMorale}%` }}
                  />
               </div>
               <span className={`text-xs font-bold ${gameState.coachMorale < 30 ? 'text-red-500' : ''}`}>{Math.round(gameState.coachMorale)}</span>
            </div>
         </div>
         <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-xs text-slate-500 mb-1">老板压力</div>
            <div className="flex items-center gap-2">
               <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${gameState.bossStress > 75 ? 'bg-red-500' : 'bg-emerald-500'}`} 
                    style={{ width: `${gameState.bossStress}%` }}
                  />
               </div>
               <span className={`text-xs font-bold ${gameState.bossStress > 75 ? 'text-red-500' : ''}`}>{Math.round(gameState.bossStress)}</span>
            </div>
         </div>
         <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-xs text-slate-500 mb-1">学生满意度</div>
            <div className="flex items-center gap-2">
               <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${gameState.studentSatisfaction < 30 ? 'bg-red-500' : 'bg-purple-500'}`} 
                    style={{ width: `${gameState.studentSatisfaction}%` }}
                  />
               </div>
               <span className={`text-xs font-bold ${gameState.studentSatisfaction < 30 ? 'text-red-500' : ''}`}>{Math.round(gameState.studentSatisfaction)}</span>
            </div>
         </div>
      </div>

      {/* Decision Panel */}
      <div className="flex-1 bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col min-h-0">
         <div className="flex items-center justify-between mb-3 shrink-0">
            <h3 className="text-base font-bold text-slate-700 flex items-center gap-2">
              <PlayCircle size={18} className="text-indigo-600"/> 本周决策
            </h3>
            <button 
              onClick={endWeek}
              className="flex items-center gap-1 px-3 py-1.5 bg-slate-200 text-slate-600 rounded-full text-sm font-medium hover:bg-slate-300 transition-colors"
            >
              跳过本周 <ArrowRight size={14} />
            </button>
         </div>
         
         <div className="grid grid-cols-3 gap-2 flex-1 overflow-y-auto pr-1 content-start">
            {AGENCY_ACTIONS.map(action => {
              const isNegative = action.cost < 0;
              return (
              <button 
                key={action.id}
                onClick={() => handleActionClick(action.id)} 
                disabled={gameState.actedThisWeek}
                className={`p-2 rounded-lg border transition-all text-left group relative overflow-hidden flex flex-col justify-between h-24
                  ${gameState.actedThisWeek 
                    ? 'bg-slate-50 border-slate-100 opacity-50 cursor-not-allowed' 
                    : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-md'}`}
              >
                <div>
                  <div className="font-bold text-sm leading-tight mb-1 text-slate-800">
                    {action.name}
                  </div>
                  <div className="text-xs text-slate-500 line-clamp-2">
                    {action.desc}
                  </div>
                </div>
                <div className={`text-xs font-mono font-bold self-start px-1.5 py-0.5 rounded mt-1
                  ${isNegative ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                  {action.cost > 0 ? `+¥${action.cost.toLocaleString()}` : action.cost < 0 ? `-¥${Math.abs(action.cost).toLocaleString()}` : '免费'}
                </div>
              </button>
            )})}
         </div>
      </div>

      {/* Chart Area */}
      <div className="h-32 bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col shrink-0">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">资金趋势</h3>
        <div className="flex-1 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={gameState.statsHistory.slice(-20)}>
              <defs>
                <linearGradient id="colorCash" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                formatter={(value: number) => [`¥${value.toLocaleString()}`, '资金']}
                labelFormatter={(label) => `第 ${label} 周`}
              />
              <Area 
                type="monotone" 
                dataKey="cash" 
                stroke="#10b981" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorCash)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

