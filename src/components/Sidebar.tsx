import React, { useState } from 'react';
import { Users, ChevronDown, ChevronRight } from 'lucide-react';
import { GameState } from '../types';
import StudentCard from './StudentCard';

interface SidebarProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  onRename: (id: string, newName: string) => void;
  onDismiss: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ gameState, onRename, onDismiss }) => {
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({
    '省选组': false,
    '提高组': false,
    '普及组': true,
  });

  const toggleGroup = (group: string) => {
    setCollapsedGroups(prev => ({
      ...prev,
      [group]: !prev[group]
    }));
  };

  const groupedStudents = {
    '省选组': gameState.students.filter(s => s.tier === 'ADVANCED'),
    '提高组': gameState.students.filter(s => s.tier === 'INTERMEDIATE'),
    '普及组': gameState.students.filter(s => s.tier === 'BEGINNER'),
  };

  const renderGroup = (title: string, students: any[]) => {
    if (students.length === 0) return null;
    const isCollapsed = collapsedGroups[title];

    return (
      <div className="mt-2">
        <button 
          onClick={() => toggleGroup(title)}
          className="w-full flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 hover:text-slate-700 transition-colors"
        >
          {isCollapsed ? <ChevronRight size={14}/> : <ChevronDown size={14}/>}
          {title} ({students.length})
        </button>
        {!isCollapsed && (
          <div className="flex flex-col gap-2 pl-2 border-l-2 border-slate-200 ml-1">
            {students.map(student => (
              <StudentCard 
                key={student.id} 
                student={student} 
                onRename={(newName) => onRename(student.id, newName)}
                onDismiss={() => onDismiss(student.id)}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="col-span-3 flex flex-col gap-3 overflow-hidden h-full min-h-0">
      <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 flex-shrink-0">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
          <Users size={14}/> 学生列表
        </h2>
        <div className="text-xs text-slate-500">
          管理你的学生，关注他们的状态。
        </div>
      </div>

      {/* Student List */}
      <div className="flex-1 bg-slate-50/50 rounded-xl flex flex-col gap-2 overflow-y-auto p-2">
         {renderGroup('省选组', groupedStudents['省选组'])}
         {renderGroup('提高组', groupedStudents['提高组'])}
         {renderGroup('普及组', groupedStudents['普及组'])}
         
         {gameState.students.length === 0 && (
           <div className="text-center text-slate-400 text-sm py-10">
             暂无学生
           </div>
         )}
      </div>
    </div>
  );
};

export default Sidebar;
