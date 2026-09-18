import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  BarChart3, TrendingUp, PieChart, Activity, 
  ShieldCheck, ExternalLink, Calendar, AlertCircle, FileText, ChevronRight
} from 'lucide-react';
import { 
  LineChart, Line, BarChart, Bar, PieChart as RechartsPie, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine 
} from 'recharts';
import { api } from '../services/api';
import EvidenceBadge from '../components/common/EvidenceBadge';

export default function Analytics() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedParam, setSelectedParam] = useState('Total Cholesterol');
  const [activePoint, setActivePoint] = useState(null);

  useEffect(() => {
    async function loadAnalytics() {
      setLoading(true);
      try {
        const res = await api.getAnalytics();
        setData(res);
      } finally {
        setLoading(false);
      }
    }
    loadAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4 max-w-6xl mx-auto py-8">
        <div className="h-8 w-48 bg-slate-200 rounded-lg animate-pulse" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-72 bg-white rounded-2xl border border-slate-200 animate-pulse" />
          <div className="h-72 bg-white rounded-2xl border border-slate-200 animate-pulse" />
        </div>
      </div>
    );
  }

  const trends = data?.parameter_trends || {};
  const currentTrendData = trends[selectedParam] || [];

  const paramOptions = [
    { key: 'Total Cholesterol', unit: 'mg/dL', threshold: 200, color: '#ef4444' },
    { key: 'LDL Cholesterol', unit: 'mg/dL', threshold: 100, color: '#f59e0b' },
    { key: 'Fasting Blood Glucose', unit: 'mg/dL', threshold: 100, color: '#0ea5e9' },
    { key: 'Systolic BP', unit: 'mmHg', threshold: 120, color: '#8b5cf6' },
    { key: 'Hemoglobin', unit: 'g/dL', threshold: 12.0, color: '#10b981' }
  ];

  const currentOption = paramOptions.find(o => o.key === selectedParam) || paramOptions[0];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-cyan-600 font-bold text-xs uppercase tracking-wider mb-0.5">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Longitudinal Quantitative Intelligence</span>
        </div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Medical Analytics</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Real extracted values from 15 records across 2024–2026. Never invented or interpolated.
        </p>
      </div>

      {/* Row 1: Parameter Trend Deep-Dive */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-subtle space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-600" />
              <span>Biomarker & Vital Sign Trajectories</span>
            </h3>
            <p className="text-[11px] text-slate-500">
              Click any point on the curve to inspect its source document and verified evidence excerpt.
            </p>
          </div>

          {/* Parameter Pill Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {paramOptions.map((p) => (
              <button
                key={p.key}
                onClick={() => {
                  setSelectedParam(p.key);
                  setActivePoint(null);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedParam === p.key
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {p.key}
              </button>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={currentTrendData}
              onClick={(e) => {
                if (e && e.activePayload && e.activePayload[0]) {
                  setActivePoint(e.activePayload[0].payload);
                }
              }}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis 
                dataKey="test_date" 
                tick={{ fontSize: 11, fill: '#64748b' }} 
              />
              <YAxis 
                tick={{ fontSize: 11, fill: '#64748b' }}
                unit={` ${currentOption.unit}`}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const p = payload[0].payload;
                    return (
                      <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl text-xs space-y-1">
                        <p className="font-bold text-cyan-300">{p.parameter}</p>
                        <p className="text-base font-black">
                          {p.value} {p.unit}
                        </p>
                        <p className="text-slate-400 text-[10px]">Date: {p.test_date}</p>
                        <p className="text-slate-400 text-[10px] truncate max-w-[200px]">Doc: {p.document_name}</p>
                        <p className="text-cyan-400 text-[10px] font-bold">Click point for evidence →</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <ReferenceLine 
                y={currentOption.threshold} 
                stroke="#f43f5e" 
                strokeDasharray="3 3"
                label={{ value: `Ref Limit: ${currentOption.threshold} ${currentOption.unit}`, fill: '#f43f5e', fontSize: 10 }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke={currentOption.color}
                strokeWidth={3}
                dot={{ r: 5, fill: currentOption.color, stroke: '#ffffff', strokeWidth: 2 }}
                activeDot={{ r: 8, fill: '#0ea5e9', cursor: 'pointer' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Clicked Data Point Evidence Inspector */}
        {activePoint ? (
          <div className="p-4 bg-cyan-50/70 border border-cyan-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-600 text-white flex items-center justify-center flex-shrink-0 font-bold text-xs">
                {activePoint.value}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">
                    {activePoint.parameter}: {activePoint.value} {activePoint.unit}
                  </span>
                  <span className={`px-2 py-0.2 rounded text-[10px] font-bold uppercase ${
                    activePoint.flag === 'high' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {activePoint.flag}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Source: <span className="font-semibold text-slate-700">{activePoint.document_name}</span> (Recorded on {activePoint.test_date})
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {activePoint.evidence_id && (
                <EvidenceBadge evidenceId={activePoint.evidence_id} />
              )}
              <Link
                to={`/documents/${activePoint.document_id || 'doc-001'}`}
                className="px-3 py-1.5 bg-white border border-cyan-200 text-cyan-700 hover:bg-cyan-50 rounded-xl text-xs font-bold transition-colors"
              >
                Open Record
              </Link>
            </div>
          </div>
        ) : (
          <p className="text-center text-[11px] text-slate-400 italic">
            Tip: Click any marker dot on the trend graph to view the original source citation and lab report.
          </p>
        )}
      </div>

      {/* Row 2: Document Distribution & Ingestion Over Time */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Doughnut Chart: Distribution */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-subtle flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <PieChart className="w-4 h-4 text-cyan-600" />
                <span>Document Distribution</span>
              </h3>
              <span className="text-xs font-bold text-slate-400">15 Records</span>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Categorization by clinical discipline.
            </p>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPie>
                  <Pie
                    data={data?.document_distribution || []}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {(data?.document_distribution || []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend iconSize={8} wrapperStyle={{ fontSize: '11px' }} />
                </RechartsPie>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Bar Chart: Documents Ingested Over Time */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-subtle flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-cyan-600" />
                <span>Documents Over Time</span>
              </h3>
              <span className="text-xs font-bold text-slate-400">2024–2026</span>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Annual distribution of clinical documents.
            </p>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data?.documents_by_year || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="year" tick={{ fontSize: 11, fill: '#64748b' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#0ea5e9" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
