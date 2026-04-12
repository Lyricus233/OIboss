import React, { useState } from 'react';
import { Users, ChevronDown, ChevronRight } from 'lucide-react';
import { GameState } from '../types';
import StudentCard from './StudentCard';

interface SidebarProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  onRename: (id: string, newName: string) => void;
  onDismiss: (id: string) => void;
  onUpgrade: (id: string) => void;
  onToggleRecommendation: (id: string) => void;
  getRecommendationQuota: (state: GameState) => number;
}

const Sidebar: React.FC<SidebarProps> = ({
  gameState,
  onRename,
  onDismiss,
  onUpgrade,
  onToggleRecommendation,
  getRecommendationQuota,
}) => {
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({
    省选组: false,
    提高组: false,
    普及组: true,
  });

  const toggleGroup = (group: string) => {
    setCollapsedGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }));
  };

  const totalQuota = getRecommendationQuota(gameState);
  const usedQuota = gameState.usedRecommendationQuota || 0;

  const groupedStudents = {
    省选组: gameState.students.filter((s) => s.tier === 'ADVANCED'),
    提高组: gameState.students.filter((s) => s.tier === 'INTERMEDIATE'),
    普及组: gameState.students.filter((s) => s.tier === 'BEGINNER'),
  };

  const renderGroup = (title: string, students: any[]) => {
    if (students.length === 0) return null;
    const isCollapsed = collapsedGroups[title];

    return (
      <div className="mt-2">
        <button
          onClick={() => toggleGroup(title)}
          className="mb-2 flex w-full items-center gap-2 text-xs font-bold tracking-wider text-slate-500 uppercase transition-colors hover:text-slate-700"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
          {title} ({students.length})
        </button>
        {!isCollapsed && (
          <div className="ml-1 flex flex-col gap-2 border-l-2 border-slate-200 pl-2">
            {students.map((student) => (
              <StudentCard
                key={student.id}
                student={student}
                onRename={(newName) => onRename(student.id, newName)}
                onDismiss={() => onDismiss(student.id)}
                onUpgrade={() => onUpgrade(student.id)}
                hideContestStatus={!!gameState.currentContestResult}
                onToggleRecommendation={() => onToggleRecommendation(student.id)}
                canRecommend={
                  gameState.week < 8 && !student.passedContests?.includes('CSP-J/S 第一轮')
                }
                isRecommended={student.isRecommended}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="col-span-3 flex h-full min-h-0 flex-col gap-3 overflow-hidden">
      <div className="shrink-0 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
        <h2 className="mb-2 flex items-center justify-between text-sm font-bold tracking-wider text-slate-400 uppercase">
          <span className="flex items-center gap-1">
            <Users size={14} /> 学生列表
          </span>
        </h2>
        <div className="text-xs text-slate-500">管理你的学生，关注他们的状态。</div>
        {totalQuota > 0 && gameState.week < 8 && (
          <div className="mt-2 rounded bg-orange-50 px-2 py-1 text-xs font-medium text-orange-600">
            初赛推荐名额: {usedQuota} / {totalQuota}
          </div>
        )}
      </div>

      {/* Student List */}
      <div className="flex flex-1 flex-col gap-2 overflow-y-auto rounded-xl bg-slate-50/50 p-2">
        {renderGroup('省选组', groupedStudents['省选组'])}
        {renderGroup('提高组', groupedStudents['提高组'])}
        {renderGroup('普及组', groupedStudents['普及组'])}

        {gameState.students.length === 0 && (
          <div className="py-10 text-center text-sm text-slate-400">暂无学生</div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
