import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, Stethoscope, User, Calendar, FileText, 
  ShieldCheck, Clock, Activity, Pill, AlertTriangle, ExternalLink, ChevronRight
} from 'lucide-react';
import { api } from '../services/api';
import EvidenceBadge from '../components/common/EvidenceBadge';

export default function DoctorPatientView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const details = await api.getDoctorPatientDetails(id);
        setData(details);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto py-8 space-y-4">
        <div className="h-8 w-48 bg-slate-200 rounded-lg animate-pulse" />
        <div className="h-64 bg-white rounded-2xl border border-slate-200 animate-pulse" />
      </div>
    );
  }

  const patient = data?.patient;
  const summary = data?.clinical_summary;
  const documents = data?.documents || [];
  const events = data?.recent_events || [];
  const medications = data?.active_medications || [];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/doctor/patients')}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-teal-100 text-teal-800 tracking-wider">
                Authorized Clinical Review
              </span>
              <span className="text-xs text-slate-400 font-medium">MRN: {patient?.mrn}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-0.5">
              {patient?.first_name} {patient?.last_name}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/timeline"
            className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5 text-teal-600" />
            <span>Timeline</span>
          </Link>
          <Link
            to="/analytics"
            className="px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow"
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Biomarker Trends</span>
          </Link>
        </div>
      </div>

      {/* Clinical Summary Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950 text-white p-6 sm:p-7 rounded-2xl shadow-premium space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-teal-400 font-bold text-xs uppercase tracking-wider">
            <Stethoscope className="w-4 h-4" />
            <span>Physician Briefing</span>
          </div>
          <span className="text-[11px] text-slate-400">Attending: {summary?.attending_physician}</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
          {summary?.clinical_notes}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-800 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Latest Blood Pressure</span>
            <span className="font-bold text-teal-300">{summary?.recent_vital_bp}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Latest Lipid Panel</span>
            <span className="font-bold text-amber-300">{summary?.recent_lipid}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Medication Adherence</span>
            <span className="font-bold text-emerald-300">{summary?.adherence_score}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Upcoming Review</span>
            <span className="font-bold text-white">02 Oct 2026</span>
          </div>
        </div>
      </div>

      {/* Active Medications & Ingested Records */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Active Medications */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-subtle flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-100">
              <Pill className="w-4 h-4 text-purple-600" />
              <h3 className="font-bold text-sm text-slate-900">Active Regimen</h3>
            </div>
            <div className="space-y-3">
              {medications.map((med, i) => (
                <div key={i} className="p-3 rounded-xl bg-purple-50/60 border border-purple-200/80 text-xs flex items-center justify-between">
                  <div>
                    <span className="font-bold text-purple-950 block">{med.name} {med.dosage}</span>
                    <span className="text-[11px] text-purple-700">{med.frequency} • {med.indication}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white text-purple-800 border border-purple-200">
                    Active
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ingested Records */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-subtle flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-100">
              <FileText className="w-4 h-4 text-cyan-600" />
              <h3 className="font-bold text-sm text-slate-900">Patient Document Vault</h3>
            </div>
            <div className="space-y-2.5">
              {documents.slice(0, 3).map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => navigate(`/documents/${doc.id}`)}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 hover:bg-cyan-50/50 hover:border-cyan-300 transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-800 truncate group-hover:text-cyan-700">
                      {doc.original_file_name || doc.file_name}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {doc.document_type} • {doc.document_date}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-600 group-hover:translate-x-0.5 transition-transform" />
                </div>
              ))}
            </div>
          </div>

          <Link
            to="/documents"
            className="mt-4 text-xs font-bold text-teal-600 hover:underline block text-center"
          >
            View All Documents in Dossier →
          </Link>
        </div>
      </div>
    </div>
  );
}
