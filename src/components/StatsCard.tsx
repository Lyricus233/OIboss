import React from 'react';

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  colorClass?: string;
  subValue?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ label, value, icon, colorClass = "text-gray-900", subValue }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
      <div>
        <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">{label}</p>
        <p className={`text-xl font-bold mt-1 ${colorClass}`}>{value}</p>
        {subValue && <p className="text-xs text-gray-400 mt-1">{subValue}</p>}
      </div>
      <div className="p-3 bg-gray-50 rounded-lg text-gray-600">
        {icon}
      </div>
    </div>
  );
};

export default StatsCard;