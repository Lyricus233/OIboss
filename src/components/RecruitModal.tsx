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
  const [hoveredTag, setHoveredTag] = useState<{
    config: (typeof TAGS)[0];
    rect: DOMRect;
  } | null>(null);

  const generateCandidates = () => {
    const newCandidates: Candidate[] = [];
    const existingNames = new Set(gameState.students.map((s) => s.name));

    for (let i = 0; i < 10; i++) {
      const rand = Math.random();
      let tier: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' = 'BEGINNER';
      if (rand > 0.6) tier = 'INTERMEDIATE';
      if (rand > 0.9) tier = 'ADVANCED';

      const cfg = RECRUITMENT_CONFIG[tier];
      const student = generateStudent(
        `c_${Date.now()}_${i}`,
        tier,
        undefined,
        existingNames,
        gameState.province
      );
      existingNames.add(student.name);
      newCandidates.push({
        student,
        tier,
        cost: student.cost,
        req: cfg.req,
      });
    }
    setCandidates(newCandidates);
    setSelectedIds([]);
  };

  useEffect(() => {
    generateCandidates();
  }, []);

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((pid) => pid !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const updateCandidateName = (id: string, newName: string) => {
    setCandidates((prev) =>
      prev.map((c) =>
        c.student.id === id ? { ...c, student: { ...c.student, name: newName } } : c
      )
    );
    if (newName.trim()) setError('');
  };

  const selectedCandidates = candidates.filter((c) => selectedIds.includes(c.student.id));
  const totalCost = selectedCandidates.reduce((sum, c) => sum + c.cost, 0);
  const canAfford = gameState.cash >= totalCost;
  const allReqMet = selectedCandidates.every(
    (c) => gameState.reputation >= c.req.reputation && gameState.coachLevel >= c.req.coachLevel
  );

  const handleRecruit = () => {
    if (selectedCandidates.some((c) => !c.student.name.trim())) {
      setError('学生姓名不能为空！');
      return;
    }

    const existingNames = new Set(gameState.students.map((st) => st.name.trim()));
    const seenNames = new Set<string>();
    for (const candidate of selectedCandidates) {
      const trimmed = candidate.student.name.trim();
      if (existingNames.has(trimmed)) {
        setError(`姓名「${trimmed}」已有在校学生，无法重复招募。`);
        return;
      }
      if (seenNames.has(trimmed)) {
        setError(`候选人列表中存在重复姓名「${trimmed}」。`);
        return;
      }
      seenNames.add(trimmed);
    }

    if (selectedCandidates.length > 0 && canAfford && allReqMet) {
      const finalStudents = selectedCandidates.map((c) => c.student);
      onRecruit(finalStudents, totalCost);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 p-4">
          <h2 className="flex items-center gap-2 text-lg font-bold text-slate-800">
            <UserPlus size={20} className="text-indigo-600" /> 人才市场
          </h2>
          <div className="flex gap-2">
            <button
              onClick={generateCandidates}
              className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-indigo-600"
            >
              <RefreshCw size={14} /> 刷新列表
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 transition-colors hover:text-slate-600"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* List */}
          <div className="w-2/3 space-y-2 overflow-y-auto border-r border-slate-100 p-4">
            {candidates.map((c) => {
              const isAffordable = gameState.cash >= c.cost;
              const isQualified =
                gameState.reputation >= c.req.reputation &&
                gameState.coachLevel >= c.req.coachLevel;
              const isSelected = selectedIds.includes(c.student.id);

              const missingReqs = [];
              if (gameState.reputation < c.req.reputation)
                missingReqs.push(`声望${c.req.reputation}`);
              if (gameState.coachLevel < c.req.coachLevel)
                missingReqs.push(`教练Lv.${c.req.coachLevel}`);

              return (
                <button
                  key={c.student.id}
                  onClick={() => toggleSelection(c.student.id)}
                  className={`flex w-full items-center justify-between rounded-xl border p-3 text-left transition-all ${isSelected ? 'border-indigo-500 bg-indigo-50 ring-1 ring-indigo-500' : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'} ${(!isAffordable || !isQualified) && !isSelected ? 'opacity-60 grayscale' : ''} `}
                >
                  <div>
                    <div className="mb-1 flex items-center gap-2">
                      <span
                        className={`font-bold ${isSelected ? 'text-indigo-900' : 'text-slate-700'}`}
                      >
                        {c.student.name}
                      </span>
                      <span
                        className={`rounded px-1.5 py-0.5 font-mono text-xs ${
                          c.tier === 'ADVANCED'
                            ? 'bg-orange-100 text-orange-700'
                            : c.tier === 'INTERMEDIATE'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {RECRUITMENT_CONFIG[c.tier].label}
                      </span>
                    </div>
                    <div className="mb-1 flex gap-3 text-xs text-slate-500">
                      <span>天赋: {c.student.talent}</span>
                      <span>能力: {c.student.ability}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {c.student.tags.map((t) => {
                        const tagConfig = TAGS.find((tr) => tr.name === t);
                        return (
                          <div
                            key={t}
                            className="group/tag relative"
                            onMouseEnter={(e) =>
                              tagConfig &&
                              setHoveredTag({
                                config: tagConfig,
                                rect: e.currentTarget.getBoundingClientRect(),
                              })
                            }
                            onMouseLeave={() => setHoveredTag(null)}
                          >
                            <span className="cursor-help rounded-full border border-indigo-100 bg-indigo-50 px-1.5 py-0.5 text-[10px] text-indigo-600 transition-colors hover:bg-indigo-100">
                              {t}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`font-mono font-bold ${isAffordable ? 'text-slate-700' : 'text-red-500'}`}
                    >
                      {formatMoney(c.cost)}
                    </div>
                    {!isQualified && (
                      <div className="flex flex-col items-end text-xs text-red-500">
                        {missingReqs.map((req) => (
                          <span key={req}>需{req}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detail Panel */}
          <div className="flex w-1/3 flex-col bg-slate-50 p-4">
            {selectedCandidates.length > 0 ? (
              <>
                <div className="flex flex-1 flex-col">
                  <h3 className="mb-4 font-bold text-slate-700">
                    已选择 {selectedCandidates.length} 人
                  </h3>

                  <div className="mb-4 flex-1 space-y-2 overflow-y-auto pr-1">
                    {selectedCandidates.map((c) => (
                      <div
                        key={c.student.id}
                        className="rounded border border-slate-200 bg-white p-2 text-sm"
                      >
                        <div className="font-bold">{c.student.name}</div>
                        <div className="mt-1 flex justify-between text-xs text-slate-500">
                          <span>{RECRUITMENT_CONFIG[c.tier].label}</span>
                          <span>{formatMoney(c.cost)}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Custom Name Input (Only if 1 selected) */}
                  {selectedCandidates.length === 1 && (
                    <div className="mb-4">
                      <label className="mb-1 block text-xs font-bold text-slate-500">
                        自定义姓名
                      </label>
                      <input
                        type="text"
                        value={selectedCandidates[0].student.name}
                        onChange={(e) =>
                          updateCandidateName(selectedCandidates[0].student.id, e.target.value)
                        }
                        className={`w-full rounded-lg border px-3 py-2 ${error ? 'border-red-500' : 'border-slate-200'} text-sm focus:border-indigo-500 focus:outline-none`}
                      />
                    </div>
                  )}

                  <div className="mb-4">
                    {error && <div className="mt-1 text-xs text-red-500">{error}</div>}
                  </div>

                  <div className="mt-auto border-t border-slate-200 pt-4">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-slate-500">总费用</span>
                      <span
                        className={`text-xl font-bold ${canAfford ? 'text-indigo-600' : 'text-red-500'}`}
                      >
                        {formatMoney(totalCost)}
                      </span>
                    </div>

                    {!allReqMet && (
                      <div className="mb-2 text-center text-xs text-red-500">
                        部分学生未满足招募要求
                      </div>
                    )}

                    <button
                      onClick={handleRecruit}
                      disabled={!canAfford || !allReqMet}
                      className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 font-bold transition-all ${
                        canAfford && allReqMet
                          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700'
                          : 'cursor-not-allowed bg-slate-200 text-slate-400'
                      } `}
                    >
                      <UserPlus size={18} />
                      {canAfford && allReqMet
                        ? `确认招募 (${selectedCandidates.length}人)`
                        : '无法招募'}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center text-slate-400">
                <UserPlus size={48} className="mb-2 opacity-20" />
                <p>请选择要招募的学生</p>
                <p className="mt-1 text-xs">支持多选</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {hoveredTag && (
        <div
          className="pointer-events-none fixed z-100 w-48 rounded-xl bg-slate-800 p-3 text-xs text-white shadow-xl"
          style={{
            top: hoveredTag.rect.top - 8,
            left: hoveredTag.rect.left + hoveredTag.rect.width / 2,
            transform: 'translate(-50%, -100%)',
          }}
        >
          <div className="mb-1 text-sm font-bold text-indigo-300">{hoveredTag.config.name}</div>
          <div className="leading-relaxed text-slate-300">{hoveredTag.config.desc}</div>
          <div className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-slate-800"></div>
        </div>
      )}
    </div>
  );
};

export default RecruitModal;
