import { useState } from 'react';

/* ── (a) Active Trip Card ──────────────────────────────────────────────────── */
function ActiveTripCard() {
  const [callMode, setCallMode] = useState(null);

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden max-w-sm w-full">
      <div className="px-4 pt-4 pb-3 border-b border-gray-100 flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Trip</span>
        <span className="badge bg-green-100 text-green-700 text-xs border border-green-200">En route</span>
      </div>

      <div className="px-4 py-4 flex items-center gap-4 border-b border-gray-100">
        <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center text-2xl" aria-hidden="true">🚗</div>
        <div>
          <div className="font-semibold text-slate-800">MH 01 AB 2345</div>
          <div className="text-sm text-slate-500">Swift Dzire · Rajesh Kumar</div>
        </div>
        <div className="ml-auto text-right">
          <div className="text-2xl font-bold text-slate-800">3</div>
          <div className="text-xs text-slate-400">min away</div>
        </div>
      </div>

      <div className="mx-4 my-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 flex items-center justify-between">
        <div>
          <div className="text-xs text-slate-400 mb-0.5">Your OTP</div>
          <div className="text-2xl font-bold tracking-widest font-mono text-slate-800">8472</div>
        </div>
        <span className="text-2xl" aria-hidden="true">🔐</span>
      </div>

      <div className="px-4 pb-4 grid grid-cols-2 gap-2">
        <button
          onClick={() => setCallMode(callMode === 'driver' ? null : 'driver')}
          className="flex flex-col items-center gap-1 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 py-3 transition-colors text-sm font-medium text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
          aria-label="Call driver"
        >
          <span className="text-xl" aria-hidden="true">📞</span>
          Call Driver
        </button>
        <button
          onClick={() => setCallMode(callMode === 'helpdesk' ? null : 'helpdesk')}
          className="flex flex-col items-center gap-1 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 py-3 transition-colors text-sm font-medium text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
          aria-label="Call helpdesk"
        >
          <span className="text-xl" aria-hidden="true">🎧</span>
          Helpdesk
        </button>
      </div>

      {callMode && (
        <div className="mx-4 mb-4 rounded-lg bg-green-50 border border-green-200 px-4 py-3 flex items-center justify-between">
          <span className="text-sm font-medium text-green-800">Connecting to {callMode === 'driver' ? 'driver...' : 'helpdesk...'}</span>
          <button onClick={() => setCallMode(null)} aria-label="End call" className="rounded bg-red-100 hover:bg-red-200 h-7 w-7 flex items-center justify-center text-red-700 text-sm font-bold focus-visible:outline-none">✕</button>
        </div>
      )}

      <div className="px-4 pb-3 text-center">
        <p className="text-xs text-slate-400">✓ Visible without re-login</p>
      </div>
    </div>
  );
}

