import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, ShieldCheck, ZoomIn, ZoomOut, RotateCcw, 
  TestTube, Pill, Building2, Scan, Stethoscope, Activity, ExternalLink
} from 'lucide-react';

export default function RelationshipGraph({ data }) {
  const navigate = useNavigate();
  const [zoom, setZoom] = useState(1);
  const [selectedNode, setSelectedNode] = useState(null);

  const defaultNodes = [
    { id: 'evt-001', title: 'Wellness Check', category: 'consultation', date: '2024-01-12', detail: 'Prehypertension (138/86) & Knee Crepitus', evidence_id: 'ev-008', x: 40, y: 50 },
    { id: 'evt-002', title: 'Lipid Screening', category: 'lab_test', date: '2024-01-15', detail: 'Total Cholesterol 224 mg/dL', evidence_id: 'ev-008', x: 260, y: 50 },
    { id: 'evt-006', title: 'Hypertension Urgency', category: 'hospitalization', date: '2025-11-16', detail: 'Admitted BP 168/102 with palpitations', evidence_id: 'ev-004', x: 40, y: 190 },
    { id: 'evt-007', title: 'ECG & Troponin Workup', category: 'procedure', date: '2025-11-17', detail: 'Normal sinus rhythm; Trop < 0.01', evidence_id: 'ev-004', x: 260, y: 190 },
    { id: 'evt-008', title: 'Discharge Rx', category: 'prescription', date: '2025-11-18', detail: 'Stabilized on Amlodipine 5mg PO daily', evidence_id: 'ev-004', x: 480, y: 190 },
    { id: 'evt-010', title: '3.0T Knee MRI', category: 'imaging', date: '2026-01-22', detail: 'Grade II medial meniscus tear; mild effusion', evidence_id: 'ev-007', x: 40, y: 330 },
    { id: 'evt-012', title: 'Cardiology Review', category: 'prescription', date: '2026-03-15', detail: 'Added Atorvastatin 20mg for dyslipidemia', evidence_id: 'ev-006', x: 480, y: 330 },
    { id: 'evt-014', title: 'Lipid Panel', category: 'lab_test', date: '2026-09-10', detail: 'Cholesterol 210 mg/dL; Glucose 108 mg/dL', evidence_id: 'ev-001', x: 260, y: 330 },
    { id: 'evt-015', title: 'Cardiology Follow-up', category: 'consultation', date: '2026-10-02', detail: 'Scheduled clinic review with Dr. Rostova', evidence_id: 'ev-005', x: 260, y: 470 },
  ];

  const defaultEdges = [
    { from: 'evt-001', to: 'evt-002', label: 'Orders Labs' },
    { from: 'evt-006', to: 'evt-007', label: 'ED Diagnostic Workup' },
    { from: 'evt-007', to: 'evt-008', label: 'Stabilization & Rx' },
    { from: 'evt-008', to: 'evt-012', label: '4-Month Follow-up' },
    { from: 'evt-012', to: 'evt-014', label: '6-Mo Monitoring Labs' },
    { from: 'evt-014', to: 'evt-015', label: 'Mandated Clinic Review' },
  ];

  const nodes = (data && data.nodes && data.nodes.length > 0) ? data.nodes.map(n => ({
    id: n.id,
    title: n.data.title,
    category: n.data.category,
    date: n.data.date,
    detail: n.data.description,
    evidence_id: n.data.evidence_id,
    x: n.position.x,
    y: n.position.y
  })) : defaultNodes;

  const edges = (data && data.edges && data.edges.length > 0) ? data.edges.map(e => ({
    from: e.source,
    to: e.target,
    label: e.label
  })) : defaultEdges;

  const getCategoryTheme = (cat) => {
    switch (cat) {
      case 'lab_test': return { bg: 'bg-cyan-50', border: 'border-cyan-300', text: 'text-cyan-800', icon: TestTube, badge: 'Lab Test' };
      case 'prescription': return { bg: 'bg-purple-50', border: 'border-purple-300', text: 'text-purple-800', icon: Pill, badge: 'Prescription' };
      case 'hospitalization': return { bg: 'bg-rose-50', border: 'border-rose-300', text: 'text-rose-800', icon: Building2, badge: 'Hospitalization' };
      case 'imaging': return { bg: 'bg-amber-50', border: 'border-amber-300', text: 'text-amber-800', icon: Scan, badge: 'Imaging' };
      case 'procedure': return { bg: 'bg-emerald-50', border: 'border-emerald-300', text: 'text-emerald-800', icon: Activity, badge: 'Procedure' };
      default: return { bg: 'bg-teal-50', border: 'border-teal-300', text: 'text-teal-800', icon: Stethoscope, badge: 'Consultation' };
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-subtle p-4 sm:p-6 space-y-4">
      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-600" />
            <span>Interactive Clinical Pathway & Relationship Graph</span>
          </h3>
          <p className="text-[11px] text-slate-500">
            Traces causal pathways: Lab Findings → Specialist Consultations → Prescriptions → Follow-up Reviews.
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setZoom(z => Math.min(1.4, z + 0.1))}
            className="p-1.5 rounded-lg bg-white text-slate-700 hover:bg-slate-50 shadow-sm"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoom(z => Math.max(0.7, z - 0.1))}
            className="p-1.5 rounded-lg bg-white text-slate-700 hover:bg-slate-50 shadow-sm"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoom(1)}
            className="p-1.5 rounded-lg bg-white text-slate-700 hover:bg-slate-50 shadow-sm"
            title="Reset Zoom"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <span className="text-[10px] font-bold text-slate-500 px-1.5">{(zoom * 100).toFixed(0)}%</span>
        </div>
      </div>

      {/* Graph Canvas Area */}
      <div className="relative w-full h-[540px] bg-slate-50/70 rounded-xl border border-slate-200/60 overflow-auto p-6 flex items-center justify-center">
        <div
          className="relative transition-transform duration-200 ease-out min-w-[760px] min-h-[500px]"
          style={{ transform: `scale(${zoom})`, transformOrigin: 'top left' }}
        >
          {/* Edge connection lines with labels */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <defs>
              <marker
                id="arrowhead"
                markerWidth="8"
                markerHeight="6"
                refX="7"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 8 3, 0 6" fill="#0ea5e9" />
              </marker>
            </defs>
            {edges.map((e, idx) => {
              const fromNode = nodes.find(n => n.id === e.from);
              const toNode = nodes.find(n => n.id === e.to);
              if (!fromNode || !toNode) return null;

              const x1 = fromNode.x + 100;
              const y1 = fromNode.y + 45;
              const x2 = toNode.x + 100;
              const y2 = toNode.y + 45;

              return (
                <g key={idx}>
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#38bdf8"
                    strokeWidth="2.5"
                    strokeDasharray="4 3"
                    markerEnd="url(#arrowhead)"
                  />
                  <rect
                    x={(x1 + x2) / 2 - 40}
                    y={(y1 + y2) / 2 - 10}
                    width="80"
                    height="18"
                    rx="4"
                    fill="#ffffff"
                    stroke="#e2e8f0"
                  />
                  <text
                    x={(x1 + x2) / 2}
                    y={(y1 + y2) / 2 + 3}
                    fontSize="9"
                    fontWeight="bold"
                    fill="#0369a1"
                    textAnchor="middle"
                  >
                    {e.label}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Nodes */}
          {nodes.map((node) => {
            const theme = getCategoryTheme(node.category);
            const Icon = theme.icon;
            const isSelected = selectedNode?.id === node.id;

            return (
              <div
                key={node.id}
                onClick={() => setSelectedNode(node)}
                style={{ left: `${node.x}px`, top: `${node.y}px` }}
                className={`absolute w-52 p-3 rounded-xl border-2 transition-all cursor-pointer z-10 shadow-sm ${theme.bg} ${theme.border} ${
                  isSelected ? 'ring-4 ring-cyan-400 scale-105 shadow-md' : 'hover:scale-[1.02]'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className={`flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wide ${theme.text}`}>
                    <Icon className="w-3 h-3" />
                    {theme.badge}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-500">{node.date}</span>
                </div>

                <h4 className="text-xs font-bold text-slate-900 leading-tight truncate">
                  {node.title}
                </h4>
                <p className="text-[11px] text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                  {node.detail}
                </p>

                <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-between">
                  <span className="text-[9px] font-bold text-cyan-700">Click to Inspect</span>
                  {node.evidence_id && (
                    <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-emerald-700">
                      <ShieldCheck className="w-2.5 h-2.5" />
                      Verified
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Node Details Drawer */}
      {selectedNode && (
        <div className="p-4 bg-cyan-50/70 border border-cyan-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-cyan-200 text-cyan-900">
                {selectedNode.category}
              </span>
              <h4 className="text-sm font-bold text-slate-900">{selectedNode.title}</h4>
              <span className="text-xs text-slate-500 font-medium">({selectedNode.date})</span>
            </div>
            <p className="text-xs text-slate-600 mt-1">{selectedNode.detail}</p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => navigate(`/timeline/${selectedNode.id}`)}
              className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl text-xs font-bold shadow-sm transition-colors flex items-center gap-1"
            >
              <span>View Full Event</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            {selectedNode.evidence_id && (
              <button
                onClick={() => navigate(`/evidence/${selectedNode.evidence_id}`)}
                className="px-3 py-1.5 bg-white border border-cyan-200 text-cyan-700 hover:bg-cyan-50 rounded-xl text-xs font-bold transition-colors flex items-center gap-1"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-600" />
                <span>Evidence</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
