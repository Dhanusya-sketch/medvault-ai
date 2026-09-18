import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Bell, Globe, User, Shield, Stethoscope, CheckCircle2, 
  ExternalLink, Search, Menu, X, ArrowRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useNotifications } from '../../context/NotificationContext';

export default function TopNav({ onToggleMobileSidebar }) {
  const { user, role, switchRole, logout } = useAuth();
  const { language, changeLanguage, t } = useLanguage();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'ta', label: 'தமிழ் (Tamil)', flag: '🇮🇳' },
    { code: 'hi', label: 'हिन्दी (Hindi)', flag: '🇮🇳' }
  ];

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between shadow-subtle">
      {/* Left: Mobile Hamburger & Search */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative hidden md:block w-72 lg:w-96">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder={t('search_placeholder')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.target.value.trim()) {
                navigate(`/documents?search=${encodeURIComponent(e.target.value.trim())}`);
              }
            }}
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-100/80 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Demo Role Switcher Pill */}
        <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-medium">
          <button
            onClick={() => switchRole('patient')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all ${
              role === 'patient' 
                ? 'bg-white text-cyan-700 shadow-sm font-semibold' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            Patient
          </button>
          <button
            onClick={() => switchRole('doctor')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all ${
              role === 'doctor' 
                ? 'bg-white text-cyan-700 shadow-sm font-semibold' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5" />
            Doctor Portal
          </button>
        </div>

        {/* Language Selector */}
        <div className="relative">
          <button
            onClick={() => {
              setShowLangMenu(!showLangMenu);
              setShowNotifications(false);
              setShowUserMenu(false);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <Globe className="w-4 h-4 text-cyan-600" />
            <span className="font-semibold uppercase">{language}</span>
          </button>

          {showLangMenu && (
            <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-premium border border-slate-100 py-1.5 z-50 animate-in fade-in zoom-in-95">
              <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Select Language
              </div>
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    changeLanguage(l.code);
                    setShowLangMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition-colors ${
                    language === l.code ? 'font-bold text-cyan-600 bg-cyan-50/50' : 'text-slate-700'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{l.flag}</span>
                    <span>{l.label}</span>
                  </span>
                  {language === l.code && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowLangMenu(false);
              setShowUserMenu(false);
            }}
            className="relative p-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4 text-slate-600" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-premium border border-slate-100 z-50 overflow-hidden animate-in fade-in zoom-in-95">
              <div className="p-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-cyan-600" />
                  <span className="text-xs font-bold text-slate-900">Notifications</span>
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-100 text-cyan-800">
                    {unreadCount} new
                  </span>
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-[11px] font-medium text-cyan-600 hover:text-cyan-700"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-400">
                    No new notifications
                  </div>
                ) : (
                  notifications.slice(0, 5).map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        markAsRead(n.id);
                        if (n.link_route) navigate(n.link_route);
                        setShowNotifications(false);
                      }}
                      className={`p-3 text-left hover:bg-slate-50 transition-colors cursor-pointer flex gap-3 ${
                        !n.is_read ? 'bg-cyan-50/30' : ''
                      }`}
                    >
                      <span className={`w-2 h-2 mt-1.5 rounded-full flex-shrink-0 ${
                        n.type === 'REMINDER' ? 'bg-rose-500' :
                        n.type === 'DOCUMENT' ? 'bg-cyan-500' : 'bg-slate-400'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-800 truncate">{n.title}</p>
                        <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">{n.message}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="p-2 border-t border-slate-100 text-center bg-slate-50/50">
                <Link
                  to="/notifications"
                  onClick={() => setShowNotifications(false)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-600 hover:text-cyan-700"
                >
                  View All Notifications
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* User Avatar Menu */}
        <div className="relative">
          <button
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowLangMenu(false);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-600 to-teal-500 text-white flex items-center justify-center font-bold text-xs shadow-sm">
              {role === 'doctor' ? 'DR' : 'SJ'}
            </div>
            <div className="hidden xl:block text-left">
              <p className="text-xs font-bold text-slate-800 leading-tight">
                {role === 'doctor' ? 'Dr. Robert Chen' : 'Sarah Jenkins'}
              </p>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">
                {role === 'doctor' ? 'Cardiologist' : 'Patient • MV-89241'}
              </p>
            </div>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-premium border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-900">
                  {role === 'doctor' ? 'Dr. Robert Chen, MD' : 'Sarah Jenkins'}
                </p>
                <p className="text-[11px] text-slate-500 truncate">
                  {role === 'doctor' ? 'dr.chen@beaconhealth.org' : 'sarah.jenkins@example.com'}
                </p>
              </div>

              <div className="py-1">
                <Link
                  to="/profile"
                  onClick={() => setShowUserMenu(false)}
                  className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                >
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  {t('profile')}
                </Link>
                <Link
                  to="/settings"
                  onClick={() => setShowUserMenu(false)}
                  className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                >
                  <Shield className="w-3.5 h-3.5 text-slate-400" />
                  {t('settings')}
                </Link>
              </div>

              <div className="border-t border-slate-100 pt-1">
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 font-medium"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
