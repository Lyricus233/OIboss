import React, { useState } from 'react';
import { PlayCircle } from 'lucide-react';
import { CityTier } from '../types';

interface SetupScreenProps {
  setupForm: {
    bossName: string;
    agencyName: string;
    city: CityTier;
    difficulty: 'easy' | 'normal' | 'hard';
  };
  setSetupForm: React.Dispatch<React.SetStateAction<{
    bossName: string;
    agencyName: string;
    city: CityTier;
    difficulty: 'easy' | 'normal' | 'hard';
  }>>;
  startGame: () => void;
}

const SetupScreen: React.FC<SetupScreenProps> = ({ setupForm, setSetupForm, startGame }) => {
  const [error, setError] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-900">OI 机构老板模拟器</h1>
          <p className="text-1xl mt-2">一觉醒来，你发现自己成了某 OI 培训机构的老板。</p>
          <p className="text-gray-500 text-xm">房租、教练、尖子生、家长群、竞赛成绩、口碑与利润……一切都等你拍板。</p>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-base font-medium text-gray-700 mb-1">机构名称</label>
            <input 
              type="text" 
              value={setupForm.agencyName}
              onChange={e => {
                setSetupForm({...setupForm, agencyName: e.target.value});
                setError('');
              }}
              className={`w-full p-2 border ${error && !setupForm.agencyName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-base`}
            />
          </div>
          <div>
            <label className="block text-base font-medium text-gray-700 mb-1">老板</label>
            <input 
              type="text" 
              value={setupForm.bossName}
              onChange={e => {
                setSetupForm({...setupForm, bossName: e.target.value});
                setError('');
              }}
              className={`w-full p-2 border ${error && !setupForm.bossName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-base`}
            />
          </div>
          <div>
            <label className="block text-base font-medium text-gray-700 mb-1">城市类型</label>
            <select 
              value={setupForm.city}
              onChange={e => setSetupForm({...setupForm, city: e.target.value as CityTier})}
              className="w-full p-2 border border-gray-300 rounded-lg outline-none text-base"
            >
              <option value="TIER1">一线城市 (高风险高回报)</option>
              <option value="PROVINCIAL">省会城市 (标准)</option>
              <option value="REMOTE">地级市 (低成本养老)</option>
            </select>
          </div>
          <div>
            <label className="block text-base font-medium text-gray-700 mb-1">难度</label>
            <select 
              value={setupForm.difficulty}
              onChange={e => setSetupForm({...setupForm, difficulty: e.target.value as 'easy' | 'normal' | 'hard'})}
              className="w-full p-2 border border-gray-300 rounded-lg outline-none text-base"
            >
              <option value="easy">轻松经营 (现金流宽裕)</option>
              <option value="normal">标准模式</option>
              <option value="hard">地狱开局 (现金非常紧张)</option>
            </select>
          </div>
          {error && <div className="text-red-500 text-sm text-center font-bold">{error}</div>}
          <button 
            onClick={() => {
              if (!setupForm.agencyName.trim() || !setupForm.bossName.trim()) {
                setError("请填写完整的机构名称和老板姓名！");
                return;
              }
              startGame();
            }}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl mt-4 flex items-center justify-center gap-2"
          >
            <PlayCircle size={20} /> 开始创业
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetupScreen;
