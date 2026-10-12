import { useState } from 'react';
import { DEFAULT_METRICS } from '../data';

const UNIT_LABELS = {
  '%': 'Percentage (%)',
  'count': 'Absolute count',
  'per 1K': 'Per 1,000 trips',
  'seconds': 'Seconds',
};

export default function MetricsPanel() {
  const [metrics, setMetrics] = useState(DEFAULT_METRICS);

  function handleTargetChange(id, value) {
    setMetrics((prev) => prev.map((m) => (m.id === id ? { ...m, target: value } : m)));
  }

  return (
    <section id="metrics" aria-label="Metrics panel" className="py-14 bg-white border-t border-gray-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-1">Section 7</p>
          <h2 className="section-title">Metrics Panel</h2>
          <p className="text-slate-500 text-sm mt-1">Proposed success targets. Edit values directly — changes are in-memory only.</p>
          <div className="mt-3 inline-flex items-center gap-2 rounded border border-amber-200 bg-amber-50 px-3 py-1.5">
            <span className="text-xs font-semibold text-amber-800">📌 Proposed — set after one week of data</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {metrics.map((metric) => (
            <div key={metric.id} className="card border border-gray-200 p-4 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-semibold text-slate-800 leading-snug flex-1">{metric.label}</h3>
                <span className="badge bg-gray-100 text-slate-500 text-xs shrink-0">{metric.unit}</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{metric.description}</p>
              <div className="mt-auto">
                <label htmlFor={`metric-${metric.id}`} className="block text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider">
                  Target ({UNIT_LABELS[metric.unit]})
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id={`metric-${metric.id}`}
                    type="number"
                    value={metric.target}
                    onChange={(e) => handleTargetChange(metric.id, e.target.value)}
                    className="input-base text-base font-semibold"
                    aria-label={`Target for ${metric.label}`}
                    step="0.1" min="0"
                  />
                  <span className="text-sm text-slate-400 shrink-0">{metric.unit}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 flex justify-end">
          <button onClick={() => setMetrics(DEFAULT_METRICS)} className="btn-secondary text-xs">
            ↺ Reset to defaults
          </button>
        </div>
      </div>
    </section>
  );
}
