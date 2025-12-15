import React, { useState, useEffect } from 'react';
import { X, UserPlus, RefreshCw } from 'lucide-react';
import { GameState, Student } from '../types';
import { RECRUITMENT_CONFIG, TAGS } from '../constants';
import { formatMoney } from '../utils/format';
import { generateStudent } from '../hooks/useGameLogic';

interface RecruitModalProps {
  gameState: GameState;
  onClose: () => void;
  onRecruit: (students: Student[], cost: number) => void;
}

interface Candidate {
  student: Student;
  tier: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  cost: number;
  req: { reputation: number; coachLevel: number };
}

const RecruitModal: React.FC<RecruitModalProps> = ({ gameState, onClose, onRecruit }) => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [hoveredTag, setHoveredTag] = useState<{ config: typeof TAGS[0], rect: DOMRect } | null>(null);

  const generateCandidates = () => {
    const newCandidates: Candidate[] = [];
    for (let i = 0; i < 10; i++) {
      const rand = Math.random();
      let tier: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' = 'BEGINNER';
      if (rand > 0.6) tier = 'INTERMEDIATE';
      if (rand > 0.9) tier = 'ADVANCED';
      
      const cfg = RECRUITMENT_CONFIG[tier];
      const existingNames = new Set(gameState.students.map(s => s.name));
      const student = generateStudent(`c_${Date.now()}_${i}`, tier, undefined, existingNames, gameState.province);
      newCandidates.push({
        student,
        tier,
        cost: student.cost,
        req: cfg.req
      });
    }
    setCandidates(newCandidates);
    setSelectedIds([]);
  };

  useEffect(() => {
    generateCandidates();
  }, []);

  const toggleSelection = (id: string) => {
    setSelectedIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(pid => pid !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const updateCandidateName = (id: string, newName: string) => {
    setCandidates(prev => prev.map(c => 
      c.student.id === id 
        ? { ...c, student: { ...c.student, name: newName } }
        : c
    ));
    if (newName.trim()) setError('');
  };

  const selectedCandidates = candidates.filter(c => selectedIds.includes(c.student.id));
  const totalCost = selectedCandidates.reduce((sum, c) => sum + c.cost, 0);
  const canAfford = gameState.cash >= totalCost;
  const allReqMet = selectedCandidates.every(c => 
    gameState.reputation >= c.req.reputation && gameState.coachLevel >= c.req.coachLevel
  );

  const handleRecruit = () => {
    if (selectedCandidates.some(c => !c.student.name.trim())) {
      setError("学生姓名不能为空！");
      return;
    }

    if (selectedCandidates.length > 0 && canAfford && allReqMet) {
      const finalStudents = selectedCandidates.map(c => c.student);
      onRecruit(finalStudents, totalCost);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <UserPlus size={20} className="text-indigo-600"/> 人才市场
          </h2>
          <div className="flex gap-2">
             <button onClick={generateCandidates} className="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-colors">
               <RefreshCw size={14} /> 刷新列表
             </button>
             <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
               <X size={20} />
             </button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
           {/* List */}
           <div className="w-2/3 overflow-y-auto p-4 space-y-2 border-r border-slate-100">
              {candidates.map(c => {
                 const isAffordable = gameState.cash >= c.cost;
                 const isQualified = gameState.reputation >= c.req.reputation && gameState.coachLevel >= c.req.coachLevel;
                 const isSelected = selectedIds.includes(c.student.id);
                 
                 const missingReqs = [];
                 if (gameState.reputation < c.req.reputation) missingReqs.push(`声望${c.req.reputation}`);
                 if (gameState.coachLevel < c.req.coachLevel) missingReqs.push(`教练Lv.${c.req.coachLevel}`);

                 return (
                   <button 
                     key={c.student.id}
                     onClick={() => toggleSelection(c.student.id)}
                     className={`w-full p-3 rounded-xl border text-left transition-all flex justify-between items-center
                       ${isSelected ? 'border-indigo-500 bg-indigo-50 ring-1 ring-indigo-500' : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'}
                       ${(!isAffordable || !isQualified) && !isSelected ? 'opacity-60 grayscale' : ''}
                     `}
                   >
                     <div>
                       <div className="flex items-center gap-2 mb-1">
                         <span className={`font-bold ${isSelected ? 'text-indigo-900' : 'text-slate-700'}`}>{c.student.name}</span>
                         <span className={`text-xs px-1.5 py-0.5 rounded font-mono
                           ${c.tier === 'ADVANCED' ? 'bg-orange-100 text-orange-700' : 
                             c.tier === 'INTERMEDIATE' ? 'bg-blue-100 text-blue-700' : 
                             'bg-slate-100 text-slate-600'}`}>
                           {RECRUITMENT_CONFIG[c.tier].label}
                         </span>
                       </div>
                       <div className="text-xs text-slate-500 flex gap-3 mb-1">
                         <span>天赋: {c.student.talent}</span>
                         <span>能力: {c.student.ability}</span>
                       </div>
                       <div className="flex gap-1 flex-wrap">
                         {c.student.tags.map(t => {
                           const tagConfig = TAGS.find(tr => tr.name === t);
                           return (
                             <div 
                               key={t} 
                               className="relative group/tag"
                               onMouseEnter={(e) => tagConfig && setHoveredTag({ config: tagConfig, rect: e.currentTarget.getBoundingClientRect() })}
                               onMouseLeave={() => setHoveredTag(null)}
                             >
                               <span className="text-[10px] px-1.5 py-0.5 bg-indigo-50 text-indigo-600 rounded-full border border-indigo-100 cursor-help hover:bg-indigo-100 transition-colors">
                                 {t}
                               </span>
                             </div>
                           );
                         })}
                       </div>
                     </div>
                     <div className="text-right">
                       <div className={`font-mono font-bold ${isAffordable ? 'text-slate-700' : 'text-red-500'}`}>
                         {formatMoney(c.cost)}
                       </div>
                       {!isQualified && (
                         <div className="text-xs text-red-500 flex flex-col items-end">
                           {missingReqs.map(req => <span key={req}>需{req}</span>)}
                         </div>
                       )}
                     </div>
                   </button>
                 );
              })}
           </div>

           {/* Detail Panel */}
           <div className="w-1/3 p-4 bg-slate-50 flex flex-col">
              {selectedCandidates.length > 0 ? (
                <>
                  <div className="flex-1 flex flex-col">
                    <h3 className="font-bold text-slate-700 mb-4">已选择 {selectedCandidates.length} 人</h3>
                    
                    <div className="flex-1 overflow-y-auto space-y-2 mb-4 pr-1">
                      {selectedCandidates.map(c => (
                        <div key={c.student.id} className="bg-white p-2 rounded border border-slate-200 text-sm">
                          <div className="font-bold">
                            {c.student.name}
                          </div>
                          <div className="text-xs text-slate-500 flex justify-between mt-1">
                             <span>{RECRUITMENT_CONFIG[c.tier].label}</span>
                             <span>{formatMoney(c.cost)}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Custom Name Input (Only if 1 selected) */}
                    {selectedCandidates.length === 1 && (
                      <div className="mb-4">
                        <label className="block text-xs font-bold text-slate-500 mb-1">自定义姓名</label>
                        <input 
                          type="text" 
                          value={selectedCandidates[0].student.name}
                          onChange={(e) => updateCandidateName(selectedCandidates[0].student.id, e.target.value)}
                          className={`w-full px-3 py-2 rounded-lg border ${error ? 'border-red-500' : 'border-slate-200'} text-sm focus:outline-none focus:border-indigo-500`}
                        />
                        {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
                      </div>
                    )}

                    <div className="mt-auto pt-4 border-t border-slate-200">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-slate-500">总费用</span>
                        <span className={`text-xl font-bold ${canAfford ? 'text-indigo-600' : 'text-red-500'}`}>
                          {formatMoney(totalCost)}
                        </span>
                      </div>
                      
                      {!allReqMet && (
                         <div className="text-xs text-red-500 mb-2 text-center">
                           部分学生未满足招募要求
                         </div>
                      )}

                      <button 
                        onClick={handleRecruit}
                        disabled={!canAfford || !allReqMet}
                        className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all
                          ${canAfford && allReqMet
                            ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200' 
                            : 'bg-slate-200 text-slate-400 cursor-not-allowed'}
                        `}
                      >
                        <UserPlus size={18} />
                        {canAfford && allReqMet ? `确认招募 (${selectedCandidates.length}人)` : '无法招募'}
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
                  <UserPlus size={48} className="mb-2 opacity-20" />
                  <p>请选择要招募的学生</p>
                  <p className="text-xs mt-1">支持多选</p>
                </div>
              )}
           </div>
        </div>
      </div>

      {hoveredTag && (
        <div 
          className="fixed z-[100] w-48 p-3 bg-slate-800 text-white text-xs rounded-xl shadow-xl pointer-events-none"
          style={{
            top: hoveredTag.rect.top - 8,
            left: hoveredTag.rect.left + (hoveredTag.rect.width / 2),
            transform: 'translate(-50%, -100%)'
          }}
        >
          <div className="font-bold text-indigo-300 mb-1 text-sm">{hoveredTag.config.name}</div>
          <div className="text-slate-300 leading-relaxed">{hoveredTag.config.desc}</div>
          <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-800 rotate-45"></div>
        </div>
      )}
    </div>
  );
};

export default RecruitModal;