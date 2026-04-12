import React from 'react';
import { GameState } from '../types';
import { formatMoney } from '../../utils';
import { X, TrendingUp, TrendingDown } from 'lucide-react';

interface InvestmentModalProps {
  gameState: GameState;
  onClose: () => void;
  onBuy: (symbol: string, shares: number) => void;
  onSell: (symbol: string, shares: number) => void;
}

const InvestmentModal: React.FC<InvestmentModalProps> = ({ gameState, onClose, onBuy, onSell }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
        >
          <X size={20} />
        </button>

        <h2 className="mb-4 text-2xl font-bold text-slate-800">股市风云</h2>

        <div className="mb-6 grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-sm text-slate-500">当前资金</div>
            <div className="text-xl font-bold text-slate-800">{formatMoney(gameState.cash)}</div>
          </div>
        </div>

        <div className="space-y-4">
          {gameState.stocks.map((stock) => {
            const owned = gameState.ownedStocks[stock.symbol] || 0;
            const prevPrice =
              stock.history.length > 1 ? stock.history[stock.history.length - 2] : stock.price;
            const diff = stock.price - prevPrice;
            const isUp = diff >= 0;

            return (
              <div
                key={stock.symbol}
                className="flex items-center justify-between rounded-xl border border-slate-200 p-4"
              >
                <div>
                  <div className="text-lg font-bold text-slate-800">
                    {stock.name} ({stock.symbol})
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-mono text-lg font-bold">¥{stock.price.toFixed(2)}</span>
                    <span
                      className={`flex items-center text-xs font-bold ${isUp ? 'text-red-500' : 'text-green-500'}`}
                    >
                      {isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                      {Math.abs(diff).toFixed(2)} ({((Math.abs(diff) / prevPrice) * 100).toFixed(2)}
                      %)
                    </span>
                  </div>
                  <div className="mt-1 text-sm text-slate-500">已持有: {owned} 股</div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => onBuy(stock.symbol, 100)}
                    disabled={gameState.cash < stock.price * 100}
                    className="rounded-lg bg-red-100 px-4 py-2 font-bold text-red-600 transition-colors hover:bg-red-200 disabled:opacity-50"
                  >
                    买入100股
                  </button>
                  <button
                    onClick={() => onSell(stock.symbol, owned)}
                    disabled={owned === 0}
                    className="rounded-lg bg-green-100 px-4 py-2 font-bold text-green-600 transition-colors hover:bg-green-200 disabled:opacity-50"
                  >
                    全部抛售
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InvestmentModal;
