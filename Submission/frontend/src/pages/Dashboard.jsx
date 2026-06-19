import { Link } from "react-router-dom";

export default function Dashboard() {

  const cards = [
    {
      title: "High Risk Events",
      value: "23",
      color: "from-red-400 to-orange-300",
      detail: "Priority cases requiring route review"
    },
    {
      title: "Road Closures",
      value: "11",
      color: "from-cyan-300 to-blue-300",
      detail: "Active or likely restrictions"
    },
    {
      title: "Resources Deployed",
      value: "156",
      color: "from-emerald-300 to-cyan-300",
      detail: "Police, barricade, and diversion units"
    },
    {
      title: "Impact Score",
      value: "89",
      color: "from-fuchsia-300 to-cyan-300",
      detail: "Composite congestion pressure"
    }
  ];

  const actions = [
    { label: "Run prediction", to: "/predict" },
    { label: "Start simulator", to: "/simulator" },
    { label: "Open analytics", to: "/analytics" },
    { label: "Inspect heatmap", to: "/heatmap" }
  ];

  return (

    <main className="min-h-[calc(100vh-54px)] bg-slate-950/60 p-6 text-white">

      <section className="mx-auto max-w-6xl">

        <div className="rounded-lg border border-white/10 bg-slate-900/75 p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
            Command center
          </p>

          <div className="mt-2 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h1 className="text-4xl font-bold">EventPulse AI</h1>
              <p className="mt-2 max-w-2xl text-slate-300">
                Event driven traffic intelligence with live risk monitoring, prediction, simulation, and analytics.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {actions.map((action) => (
                <Link
                  key={action.to}
                  to={action.to}
                  className="rounded-md border border-cyan-300/40 bg-cyan-300/10 px-4 py-2 text-sm font-bold text-cyan-100 transition hover:border-cyan-200 hover:bg-cyan-300 hover:text-slate-950"
                >
                  {action.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {cards.map(card => (

            <div
              key={card.title}
              className="group relative overflow-hidden rounded-lg border border-white/10 bg-slate-900/80 p-5 shadow-2xl shadow-cyan-950/20 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-cyan-300/70"
            >

              <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${card.color}`} />

              <h3 className="text-sm text-slate-400">
                {card.title}
              </h3>

              <p className="mt-3 text-4xl font-bold">
                {card.value}
              </p>

              <p className="mt-2 min-h-10 text-sm text-slate-400">
                {card.detail}
              </p>

              <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                <div className={`h-full w-3/4 rounded-full bg-gradient-to-r ${card.color} transition-all duration-500 group-hover:w-full`} />
              </div>

            </div>

          ))}

        </div>

      </section>

    </main>
  );
}
