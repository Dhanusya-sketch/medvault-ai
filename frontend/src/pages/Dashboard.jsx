import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FileText, Calendar, Clock, Bell, Sparkles, ArrowRight, 
  UploadCloud, TrendingUp, ShieldCheck, ChevronRight, Activity, 
  MessageSquare, Stethoscope, AlertTriangle, CheckCircle2, HeartPulse
} from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import EvidenceBadge from '../components/common/EvidenceBadge';

export default function Dashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [anData, docData, remData, timeData] = await Promise.all([
          api.getAnalytics(),
          api.getDocuments(),
          api.getReminders('upcoming'),
          api.getTimeline()
        ]);
        setAnalytics(anData);
        setDocuments(docData.slice(0, 4));
        setReminders(remData.slice(0, 3));
        setEvents(timeData.events.slice(0, 4));
      } catch (e) {
        console.warn("Dashboard data fetch error:", e);
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, []);

  const patientName = user?.first_name ? `${user.first_name} ${user.last_name}` : 'Sarah Jenkins';

  return (
    <div className="space-y-6">
      {/* 1. Greeting & Quick Action Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-subtle">
        <div>
          <div className="flex items-center gap-2 text-cyan-600 font-bold text-xs uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
            <span>MedVault OS Active</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Good morning, {patientName} 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            "Your medical records, intelligently organized."
          </p>
        </div>

        {/* Global Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            to="/documents/upload"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-500 hover:to-teal-400 shadow-md shadow-cyan-500/20 transition-all hover:scale-[1.02]"
          >
            <UploadCloud className="w-4 h-4" />
            <span>{t('upload_doc')}</span>
          </Link>
          <Link
            to="/timeline"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>{t('view_timeline')}</span>
          </Link>
          <Link
            to="/analytics"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <TrendingUp className="w-3.5 h-3.5 text-slate-500" />
            <span>{t('view_analytics')}</span>
          </Link>
          <Link
            to="/chat"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-cyan-700 bg-cyan-50 border border-cyan-200 hover:bg-cyan-100 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
            <span>{t('ask_ai')}</span>
          </Link>
        </div>
      </div>

      {/* 2. Four Clickable Quick-Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          onClick={() => navigate('/documents')}
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-subtle hover:shadow-card hover:border-cyan-300 transition-all text-left group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-slate-400 group-hover:text-cyan-600 flex items-center gap-0.5">
              View <ChevronRight className="w-3 h-3" />
            </span>
          </div>
          <p className="text-2xl font-black text-slate-900 tracking-tight">15</p>
          <p className="text-xs font-medium text-slate-500 mt-0.5">📄 Documents Ingested</p>
        </button>

        <button
          onClick={() => navigate('/timeline')}
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-subtle hover:shadow-card hover:border-teal-300 transition-all text-left group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Calendar className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-slate-400 group-hover:text-teal-600 flex items-center gap-0.5">
              View <ChevronRight className="w-3 h-3" />
            </span>
          </div>
          <p className="text-2xl font-black text-slate-900 tracking-tight">32</p>
          <p className="text-xs font-medium text-slate-500 mt-0.5">🧠 Medical Events</p>
        </button>

        <button
          onClick={() => navigate('/reminders')}
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-subtle hover:shadow-card hover:border-amber-300 transition-all text-left group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-slate-400 group-hover:text-amber-600 flex items-center gap-0.5">
              View <ChevronRight className="w-3 h-3" />
            </span>
          </div>
          <p className="text-2xl font-black text-slate-900 tracking-tight">3</p>
          <p className="text-xs font-medium text-slate-500 mt-0.5">⏰ Upcoming Follow-ups</p>
        </button>

        <button
          onClick={() => navigate('/notifications')}
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-subtle hover:shadow-card hover:border-indigo-300 transition-all text-left group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Bell className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-slate-400 group-hover:text-indigo-600 flex items-center gap-0.5">
              View <ChevronRight className="w-3 h-3" />
            </span>
          </div>
          <p className="text-2xl font-black text-slate-900 tracking-tight">5</p>
          <p className="text-xs font-medium text-slate-500 mt-0.5">🔔 Notifications</p>
        </button>
      </div>

      {/* 3. Main Row: AI Record Overview Card & Upcoming Reminders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Record Overview Card */}
        <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950 text-white p-6 sm:p-7 rounded-2xl shadow-premium relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                <span>✨ {t('ai_record_overview')}</span>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">Auto-Synthesized from 15 Records</span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug">
              32 medical events identified across your historical and active clinical records.
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
              Fasting metabolic profile shows mild elevated cholesterol (210 mg/dL) with ongoing Atorvastatin therapy.
              Blood pressure has responded favorably to Amlodipine 5mg monotherapy, stabilizing at 124/78 mmHg.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-3 border-t border-slate-800 text-xs">
              <div className="flex items-start gap-2.5">
                <FileText className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[11px]">Latest Record Ingested:</span>
                  <span className="font-semibold text-white">Blood Test • 10 September 2026</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[11px]">Next Clinical Follow-up:</span>
                  <span className="font-semibold text-white">Cardiology Review • 02 October 2026</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              100% Grounded on verified documents
            </span>
            <Link
              to="/timeline"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-300 hover:text-white transition-colors group"
            >
              <span>View Timeline</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Upcoming Reminders Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-subtle flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-600" />
                <h3 className="font-bold text-sm text-slate-900">Upcoming Reminders</h3>
              </div>
              <Link to="/reminders" className="text-xs font-semibold text-cyan-600 hover:underline">
                View All
              </Link>
            </div>

            <div className="space-y-3">
              {reminders.map((r) => (
                <div key={r.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 hover:border-slate-300 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-xs font-bold text-slate-800 leading-snug">{r.title}</p>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 flex-shrink-0">
                      {r.due_date}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 truncate">
                    {r.doctor} • {r.facility}
                  </p>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/60">
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-medium">
                      <span>🔔 In-App</span>
                      {r.channels?.email && <span>📧 Email</span>}
                      {r.channels?.sms && <span>📱 SMS</span>}
                    </div>
                    {r.evidence_id && (
                      <EvidenceBadge evidenceId={r.evidence_id} pageNumber={r.source_page} size="xs" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link
            to="/reminders"
            className="mt-4 w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold text-center transition-colors block"
          >
            Manage All Deadlines →
          </Link>
        </div>
      </div>

      {/* 4. Second Row: Recent Documents & Medical Trends Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Documents Table/Cards */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-subtle">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-600" />
              <h3 className="font-bold text-sm text-slate-900">{t('recent_documents')}</h3>
            </div>
            <Link to="/documents" className="text-xs font-semibold text-cyan-600 hover:underline">
              View All 15 Records
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {documents.map((doc) => (
              <div
                key={doc.id}
                onClick={() => navigate(`/documents/${doc.id}`)}
                className="py-3 px-2 flex items-center justify-between hover:bg-slate-50/80 rounded-xl transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-cyan-50 border border-cyan-100 text-cyan-700 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-800 group-hover:text-cyan-600 truncate transition-colors">
                      {doc.original_file_name || doc.file_name}
                    </p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                      <span className="font-medium text-slate-600">{doc.document_type}</span>
                      <span>•</span>
                      <span>{doc.document_date}</span>
                      <span>•</span>
                      <span>{doc.page_count} page(s)</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3" />
                    {t('status_processed')}
                  </span>
                  <span className="text-slate-400 group-hover:text-cyan-600 p-1">
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">Need to ingest a new lab report or prescription?</span>
            <Link
              to="/documents/upload"
              className="text-xs font-bold text-cyan-600 hover:text-cyan-700 inline-flex items-center gap-1"
            >
              Upload Document <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* AI Assistant Quick Prompt Card */}
        <div className="bg-gradient-to-br from-cyan-50/70 to-teal-50/70 border border-cyan-100 p-6 rounded-2xl shadow-subtle flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-cyan-800 font-bold text-xs uppercase tracking-wide mb-2">
              <Sparkles className="w-4 h-4 text-cyan-600" />
              <span>Ask MedVault AI</span>
            </div>
            <h4 className="text-base font-extrabold text-slate-900 leading-snug">
              Instant answers backed by original document evidence.
            </h4>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              Ask about medications, lab changes, or follow-up schedules in English, Tamil, or Hindi.
            </p>

            <div className="mt-4 space-y-2">
              {[
                t('suggested_q1'),
                t('suggested_q2'),
                t('suggested_q3')
              ].map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => navigate(`/chat?prompt=${encodeURIComponent(q)}`)}
                  className="w-full text-left p-2 rounded-xl bg-white border border-cyan-200/80 hover:border-cyan-400 text-slate-700 text-xs font-medium shadow-subtle hover:shadow transition-all flex items-center justify-between group"
                >
                  <span className="truncate">{q}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-cyan-600 group-hover:translate-x-0.5 transition-transform" />
                </button>
              ))}
            </div>
          </div>

          <Link
            to="/chat"
            className="mt-5 w-full py-2.5 px-4 bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-500 hover:to-teal-400 text-white rounded-xl text-xs font-bold shadow-md shadow-cyan-500/20 text-center transition-all block"
          >
            Open Full AI Chat Assistant
          </Link>
        </div>
      </div>
    </div>
  );
}
