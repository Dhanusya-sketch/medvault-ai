import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FileText, UploadCloud, Search, Filter, Calendar, 
  CheckCircle2, ChevronRight, Eye, LayoutGrid, List, Sparkles, AlertCircle
} from 'lucide-react';
import { api } from '../services/api';
import { useLanguage } from '../context/LanguageContext';

export default function Documents() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'

  useEffect(() => {
    async function loadDocs() {
      setLoading(true);
      try {
        const docs = await api.getDocuments({ type: selectedType, search: searchQuery });
        setDocuments(docs);
      } finally {
        setLoading(false);
      }
    }
    loadDocs();
  }, [selectedType, searchQuery]);

  const documentTypes = [
    'all',
    'Lab Report',
    'Prescription',
    'Discharge Summary',
    'Imaging Report',
    'Consultation Note'
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">My Medical Documents</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            15 multi-format medical records ingested, parsed, and indexed with source evidence.
          </p>
        </div>

        <Link
          to="/documents/upload"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-500 hover:to-teal-400 shadow-md shadow-cyan-500/20 transition-all hover:scale-[1.02] self-start sm:self-auto"
        >
          <UploadCloud className="w-4 h-4" />
          <span>+ Upload Document</span>
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-subtle flex flex-col md:flex-row gap-3 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search records, findings, doctors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
          />
        </div>

        {/* Type Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {documentTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedType === type
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {type === 'all' ? 'All Types' : type}
            </button>
          ))}
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 self-end md:self-auto">
          <button
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded-lg transition-colors ${
              viewMode === 'list' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
            }`}
            title="List View"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-lg transition-colors ${
              viewMode === 'grid' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
            }`}
            title="Grid View"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Document Content View */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-20 bg-white rounded-2xl border border-slate-200 animate-pulse" />
          ))}
        </div>
      ) : documents.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center max-w-md mx-auto">
          <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No medical documents found</h3>
          <p className="text-xs text-slate-500 mt-1 mb-4">
            Try adjusting your search terms or upload a new record.
          </p>
          <Link
            to="/documents/upload"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-cyan-600 text-white rounded-xl text-xs font-bold"
          >
            Upload Your First Document
          </Link>
        </div>
      ) : viewMode === 'list' ? (
        /* List View */
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-subtle divide-y divide-slate-100 overflow-hidden">
          {documents.map((doc) => (
            <div
              key={doc.id}
              onClick={() => navigate(`/documents/${doc.id}`)}
              className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors cursor-pointer group"
            >
              <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-50 to-teal-50 border border-cyan-200/70 text-cyan-700 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-cyan-600 transition-colors truncate">
                      {doc.original_file_name || doc.file_name}
                    </h3>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-cyan-50 text-cyan-700 border border-cyan-200">
                      {doc.document_type}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                    {doc.facility_name} • {doc.attending_physician}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {doc.document_date}
                    </span>
                    <span>•</span>
                    <span>{doc.page_count} page(s)</span>
                    <span>•</span>
                    <span>{(doc.file_size_bytes / 1024).toFixed(0)} KB</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto flex-shrink-0">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Processed
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/documents/${doc.id}`);
                  }}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-cyan-50 hover:text-cyan-700 text-slate-700 rounded-xl text-xs font-bold transition-colors flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  View Analysis
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents.map((doc) => (
            <div
              key={doc.id}
              onClick={() => navigate(`/documents/${doc.id}`)}
              className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-subtle hover:shadow-card hover:border-cyan-300 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-100 text-cyan-600 flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Processed
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 group-hover:text-cyan-600 transition-colors line-clamp-1">
                  {doc.original_file_name || doc.file_name}
                </h3>
                <span className="inline-block mt-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700">
                  {doc.document_type}
                </span>

                <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                  {doc.ai_summary}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>{doc.document_date}</span>
                <span className="text-cyan-600 font-bold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                  Inspect <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
