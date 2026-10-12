import { useState, useMemo } from 'react';
import { SAMPLE_REVIEWS, THEMES } from '../data';

const STAR_COLORS = { 1: 'text-red-500', 2: 'text-orange-500', 3: 'text-amber-500', 4: 'text-lime-600', 5: 'text-green-600' };
const ALL_YEARS = [...new Set(SAMPLE_REVIEWS.map((r) => r.year))].sort((a, b) => b - a);

function StarRating({ stars }) {
  return (
    <span className={`font-semibold tabular-nums ${STAR_COLORS[stars]}`} aria-label={`${stars} star${stars > 1 ? 's' : ''}`}>
      {'★'.repeat(stars)}{'☆'.repeat(5 - stars)}
    </span>
  );
}

function ThemeBadge({ themeId }) {
  const theme = THEMES.find((t) => t.id === themeId);
  if (!theme) return null;
  return (
    <span className="badge bg-gray-100 text-slate-600 border border-gray-200 text-xs">
      {theme.label.split(',')[0].split(' ').slice(0, 3).join(' ')}
    </span>
  );
}

export default function ReviewExplorer() {
  const [filterTheme, setFilterTheme] = useState('all');
  const [filterYear, setFilterYear]   = useState('all');
  const [filterStars, setFilterStars] = useState('all');

  const filtered = useMemo(() => SAMPLE_REVIEWS.filter((r) => {
    if (filterTheme !== 'all' && !r.themes.includes(filterTheme)) return false;
    if (filterYear  !== 'all' && String(r.year)  !== filterYear)  return false;
    if (filterStars !== 'all' && String(r.stars) !== filterStars) return false;
    return true;
  }), [filterTheme, filterYear, filterStars]);

  return (
    <section id="reviews" aria-label="Review explorer" className="py-14 bg-gray-50 border-t border-gray-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-1">Section 4</p>
          <h2 className="section-title">Review Explorer</h2>
          <p className="text-slate-500 text-sm mt-1">
            {SAMPLE_REVIEWS.length} placeholder reviews. Replace entries in{' '}
            <code className="font-mono text-xs bg-gray-200 px-1 rounded">src/data.js</code> with real ones.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6" role="group" aria-label="Filter reviews">
          <div>
            <label htmlFor="filter-theme" className="sr-only">Filter by theme</label>
            <select id="filter-theme" value={filterTheme} onChange={(e) => setFilterTheme(e.target.value)} className="input-base w-auto">
              <option value="all">All themes</option>
              {THEMES.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="filter-year" className="sr-only">Filter by year</label>
            <select id="filter-year" value={filterYear} onChange={(e) => setFilterYear(e.target.value)} className="input-base w-auto">
              <option value="all">All years</option>
              {ALL_YEARS.map((y) => <option key={y} value={String(y)}>{y}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="filter-stars" className="sr-only">Filter by rating</label>
            <select id="filter-stars" value={filterStars} onChange={(e) => setFilterStars(e.target.value)} className="input-base w-auto">
              <option value="all">All ratings</option>
              {[1,2,3,4,5].map((s) => <option key={s} value={String(s)}>{'★'.repeat(s)} ({s} star{s>1?'s':''})</option>)}
            </select>
          </div>
          <div className="ml-auto self-center text-sm text-slate-400">{filtered.length} of {SAMPLE_REVIEWS.length}</div>
        </div>

        {/* Reviews */}
        {filtered.length === 0 ? (
          <div className="card p-10 text-center text-slate-400">No reviews match the current filters.</div>
        ) : (
          <div className="space-y-3">
            {filtered.map((review) => (
              <article key={review.id} className="card p-5 border border-gray-200">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-3">
                    <StarRating stars={review.stars} />
                    <time dateTime={review.date} className="text-xs text-slate-400">
                      {new Date(review.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </time>
                  </div>
                  <div className="text-xs text-slate-400">👍 {review.helpfulVotes} helpful</div>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed mb-3">{review.text}</p>
                <div className="flex flex-wrap gap-2">
                  {review.themes.map((tid) => <ThemeBadge key={tid} themeId={tid} />)}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
