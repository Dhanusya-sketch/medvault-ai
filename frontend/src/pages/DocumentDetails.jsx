import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  FileText, Calendar, User, Building2, CheckCircle2, 
  ArrowLeft, ShieldCheck, Sparkles, ExternalLink, Clock,
  AlertTriangle, Pill, Activity, Stethoscope, ChevronRight
} from 'lucide-react';
import { api } from '../services/api';
import EvidenceBadge from '../components/common/EvidenceBadge';

export default function DocumentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDoc() {
      setLoading(true);
      try {
        const doc = await api.getDocumentById(id);
        setDocument(doc);
      } finally {
        setLoading(false);
      }
    }
    loadDoc();
  }, [id]);

  if (loading) {
    return (
      <div className="space-y-4 max-w-5xl mx-auto py-8">
        <div className="h-8 w-48 bg-slate-200 rounded-lg animate-pulse" />
        <div className="h-64 bg-white rounded-2xl border border-slate-200 animate-pulse" />
      </div>
    );
  }

  if (!document) {
    return (
      <div className="max-w-md mx-auto py-16 text-center">
        <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <h2 className="text-lg font-bold text-slate-800">Document not found</h2>
        <Link to="/documents" className="mt-3 text-cyan-600 font-bold text-xs hover:underline block">
          ← Back to Documents
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Back button & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/documents')}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-cyan-100 text-cyan-800 tracking-wider">
                {document.document_type}
              </span>
              <span className="text-xs text-slate-400 font-medium">ID: {document.id}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
              {document.original_file_name || document.file_name}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            AI Verified
          </span>
          <Link
            to="/timeline"
            className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors flex items-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5 text-cyan-600" />
            <span>Timeline Event</span>
          </Link>
        </div>
      </div>

      {/* Metadata Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-subtle text-xs">
        <div className="flex items-center gap-2.5">
          <Calendar className="w-4 h-4 text-cyan-600 flex-shrink-0" />
          <div>
            <span className="text-slate-400 block text-[11px]">Document Date</span>
            <span className="font-bold text-slate-800">{document.document_date}</span>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <Building2 className="w-4 h-4 text-teal-600 flex-shrink-0" />
          <div className="min-w-0">
            <span className="text-slate-400 block text-[11px]">Facility</span>
            <span className="font-bold text-slate-800 truncate block">{document.facility_name}</span>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <Stethoscope className="w-4 h-4 text-indigo-600 flex-shrink-0" />
          <div className="min-w-0">
            <span className="text-slate-400 block text-[11px]">Attending Physician</span>
            <span className="font-bold text-slate-800 truncate block">{document.attending_physician}</span>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <FileText className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <div>
            <span className="text-slate-400 block text-[11px]">Pages & Size</span>
            <span className="font-bold text-slate-800">
              {document.page_count} page(s) • {(document.file_size_bytes / 1024).toFixed(0)} KB
            </span>
          </div>
        </div>
      </div>

      {/* AI Summary Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950 text-white p-6 rounded-2xl shadow-premium relative overflow-hidden">
        <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Clinical Executive Summary</span>
        </div>
        <p className="text-sm sm:text-base leading-relaxed text-slate-200">
          {document.ai_summary}
        </p>
      </div>

      {/* CRITICAL SEPARATION: DOCUMENTED FACTS vs AI INTERPRETATION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: DOCUMENTED FACTS */}
        <div className="bg-white p-6 rounded-2xl border border-emerald-200/80 shadow-subtle flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-emerald-100">
              <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-sm uppercase tracking-wide">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Documented Clinical Facts</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-900">
                Verbatim Extracted
              </span>
            </div>

            <p className="text-xs text-slate-500 mb-4">
              Verifiable facts, laboratory figures, and doctor notes explicitly present in the original document:
            </p>

            <ul className="space-y-3">
              {(document.documented_facts || []).map((fact, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-800">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0 mt-1.5" />
                  <div className="flex-1">
                    <span className="font-semibold">{fact}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">Page coordinate verified</span>
            {document.evidence && document.evidence.length > 0 && (
              <EvidenceBadge evidenceId={document.evidence[0].id} pageNumber={document.evidence[0].page_number} />
            )}
          </div>
        </div>

        {/* Right: AI INTERPRETATION */}
        <div className="bg-white p-6 rounded-2xl border border-cyan-200/80 shadow-subtle flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-cyan-100">
              <div className="flex items-center gap-2 text-cyan-900 font-extrabold text-sm uppercase tracking-wide">
                <Sparkles className="w-5 h-5 text-cyan-600" />
                <span>AI Clinical Interpretation</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-cyan-100 text-cyan-900">
                AI Synthesis
              </span>
            </div>

            <p className="text-xs text-slate-500 mb-4">
              Pattern analysis and contextual risk evaluation based strictly on historical trends:
            </p>

            <ul className="space-y-3">
              {(document.ai_interpretations || []).map((interp, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-800">
                  <span className="w-2 h-2 rounded-full bg-cyan-500 flex-shrink-0 mt-1.5" />
                  <div className="flex-1">
                    <span>{interp}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 pt-3 border-t border-slate-100">
            <p className="text-[11px] text-amber-700 bg-amber-50 p-2.5 rounded-xl border border-amber-200 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 text-amber-600" />
              <span>AI observations do not constitute a diagnostic medical opinion.</span>
            </p>
          </div>
        </div>
      </div>

      {/* Follow-up & Reminders Section */}
      {document.follow_up_instructions && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-subtle">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wide text-amber-900">
                Follow-Up Mandate Detected
              </span>
              <p className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">
                {document.follow_up_instructions}
              </p>
              <p className="text-[11px] text-slate-600 mt-1">
                Extracted automatically from physician discharge instructions.
              </p>
            </div>
          </div>

          <Link
            to="/reminders"
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow transition-colors flex items-center gap-1.5 self-start sm:self-auto flex-shrink-0"
          >
            <span>View in Reminders</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* Verifiable Evidence Snippets Gallery */}
      {document.evidence && document.evidence.length > 0 && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-subtle">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-cyan-600" />
              <h3 className="font-bold text-sm text-slate-900">Linked Evidence Excerpts</h3>
            </div>
            <span className="text-xs text-slate-400">{document.evidence.length} snippet(s)</span>
          </div>

          <div className="space-y-3">
            {document.evidence.map((ev) => (
              <div
                key={ev.id}
                onClick={() => navigate(`/evidence/${ev.id}`)}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-cyan-50/30 hover:border-cyan-300 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 group-hover:text-cyan-700 transition-colors">
                      {ev.extracted_finding}
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-cyan-100 text-cyan-800">
                      Page {ev.page_number}
                    </span>
                  </div>
                  <blockquote className="text-[11px] text-slate-600 italic mt-1.5 pl-2.5 border-l-2 border-cyan-400">
                    "{ev.snippet_text}"
                  </blockquote>
                </div>

                <button className="text-xs font-bold text-cyan-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform flex-shrink-0">
                  Inspect in Evidence Viewer <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
