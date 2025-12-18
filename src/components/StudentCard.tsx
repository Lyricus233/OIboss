import React, { useState } from 'react';
import { Student } from '../types';
import { Edit2, DollarSign, Trash2 } from 'lucide-react';
import { calculateTuition } from '../hooks/useGameLogic';
import { TAGS } from '../constants';

interface StudentCardProps {
  student: Student;
  onRename: (newName: string) => void;
  onDismiss?: () => void;
}

const StudentCard: React.FC<StudentCardProps> = ({ student, onRename, onDismiss }) => {
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
    <div className="group relative shrink-0 rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition-all hover:shadow-md">
      <div
        className={`absolute top-0 bottom-0 left-0 w-1 rounded-l-xl ${
          student.gender === 'M' ? 'bg-blue-400' : 'bg-pink-400'
        }`}
      />
      <div className="mb-2 flex items-center justify-between pl-2">
        <div className="flex items-center gap-2">
          {isEditing ? (
            <input
              autoFocus
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onBlur={handleSave}
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              className="w-24 border-b border-indigo-500 bg-transparent p-0 text-base font-bold text-slate-700 outline-none"
            />
          ) : (
            <h3
              className="group/name flex cursor-pointer items-center gap-2 text-base font-bold text-slate-700"
              onClick={() => setIsEditing(true)}
            >
              {student.name}
              <Edit2 size={12} className="text-slate-400 opacity-0 group-hover/name:opacity-50" />
            </h3>
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
                <span className="cursor-help rounded-full border border-indigo-100 bg-indigo-50 px-1.5 py-0.5 text-[10px] text-indigo-600 transition-colors hover:bg-indigo-100">
                  {t}
                </span>
              </div>
            );
          })}
          {onDismiss && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDismiss();
              }}
              className="ml-1 rounded p-1 text-slate-300 transition-colors hover:bg-red-50 hover:text-red-500"
              title="劝退学生"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      </div>

      <div className="mb-2 space-y-1 pl-2">
        <div className="flex items-center gap-2">
          <span className="w-6 text-[10px] text-slate-400">能力</span>
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-indigo-400"
              style={{ width: `${Math.min(100, student.ability)}%` }}
            />
          </div>
          <span className="w-6 text-right text-[10px] text-slate-500">
            {student.ability.toFixed(0)}
          </span>
        </div>
      </div>

      <div className="mb-2 flex items-center gap-1 rounded bg-slate-50 p-1 pl-2 text-xs text-slate-500">
        <DollarSign size={12} className="text-emerald-600" />
        <span>
          周学费贡献:{' '}
          <span className="font-bold text-emerald-700">¥{calculateTuition(student)}</span>
        </span>
      </div>

      <div className="space-y-1 pl-2">
        <div className="flex items-center gap-2">
          <span
            className={`w-6 text-[10px] ${student.mood < 40 ? 'font-bold text-red-500' : 'text-slate-400'}`}
          >
            心情
          </span>
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
            <div
              className={`h-full rounded-full ${student.mood < 40 ? 'bg-red-400' : 'bg-emerald-400'}`}
              style={{ width: `${student.mood}%` }}
            />
          </div>
          <span className="w-6 text-right text-[10px] text-slate-500">
            {student.mood.toFixed(0)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`w-6 text-[10px] ${student.stress > 80 ? 'font-bold text-red-500' : 'text-slate-400'}`}
          >
            压力
          </span>
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
            <div
              className={`h-full rounded-full ${student.stress > 80 ? 'bg-red-500' : 'bg-blue-300'}`}
              style={{ width: `${student.stress}%` }}
            />
          </div>
          <span className="w-6 text-right text-[10px] text-slate-500">
            {student.stress.toFixed(0)}
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
