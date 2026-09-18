import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Calendar, Search, Filter, GitBranch, ArrowRight, 
  ShieldCheck, FileText, ChevronRight, TestTube, Pill, 
  Building2, Scan, Stethoscope, Activity, Sparkles
} from 'lucide-react';
import { api } from '../services/api';
import EvidenceBadge from '../components/common/EvidenceBadge';
import RelationshipGraph from '../components/timeline/RelationshipGraph';

export default function Timeline() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('chronological'); // 'chronological' or 'graph'
  const [timelineData, setTimelineData] = useState(null);
  const [graphData, setGraphData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [tData, gData] = await Promise.all([
          api.getTimeline({ category: selectedCategory, year: selectedYear, search: searchQuery }),
          api.getRelationshipGraph()
        ]);
        setTimelineData(tData);
        setGraphData(gData);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [selectedCategory, selectedYear, searchQuery]);

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'lab_test', label: '🧪 Lab Tests' },
    { id: 'prescription', label: '💊 Prescriptions' },
    { id: 'hospitalization', label: '🏥 Hospitalizations' },
    { id: 'imaging', label: '🩻 Imaging' },
    { id: 'consultation', label: '👨⚕️ Consultations' }
  ];

  const years = ['all', '2026', '2025', '2024'];

  const getEventIcon = (category) => {
    switch (category) {
      case 'lab_test': return <TestTube className="w-4 h-4 text-cyan-600" />;
      case 'prescription': return <Pill className="w-4 h-4 text-purple-600" />;
      case 'hospitalization': return <Building2 className="w-4 h-4 text-rose-600" />;
      case 'imaging': return <Scan className="w-4 h-4 text-amber-600" />;
      case 'procedure': return <Activity className="w-4 h-4 text-teal-600" />;
      default: return <Stethoscope className="w-4 h-4 text-emerald-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-600 font-bold text-xs uppercase tracking-wider mb-0.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>Unified Longitudinal Patient Record</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Medical Timeline</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Chronological progression of 32 medical events synthesized across 2024–2026.
          </p>
        </div>

        {/* View Switcher: Chronological vs React Flow Graph */}
        <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs font-bold self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('chronological')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              activeTab === 'chronological'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-cyan-600" />
            Chronological View
          </button>
          <button
            onClick={() => setActiveTab('graph')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              activeTab === 'graph'
                ? 'bg-white text-cyan-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GitBranch className="w-3.5 h-3.5 text-cyan-600" />
            Relationship Graph
          </button>
        </div>
      </div>

      {/* If Graph Tab is Selected */}
      {activeTab === 'graph' ? (
        <RelationshipGraph data={graphData} />
      ) : (
        /* Chronological Timeline Tab */
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-subtle flex flex-col md:flex-row gap-3 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search events, drugs, symptoms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === c.id
                      ? 'bg-cyan-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Year Selector */}
            <div className="flex items-center gap-1 self-end md:self-auto bg-slate-100 p-1 rounded-xl">
              {years.map((y) => (
                <button
                  key={y}
                  onClick={() => setSelectedYear(y)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                    selectedYear === y ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
                  }`}
                >
                  {y === 'all' ? 'All Years' : y}
                </button>
              ))}
            </div>
          </div>

          {/* Timeline Stream */}
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 bg-white rounded-2xl border border-slate-200 animate-pulse" />
              ))}
            </div>
          ) : !timelineData || timelineData.events.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center max-w-md mx-auto">
              <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800">No events found</h3>
              <p className="text-xs text-slate-500 mt-1">
                Try loosening your filters or search criteria.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {Object.entries(timelineData.grouped_by_year)
                .sort(([a], [b]) => Number(b) - Number(a))
                .map(([year, yearEvents]) => (
                  <div key={year} className="space-y-3">
                    {/* Year Header Marker */}
                    <div className="sticky top-16 z-20 flex items-center gap-3 bg-[#f8fafc]/90 backdrop-blur py-2">
                      <span className="px-3.5 py-1 rounded-full bg-slate-900 text-white text-xs font-black tracking-wider shadow-sm">
                        {year}
                      </span>
                      <div className="h-px bg-slate-200 flex-1" />
                      <span className="text-[11px] font-bold text-slate-400">
                        {yearEvents.length} record(s)
                      </span>
                    </div>

                    {/* Events List for this year */}
                    <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-200 space-y-4 ml-3 sm:ml-4">
                      {yearEvents.map((evt) => (
                        <div
                          key={evt.id}
                          onClick={() => navigate(`/timeline/${evt.id}`)}
                          className="relative bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-subtle hover:shadow-card hover:border-cyan-300 transition-all cursor-pointer group"
                        >
                          {/* Dot marker on line */}
                          <div className="absolute -left-[31px] sm:-left-[39px] top-6 w-3.5 h-3.5 rounded-full bg-white border-2 border-cyan-500 group-hover:bg-cyan-500 group-hover:scale-125 transition-all shadow-sm" />

                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2">
                              <div className="p-1.5 rounded-lg bg-slate-100 flex items-center justify-center">
                                {getEventIcon(evt.category)}
                              </div>
                              <span className="text-xs font-bold text-slate-500">
                                {evt.month} {evt.year} • {evt.date}
                              </span>
                              {evt.severity === 'critical' && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">
                                  Urgent Action
                                </span>
                              )}
                              {evt.severity === 'attention' && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                                  Attention
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-2">
                              {evt.evidence_id && (
                                <EvidenceBadge evidenceId={evt.evidence_id} pageNumber={evt.page_number} />
                              )}
                            </div>
                          </div>

                          <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-cyan-600 transition-colors">
                            {evt.title}
                          </h3>

                          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                            {evt.description}
                          </p>

                          <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
                            <span className="flex items-center gap-1 font-medium text-slate-500">
                              <FileText className="w-3.5 h-3.5 text-cyan-600" />
                              {evt.document_name}
                              {evt.page_number && ` • Page ${evt.page_number}`}
                            </span>

                            <span className="text-cyan-600 font-bold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                              Event Details <ChevronRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
