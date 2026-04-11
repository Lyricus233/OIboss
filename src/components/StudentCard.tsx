import React, { useState } from 'react';
import { Student } from '../types';
import { Edit2, DollarSign, Trash2, Award } from 'lucide-react';
import { calculateTuition } from '../hooks/useGameLogic';
import { TAGS } from '../constants';

interface StudentCardProps {
  student: Student;
  onRename: (newName: string) => void;
  onDismiss?: () => void;
  hideContestStatus?: boolean;
  onToggleRecommendation?: () => void;
  canRecommend?: boolean;
  isRecommended?: boolean;
}

const getAbilityColor = (ability: number) => {
  if (ability >= 90) return 'text-red-500';
  if (ability >= 80) return 'text-orange-500';
  if (ability >= 60) return 'text-purple-600';
  if (ability >= 40) return 'text-blue-600';
  return 'text-slate-500';
};

const StudentCard: React.FC<StudentCardProps> = ({
  student,
  onRename,
  onDismiss,
  hideContestStatus,
  onToggleRecommendation,
  canRecommend,
  isRecommended,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(student.name);
  const [hoveredTag, setHoveredTag] = useState<{
    config: (typeof TAGS)[0];
    rect: DOMRect;
  } | null>(null);

  React.useEffect(() => {
    setEditName(student.name);
  }, [student.name]);

  const handleSave = () => {
    if (editName.trim() && editName !== student.name) {
      onRename(editName.trim());
    } else {
      setEditName(student.name);
    }
    setIsEditing(false);
  };

  return (
    <div className="group relative flex shrink-0 flex-col gap-1.5 rounded-xl border border-slate-200 bg-white p-2.5 shadow-sm transition-all hover:shadow-md">
      <div
        className={`absolute top-0 bottom-0 left-0 w-1 rounded-l-xl ${student.tier === 'ADVANCED' ? 'bg-purple-500' : student.tier === 'INTERMEDIATE' ? 'bg-orange-400' : 'bg-blue-400'}`}
      />

      <div className="flex items-start justify-between pl-2">
        <div className="flex w-full flex-col gap-1">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-1.5">
              {isEditing ? (
                <input
                  autoFocus
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  onBlur={handleSave}
                  onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                  className="w-20 border-b border-indigo-500 bg-transparent p-0 text-sm font-bold text-slate-700 outline-none"
                />
              ) : (
                <h3
                  className="group/name flex cursor-pointer items-center gap-1 text-sm font-bold text-slate-800"
                  onClick={() => setIsEditing(true)}
                >
                  <span className="max-w-[70px] truncate">{student.name}</span>
                  <Edit2
                    size={14}
                    className="text-slate-400 opacity-0 transition-opacity group-hover/name:opacity-50"
                  />
                </h3>
              )}

              {/* Status Tags next to the name */}
              {!hideContestStatus && (
                <div className="flex items-center gap-1">
                  {isRecommended ? (
                    <span
                      className="rounded-sm border border-emerald-200 bg-emerald-50 px-1 py-0.5 text-[10px] font-bold text-emerald-700"
                      title="已推荐"
                    >
                      已推荐
                    </span>
                  ) : student.lastAdvancementContest ? (
                    (() => {
                      const getDisplayContest = (contest: string, status: string) => {
                        let name = contest;
                        if (status === 'PASSED') {
                          const nextMap: Record<string, string> = {
                            'CSP-J/S 第一轮': 'CSP-J/S 第二轮',
                            'CSP-J/S 第二轮': 'NOIP',
                            NOIP: '省选',
                            省队选拔: 'NOI',
                            NOI: 'CTS',
                            'CTS (国家队选拔)': 'IOI',
                            IOI: 'IOI',
                          };
                          name = nextMap[contest] || contest;
                        }
                        return name
                          .replace(' (国家队选拔)', '')
                          .replace(' 第一轮', '1')
                          .replace(' 第二轮', '2')
                          .replace('省队选拔', '省选');
                      };
                      const displayContest = getDisplayContest(
                        student.lastAdvancementContest,
                        student.lastAdvancementStatus || ''
                      );
                      return (
                        <span
                          className={`truncate rounded-sm border px-1 py-0.5 text-[10px] font-bold ${
                            student.lastAdvancementStatus === 'PASSED'
                              ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                              : 'border-red-200 bg-red-50 text-red-700'
                          }`}
                          title={`${student.lastAdvancementStatus === 'PASSED' ? '已晋级' : '未过线'}: ${displayContest}`}
                        >
                          {student.lastAdvancementStatus === 'PASSED' ? '晋级' : '未晋级'}{' '}
                          {displayContest}
                        </span>
                      );
                    })()
                  ) : (
                    <span className="rounded-sm border border-slate-200 bg-slate-50 px-1 py-0.5 text-[10px] font-bold text-slate-500">
                      未参赛
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-1">
              {student.tags.map((t) => {
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
                    <span className="cursor-help rounded bg-indigo-50 px-1.5 py-0.5 text-[10px] font-medium text-indigo-600 transition-colors hover:bg-indigo-100">
                      {t}
                    </span>
                  </div>
                );
              })}
              {canRecommend && onToggleRecommendation && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleRecommendation();
                  }}
                  className={`flex items-center justify-center rounded p-1 transition-colors ${
                    isRecommended
                      ? 'bg-orange-100 text-orange-600 hover:bg-orange-200'
                      : 'text-slate-300 hover:bg-orange-50 hover:text-orange-500'
                  }`}
                  title={isRecommended ? '取消推荐' : '给予推荐名额'}
                >
                  <Award size={16} />
                </button>
              )}
              {onDismiss && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDismiss();
                  }}
                  className="rounded p-1 text-slate-300 transition-colors hover:bg-red-50 hover:text-red-500"
                  title="劝退学生"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1" title="学生综合能力值">
              <span className="text-xs font-medium text-slate-400">能力</span>
              <span
                className={`text-2xl leading-none font-black tracking-tight ${getAbilityColor(student.ability)}`}
              >
                {student.ability.toFixed(0)}
              </span>
            </div>

            {!hideContestStatus && (
              <div className="flex max-w-[120px] flex-wrap justify-end gap-1">
                <span
                  className={`rounded-sm px-1.5 py-0.5 text-[10px] font-bold ${
                    student.tier === 'ADVANCED'
                      ? 'border border-purple-200 bg-purple-50 text-purple-700'
                      : student.tier === 'INTERMEDIATE'
                        ? 'border border-orange-200 bg-orange-50 text-orange-700'
                        : 'border border-blue-200 bg-blue-50 text-blue-700'
                  }`}
                >
                  {student.tier === 'ADVANCED'
                    ? '省选组'
                    : student.tier === 'INTERMEDIATE'
                      ? '提高组'
                      : '普及组'}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-0.5 space-y-1.5 pl-2">
        <div className="flex items-center gap-1.5">
          <span
            className={`w-5 text-[9px] ${student.mood < 40 ? 'font-bold text-red-500' : 'text-slate-400'}`}
          >
            心情
          </span>
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-slate-100">
            <div
              className={`h-full rounded-full ${student.mood < 40 ? 'bg-red-400' : 'bg-emerald-400'}`}
              style={{ width: `${student.mood}%` }}
            />
          </div>
          <span className="w-5 text-right text-[9px] text-slate-500">
            {student.mood.toFixed(0)}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className={`w-5 text-[9px] ${student.stress > 80 ? 'font-bold text-red-500' : 'text-slate-400'}`}
          >
            压力
          </span>
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-slate-100">
            <div
              className={`h-full rounded-full ${student.stress > 80 ? 'bg-red-500' : 'bg-blue-300'}`}
              style={{ width: `${student.stress}%` }}
            />
          </div>
          <span className="w-5 text-right text-[9px] text-slate-500">
            {student.stress.toFixed(0)}
          </span>
        </div>
      </div>

      <div className="mt-0.5 flex items-center justify-between pl-2">
        <div className="flex items-center gap-0.5 text-[10px] text-slate-500">
          <DollarSign size={14} className="text-emerald-600" />
          <span>
            学费: <span className="font-bold text-emerald-700">¥{calculateTuition(student)}</span>
          </span>
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

export default StudentCard;