/* ── (b) Location staleness ──────────────────────────────────────────────────── */
function LocationPinCard() {
  const [secondsAgo, setSecondsAgo] = useState(12);
  const stale = secondsAgo > 30;
  const veryStale = secondsAgo > 60;

  const dotColor = veryStale ? 'bg-red-500' : stale ? 'bg-amber-500' : 'bg-green-500';
  const labelColor = veryStale ? 'text-red-700' : stale ? 'text-amber-700' : 'text-green-700';
  const stripBg = veryStale ? 'bg-red-50 border-red-100' : stale ? 'bg-amber-50 border-amber-100' : 'bg-green-50 border-green-100';

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden max-w-sm w-full">
      <div
        className="h-36 relative flex items-center justify-center"
        style={{ background: 'repeating-linear-gradient(45deg,#f1f5f9,#f1f5f9 10px,#e2e8f0 10px,#e2e8f0 20px)' }}
        role="img" aria-label="Map placeholder"
      >
        <div className="absolute inset-x-0 top-1/2 h-4 -translate-y-1/2 bg-white/60" aria-hidden="true" />
        <div className="relative z-10 flex flex-col items-center">
          <div className={`relative h-9 w-9 rounded-full flex items-center justify-center text-lg border-2 border-white shadow ${veryStale ? 'bg-red-100' : stale ? 'bg-amber-100' : 'bg-green-100'}`}>
            🚗
            {!veryStale && <span className={`pulse-ring absolute inset-0 rounded-full ${dotColor} opacity-40`} aria-hidden="true" />}
          </div>
        </div>
      </div>

      <div className={`px-4 py-2.5 flex items-center justify-between border-t ${stripBg}`}>
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${dotColor}`} aria-hidden="true" />
          <span className={`text-xs font-medium ${labelColor}`}>Updated {secondsAgo} s ago</span>
        </div>
        {veryStale && <span className="text-xs font-semibold text-red-600">📵 Location lost</span>}
      </div>

      {stale && (
        <div className={`px-4 py-3 border-t ${veryStale ? 'border-red-100 bg-red-50' : 'border-amber-100 bg-amber-50'}`}>
          <p className={`text-xs font-medium ${veryStale ? 'text-red-700' : 'text-amber-700'}`}>
            {veryStale ? '⚠️ Driver location unavailable — tap to call driver directly' : '⚠️ Location not refreshed in 30+ s — may be in a low-signal area'}
          </p>
          {veryStale && (
            <button className="mt-2 btn-primary text-xs px-3 py-1.5 w-full justify-center bg-red-600 hover:bg-red-700">
              📞 Call Driver Now
            </button>
          )}
        </div>
      )}

      <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
        <span className="text-xs text-slate-400">Click to advance time</span>
        <button onClick={() => setSecondsAgo((s) => s >= 90 ? 5 : s + (Math.random() > 0.4 ? 20 : 5))} className="btn-secondary text-xs px-3 py-1">
          +time →
        </button>
      </div>
    </div>
  );
}

/* ── (c) Company Disabled ──────────────────────────────────────────────────── */
function CompanyDisabledCard() {
  const [sent, setSent] = useState(false);

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden max-w-sm w-full">
      <div className="px-4 pt-5 pb-4 text-center border-b border-gray-100">
        <div className="h-12 w-12 mx-auto mb-3 rounded-lg bg-gray-100 flex items-center justify-center text-2xl" aria-hidden="true">🔒</div>
        <h3 className="font-semibold text-slate-800 mb-1">Feature Disabled</h3>
        <p className="text-sm text-slate-500">Night-time cab booking has been disabled by your company's transport policy.</p>
      </div>

      <div className="px-4 py-4 space-y-3">
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Company policy</p>
          <p className="text-sm text-slate-700">Booking available: <strong>6:00 AM – 11:00 PM</strong></p>
          <p className="text-sm text-slate-700">Requires approval for late trips</p>
        </div>

        {sent ? (
          <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-center">
            <p className="text-sm font-semibold text-green-700">✓ Message sent to transport desk</p>
            <p className="text-xs text-green-600 mt-0.5">Expect a reply within 1 hour</p>
          </div>
        ) : (
          <button onClick={() => setSent(true)} className="btn-primary w-full justify-center py-2.5">
            💬 Message Transport Desk
          </button>
        )}

        <p className="text-xs text-center text-slate-400">Pre-filled: "I need a late cab booking — please advise."</p>
      </div>
    </div>
  );
}

/* ── (d) Boarding Confirmation ──────────────────────────────────────────────── */
function BoardingConfirmCard() {
  const [state, setState] = useState('idle');

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden max-w-sm w-full">
      {state === 'idle' && (
        <>
          <div className="px-4 pt-5 pb-4 text-center border-b border-gray-100">
            <div className="h-12 w-12 mx-auto mb-3 rounded-lg bg-accent-50 flex items-center justify-center text-2xl" aria-hidden="true">🚗</div>
            <h3 className="font-semibold text-slate-800 mb-1">Your cab has arrived!</h3>
            <p className="text-sm text-slate-500">MH 01 AB 2345 · Rajesh Kumar · OTP 8472</p>
          </div>

          <div className="mx-4 my-4 rounded-lg border border-accent-200 bg-accent-50 p-3 text-center">
            <p className="text-sm font-medium text-accent-800">Confirm boarding, or tell us you are late</p>
            <p className="text-xs text-accent-600 mt-1">No response in 3 min → we call the driver.</p>
          </div>

          <div className="px-4 pb-5 grid grid-cols-2 gap-3">
            <button onClick={() => setState('confirmed')} className="flex flex-col items-center gap-1.5 py-4 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500">
              <span className="text-xl" aria-hidden="true">✅</span>
              <span className="text-sm">I'm boarding</span>
            </button>
            <button onClick={() => setState('late')} className="flex flex-col items-center gap-1.5 py-4 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400">
              <span className="text-xl" aria-hidden="true">⏱</span>
              <span className="text-sm">Running late</span>
            </button>
          </div>
        </>
      )}

      {state === 'confirmed' && (
        <div className="px-4 py-10 text-center">
          <div className="text-4xl mb-3" aria-hidden="true">🎉</div>
          <h3 className="font-semibold text-slate-800 mb-1">Boarding confirmed!</h3>
          <p className="text-sm text-slate-500 mb-4">Have a safe trip. ETA 8:42 AM.</p>
          <button onClick={() => setState('idle')} className="btn-secondary text-xs">Reset demo</button>
        </div>
      )}

      {state === 'late' && (
        <div className="px-4 py-10 text-center">
          <div className="text-4xl mb-3" aria-hidden="true">⏳</div>
          <h3 className="font-semibold text-slate-800 mb-1">Got it — driver is waiting</h3>
          <p className="text-sm text-slate-500 mb-4">Rajesh can wait up to 3 more minutes. No no-show will be marked.</p>
          <button onClick={() => setState('idle')} className="btn-secondary text-xs">Reset demo</button>
        </div>
      )}
    </div>
  );
}

/* ── Main section ────────────────────────────────────────────────────────────── */
const DEMOS = [
  { id: 'active-trip',       label: '(a) Active Trip Card',     description: 'Vehicle info, OTP, driver call and helpdesk — visible without re-login.',         component: <ActiveTripCard /> },
  { id: 'location-pin',      label: '(b) Location Staleness',   description: 'Pin with "Updated X s ago" indicator + stale / lost-location warnings.',           component: <LocationPinCard /> },
  { id: 'company-disabled',  label: '(c) Disabled by Company',  description: 'Policy message with plain-English reason and a direct "Message transport desk" tap.', component: <CompanyDisabledCard /> },
  { id: 'boarding',          label: '(d) Boarding Confirmation', description: '"Confirm boarding or tell us you are late" — eliminates no-show surprises.',        component: <BoardingConfirmCard /> },
];

export default function MockUISection() {
  const [activeDemo, setActiveDemo] = useState('active-trip');
  const demo = DEMOS.find((d) => d.id === activeDemo);

  return (
    <section id="mockui" aria-label="Mock UI demos" className="py-14 bg-gray-50 border-t border-gray-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-1">Section 6</p>
          <h2 className="section-title">Mock UI Demos</h2>
          <p className="text-slate-500 text-sm mt-1">Interactive prototypes of the proposed fixes. Click to explore interactions.</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="UI demos">
          {DEMOS.map((d) => (
            <button
              key={d.id}
              role="tab"
              aria-selected={activeDemo === d.id}
              onClick={() => setActiveDemo(d.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 ${
                activeDemo === d.id
                  ? 'bg-accent-600 text-white border-accent-600'
                  : 'bg-white text-slate-600 border-gray-200 hover:border-gray-400'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        <div role="tabpanel" aria-label={demo.label} className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">{demo.label}</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-5">{demo.description}</p>

            <div className="rounded-lg border border-accent-200 bg-accent-50 p-4">
              <p className="text-xs font-semibold text-accent-700 uppercase tracking-wider mb-1.5">Why this matters</p>
              {activeDemo === 'active-trip' && <p className="text-sm text-slate-700">Reviews describe being forced to log in again mid-pickup, losing the OTP and missing the cab. This card stays accessible for the entire active-trip window.</p>}
              {activeDemo === 'location-pin' && <p className="text-sm text-slate-700">"Map freezing" is the top complaint (331 helpful votes). A freshness indicator tells the rider immediately when to distrust the map — and what to do next.</p>}
              {activeDemo === 'company-disabled' && <p className="text-sm text-slate-700">Currently the app shows a generic error. This pattern explains the specific rule and gives a single tap to message the transport desk with a pre-filled message.</p>}
              {activeDemo === 'boarding' && <p className="text-sm text-slate-700">No-show marks with zero warning generate 50+ helpful votes on negative reviews. This prompt delays the mark and notifies the driver — eliminating the surprise.</p>}
            </div>
          </div>

          <div className="flex justify-center">{demo.component}</div>
        </div>
      </div>
    </section>
  );
}
