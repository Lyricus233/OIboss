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
  upgradeFacility,
}) => {
  const nextLevelCost = COACH_UPGRADE_COSTS[gameState.coachLevel];
  const nextFacility = FACILITY_CONFIG[gameState.facilityLevel + 1];

  return (
    <div className="col-span-6 flex h-full flex-col gap-3 overflow-hidden">
      {/* Stats Row 1: Basic Info */}
      <div className="grid shrink-0 grid-cols-2 gap-3">
        <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
          <div>
            <div className="text-sm text-slate-500">学生总数 / 容量</div>
            <div className="text-2xl font-bold text-slate-800">
              {gameState.students.length}
              <span className="text-lg font-normal text-slate-400"> / {gameState.maxStudents}</span>
            </div>
            <div className="mt-1 text-xs text-slate-400">
              {FACILITY_CONFIG[gameState.facilityLevel]?.label}
            </div>
          </div>
          <div className="flex gap-2">
            {nextFacility && (
              <button
                onClick={upgradeFacility}
                className="group relative rounded-lg bg-amber-50 p-2 text-amber-600 transition-colors hover:bg-amber-100"
                title={`升级场地: ${nextFacility.label} (¥${nextFacility.cost.toLocaleString()})`}
              >
                <Building size={24} />
                <div className="absolute top-full right-0 z-10 mt-2 hidden w-48 rounded bg-slate-800 p-2 text-xs text-white group-hover:block">
                  <div className="mb-1 font-bold">升级至 {nextFacility.label}</div>
                  <div>容量: {nextFacility.maxStudents}人</div>
                  <div>租金: +¥{nextFacility.rent}/周</div>
                  <div className="mt-1 text-amber-400">
                    费用: ¥{nextFacility.cost.toLocaleString()}
                  </div>
                </div>
              </button>
            )}
            <button
              onClick={onOpenRecruit}
              className="rounded-lg bg-indigo-50 p-2 text-indigo-600 transition-colors hover:bg-indigo-100"
              title="招募学生"
            >
              <UserPlus size={24} />
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
          <div>
            <div className="text-sm text-slate-500">教练等级</div>
            <div className="text-2xl font-bold text-slate-800">Lv.{gameState.coachLevel}</div>
          </div>
          <button
            onClick={upgradeCoach}
            className="rounded-lg bg-blue-50 p-2 text-blue-600 transition-colors hover:bg-blue-100"
            title={`提升教练等级 (¥${nextLevelCost?.toLocaleString() || 'MAX'})`}
            disabled={!nextLevelCost}
          >
            <TrendingUp size={24} />
          </button>
        </div>
      </div>

      {/* Stats Row 2: Agency Stats */}
      <div className="grid shrink-0 grid-cols-3 gap-3">
        <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
          <div className="mb-1 text-xs text-slate-500">教练士气</div>
          <div className="flex items-center gap-2">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full ${gameState.coachMorale < 30 ? 'bg-red-500' : 'bg-blue-500'}`}
                style={{ width: `${gameState.coachMorale}%` }}
              />
            </div>
            <span
              className={`text-xs font-bold ${gameState.coachMorale < 30 ? 'text-red-500' : ''}`}
            >
              {Math.round(gameState.coachMorale)}
            </span>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
          <div className="mb-1 text-xs text-slate-500">老板压力</div>
          <div className="flex items-center gap-2">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full ${gameState.bossStress > 75 ? 'bg-red-500' : 'bg-emerald-500'}`}
                style={{ width: `${gameState.bossStress}%` }}
              />
            </div>
            <span
              className={`text-xs font-bold ${gameState.bossStress > 75 ? 'text-red-500' : ''}`}
            >
              {Math.round(gameState.bossStress)}
            </span>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
          <div className="mb-1 text-xs text-slate-500">学生满意度</div>
          <div className="flex items-center gap-2">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full ${gameState.studentSatisfaction < 30 ? 'bg-red-500' : 'bg-purple-500'}`}
                style={{ width: `${gameState.studentSatisfaction}%` }}
              />
            </div>
            <span
              className={`text-xs font-bold ${gameState.studentSatisfaction < 30 ? 'text-red-500' : ''}`}
            >
              {Math.round(gameState.studentSatisfaction)}
            </span>
          </div>
        </div>
      </div>

      {/* Decision Panel */}
      <div className="flex min-h-0 flex-1 flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-3 flex shrink-0 items-center justify-between">
          <h3 className="flex items-center gap-2 text-base font-bold text-slate-700">
            <PlayCircle size={18} className="text-indigo-600" /> 本周决策
          </h3>
          <button
            onClick={endWeek}
            className="flex items-center gap-1 rounded-full bg-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-300"
          >
            跳过本周 <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid flex-1 grid-cols-3 content-start gap-2 overflow-y-auto pr-1">
          {AGENCY_ACTIONS.map((action) => {
            const themeStyles = {
              default: {
                btn: 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-md',
                title: 'text-slate-800',
                desc: 'text-slate-500',
              },
              danger: {
                btn: 'bg-red-50 border-red-200 hover:border-red-400 hover:shadow-md hover:bg-red-100',
                title: 'text-red-700',
                desc: 'text-red-500',
              },
              primary: {
                btn: 'bg-blue-50 border-blue-200 hover:border-blue-400 hover:shadow-md hover:bg-blue-100',
                title: 'text-blue-700',
                desc: 'text-blue-500',
              },
              success: {
                btn: 'bg-green-50 border-green-200 hover:border-green-400 hover:shadow-md hover:bg-green-100',
                title: 'text-green-700',
                desc: 'text-green-500',
              },
            } as const;

            type ThemeKey = keyof typeof themeStyles;
            const theme = (action.theme ?? 'default') as ThemeKey;
            const style = themeStyles[theme];

            return (
              <button
                key={action.id}
                onClick={() => handleActionClick(action.id)}
                disabled={gameState.actedThisWeek}
                className={`group relative h-auto overflow-hidden rounded-lg border p-2 text-left transition-all ${
                  gameState.actedThisWeek
                    ? 'cursor-not-allowed border-slate-100 bg-slate-50 opacity-50'
                    : style.btn
                }`}
              >
                <div>
                  <div className={`mb-1 text-sm leading-tight font-bold ${style.title}`}>
                    {action.name}
                  </div>
                  <div className={`line-clamp-2 text-xs ${style.desc}`}>{action.desc}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chart Area */}
      <div className="flex h-32 shrink-0 flex-col rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
        <h3 className="mb-2 text-xs font-bold tracking-wider text-slate-400 uppercase">资金趋势</h3>
        <div className="min-h-0 flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={gameState.statsHistory.slice(-20)}>
              <defs>
                <linearGradient id="colorCash" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <Tooltip
                contentStyle={{
                  borderRadius: '8px',
                  border: 'none',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
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
