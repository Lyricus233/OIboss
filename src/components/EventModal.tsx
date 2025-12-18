import React from 'react';
import { ModalConfig } from '../types';
import { CheckCircle, AlertTriangle, Trophy, HelpCircle } from 'lucide-react';

interface ModalProps {
  config: ModalConfig;
  onOptionSelect?: (index: number) => void;
  onClose?: () => void;
}

const Modal: React.FC<ModalProps> = ({ config, onOptionSelect, onClose }) => {
  const isResult = config.type === 'RESULT';
  const isEvent = config.type === 'EVENT';
  const isAlert = config.type === 'ALERT';
  const isConfirm = config.type === 'CONFIRM';

  return (
    <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm duration-200">
      <div className="w-full max-w-md scale-100 transform overflow-hidden rounded-xl bg-white shadow-2xl transition-all">
        {/* Header */}
        <div
          className={`flex items-center gap-2 p-4 text-white ${isResult ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : ''} ${isEvent ? 'bg-gradient-to-r from-indigo-600 to-purple-600' : ''} ${isAlert ? 'bg-gradient-to-r from-red-600 to-pink-600' : ''} ${isConfirm ? 'bg-gradient-to-r from-slate-600 to-slate-800' : ''} `}
        >
          {isResult && <Trophy className="h-6 w-6" />}
          {isEvent && <CheckCircle className="h-6 w-6" />}
          {isAlert && <AlertTriangle className="h-6 w-6" />}
          {isConfirm && <HelpCircle className="h-6 w-6" />}
          <h2 className="text-lg font-bold">{config.title}</h2>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="mb-4 text-sm leading-relaxed whitespace-pre-wrap text-gray-700">
            {config.description}
          </div>

          {/* Options (Event or Confirm) */}
          {(isEvent || isConfirm) && config.options && (
            <div className="space-y-2">
              {config.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => onOptionSelect && onOptionSelect(idx)}
                  className={`group relative w-full overflow-hidden rounded-lg border px-3 py-2 text-left transition-all duration-200 ${
                    opt.isDanger
                      ? 'border-red-100 hover:border-red-500 hover:bg-red-50'
                      : 'border-gray-100 hover:border-indigo-500 hover:bg-indigo-50'
                  } `}
                >
                  <span
                    className={`relative z-10 block text-sm font-bold ${opt.isDanger ? 'text-red-700 group-hover:text-red-800' : 'text-gray-800 group-hover:text-indigo-700'} `}
                  >
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Close Button for Results/Alerts */}
          {(isResult || isAlert) && (
            <button
              onClick={onClose}
              className="w-full rounded-lg bg-gray-900 py-2 text-sm font-bold text-white shadow-md transition-colors hover:bg-gray-800"
            >
              确认 / 好的
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
