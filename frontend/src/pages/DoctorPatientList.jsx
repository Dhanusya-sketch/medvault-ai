import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Users, Search, ChevronRight, ShieldCheck, Stethoscope, AlertCircle, FileText } from 'lucide-react';
import { api } from '../services/api';

export default function DoctorPatientList() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function loadPatients() {
      setLoading(true);
      try {
        const data = await api.getDoctorPatients();
        setPatients(data);
      } finally {
        setLoading(false);
      }
    }
    loadPatients();
  }, []);

  const filtered = patients.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.mrn.toLowerCase().includes(search.toLowerCase()) ||
    p.primary_diagnosis.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-teal-600 font-bold text-xs uppercase tracking-wider mb-0.5">
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Authorized Clinical Caseload</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Assigned Patients</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Access strictly governed by Row-Level Security (RLS). You only see authorized patient profiles.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, MRN, diagnosis..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
          />
        </div>
      </div>

      {/* Patient Directory Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-subtle divide-y divide-slate-100 overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-16 bg-slate-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">
            No matching patient records found.
          </div>
        ) : (
          filtered.map((patient) => (
            <div
              key={patient.id}
              onClick={() => navigate(`/doctor/patients/${patient.id}`)}
              className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-11 h-11 rounded-2xl bg-teal-50 border border-teal-200 text-teal-700 font-extrabold text-sm flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  {patient.name.split(' ').map(n => n[0]).join('')}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-teal-600 transition-colors">
                      {patient.name}
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-slate-100 text-slate-700">
                      {patient.mrn}
                    </span>
                    <span className="text-xs text-slate-400">
                      • {patient.gender}, {patient.age}y
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 mt-1 truncate">
                    Diagnosis: <span className="font-semibold text-slate-800">{patient.primary_diagnosis}</span>
                  </p>

                  <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-2">
                    <span>Last Visit: {patient.last_visit}</span>
                    <span>•</span>
                    <span>{patient.document_count} document(s)</span>
                    <span>•</span>
                    <span className="font-bold text-teal-700">{patient.status}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto flex-shrink-0">
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                  patient.risk_tier === 'High' ? 'bg-rose-100 text-rose-800' :
                  patient.risk_tier === 'Moderate' ? 'bg-amber-100 text-amber-800' :
                  'bg-emerald-100 text-emerald-800'
                }`}>
                  {patient.risk_tier} Risk
                </span>

                <span className="text-xs font-bold text-teal-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  Review Records <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
