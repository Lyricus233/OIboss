import React, { useState } from 'react';
import { PlayCircle, MapPin, ChevronDown } from 'lucide-react';
import { CityTier } from '../types';
import { PROVINCES } from '../constants';

interface SetupScreenProps {
  setupForm: {
    bossName: string;
    agencyName: string;
    city: CityTier;
    province: string;
    difficulty: 'easy' | 'normal' | 'hard';
  };
  setSetupForm: React.Dispatch<React.SetStateAction<{
    bossName: string;
    agencyName: string;
    city: CityTier;
    province: string;
    difficulty: 'easy' | 'normal' | 'hard';
  }>>;
  startGame: () => void;
}

const SetupScreen: React.FC<SetupScreenProps> = ({ setupForm, setSetupForm, startGame }) => {
  const [error, setError] = useState('');

  const selectedProvince = PROVINCES.find(p => p.id === setupForm.province);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-6xl flex gap-8 h-[80vh]">
        {/* Left Column: Basic Info */}
        <div className="w-5/12 space-y-5 flex flex-col h-full overflow-y-auto px-2 py-1">
          <div className="text-left mb-4 shrink-0">
            <h1 className="text-3xl font-bold text-indigo-900">OI 机构老板模拟器</h1>
            <p className="text-gray-500 text-sm mt-2">一觉醒来，你发现自己成了某 OI 培训机构的老板。</p>
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">机构名称</label>
            <input 
              type="text" 
              value={setupForm.agencyName}
              onChange={e => {
                setSetupForm({...setupForm, agencyName: e.target.value});
                setError('');
              }}
              className={`w-full p-3 border ${error && !setupForm.agencyName ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none appearance-none`}
              placeholder="例如：萌猫信奥"
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">老板昵称</label>
            <input 
              type="text" 
              value={setupForm.bossName}
              onChange={e => {
                setSetupForm({...setupForm, bossName: e.target.value});
                setError('');
              }}
              className={`w-full p-3 border ${error && !setupForm.bossName ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none appearance-none`}
              placeholder="例如：飓风王金"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">城市规模</label>
            <div className="relative">
              <select 
                value={setupForm.city}
                onChange={e => setSetupForm({...setupForm, city: e.target.value as CityTier})}
                className="w-full p-3 pr-10 border border-gray-300 rounded-xl outline-none bg-white appearance-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="TIER1">一线城市 (高风险高回报)</option>
                <option value="PROVINCIAL">省会城市 (标准)</option>
                <option value="REMOTE">地级市 (低成本养老)</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">游戏难度</label>
            <div className="relative">
              <select 
                value={setupForm.difficulty}
                onChange={e => setSetupForm({...setupForm, difficulty: e.target.value as 'easy' | 'normal' | 'hard'})}
                className="w-full p-3 pr-10 border border-gray-300 rounded-xl outline-none bg-white appearance-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="easy">轻松经营 (现金流宽裕)</option>
                <option value="normal">标准模式</option>
                <option value="hard">地狱开局 (现金非常紧张)</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
            </div>
          </div>

          {selectedProvince && (
            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 shrink-0">
              <div className="flex items-center gap-2 text-indigo-900 font-bold mb-1">
                <MapPin size={16} />
                <span>已选：{selectedProvince.name}</span>
              </div>
              <p className="text-xs text-indigo-700 mb-2">{selectedProvince.desc}</p>
              <div className="text-xs space-y-1">
                {selectedProvince.buff?.talent !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">生源天赋</span>
                    <span className={selectedProvince.buff.talent > 0 ? "text-green-600 font-bold" : "text-red-500 font-bold"}>
                      {selectedProvince.buff.talent > 0 ? '+' : ''}{selectedProvince.buff.talent}
                    </span>
                  </div>
                )}
                {selectedProvince.buff?.money !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">初始资金</span>
                    <span className={selectedProvince.buff.money > 0 ? "text-green-600 font-bold" : "text-red-500 font-bold"}>
                      {selectedProvince.buff.money > 0 ? '+' : ''}{selectedProvince.buff.money}
                    </span>
                  </div>
                )}
                {selectedProvince.buff?.reputation !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">初始声望</span>
                    <span className={selectedProvince.buff.reputation > 0 ? "text-green-600 font-bold" : "text-red-500 font-bold"}>
                      {selectedProvince.buff.reputation > 0 ? '+' : ''}{selectedProvince.buff.reputation}
                    </span>
                  </div>
                )}
                 {selectedProvince.buff?.stress !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">初始压力</span>
                    <span className={selectedProvince.buff.stress < 0 ? "text-green-600 font-bold" : "text-red-500 font-bold"}>
                      {selectedProvince.buff.stress > 0 ? '+' : ''}{selectedProvince.buff.stress}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="mt-auto pt-4">
            {error && <div className="text-red-500 text-sm font-bold animate-pulse mb-2 text-center">{error}</div>}
            <button 
              onClick={() => {
                if (!setupForm.agencyName.trim() || !setupForm.bossName.trim()) {
                  setError("请填写完整的机构名称和老板姓名！");
                  return;
                }
                if (!setupForm.province) {
                  setError("请选择一个省份！");
                  return;
                }
                startGame();
              }}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <PlayCircle size={20} /> 开始创业
            </button>
          </div>
        </div>

        {/* Right Column: Province Selection */}
        <div className="flex-1 bg-slate-50 rounded-xl border border-slate-200 overflow-hidden flex flex-col">
          <div className="p-6 pb-4 bg-slate-50 border-b border-slate-100 shrink-0">
            <h3 className="text-lg font-bold text-slate-700 flex items-center gap-2">
              <MapPin className="text-indigo-500" />
              选择创业省份
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto p-6 pt-4 custom-scrollbar">
            <div className="grid grid-cols-4 gap-3">
              {PROVINCES.map(p => (
                <button
                  key={p.id}
                  disabled={p.disabled}
                  onClick={() => {
                    setSetupForm({...setupForm, province: p.id});
                    setError('');
                  }}
                  title={p.disabled ? "暂未开放" : p.desc}
                  className={`
                    relative p-3 rounded-xl text-sm font-bold transition-all border-2 text-left h-20 flex flex-col justify-between group
                    ${p.disabled 
                      ? 'bg-slate-100 border-slate-100 text-slate-300 cursor-not-allowed' 
                      : setupForm.province === p.id 
                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg scale-105 z-10' 
                        : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300 hover:bg-indigo-50 hover:shadow-md'
                    }
                  `}
                >
                  <span className="text-base">{p.name}</span>
                  {!p.disabled && (
                    <span className={`text-[10px] font-normal ${setupForm.province === p.id ? 'text-indigo-100' : 'text-slate-400'}`}>
                      {p.type === 'strong' ? '🔥 强省' : p.type === 'medium' ? '⚖️ 均衡' : '🌱 潜力'}
                    </span>
                  )}
                  {p.disabled && (
                     <span className="text-[10px] font-normal">暂未开放</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupScreen;
