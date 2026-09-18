import React, { useState, useEffect } from 'react';
import { 
  Settings as SettingsIcon, Bell, Shield, Globe, 
  Lock, Check, Clock, Database, UserCheck, AlertTriangle
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useNotifications } from '../context/NotificationContext';
import { api } from '../services/api';

export default function Settings() {
  const { language, changeLanguage } = useLanguage();
  const { showToast } = useNotifications();

  // Settings states
  const [channels, setChannels] = useState({
    in_app: true,
    email: true,
    sms: false
  });

  const [reminderCadence, setReminderCadence] = useState({
    sevenDays: true,
    oneDay: true,
    onDue: true
  });

  const [auditLogs, setAuditLogs] = useState([]);

  useEffect(() => {
    async function loadLogs() {
      try {
        const logs = await api.getAuditLogs();
        setAuditLogs(logs);
      } catch (err) {
        console.warn("Audit logs error:", err);
      }
    }
    loadLogs();
  }, []);

  const handleSavePreferences = () => {
    showToast('Preferences updated successfully!', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <div className="flex items-center gap-2 text-cyan-600 font-bold text-xs uppercase tracking-wider mb-0.5">
          <SettingsIcon className="w-3.5 h-3.5" />
          <span>System & Preferences</span>
        </div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Settings & Security</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Configure notification dispatch, reminders timing, multilingual options, and review audit logs.
        </p>
      </div>

      {/* 1. Notification Channels */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-subtle space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-900 pb-3 border-b border-slate-100">
          <Bell className="w-4 h-4 text-cyan-600" />
          <span>Notification Channels</span>
        </div>

        <div className="space-y-3">
          <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100/70 transition-colors cursor-pointer text-xs">
            <div>
              <span className="font-bold text-slate-800 block">In-App Alerts</span>
              <span className="text-slate-500 text-[11px]">Real-time bell notifications and dashboard widgets.</span>
            </div>
            <input
              type="checkbox"
              checked={channels.in_app}
              onChange={e => setChannels({ ...channels, in_app: e.target.checked })}
              className="w-4 h-4 accent-cyan-600 rounded"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100/70 transition-colors cursor-pointer text-xs">
            <div>
              <span className="font-bold text-slate-800 block">Email Reminders</span>
              <span className="text-slate-500 text-[11px]">Dispatch scheduled notifications to sarah.jenkins@example.com</span>
            </div>
            <input
              type="checkbox"
              checked={channels.email}
              onChange={e => setChannels({ ...channels, email: e.target.checked })}
              className="w-4 h-4 accent-cyan-600 rounded"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100/70 transition-colors cursor-pointer text-xs">
            <div>
              <span className="font-bold text-slate-800 block">SMS Alerts (Demo Mode)</span>
              <span className="text-slate-500 text-[11px]">Simulated text messaging to +1 (555) 234-5678</span>
            </div>
            <input
              type="checkbox"
              checked={channels.sms}
              onChange={e => setChannels({ ...channels, sms: e.target.checked })}
              className="w-4 h-4 accent-cyan-600 rounded"
            />
          </label>
        </div>
      </div>

      {/* 2. Reminder Lead Times */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-subtle space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-900 pb-3 border-b border-slate-100">
          <Clock className="w-4 h-4 text-amber-600" />
          <span>Follow-up Alert Timings</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100/70 cursor-pointer">
            <span className="font-semibold text-slate-800">7 Days Before</span>
            <input
              type="checkbox"
              checked={reminderCadence.sevenDays}
              onChange={e => setReminderCadence({ ...reminderCadence, sevenDays: e.target.checked })}
              className="w-4 h-4 accent-cyan-600 rounded"
            />
          </label>
          <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100/70 cursor-pointer">
            <span className="font-semibold text-slate-800">1 Day Before</span>
            <input
              type="checkbox"
              checked={reminderCadence.oneDay}
              onChange={e => setReminderCadence({ ...reminderCadence, oneDay: e.target.checked })}
              className="w-4 h-4 accent-cyan-600 rounded"
            />
          </label>
          <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100/70 cursor-pointer">
            <span className="font-semibold text-slate-800">On Due Date</span>
            <input
              type="checkbox"
              checked={reminderCadence.onDue}
              onChange={e => setReminderCadence({ ...reminderCadence, onDue: e.target.checked })}
              className="w-4 h-4 accent-cyan-600 rounded"
            />
          </label>
        </div>

        <button
          onClick={handleSavePreferences}
          className="px-4 py-2 bg-slate-900 text-white hover:bg-slate-800 rounded-xl text-xs font-bold transition-colors"
        >
          Save Alert Preferences
        </button>
      </div>

      {/* 3. HIPAA Audit Trail View */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-subtle space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span>Immutable Audit Trail</span>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
            HIPAA Compliant Logging
          </span>
        </div>

        <p className="text-xs text-slate-500">
          Every document access, patient login, AI extraction, and evidence view is logged with timestamps and user identifiers.
        </p>

        <div className="divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden">
          {auditLogs.map((log) => (
            <div key={log.id} className="p-3 bg-slate-50/50 flex items-center justify-between text-xs">
              <div className="min-w-0">
                <span className="font-bold text-slate-800">{log.action}</span>
                <span className="text-slate-400 block text-[10px]">
                  User: {log.user_id} ({log.user_role}) • Target: {log.resource_type}
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
