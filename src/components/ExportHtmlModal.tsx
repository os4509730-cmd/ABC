import React, { useState } from 'react';
import { UserProgress } from '../types/academy';
import { generateDossierHtml, downloadDossierHtml } from '../utils/exportHtml';
import { soundEffects } from '../utils/soundEffects';

interface ExportHtmlModalProps {
  progress: UserProgress;
  onClose: () => void;
}

export const ExportHtmlModal: React.FC<ExportHtmlModalProps> = ({ progress, onClose }) => {
  const [copied, setCopied] = useState(false);
  const htmlContent = generateDossierHtml(progress);

  const handleDownload = () => {
    soundEffects.playBladeSlash();
    downloadDossierHtml(progress);
  };

  const handleCopy = async () => {
    soundEffects.playTacticalClick();
    try {
      await navigator.clipboard.writeText(htmlContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // clipboard fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-neutral-900 border border-neutral-700 rounded-2xl p-5 sm:p-7 shadow-2xl my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📄</span>
            <div>
              <span className="text-[10px] font-mono-tech text-red-400 uppercase tracking-widest block">
                CADET EXPORT DISPATCH // STANDALONE HTML
              </span>
              <h3 className="text-base sm:text-lg font-heading font-bold text-white">
                Export Cadet Dossier &amp; Candlestick Field Manual
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition cursor-pointer"
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed mb-4">
          Export a complete, self-contained, standalone <strong className="text-white">HTML file</strong>.
          It contains your verified rank record, chapter badges, quiz test scores, full candlestick anatomy references, the 6 reversal patterns cheat sheet, and Commander Mikoto&apos;s risk formula doctrine.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <button
            onClick={handleDownload}
            className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs sm:text-sm font-mono-tech font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(220,38,38,0.4)] active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>📥</span>
            <span>Download .HTML File</span>
          </button>

          <button
            onClick={handleCopy}
            className="px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 rounded-xl text-xs sm:text-sm font-mono-tech font-bold uppercase tracking-wider active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>{copied ? '✓' : '📋'}</span>
            <span>{copied ? 'HTML Copied!' : 'Copy Raw HTML'}</span>
          </button>
        </div>

        {/* Live HTML Preview Box */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono-tech text-neutral-400">
            <span>LIVE EMBEDDED HTML PREVIEW:</span>
            <span>STANDALONE ZERO-DEPENDENCY FILE</span>
          </div>

          <div className="w-full h-80 rounded-xl overflow-hidden border border-neutral-800 bg-[#08090c]">
            <iframe
              srcDoc={htmlContent}
              title="Cadet Dossier Preview"
              className="w-full h-full border-0"
              sandbox="allow-same-origin allow-scripts"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-neutral-800 flex justify-between items-center text-xs font-mono-tech text-neutral-500">
          <span>File: titan-trader-cadet-dossier.html</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg transition cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};
