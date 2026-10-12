export default function HeroSection() {
  return (
    <section
      id="hero"
      className="bg-white border-b border-gray-200"
      aria-label="Summary"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">

        {/* App tag */}
        <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-4">
          com.moveinsync.ets · Play Store
        </p>

        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight mb-4">
          MoveInSync Review<br />Improvement Board
        </h1>

        {/* One-line finding */}
        <p className="text-base sm:text-lg text-slate-600 border-l-4 border-accent-400 pl-4 mb-10 max-w-2xl leading-relaxed">
          "The app lets people down in the minutes around pickup, then leaves them no way out."
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { value: "4.6 ★", label: "Play Store rating" },
            { value: "~115K",  label: "Total reviews" },
            { value: "40",     label: "Reviews sampled" },
            { value: "8",      label: "Complaint themes" },
          ].map((s) => (
            <div key={s.label} className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-4">
              <div className="text-2xl font-bold text-slate-800">{s.value}</div>
              <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Links */}
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#roadmap" className="btn-primary">View Fix Roadmap →</a>
          <a href="#themes"  className="btn-secondary">Explore Themes</a>
        </div>
      </div>
    </section>
  );
}
