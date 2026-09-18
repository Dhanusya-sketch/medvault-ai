import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, CheckCircle2, Clock, FileText, Info, 
  Sparkles, Check, ArrowRight, ShieldAlert 
} from 'lucide-react';
import { useNotifications } from '../context/NotificationContext';

export default function Notifications() {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const [filterType, setFilterType] = useState('ALL');
  const navigate = useNavigate();

  const filtered = filterType === 'ALL'
    ? notifications
    : notifications.filter(n => n.type === filterType);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'REMINDER': return <Clock className="w-5 h-5 text-rose-600" />;
      case 'DOCUMENT': return <FileText className="w-5 h-5 text-cyan-600" />;
      case 'SYSTEM': return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
      default: return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-600 font-bold text-xs uppercase tracking-wider mb-0.5">
            <Bell className="w-3.5 h-3.5" />
            <span>Audit & Event Alerts</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Notification Center</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Stay informed on processed reports, upcoming follow-ups, and systemic updates.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition-colors self-start sm:self-auto flex items-center gap-1.5 shadow-sm"
          >
            <Check className="w-4 h-4 text-cyan-600" />
            <span>Mark All as Read</span>
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs font-bold w-fit overflow-x-auto">
        {['ALL', 'REMINDER', 'DOCUMENT', 'INFO', 'SYSTEM'].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              filterType === type ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
            }`}
          >
            {type === 'ALL' ? 'All Alerts' : type}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-subtle divide-y divide-slate-100 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs">
            <Bell className="w-10 h-10 mx-auto text-slate-300 mb-2" />
            No notifications in this category.
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                markAsRead(item.id);
                if (item.link_route) navigate(item.link_route);
              }}
              className={`p-4 sm:p-5 flex items-start justify-between gap-4 transition-colors cursor-pointer group ${
                !item.is_read ? 'bg-cyan-50/30 hover:bg-cyan-50/50' : 'hover:bg-slate-50/80'
              }`}
            >
              <div className="flex items-start gap-3.5 min-w-0">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  item.type === 'REMINDER' ? 'bg-rose-50 border border-rose-200' :
                  item.type === 'DOCUMENT' ? 'bg-cyan-50 border border-cyan-200' : 'bg-slate-100'
                }`}>
                  {getNotificationIcon(item.type)}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-cyan-600 transition-colors">
                      {item.title}
                    </h3>
                    {!item.is_read && (
                      <span className="w-2 h-2 rounded-full bg-cyan-500 flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {item.message}
                  </p>
                  <span className="text-[10px] text-slate-400 mt-1.5 block">
                    {new Date(item.created_at || Date.now()).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0 pt-1">
                {item.link_route && (
                  <span className="text-xs font-bold text-cyan-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    View <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
