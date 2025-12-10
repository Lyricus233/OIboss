import React, { useEffect } from 'react';
import { Notification } from '../types';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

interface NotificationContainerProps {
  notifications: Notification[];
  onRemove: (id: string) => void;
}

const NotificationItem: React.FC<{ notification: Notification; onRemove: (id: string) => void }> = ({ notification, onRemove }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(notification.id);
    }, 3000);

    return () => clearTimeout(timer);
  }, [notification.id, onRemove]);

  const icons = {
    success: <CheckCircle className="w-6 h-6 text-green-500" />,
    error: <AlertCircle className="w-6 h-6 text-red-500" />,
    warning: <AlertTriangle className="w-6 h-6 text-yellow-500" />,
    info: <Info className="w-6 h-6 text-blue-500" />
  };

  const bgColors = {
    success: 'bg-green-50 border-green-100',
    error: 'bg-red-50 border-red-100',
    warning: 'bg-yellow-50 border-yellow-100',
    info: 'bg-blue-50 border-blue-100'
  };

  return (
    <div className={`flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg border-2 ${bgColors[notification.type]} min-w-[320px] animate-in slide-in-from-right duration-300`}>
      {icons[notification.type]}
      <p className="flex-1 text-base font-bold text-slate-800">{notification.message}</p>
      <button 
        onClick={() => onRemove(notification.id)}
        className="text-slate-500 hover:text-slate-700 transition-colors p-1 hover:bg-black/5 rounded-full"
      >
        <X size={18} />
      </button>
    </div>
  );
};

const NotificationContainer: React.FC<NotificationContainerProps> = ({ notifications, onRemove }) => {
  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      <div className="pointer-events-auto flex flex-col gap-2">
        {notifications.map(note => (
          <NotificationItem key={note.id} notification={note} onRemove={onRemove} />
        ))}
      </div>
    </div>
  );
};

export default NotificationContainer;
