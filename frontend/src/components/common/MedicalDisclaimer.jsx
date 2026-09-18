import React from 'react';
import { AlertCircle, ShieldAlert } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function MedicalDisclaimer({ compact = false }) {
  const { t } = useLanguage();

  if (compact) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200/80 rounded-lg text-amber-900 text-xs">
        <ShieldAlert className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
        <span className="truncate">{t('disclaimer')}</span>
      </div>
    );
  }

  return (
    <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl px-4 py-2.5 flex items-start gap-3 text-xs text-amber-900 shadow-sm">
      <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
      <div className="leading-relaxed">
        <span className="font-semibold text-amber-950 mr-1">Medical Record Assistant Notice:</span>
        {t('disclaimer')} Always consult a certified physician for medical treatment and emergency concerns.
      </div>
    </div>
  );
}
