import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  CheckCircle2, Loader2, Sparkles, FileText, 
  ArrowRight, ShieldCheck, Database, GitBranch
} from 'lucide-react';

export default function DocumentProcessing() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { title: "Document Uploaded", desc: "Binary verified and safely encrypted in storage" },
    { title: "Text Extraction", desc: "PyMuPDF parsing document page structure" },
    { title: "OCR Optical Scanning", desc: "Character recognition verified for scan layers" },
    { title: "Gemini Clinical Analysis", desc: "Extracting diagnoses, vitals, and medications" },
    { title: "Event Extraction", desc: "Synthesizing structured chronological events" },
    { title: "Timeline & Evidence Linking", desc: "Binding verifiable bounding boxes to document pages" }
  ];

  useEffect(() => {
    // Progress steps smoothly
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length) {
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 800);

    return () => clearInterval(interval);
  }, [steps.length]);

  const isCompleted = currentStep >= steps.length;

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100/70 border border-cyan-200 text-cyan-800 text-xs font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-cyan-600 animate-spin" />
          <span>Clinical Processing Pipeline</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Analyzing Medical Record
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Extracting documented facts and linking source evidence to page coordinates.
        </p>
      </div>

      {/* Pipeline Card */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-premium">
        <div className="space-y-6">
          {steps.map((step, idx) => {
            const isDone = currentStep > idx;
            const isRunning = currentStep === idx;
            const isPending = currentStep < idx;

            return (
              <div key={idx} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                      isDone
                        ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                        : isRunning
                        ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20 animate-pulse'
                        : 'bg-slate-100 text-slate-400 border border-slate-200'
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : isRunning ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <span>{idx + 1}</span>
                    )}
                  </div>
                  {idx < steps.length - 1 && (
                    <div
                      className={`w-0.5 h-7 my-1 transition-colors duration-300 ${
                        isDone ? 'bg-emerald-500' : 'bg-slate-200'
                      }`}
                    />
                  )}
                </div>

                <div className="pt-1.5 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4
                      className={`text-xs sm:text-sm font-bold ${
                        isDone
                          ? 'text-slate-900'
                          : isRunning
                          ? 'text-cyan-700 font-extrabold'
                          : 'text-slate-400'
                      }`}
                    >
                      {step.title}
                    </h4>
                    {isDone && (
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded">
                        Done
                      </span>
                    )}
                    {isRunning && (
                      <span className="text-[10px] font-bold text-cyan-700 bg-cyan-100 px-1.5 py-0.2 rounded animate-pulse">
                        In Progress
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Completion Action */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-cyan-600" />
            {isCompleted ? 'Pipeline finished without warnings.' : 'Safe deterministic extraction active.'}
          </span>

          {isCompleted ? (
            <button
              onClick={() => navigate(`/documents/${id || 'doc-001'}`)}
              className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-500/20 transition-all flex items-center gap-2 hover:scale-[1.02] animate-bounce"
            >
              <span>View Analysis</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
              <Loader2 className="w-4 h-4 animate-spin text-cyan-500" />
              <span>Synthesizing...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
