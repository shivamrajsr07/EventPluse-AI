import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Dashboard" },
  { to: "/predict", label: "Predict" },
  { to: "/simulator", label: "Simulator" },
  { to: "/analytics", label: "Analytics" },
  { to: "/heatmap", label: "Heatmap" }
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/82 px-4 py-3 text-white shadow-2xl shadow-black/20 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <NavLink to="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-md border border-cyan-300/40 bg-cyan-300/15 font-black text-cyan-100">
            EP
          </span>
          <span>
            <span className="block text-sm font-black uppercase tracking-[0.18em] text-cyan-200">
              EventPulse AI
            </span>
            <span className="text-xs text-slate-400">Traffic intelligence platform</span>
          </span>
        </NavLink>

        <div className="flex flex-wrap gap-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-md border px-3 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "border-cyan-300 bg-cyan-300 text-slate-950 shadow-lg shadow-cyan-950/30"
                    : "border-white/10 bg-white/5 text-slate-200 hover:border-cyan-300/60 hover:bg-white/10"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}
