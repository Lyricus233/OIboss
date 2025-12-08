
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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl max-w-md w-full shadow-2xl overflow-hidden transform transition-all scale-100">
        
        {/* Header */}
        <div className={`p-4 text-white flex items-center gap-2
          ${isResult ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : ''}
          ${isEvent ? 'bg-gradient-to-r from-indigo-600 to-purple-600' : ''}
          ${isAlert ? 'bg-gradient-to-r from-red-600 to-pink-600' : ''}
          ${isConfirm ? 'bg-gradient-to-r from-slate-600 to-slate-800' : ''}
        `}>
          {isResult && <Trophy className="w-6 h-6" />}
          {isEvent && <CheckCircle className="w-6 h-6" />}
          {isAlert && <AlertTriangle className="w-6 h-6" />}
          {isConfirm && <HelpCircle className="w-6 h-6" />}
          <h2 className="text-lg font-bold">{config.title}</h2>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="text-gray-700 text-sm leading-relaxed mb-4 whitespace-pre-wrap">
            {config.description}
          </div>
          
          {/* Options (Event or Confirm) */}
          {(isEvent || isConfirm) && config.options && (
            <div className="space-y-2">
              {config.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => onOptionSelect && onOptionSelect(idx)}
                  className={`w-full text-left px-3 py-2 rounded-lg border transition-all duration-200 group relative overflow-hidden
                    ${opt.isDanger 
                      ? 'border-red-100 hover:border-red-500 hover:bg-red-50' 
                      : 'border-gray-100 hover:border-indigo-500 hover:bg-indigo-50'
                    }
                  `}
                >
                  <span className={`relative z-10 font-bold text-sm block
                    ${opt.isDanger ? 'text-red-700 group-hover:text-red-800' : 'text-gray-800 group-hover:text-indigo-700'}
                  `}>
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
              className="w-full py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-bold text-sm transition-colors shadow-md"
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
