import { useState } from 'react';
import { REPLY_TEMPLATES, THEMES } from '../data';

export default function ReplyHelper() {
  const [selectedTheme, setSelectedTheme] = useState('tracking');
  const [copied, setCopied] = useState(false);
  const templateData = REPLY_TEMPLATES[selectedTheme];

  function handleCopy() {
    navigator.clipboard.writeText(templateData.template).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  return (
    <section id="reply" aria-label="Review reply helper" className="py-14 bg-white border-t border-gray-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-1">Section 5</p>
          <h2 className="section-title">Review Reply Helper</h2>
          <p className="text-slate-500 text-sm mt-1">
            Pick a theme → copy a ready-to-paste Play Store reply. Goal: every 1–2 star review answered within 72 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-4">
            <div className="card border border-gray-200 overflow-hidden">
              <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-200">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Select theme</p>
              </div>
              <div className="divide-y divide-gray-100">
                {THEMES.map((theme) => {
                  const isSelected = selectedTheme === theme.id;
                  return (
                    <button
                      key={theme.id}
                      onClick={() => { setSelectedTheme(theme.id); setCopied(false); }}
                      aria-pressed={isSelected}
                      className={`w-full text-left px-4 py-2.5 flex items-center gap-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-500 ${
                        isSelected ? 'bg-accent-50 text-accent-800 font-medium' : 'text-slate-600 hover:bg-gray-50'
                      }`}
                    >
                      <span className={`h-2 w-2 rounded-full ${theme.color} flex-shrink-0`} aria-hidden="true" />
                      <span className="leading-snug">{theme.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 flex gap-3">
              <span className="text-lg" aria-hidden="true">⏱</span>
              <div>
                <p className="text-sm font-semibold text-amber-800 mb-0.5">72-hour reply target</p>
                <p className="text-xs text-amber-700 leading-relaxed">Reply to every 1–2 star review within 3 days. Public replies are visible to future users.</p>
              </div>
            </div>
          </div>

          {/* Template */}
          <div className="lg:col-span-3">
            <div className="card border border-gray-200 h-full flex flex-col">
              <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider truncate mr-3">
                  {templateData?.theme}
                </p>
                <button
                  onClick={handleCopy}
                  aria-label="Copy reply template"
                  className={`btn-primary text-xs px-3 py-1.5 shrink-0 ${copied ? 'bg-green-600 hover:bg-green-700' : ''}`}
                >
                  {copied ? '✓ Copied' : '📋 Copy'}
                </button>
              </div>
              <div className="flex-1 p-4">
                <p className="text-xs text-slate-400 mb-3">
                  Replace <code className="font-mono bg-gray-100 px-1 rounded">[brackets]</code> before posting.
                </p>
                <pre className="whitespace-pre-wrap font-mono text-xs sm:text-sm text-slate-700 bg-gray-50 rounded-lg p-4 leading-relaxed border border-gray-200 overflow-auto max-h-[480px]">
                  {templateData?.template}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
