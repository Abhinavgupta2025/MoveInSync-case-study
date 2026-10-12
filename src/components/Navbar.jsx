const NAV_LINKS = [
  { href: "#themes",   label: "Themes" },
  { href: "#roadmap",  label: "Roadmap" },
  { href: "#reviews",  label: "Reviews" },
  { href: "#reply",    label: "Reply Helper" },
  { href: "#mockui",   label: "Mock UI" },
  { href: "#metrics",  label: "Metrics" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-13 py-3">
          {/* Brand */}
          <a href="#hero" className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 rounded">
            <span className="flex h-7 w-7 items-center justify-center rounded bg-accent-600 text-white font-bold text-xs">
              MiS
            </span>
            <span className="font-semibold text-slate-800 text-sm">Review Board</span>
          </a>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 rounded text-sm text-slate-500 hover:text-slate-900 hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Mobile nav */}
        <nav aria-label="Mobile navigation" className="md:hidden flex gap-1 overflow-x-auto pb-2">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="flex-shrink-0 px-3 py-1 rounded text-xs text-slate-500 hover:text-slate-900 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
