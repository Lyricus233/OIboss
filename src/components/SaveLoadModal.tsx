import React, { useState } from 'react';
import { X, Copy, Download, Upload, Check, AlertCircle, FileJson } from 'lucide-react';
import { GameState } from '../types';
import { exportGameState, importGameState } from '../utils/saveLoad';

interface SaveLoadModalProps {
  gameState: GameState;
  onClose: () => void;
  onImport: (newState: GameState) => void;
}

const SaveLoadModal: React.FC<SaveLoadModalProps> = ({ gameState, onClose, onImport }) => {
  const [activeTab, setActiveTab] = useState<'export' | 'import'>('export');
  const [importData, setImportData] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCopy = async () => {
    const data = exportGameState(gameState);
    try {
      await navigator.clipboard.writeText(data);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      setError('复制失败，请手动复制');
    }
  };

  const handleImport = () => {
    if (!importData.trim()) {
      setError('请输入存档数据');
      return;
    }

    const newState = importGameState(importData);
    if (newState) {
      onImport(newState);
      onClose();
    } else {
      setError('存档数据无效或已损坏');
    }
  };

  return (
    <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm duration-200">
      <div className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black/5">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-6 py-4">
          <div className="flex items-center gap-2 text-slate-800">
            <div className="rounded-lg bg-indigo-100 p-2 text-indigo-600">
              <FileJson size={20} />
            </div>
            <h2 className="text-xl font-bold">存档管理</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-100 px-6">
          <button
            onClick={() => {
              setActiveTab('export');
              setError(null);
            }}
            className={`flex flex-1 items-center justify-center gap-2 border-b-2 py-3 text-sm font-medium transition-colors ${
              activeTab === 'export'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Download size={16} />
            导出进度
          </button>
          <button
            onClick={() => {
              setActiveTab('import');
              setError(null);
            }}
            className={`flex flex-1 items-center justify-center gap-2 border-b-2 py-3 text-sm font-medium transition-colors ${
              activeTab === 'import'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Upload size={16} />
            导入进度
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'export' ? (
            <div className="space-y-4">
              <div className="flex gap-2 rounded-lg border border-amber-100 bg-amber-50 p-4 text-sm text-amber-800">
                <AlertCircle className="shrink-0" size={16} />
                <p>
                  请妥善保管您的存档代码。您可以将其保存在文本文件中，以便在其他设备或浏览器中恢复进度。
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">存档代码</label>
                <div className="relative">
                  <textarea
                    readOnly
                    value={exportGameState(gameState)}
                    className="h-48 w-full resize-none rounded-lg border border-slate-200 bg-slate-50 p-3 pr-12 font-mono text-xs text-slate-600 focus:border-indigo-500 focus:outline-none"
                    onClick={(e) => e.currentTarget.select()}
                  />
                  <div className="absolute top-3 right-3">
                    <button
                      onClick={handleCopy}
                      className={`flex h-8 w-8 items-center justify-center rounded-md border shadow-sm transition-all ${
                        copySuccess
                          ? 'border-green-200 bg-green-50 text-green-600'
                          : 'border-slate-200 bg-white text-slate-500 hover:border-indigo-200 hover:text-indigo-600'
                      }`}
                      title="复制到剪贴板"
                    >
                      {copySuccess ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex gap-2 rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm text-blue-800">
                <AlertCircle className="shrink-0" size={16} />
                <p>
                  粘贴存档代码以恢复进度。<strong>警告：这将覆盖当前的进度！</strong>
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">粘贴存档代码</label>
                <textarea
                  value={importData}
                  onChange={(e) => {
                    setImportData(e.target.value);
                    setError(null);
                  }}
                  placeholder="在此处粘贴存档代码..."
                  className="h-48 w-full resize-none rounded-lg border border-slate-200 p-3 font-mono text-xs text-slate-800 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}

              <button
                onClick={handleImport}
                disabled={!importData.trim()}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Upload size={16} />
                确认导入并覆盖
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SaveLoadModal;
