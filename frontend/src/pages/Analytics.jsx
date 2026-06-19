import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import API from "../services/api";

const fallbackStats = {
  construction: 480,
  public_event: 84,
  procession: 72,
  vip_movement: 20,
  protest: 18
};

function toTitle(value) {
  return value
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default function Analytics() {
  const [stats, setStats] = useState(fallbackStats);
  const [status, setStatus] = useState("Using sample data");
  const [loading, setLoading] = useState(false);

  const loadAnalytics = useCallback(async function loadAnalytics() {
    setLoading(true);
    try {
      const response = await API.get("/analytics");
      setStats(response.data.event_statistics || fallbackStats);
      setStatus("Live backend data");
    } catch {
      setStats(fallbackStats);
      setStatus("Backend offline, showing sample data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      loadAnalytics();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [loadAnalytics]);

  const data = useMemo(() => {
    return Object.entries(stats).map(([event, count]) => ({
      event: toTitle(event),
      count
    }));
  }, [stats]);

  const totalEvents = data.reduce((sum, item) => sum + item.count, 0);
  const topEvent = [...data].sort((a, b) => b.count - a.count)[0];

  return (
    <main className="min-h-[calc(100vh-54px)] bg-slate-950/70 p-6 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Analytics
            </p>
            <h1 className="mt-2 text-3xl font-bold">Event Distribution</h1>
            <p className="mt-2 text-slate-300">{status}</p>
          </div>

          <button
            type="button"
            onClick={loadAnalytics}
            disabled={loading}
            className="rounded-md bg-cyan-300 px-5 py-3 font-bold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Refreshing..." : "Refresh data"}
          </button>
        </div>

        <section className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-white/10 bg-slate-900/80 p-5 shadow-2xl shadow-cyan-950/20 backdrop-blur">
            <p className="text-sm text-slate-400">Total Events</p>
            <p className="mt-2 text-3xl font-bold">{totalEvents}</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-slate-900/80 p-5 shadow-2xl shadow-cyan-950/20 backdrop-blur">
            <p className="text-sm text-slate-400">Top Category</p>
            <p className="mt-2 text-3xl font-bold">{topEvent?.event}</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-slate-900/80 p-5 shadow-2xl shadow-cyan-950/20 backdrop-blur">
            <p className="text-sm text-slate-400">Categories</p>
            <p className="mt-2 text-3xl font-bold">{data.length}</p>
          </div>
        </section>

        <section className="mt-6 rounded-lg border border-white/10 bg-slate-900/80 p-5 shadow-2xl shadow-cyan-950/20 backdrop-blur">
          <div className="h-[420px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis
                  dataKey="event"
                  stroke="#94a3b8"
                  tick={{ fill: "#cbd5e1", fontSize: 12 }}
                />
                <YAxis stroke="#94a3b8" tick={{ fill: "#cbd5e1" }} />
                <Tooltip
                  contentStyle={{
                    background: "#020617",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "6px",
                    color: "#fff"
                  }}
                />
                <Bar dataKey="count" fill="#67e8f9" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </main>
  );
}
