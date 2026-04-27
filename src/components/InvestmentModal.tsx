import React, { useMemo, useState } from 'react';
import { GameState } from '../types';
import { formatMoney } from '../utils/format';
import { Minus, Plus, TrendingDown, TrendingUp, Wallet, X } from 'lucide-react';

interface InvestmentModalProps {
  gameState: GameState;
  onClose: () => void;
  onBuy: (symbol: string, shares: number) => void;
  onSell: (symbol: string, shares: number) => void;
}

const Sparkline: React.FC<{ data: number[]; isUp: boolean }> = ({ data, isUp }) => {
  if (!data.length) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = Math.max(0.01, max - min);
  const w = 80;
  const h = 28;
  const step = data.length > 1 ? w / (data.length - 1) : 0;
  const points = data
    .map((v, i) => `${(i * step).toFixed(2)},${(h - ((v - min) / range) * h).toFixed(2)}`)
    .join(' ');
  const stroke = isUp ? '#ef4444' : '#22c55e';

  return (
    <svg width={w} height={h} className="overflow-visible">
      <polyline
        fill="none"
        stroke={stroke}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
};

const InvestmentModal: React.FC<InvestmentModalProps> = ({ gameState, onClose, onBuy, onSell }) => {
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const setQty = (symbol: string, value: number) => {
    setQuantities((prev) => ({ ...prev, [symbol]: Math.max(0, Math.floor(value)) }));
  };

  const adjustQty = (symbol: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [symbol]: Math.max(0, (prev[symbol] || 0) + delta),
    }));
  };

  const { portfolio, totalCost } = useMemo(() => {
    let value = 0;
    let cost = 0;
    gameState.stocks.forEach((stock) => {
      const owned = gameState.ownedStocks[stock.symbol] || 0;
      value += owned * stock.price;
      const basis = gameState.stockCostBasis?.[stock.symbol];
      if (basis) cost += basis.totalCost;
    });
    return { portfolio: value, totalCost: cost };
  }, [gameState.stocks, gameState.ownedStocks, gameState.stockCostBasis]);

  const totalAssets = gameState.cash + portfolio;
  const floatingPnL = portfolio - totalCost;
  const floatingPct = totalCost > 0 ? (floatingPnL / totalCost) * 100 : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-linear-to-r from-slate-50 to-white p-5">
          <div>
            <h2 className="text-xl font-bold text-slate-800">📈 股市风云</h2>
            <p className="mt-0.5 text-xs text-slate-500">买涨买跌，全凭手感</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={20} />
          </button>
        </div>

        {/* Account summary */}
        <div className="grid shrink-0 grid-cols-3 gap-3 border-b border-slate-100 bg-slate-50/60 p-4">
          <div className="rounded-xl border border-slate-200 bg-white p-3">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
              <Wallet size={12} /> 现金
            </div>
            <div className="mt-1 font-mono text-lg font-bold text-slate-800">
              {formatMoney(gameState.cash)}
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-3">
            <div className="flex items-center justify-between text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
              <span>持仓市值</span>
              {totalCost > 0 && (
                <span
                  className={`rounded px-1.5 py-0.5 text-[10px] ${
                    floatingPnL >= 0
                      ? 'bg-red-50 text-red-600'
                      : 'bg-green-50 text-green-600'
                  }`}
                >
                  {floatingPnL >= 0 ? '+' : ''}
                  {floatingPct.toFixed(2)}%
                </span>
              )}
            </div>
            <div className="mt-1 font-mono text-lg font-bold text-indigo-600">
              {formatMoney(portfolio)}
            </div>
            {totalCost > 0 && (
              <div
                className={`mt-0.5 font-mono text-[11px] ${
                  floatingPnL >= 0 ? 'text-red-500' : 'text-green-500'
                }`}
              >
                浮动 {floatingPnL >= 0 ? '+' : ''}
                {formatMoney(floatingPnL)}
              </div>
            )}
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-3">
            <div className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
              总资产
            </div>
            <div className="mt-1 font-mono text-lg font-bold text-emerald-600">
              {formatMoney(totalAssets)}
            </div>
          </div>
        </div>

        {/* Stock list */}
        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {gameState.stocks.map((stock) => {
            const owned = gameState.ownedStocks[stock.symbol] || 0;
            const prevPrice =
              stock.history.length > 1 ? stock.history[stock.history.length - 2] : stock.price;
            const diff = stock.price - prevPrice;
            const pct = prevPrice > 0 ? (diff / prevPrice) * 100 : 0;
            const isUp = diff >= 0;
            const qty = quantities[stock.symbol] || 0;
            const tradeValue = qty * stock.price;
            const maxBuy = Math.floor(gameState.cash / stock.price);
            const marketValue = owned * stock.price;
            const canBuy = qty > 0 && qty <= maxBuy;
            const canSell = qty > 0 && qty <= owned;
            const basis = gameState.stockCostBasis?.[stock.symbol];
            const avgCost = basis && basis.shares > 0 ? basis.totalCost / basis.shares : 0;
            const stockPnL = owned > 0 && avgCost > 0 ? (stock.price - avgCost) * owned : 0;
            const stockPnLPct = avgCost > 0 ? ((stock.price - avgCost) / avgCost) * 100 : 0;

            return (
              <div
                key={stock.symbol}
                className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition-shadow hover:shadow-md"
              >
                {/* Top: price + name + sparkline */}
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-base font-bold text-slate-800">{stock.name}</span>
                      <span className="font-mono text-xs text-slate-400">{stock.symbol}</span>
                    </div>
                    <div className="mt-0.5 flex items-baseline gap-2">
                      <span className="font-mono text-xl font-bold text-slate-900">
                        ¥{stock.price.toFixed(2)}
                      </span>
                      <span
                        className={`flex items-center gap-0.5 text-xs font-bold ${
                          isUp ? 'text-red-500' : 'text-green-500'
                        }`}
                      >
                        {isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                        {isUp ? '+' : '-'}
                        {Math.abs(diff).toFixed(2)} ({isUp ? '+' : '-'}
                        {Math.abs(pct).toFixed(2)}%)
                      </span>
                    </div>
                  </div>
                  <Sparkline data={stock.history} isUp={isUp} />
                  <div className="w-28 shrink-0 text-right">
                    <div className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                      持仓
                    </div>
                    <div className="font-mono text-sm font-bold text-slate-800">{owned} 股</div>
                    <div className="font-mono text-[11px] text-slate-500">
                      {formatMoney(marketValue)}
                    </div>
                    {owned > 0 && avgCost > 0 && (
                      <>
                        <div className="mt-0.5 font-mono text-[10px] text-slate-400">
                          成本 ¥{avgCost.toFixed(2)}
                        </div>
                        <div
                          className={`font-mono text-[11px] font-bold ${
                            stockPnL >= 0 ? 'text-red-500' : 'text-green-500'
                          }`}
                        >
                          {stockPnL >= 0 ? '+' : ''}
                          {formatMoney(stockPnL)} ({stockPnL >= 0 ? '+' : ''}
                          {stockPnLPct.toFixed(2)}%)
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Bottom: quantity controls + actions */}
                <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3">
                  <div className="flex items-center overflow-hidden rounded-lg border border-slate-200">
                    <button
                      onClick={() => adjustQty(stock.symbol, -1)}
                      className="px-2 py-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
                      title="-1"
                    >
                      <Minus size={14} />
                    </button>
                    <input
                      type="number"
                      min={0}
                      value={qty}
                      onChange={(e) => setQty(stock.symbol, parseInt(e.target.value) || 0)}
                      className="w-20 [appearance:textfield] border-0 bg-transparent px-1 py-1 text-center font-mono text-sm font-bold text-slate-800 outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    />
                    <button
                      onClick={() => adjustQty(stock.symbol, 1)}
                      className="px-2 py-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
                      title="+1"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <div className="flex gap-1">
                    {[10, 100, 1000].map((step) => (
                      <button
                        key={step}
                        onClick={() => adjustQty(stock.symbol, step)}
                        className="rounded-md border border-slate-200 px-2 py-1 text-xs font-medium text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50"
                      >
                        +{step}
                      </button>
                    ))}
                    <button
                      onClick={() => setQty(stock.symbol, maxBuy)}
                      disabled={maxBuy === 0}
                      className="rounded-md border border-red-200 bg-red-50 px-2 py-1 text-xs font-medium text-red-600 transition-colors hover:bg-red-100 disabled:opacity-40"
                      title={`按现金可买 ${maxBuy} 股`}
                    >
                      满仓
                    </button>
                    <button
                      onClick={() => setQty(stock.symbol, owned)}
                      disabled={owned === 0}
                      className="rounded-md border border-green-200 bg-green-50 px-2 py-1 text-xs font-medium text-green-600 transition-colors hover:bg-green-100 disabled:opacity-40"
                    >
                      持仓
                    </button>
                  </div>

                  <div className="ml-auto text-right">
                    <div className="text-[10px] text-slate-400">成交额</div>
                    <div className="font-mono text-sm font-bold text-slate-700">
                      {formatMoney(tradeValue)}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        if (!canBuy) return;
                        onBuy(stock.symbol, qty);
                        setQty(stock.symbol, 0);
                      }}
                      disabled={!canBuy}
                      className="rounded-lg bg-red-500 px-4 py-1.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-red-600 active:scale-95 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
                    >
                      买入
                    </button>
                    <button
                      onClick={() => {
                        if (!canSell) return;
                        onSell(stock.symbol, qty);
                        setQty(stock.symbol, 0);
                      }}
                      disabled={!canSell}
                      className="rounded-lg bg-green-500 px-4 py-1.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-green-600 active:scale-95 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
                    >
                      卖出
                    </button>
                  </div>
                </div>

                {qty > 0 && qty > maxBuy && qty > owned && (
                  <div className="mt-2 text-[11px] text-amber-600">
                    现金不足且持仓不足。可买上限 {maxBuy} 股，可卖上限 {owned} 股。
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InvestmentModal;
