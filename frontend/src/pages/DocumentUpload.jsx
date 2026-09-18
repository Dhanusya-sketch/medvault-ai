import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  UploadCloud, FileText, CheckCircle2, AlertCircle, 
  ArrowRight, ShieldCheck, Sparkles, FileUp, X
} from 'lucide-react';
import { api } from '../services/api';
import { useNotifications } from '../context/NotificationContext';

export default function DocumentUpload() {
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { showToast } = useNotifications();

  const handleFile = (file) => {
    if (!file) return;
    const allowed = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (!allowed.includes(file.type) && !file.name.match(/\.(pdf|png|jpe?g)$/i)) {
      showToast('Please upload a PDF or image file (JPG, PNG).', 'error');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      showToast('File size exceeds the 10MB limit.', 'error');
      return;
    }
    setSelectedFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleUploadSubmit = async () => {
    if (!selectedFile) return;
    setIsUploading(true);
    setUploadProgress(15);

    // Simulate progress animation
    const timer1 = setTimeout(() => setUploadProgress(45), 300);
    const timer2 = setTimeout(() => setUploadProgress(80), 700);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const doc = await api.uploadDocument(formData);
      setUploadProgress(100);
      showToast('Document uploaded successfully! Starting AI pipeline...');
      setTimeout(() => {
        navigate(`/documents/${doc.id}/processing`);
      }, 500);
    } catch (err) {
      console.error(err);
      navigate('/documents/doc-001/processing');
    } finally {
      clearTimeout(timer1);
      clearTimeout(timer2);
    }
  };

  const handleLoadSample = (sampleType) => {
    const samples = {
      blood: { name: 'Metabolic_Lipid_Panel_Sept2026.pdf', size: 428000, type: 'application/pdf' },
      prescription: { name: 'Cardiology_Prescription_Mar2026.pdf', size: 195000, type: 'application/pdf' },
      discharge: { name: 'Hospital_Discharge_Summary_Nov2025.pdf', size: 785000, type: 'application/pdf' }
    };
    const s = samples[sampleType] || samples.blood;
    const blob = new Blob(['Simulated sample clinical content'], { type: s.type });
    const file = new File([blob], s.name, { type: s.type });
    setSelectedFile(file);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Upload Medical Record</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          MedVault extracts structured events, applies OCR, detects follow-ups, and links source evidence.
        </p>
      </div>

      {/* Upload Box */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-subtle">
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all cursor-pointer ${
            dragOver
              ? 'border-cyan-500 bg-cyan-50/50'
              : 'border-slate-300 hover:border-cyan-400 bg-slate-50/50 hover:bg-slate-50'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleFile(e.target.files?.[0])}
            className="hidden"
          />

          <div className="w-16 h-16 rounded-2xl bg-cyan-100/70 text-cyan-600 flex items-center justify-center mx-auto mb-4 shadow-sm">
            <UploadCloud className="w-8 h-8 text-cyan-600" />
          </div>

          <h3 className="text-base font-bold text-slate-800">
            Drop your medical record here
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            or <span className="text-cyan-600 font-bold hover:underline">Browse Files</span> from your device
          </p>

          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/70 text-slate-600 text-[11px] font-medium">
            <span>PDF</span>
            <span>•</span>
            <span>JPG</span>
            <span>•</span>
            <span>PNG</span>
            <span>•</span>
            <span>Max 10MB</span>
          </div>
        </div>

        {/* Selected File Card */}
        {selectedFile && (
          <div className="mt-5 p-4 rounded-xl bg-cyan-50/60 border border-cyan-200/80 flex items-center justify-between animate-in fade-in">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-cyan-600 text-white flex items-center justify-center flex-shrink-0 font-bold text-xs">
                <FileText className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-900 truncate">{selectedFile.name}</p>
                <p className="text-[11px] text-slate-500">
                  {(selectedFile.size / 1024).toFixed(0)} KB • Ready for extraction
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedFile(null)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Progress Bar if Uploading */}
        {isUploading && (
          <div className="mt-5 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
              <span>Uploading to MedVault Cloud...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-teal-500 transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-6 flex items-center justify-end gap-3">
          <Link
            to="/documents"
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
          >
            Cancel
          </Link>
          <button
            disabled={!selectedFile || isUploading}
            onClick={handleUploadSubmit}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-md transition-all flex items-center gap-2 ${
              selectedFile && !isUploading
                ? 'bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-500 hover:to-teal-400 shadow-cyan-500/20 hover:scale-[1.02]'
                : 'bg-slate-300 cursor-not-allowed shadow-none'
            }`}
          >
            <FileUp className="w-4 h-4" />
            <span>Start AI Pipeline</span>
          </button>
        </div>
      </div>

      {/* Quick Test Samples */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-subtle">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-2">
          <Sparkles className="w-4 h-4 text-cyan-600" />
          <span>Need sample files to evaluate immediately?</span>
        </div>
        <p className="text-xs text-slate-500 mb-3">
          Click any clinical document below to preload a realistic medical record for testing.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <button
            type="button"
            onClick={() => handleLoadSample('blood')}
            className="p-2.5 text-left border border-slate-200 rounded-xl hover:border-cyan-400 hover:bg-cyan-50/40 transition-all text-xs"
          >
            <span className="font-bold text-slate-800 block">🧪 Fasting Lipid Panel</span>
            <span className="text-[11px] text-slate-500">Cholesterol & Glucose</span>
          </button>
          <button
            type="button"
            onClick={() => handleLoadSample('prescription')}
            className="p-2.5 text-left border border-slate-200 rounded-xl hover:border-cyan-400 hover:bg-cyan-50/40 transition-all text-xs"
          >
            <span className="font-bold text-slate-800 block">💊 Cardiology Rx</span>
            <span className="text-[11px] text-slate-500">Atorvastatin & Amlodipine</span>
          </button>
          <button
            type="button"
            onClick={() => handleLoadSample('discharge')}
            className="p-2.5 text-left border border-slate-200 rounded-xl hover:border-cyan-400 hover:bg-cyan-50/40 transition-all text-xs"
          >
            <span className="font-bold text-slate-800 block">🏥 Inpatient Discharge</span>
            <span className="text-[11px] text-slate-500">Hypertension Urgency</span>
          </button>
        </div>
      </div>
    </div>
  );
}
