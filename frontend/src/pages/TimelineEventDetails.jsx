import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Calendar, ArrowLeft, ShieldCheck, FileText, 
  Building2, User, Activity, ExternalLink, ChevronRight, Sparkles
} from 'lucide-react';
import { api } from '../services/api';
import EvidenceBadge from '../components/common/EvidenceBadge';

export default function TimelineEventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEvent() {
      setLoading(true);
      try {
        const ev = await api.getTimelineEventById(id);
        setEvent(ev);
      } finally {
        setLoading(false);
      }
    }
    loadEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto py-8 space-y-4">
        <div className="h-8 w-40 bg-slate-200 rounded-lg animate-pulse" />
        <div className="h-48 bg-white rounded-2xl border border-slate-200 animate-pulse" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="max-w-md mx-auto py-16 text-center">
        <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <h2 className="text-lg font-bold text-slate-800">Event not found</h2>
        <Link to="/timeline" className="mt-3 text-cyan-600 font-bold text-xs hover:underline block">
          ← Back to Timeline
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/timeline')}
          className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-cyan-100 text-cyan-800 tracking-wider">
            {event.category}
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
            {event.title}
          </h1>
        </div>
      </div>

      {/* Main Details Card */}
      <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-subtle space-y-5">
        <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-100 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Event Date</span>
            <span className="font-bold text-slate-800">{event.date}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Severity Classification</span>
            <span className="font-bold capitalize text-slate-800">{event.severity || 'Normal'}</span>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
            Clinical Narrative
          </h3>
          <p className="text-sm leading-relaxed text-slate-700">
            {event.description}
          </p>
        </div>

        {/* Source Document Reference */}
        {event.document_name && (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-cyan-100 text-cyan-700 flex items-center justify-center flex-shrink-0 font-bold text-xs">
                <FileText className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-800 truncate">{event.document_name}</p>
                <p className="text-[11px] text-slate-400">
                  Page {event.page_number || 1} • Ingested Record
                </p>
              </div>
            </div>

            <Link
              to={`/documents/${event.document_id || 'doc-001'}`}
              className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-700 transition-colors flex items-center gap-1 flex-shrink-0"
            >
              <span>Inspect Document</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

        {/* Source Evidence Card */}
        {event.evidence && (
          <div className="p-4 rounded-xl bg-cyan-50/70 border border-cyan-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-900">
                <ShieldCheck className="w-4 h-4 text-cyan-600" />
                <span>Verified Source Evidence</span>
              </div>
              <EvidenceBadge evidenceId={event.evidence.id} pageNumber={event.evidence.page_number} />
            </div>

            <p className="text-xs text-slate-800 font-semibold">
              {event.evidence.extracted_finding}
            </p>

            <blockquote className="text-[11px] text-slate-600 italic bg-white p-3 rounded-lg border border-cyan-100">
              "{event.evidence.snippet_text}"
            </blockquote>
          </div>
        )}

        {/* Back navigation */}
        <div className="pt-2 flex items-center justify-between">
          <Link
            to="/timeline"
            className="text-xs font-bold text-cyan-600 hover:underline inline-flex items-center gap-1"
          >
            ← Back to Full Timeline
          </Link>
          <Link
            to="/timeline?tab=graph"
            onClick={() => navigate('/timeline')}
            className="text-xs font-bold text-slate-600 hover:text-slate-900 inline-flex items-center gap-1"
          >
            <span>View in Pathway Graph</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
