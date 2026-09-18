import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  Home, FileText, Calendar, BarChart3, MessageSquare, 
  Clock, Bell, Settings, User, Stethoscope, ShieldCheck,
  UploadCloud, X, ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useNotifications } from '../../context/NotificationContext';

export default function Sidebar({ isMobileOpen, onCloseMobile }) {
  const { role } = useAuth();
  const { t } = useLanguage();
  const { unreadCount } = useNotifications();

  const patientNavItems = [
    { to: '/dashboard', icon: Home, label: t('dashboard') },
    { to: '/documents', icon: FileText, label: t('documents'), count: '15' },
    { to: '/timeline', icon: Calendar, label: t('timeline'), count: '32' },
    { to: '/analytics', icon: BarChart3, label: t('analytics') },
    { to: '/chat', icon: MessageSquare, label: t('ai_chat'), highlight: true },
    { to: '/reminders', icon: Clock, label: t('reminders'), count: '3' },
    { to: '/notifications', icon: Bell, label: t('notifications'), badge: unreadCount },
  ];

  const doctorNavItems = [
    { to: '/doctor', icon: Home, label: 'Doctor Overview' },
    { to: '/doctor/patients', icon: Stethoscope, label: 'Patient Directory', count: '18' },
    { to: '/timeline', icon: Calendar, label: 'Patient Timeline' },
    { to: '/analytics', icon: BarChart3, label: 'Clinical Analytics' },
    { to: '/chat', icon: MessageSquare, label: 'Clinical AI QA' },
  ];

  const navItems = role === 'doctor' ? doctorNavItems : patientNavItems;

  const sidebarContent = (
    <div className="flex flex-col h-full bg-slate-900 text-slate-200">
      {/* Brand Header */}
      <div className="h-16 px-6 flex items-center justify-between border-b border-slate-800">
        <Link to="/dashboard" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight text-white flex items-center gap-1">
              MEDVAULT <span className="text-cyan-400 font-black">AI</span>
            </span>
            <span className="block text-[9px] uppercase tracking-widest text-slate-400 font-semibold">
              Clinical Intelligence
            </span>
          </div>
        </Link>
        {isMobileOpen && (
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Quick Action: Upload */}
      <div className="px-4 pt-4 pb-2">
        <Link
          to="/documents/upload"
          onClick={onCloseMobile}
          className="flex items-center justify-center gap-2 w-full py-2.5 px-3 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-white rounded-xl text-xs font-bold shadow-md shadow-cyan-500/20 transition-all hover:scale-[1.02]"
        >
          <UploadCloud className="w-4 h-4" />
          <span>{t('upload_doc')}</span>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
        <div className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          {role === 'doctor' ? 'Clinical Navigation' : 'Patient Navigation'}
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-300 font-semibold border-l-4 border-cyan-400 pl-2 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${item.highlight ? 'text-cyan-400 animate-pulse' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-rose-500 text-white">
                  {item.badge}
                </span>
              )}
              {item.count && !item.badge && (
                <span className="text-[10px] text-slate-400 font-medium bg-slate-800 px-1.5 py-0.5 rounded-md">
                  {item.count}
                </span>
              )}
            </NavLink>
          );
        })}

        <div className="pt-4 px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          System
        </div>

        <NavLink
          to="/settings"
          onClick={onCloseMobile}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
              isActive
                ? 'bg-cyan-500/15 text-cyan-300 font-semibold border-l-4 border-cyan-400 pl-2'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`
          }
        >
          <Settings className="w-4 h-4 text-slate-400" />
          <span>{t('settings')}</span>
        </NavLink>
      </nav>

      {/* Patient Footer Pill */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/40">
        <Link
          to="/profile"
          onClick={onCloseMobile}
          className="flex items-center justify-between p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition-colors group"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-cyan-600/30 border border-cyan-500/40 text-cyan-300 flex items-center justify-center font-bold text-xs">
              {role === 'doctor' ? 'DOC' : 'PAT'}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-200 truncate">
                {role === 'doctor' ? 'Dr. Robert Chen' : 'Sarah Jenkins'}
              </p>
              <p className="text-[10px] text-slate-400 truncate">
                {role === 'doctor' ? 'Internal Medicine' : 'MRN: MV-89241'}
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-64 h-screen sticky top-0 flex-shrink-0 z-40 border-r border-slate-800">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="fixed inset-y-0 left-0 w-72 max-w-[85vw] shadow-2xl z-50">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
