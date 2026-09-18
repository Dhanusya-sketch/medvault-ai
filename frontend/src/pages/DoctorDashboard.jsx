import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Stethoscope, Users, Clock, AlertTriangle, FileText, 
  Search, ArrowRight, ShieldCheck, CheckCircle2, ChevronRight, Activity
} from 'lucide-react';
import { api } from '../services/api';

export default function DoctorDashboard() {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadDoctorData() {
      setLoading(true);
      try {
        const data = await api.getDoctorOverview();
        setOverview(data);
      } finally {
        setLoading(false);
      }
    }
    loadDoctorData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4 max-w-6xl mx-auto py-8">
        <div className="h-8 w-48 bg-slate-200 rounded-lg animate-pulse" />
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-28 bg-white rounded-2xl border border-slate-200 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  const doctor = overview?.doctor;
  const metrics = overview?.metrics;
  const recentPatient = overview?.recent_patient;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Clinician Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-teal-950 text-white p-6 sm:p-7 rounded-2xl shadow-premium flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-teal-400 font-bold text-xs uppercase tracking-wider mb-1">
            <Stethoscope className="w-4 h-4" />
            <span>Authorized Clinician Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Welcome, {doctor?.name || 'Dr. Robert Chen, MD'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
            {doctor?.specialty} • {doctor?.hospital}
          </p>
        </div>

        <Link
          to="/doctor/patients"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white rounded-xl text-xs font-bold shadow-md transition-all self-start md:self-auto"
        >
          <Users className="w-4 h-4" />
          <span>Patient Directory</span>
        </Link>
      </div>

      {/* Caseload Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-subtle">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">Authorized Patients</span>
            <Users className="w-4 h-4 text-teal-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">{metrics?.total_assigned_patients || 18}</p>
          <span className="text-[11px] text-slate-400">Isolated via RLS</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-subtle">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">Active Case Reviews</span>
            <Activity className="w-4 h-4 text-cyan-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">{metrics?.active_review_cases || 4}</p>
          <span className="text-[11px] text-cyan-600 font-semibold">Requires consultation review</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-subtle">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">Pending Follow-Ups</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">{metrics?.pending_follow_ups || 3}</p>
          <span className="text-[11px] text-amber-600 font-semibold">Next: Oct 02, 2026</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-subtle">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">Critical Alerts</span>
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">{metrics?.critical_flags_count || 1}</p>
          <span className="text-[11px] text-rose-600 font-semibold">Prior Hypertensive episode</span>
        </div>
      </div>

      {/* Featured Patient Review: Sarah Jenkins */}
      {recentPatient && (
        <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-subtle space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-teal-600" />
              <h3 className="font-extrabold text-sm text-slate-900">
                Primary Authorized Patient Case Review
              </h3>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-100 text-teal-800">
              Active Patient Dossier
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-lg font-bold text-slate-900">{recentPatient.name}</h4>
                <span className="text-xs text-slate-400 font-medium">MRN: {recentPatient.mrn}</span>
                <span className="text-xs text-slate-400">• {recentPatient.age}F</span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Conditions: <span className="font-semibold text-slate-800">{recentPatient.chronic_conditions?.join(', ')}</span>
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Latest Document Ingested: {recentPatient.latest_document} ({recentPatient.latest_document_date})
              </p>
            </div>

            <Link
              to={`/doctor/patients/${recentPatient.id}`}
              className="px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5 self-start sm:self-auto"
            >
              <span>Open Patient Dossier</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
