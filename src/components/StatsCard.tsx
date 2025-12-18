import React from 'react';

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  colorClass?: string;
  subValue?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  label,
  value,
  icon,
  colorClass = 'text-gray-900',
  subValue,
}) => {
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <div>
        <p className="text-xs font-semibold tracking-wider text-gray-500 uppercase">{label}</p>
        <p className={`mt-1 text-xl font-bold ${colorClass}`}>{value}</p>
        {subValue && <p className="mt-1 text-xs text-gray-400">{subValue}</p>}
      </div>
      <div className="rounded-lg bg-gray-50 p-3 text-gray-600">{icon}</div>
    </div>
  );
};

export default StatsCard;
