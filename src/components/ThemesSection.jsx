import { useState } from 'react';
import { THEMES } from '../data';

const SORT_OPTIONS = [
  { key: 'reviews2024_26', label: '2024–26 reviews' },
  { key: 'reviewsAllYears', label: 'All-years reviews' },
  { key: 'helpfulVotes', label: 'Helpful votes' },
];

const MAX_ALL = Math.max(...THEMES.map((t) => t.reviewsAllYears));

export default function ThemesSection() {
  const [sortKey, setSortKey] = useState('reviews2024_26');
  const [sortDir, setSortDir] = useState('desc');

  const sorted = [...THEMES].sort((a, b) => {
    const diff = a[sortKey] - b[sortKey];
    return sortDir === 'desc' ? -diff : diff;
  });

  function toggleSort(key) {
    if (sortKey === key) setSortDir(sortDir === 'desc' ? 'asc' : 'desc');
    else { setSortKey(key); setSortDir('desc'); }
  }

  const SortArrow = ({ colKey }) => (
    <span aria-hidden="true" className="ml-1 inline-block w-3 text-slate-400">
      {sortKey === colKey ? (sortDir === 'desc' ? '↓' : '↑') : '⇅'}
    </span>
  );

  return (
    <section id="themes" aria-label="Review themes" className="py-14 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-1">Section 2</p>
          <h2 className="section-title">Review Themes</h2>
          <p className="mt-1 text-slate-500 text-sm max-w-xl">
            Complaint categories coded from 40 sampled written reviews.
          </p>
        </div>

        {/* Bar chart */}
        <div className="card p-5 mb-6" role="img" aria-label="Bar chart of theme frequency">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
            Frequency — all-years sample (n = 40)
          </p>
          <div className="space-y-2.5">
            {[...THEMES]
              .sort((a, b) => b.reviewsAllYears - a.reviewsAllYears)
              .map((theme) => (
                <div key={theme.id} className="flex items-center gap-3">
                  <div className="w-40 sm:w-52 shrink-0 text-xs text-slate-600 text-right pr-2 leading-tight">
                    {theme.label.split(' ').slice(0, 4).join(' ')}…
                  </div>
                  <div className="flex-1 h-6 bg-gray-100 rounded overflow-hidden">
                    <div
                      className={`h-full ${theme.color} bar-fill rounded`}
                      style={{ width: `${(theme.reviewsAllYears / MAX_ALL) * 100}%` }}
                      role="presentation"
                    />
                  </div>
                  <div className="w-5 text-xs font-semibold text-slate-600 tabular-nums">
                    {theme.reviewsAllYears}
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Sortable table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm" aria-label="Review themes table">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 font-semibold text-slate-600 min-w-[200px]">Theme</th>
                  {SORT_OPTIONS.map((opt) => (
                    <th key={opt.key} className="px-4 py-3 text-right font-semibold text-slate-600 whitespace-nowrap">
                      <button
                        onClick={() => toggleSort(opt.key)}
                        className="hover:text-accent-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 rounded transition-colors"
                        aria-label={`Sort by ${opt.label}`}
                      >
                        {opt.label}<SortArrow colKey={opt.key} />
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {sorted.map((theme) => (
                  <tr key={theme.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className={`h-2.5 w-2.5 rounded-full ${theme.color} shrink-0`} aria-hidden="true" />
                        <span className="text-slate-800">{theme.label}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="font-semibold text-slate-800">{theme.reviews2024_26}</span>
                      <span className="text-slate-400 text-xs"> /22</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="font-semibold text-slate-800">{theme.reviewsAllYears}</span>
                      <span className="text-slate-400 text-xs"> /40</span>
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-accent-700">
                      {theme.helpfulVotes.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 bg-amber-50 border-t border-amber-100">
            <p className="text-xs text-amber-800 flex gap-2">
              <span aria-hidden="true">⚠️</span>
              <span><strong>Sampling note:</strong> Based on a sample of 40 written reviews, not a random sample. Counts show recurring themes, not true prevalence.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
