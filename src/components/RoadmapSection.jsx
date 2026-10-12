import { useState } from 'react';
import { ROADMAP_ITEMS, THEMES } from '../data';

const STATUS_OPTIONS = ['Not started', 'In progress', 'Done'];

const STATUS_STYLES = {
  'Not started': 'bg-gray-100 text-slate-600',
  'In progress': 'bg-amber-100 text-amber-700',
  'Done':        'bg-green-100 text-green-700',
};

const PRIORITY_STYLES = {
  P0: 'bg-red-100 text-red-700 border border-red-200',
  P1: 'bg-orange-100 text-orange-700 border border-orange-200',
  P2: 'bg-gray-100 text-slate-600 border border-gray-200',
};

function getThemeById(id) {
  return THEMES.find((t) => t.id === id);
}

function RoadmapCard({ item, status, onStatusChange }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="card border border-gray-200 overflow-hidden" aria-label={`Fix ${item.relatedFix}: ${item.title}`}>
      {/* Header */}
      <div className="p-5 flex flex-col sm:flex-row sm:items-start gap-4">
        <div className="flex-shrink-0 h-9 w-9 rounded bg-accent-600 text-white font-bold text-base flex items-center justify-center">
          {item.relatedFix}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className={`badge text-xs font-bold ${PRIORITY_STYLES[item.priority]}`}>{item.priority}</span>
            {item.themes.map((tid) => {
              const theme = getThemeById(tid);
              return theme ? (
                <span key={tid} className="badge bg-gray-100 text-slate-600 border border-gray-200 text-xs">
                  {theme.label.split(',')[0].split(' ').slice(0, 3).join(' ')}
                </span>
              ) : null;
            })}
          </div>
          <h3 className="text-base font-semibold text-slate-800 leading-snug">{item.title}</h3>
        </div>

        <div className="sm:ml-auto flex-shrink-0">
          <label htmlFor={`status-${item.id}`} className="sr-only">Status for fix {item.relatedFix}</label>
          <select
            id={`status-${item.id}`}
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent-500 ${STATUS_STYLES[status]}`}
          >
            {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Evidence */}
      <div className="px-5 pb-4 border-t border-gray-100 pt-4">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Evidence</p>
        <p className="text-sm text-slate-600 leading-relaxed">{item.evidence}</p>
      </div>

      {/* Expand toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        className="w-full px-5 py-2.5 text-xs font-medium text-accent-700 bg-gray-50 hover:bg-gray-100 border-t border-gray-100 flex items-center justify-between transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-500"
      >
        <span>{expanded ? 'Hide details' : 'Show: What to build + How to measure'}</span>
        <span aria-hidden="true" className={`transition-transform ${expanded ? 'rotate-180' : ''}`}>▼</span>
      </button>

      {expanded && (
        <div className="px-5 pb-5 pt-4 grid sm:grid-cols-2 gap-6 border-t border-gray-100">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">What to build</p>
            <ul className="space-y-2">
              {item.whatToBuild.map((point, i) => (
                <li key={i} className="flex gap-2 text-sm text-slate-700">
                  <span className="mt-0.5 h-5 w-5 flex-shrink-0 rounded bg-gray-100 text-slate-500 flex items-center justify-center text-xs font-semibold">{i + 1}</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">How to measure</p>
            <div className="rounded-lg bg-green-50 border border-green-200 p-3">
              <p className="text-sm text-green-800 leading-relaxed">{item.howToMeasure}</p>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

export default function RoadmapSection() {
  const [statuses, setStatuses] = useState(() =>
    Object.fromEntries(ROADMAP_ITEMS.map((item) => [item.id, 'Not started']))
  );

  function updateStatus(id, value) {
    setStatuses((prev) => ({ ...prev, [id]: value }));
  }

  const counts = STATUS_OPTIONS.reduce((acc, s) => {
    acc[s] = Object.values(statuses).filter((v) => v === s).length;
    return acc;
  }, {});

  return (
    <section id="roadmap" aria-label="Fix roadmap" className="py-14 bg-white border-t border-gray-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-1">Section 3</p>
          <h2 className="section-title">Fix Roadmap</h2>
          <p className="text-slate-500 text-sm max-w-xl mt-1">Five evidence-backed fixes, ordered by urgency.</p>
        </div>

        {/* Status summary */}
        <div className="flex flex-wrap gap-4 mb-7">
          {STATUS_OPTIONS.map((s) => (
            <div key={s} className="flex items-center gap-2">
              <span className={`badge ${STATUS_STYLES[s]} text-xs`}>{s}</span>
              <span className="text-base font-bold text-slate-800">{counts[s]}</span>
            </div>
          ))}
          <div className="ml-auto text-sm text-slate-400 self-center">{counts['Done']} / {ROADMAP_ITEMS.length} done</div>
        </div>

        <div className="space-y-4">
          {ROADMAP_ITEMS.map((item) => (
            <RoadmapCard
              key={item.id}
              item={item}
              status={statuses[item.id]}
              onStatusChange={(val) => updateStatus(item.id, val)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
