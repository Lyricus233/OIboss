import React, { useState } from 'react';
import { Student } from '../types';
import { Edit2, DollarSign, Trash2 } from 'lucide-react';
import { calculateTuition } from '../hooks/useGameLogic';

interface StudentCardProps {
  student: Student;
  onRename: (newName: string) => void;
  onDismiss?: () => void;
}

const StudentCard: React.FC<StudentCardProps> = ({ student, onRename, onDismiss }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(student.name);

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
    <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-all shrink-0">
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${
        student.gender === 'M' ? 'bg-blue-400' : 'bg-pink-400'
      }`} />
      <div className="flex justify-between items-center mb-2 pl-2">
        <div className="flex items-center gap-2">
          {isEditing ? (
            <input 
              autoFocus
              value={editName}
              onChange={e => setEditName(e.target.value)}
              onBlur={handleSave}
              onKeyDown={e => e.key === 'Enter' && handleSave()}
              className="font-bold text-slate-700 text-base w-24 p-0 border-b border-indigo-500 outline-none bg-transparent"
            />
          ) : (
            <h3 className="font-bold text-slate-700 text-base flex items-center gap-2 group/name cursor-pointer" onClick={() => setIsEditing(true)}>
              {student.name}
              <Edit2 size={12} className="opacity-0 group-hover/name:opacity-50 text-slate-400" />
            </h3>
          )}
        </div>
        <div className="flex gap-1 items-center">
          {student.traits.map(t => (
            <span key={t} className="text-[10px] px-1.5 py-0.5 bg-indigo-50 text-indigo-600 rounded-full border border-indigo-100">
              {t}
            </span>
          ))}
          {onDismiss && (
            <button 
              onClick={(e) => { e.stopPropagation(); onDismiss(); }}
              className="ml-1 p-1 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
              title="劝退学生"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      </div>
      
      <div className="pl-2 mb-2 space-y-1">
        <div className="flex items-center gap-2">
           <span className="text-[10px] text-slate-400 w-6">能力</span>
           <div className="flex-1 bg-slate-100 h-1.5 rounded-full overflow-hidden">
             <div className="h-full rounded-full bg-indigo-400" style={{ width: `${Math.min(100, student.ability)}%` }} />
           </div>
           <span className="text-[10px] text-slate-500 w-6 text-right">{student.ability.toFixed(0)}</span>
        </div>
      </div>

      <div className="pl-2 mb-2 flex items-center gap-1 text-xs text-slate-500 bg-slate-50 p-1 rounded">
         <DollarSign size={12} className="text-emerald-600"/>
         <span>周学费贡献: <span className="font-bold text-emerald-700">¥{calculateTuition(student)}</span></span>
      </div>

      <div className="pl-2 space-y-1">
        <div className="flex items-center gap-2">
           <span className={`text-[10px] w-6 ${student.mood < 40 ? 'text-red-500 font-bold' : 'text-slate-400'}`}>心情</span>
           <div className="flex-1 bg-slate-100 h-1.5 rounded-full overflow-hidden">
             <div className={`h-full rounded-full ${student.mood < 40 ? 'bg-red-400' : 'bg-emerald-400'}`} style={{ width: `${student.mood}%` }} />
           </div>
        </div>
        <div className="flex items-center gap-2">
           <span className={`text-[10px] w-6 ${student.stress > 80 ? 'text-red-500 font-bold' : 'text-slate-400'}`}>压力</span>
           <div className="flex-1 bg-slate-100 h-1.5 rounded-full overflow-hidden">
             <div className={`h-full rounded-full ${student.stress > 80 ? 'bg-red-500' : 'bg-blue-300'}`} style={{ width: `${student.stress}%` }} />
           </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
