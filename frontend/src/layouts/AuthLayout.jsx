import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ShieldCheck, FileText, Calendar, Activity, Lock } from 'lucide-react';

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-900">
      {/* Left Branding Hero */}
      <div className="md:w-1/2 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 text-white p-8 md:p-14 flex flex-col justify-between relative overflow-hidden border-b md:border-b-0 md:border-r border-slate-800">
        {/* Glow orb */}
        <div className="absolute top-0 -left-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Brand Logo */}
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-500 to-teal-400 flex items-center justify-center text-white shadow-xl shadow-cyan-500/25 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-2xl tracking-tight text-white flex items-center gap-1">
                MEDVAULT <span className="text-cyan-400 font-black">AI</span>
              </span>
              <span className="block text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
                Medical Document Intelligence & Patient Timeline
              </span>
            </div>
          </Link>
        </div>

        {/* Main Headline */}
        <div className="relative z-10 py-10 my-auto max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold mb-6">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            Next-Gen Clinical Document Operating System
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Your medical history, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400">
              organized intelligently.
            </span>
          </h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-8">
            Ingest scattered lab reports, prescriptions, discharge summaries, and imaging scans.
            Extract verifiable clinical facts, build a chronological patient timeline, and chat
            with your records backed by original document evidence.
          </p>

          {/* Feature Highlights Grid */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-800/60 backdrop-blur border border-slate-700/60 p-3.5 rounded-xl">
              <FileText className="w-4 h-4 text-cyan-400 mb-1.5" />
              <div className="font-bold text-white">OCR & Multimodal AI</div>
              <div className="text-slate-400 text-[11px] mt-0.5">Scanned PDFs & images parsed page-by-page</div>
            </div>
            <div className="bg-slate-800/60 backdrop-blur border border-slate-700/60 p-3.5 rounded-xl">
              <Calendar className="w-4 h-4 text-teal-400 mb-1.5" />
              <div className="font-bold text-white">Chronological Timeline</div>
              <div className="text-slate-400 text-[11px] mt-0.5">Automated causal event relationships</div>
            </div>
            <div className="bg-slate-800/60 backdrop-blur border border-slate-700/60 p-3.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-400 mb-1.5" />
              <div className="font-bold text-white">Evidence Tracking</div>
              <div className="text-slate-400 text-[11px] mt-0.5">Every AI statement backed by page snippets</div>
            </div>
            <div className="bg-slate-800/60 backdrop-blur border border-slate-700/60 p-3.5 rounded-xl">
              <Lock className="w-4 h-4 text-indigo-400 mb-1.5" />
              <div className="font-bold text-white">HIPAA-Ready Security</div>
              <div className="text-slate-400 text-[11px] mt-0.5">Patient-specific access & immutable audit logs</div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 text-xs text-slate-400 flex items-center justify-between pt-6 border-t border-slate-800">
          <span>Safe Medical Record Assistant</span>
          <span>Dual Mode • Powered by Gemini AI</span>
        </div>
      </div>

      {/* Right Form Outlet */}
      <div className="md:w-1/2 bg-slate-50 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
