import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, ExternalLink } from 'lucide-react';

export default function EvidenceBadge({ evidenceId, documentName, pageNumber, size = 'sm' }) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.stopPropagation();
    if (evidenceId) {
      navigate(`/evidence/${evidenceId}`);
    } else {
      navigate('/documents');
    }
  };

  return (
    <button
      onClick={handleClick}
      title="View verified original document source evidence"
      className={`inline-flex items-center gap-1.5 font-medium rounded-md transition-all duration-150 border ${
        size === 'xs'
          ? 'px-2 py-0.5 text-[11px]'
          : 'px-2.5 py-1 text-xs'
      } bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 shadow-sm`}
    >
      <ShieldCheck className="w-3.5 h-3.5 text-cyan-600" />
      <span>
        {pageNumber ? `Source • Page ${pageNumber}` : 'View Evidence'}
      </span>
      <ExternalLink className="w-3 h-3 opacity-60" />
    </button>
  );
}
