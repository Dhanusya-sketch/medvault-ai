import React, { useState, useEffect } from 'react';
import { 
  Clock, CheckCircle2, Calendar, AlertCircle, 
  Bell, Mail, MessageSquare, Plus, Check, ShieldCheck, ExternalLink
} from 'lucide-react';
import { api } from '../services/api';
import { useNotifications } from '../context/NotificationContext';
import EvidenceBadge from '../components/common/EvidenceBadge';

export default function Reminders() {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'upcoming', 'completed'
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newDoctor, setNewDoctor] = useState('');
  const { showToast } = useNotifications();

  const loadReminders = async () => {
    setLoading(true);
    try {
      const data = await api.getReminders(filter);
      setReminders(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReminders();
  }, [filter]);

  const handleMarkComplete = async (id) => {
    await api.updateReminderStatus(id, 'completed');
    setReminders(prev => prev.map(r => r.id === id ? { ...r, status: 'completed' } : r));
    showToast('Reminder marked as completed!', 'success');
  };

  const handleCreateReminder = async (e) => {
    e.preventDefault();
    if (!newTitle || !newDate) return;

    const created = await api.createReminder({
      title: newTitle,
      due_date: newDate,
      doctor: newDoctor || 'Attending Physician',
      category: 'follow_up',
      facility: 'Primary Clinic',
      channels: { in_app: true, email: true, sms: false }
    });

    setReminders(prev => [created, ...prev]);
    setShowAddModal(false);
    setNewTitle('');
    setNewDate('');
    setNewDoctor('');
    showToast('New follow-up reminder created!');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-600 font-bold text-xs uppercase tracking-wider mb-0.5">
            <Clock className="w-3.5 h-3.5" />
            <span>Automated Clinical Deadlines</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Reminders & Follow-Ups</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Auto-detected from consultation notes, discharge plans, and prescription review instructions.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-500 hover:to-teal-400 text-white rounded-xl text-xs font-bold shadow-md shadow-cyan-500/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Custom Reminder</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs font-bold w-fit">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-lg transition-all ${
            filter === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
          }`}
        >
          All ({reminders.length})
        </button>
        <button
          onClick={() => setFilter('upcoming')}
          className={`px-3 py-1.5 rounded-lg transition-all ${
            filter === 'upcoming' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
          }`}
        >
          Upcoming
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-3 py-1.5 rounded-lg transition-all ${
            filter === 'completed' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
          }`}
        >
          Completed
        </button>
      </div>

      {/* Reminders List */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-28 bg-white rounded-2xl border border-slate-200 animate-pulse" />
          ))}
        </div>
      ) : reminders.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center max-w-md mx-auto">
          <Clock className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No reminders found</h3>
          <p className="text-xs text-slate-500 mt-1">All your medical follow-ups are up to date.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reminders.map((rem) => {
            const isCompleted = rem.status === 'completed';

            return (
              <div
                key={rem.id}
                className={`p-5 rounded-2xl border transition-all ${
                  isCompleted
                    ? 'bg-slate-50/70 border-slate-200 opacity-80'
                    : 'bg-white border-slate-200/80 shadow-subtle hover:border-cyan-300'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        isCompleted
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className={`text-sm font-bold ${isCompleted ? 'text-slate-500 line-through' : 'text-slate-900'}`}>
                          {rem.title}
                        </h3>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                            isCompleted
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-900'
                          }`}
                        >
                          {rem.status}
                        </span>
                      </div>

                      <p className="text-xs text-slate-500 mt-0.5">
                        Due: <span className="font-bold text-slate-800">{rem.due_date}</span>
                        {rem.doctor && ` • ${rem.doctor}`}
                        {rem.facility && ` (${rem.facility})`}
                      </p>

                      {rem.notes && (
                        <p className="text-xs text-slate-600 mt-1.5 italic bg-slate-50 p-2 rounded-lg border border-slate-100">
                          "{rem.notes}"
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 self-end sm:self-auto flex-shrink-0">
                    {!isCompleted && (
                      <button
                        onClick={() => handleMarkComplete(rem.id)}
                        className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Mark Complete</span>
                      </button>
                    )}
                    {rem.evidence_id && (
                      <EvidenceBadge evidenceId={rem.evidence_id} pageNumber={rem.source_page} />
                    )}
                  </div>
                </div>

                {/* Footer Channels & Cadence */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-slate-700">Dispatch Channels:</span>
                    <span className="flex items-center gap-1">🔔 In-App</span>
                    <span className={`flex items-center gap-1 ${rem.channels?.email ? 'text-slate-700 font-semibold' : 'opacity-40'}`}>
                      📧 Email {rem.channels?.email ? '✓' : ''}
                    </span>
                    <span className={`flex items-center gap-1 ${rem.channels?.sms ? 'text-slate-700 font-semibold' : 'opacity-40'}`}>
                      📱 SMS {rem.channels?.sms ? '✓' : ''}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[10px] text-slate-400">
                    <span>Cadence: 7-day • 1-day • On due date</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Reminder Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 w-full max-w-md space-y-4">
            <h3 className="text-base font-bold text-slate-900">Schedule Clinical Reminder</h3>
            <form onSubmit={handleCreateReminder} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Reminder Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="e.g., Annual Cardiology Review"
                  required
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Due Date</label>
                <input
                  type="date"
                  value={newDate}
                  onChange={e => setNewDate(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Physician / Clinic</label>
                <input
                  type="text"
                  value={newDoctor}
                  onChange={e => setNewDoctor(e.target.value)}
                  placeholder="e.g., Dr. Elena Rostova"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl text-xs font-bold shadow"
                >
                  Save Reminder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
