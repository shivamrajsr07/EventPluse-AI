import { useState } from "react";
import API from "../services/api";

function getErrorMessage(error) {
  const detail = error.response?.data?.detail;

  if (Array.isArray(detail)) {
    return detail.map((item) => item.msg).join("; ");
  }

  if (typeof detail === "object" && detail?.message) {
    return detail.message;
  }

  if (typeof detail === "string") {
    return detail;
  }

  return error.message || "Simulation failed";
}

export default function Simulator() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function simulate() {
    setLoading(true);
    setError("");

    try {
      const response = await API.get("/simulate");
      setData(response.data);
    } catch (requestError) {
      setData(null);
      setError(getErrorMessage(requestError));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[calc(100vh-54px)] bg-slate-950/70 p-6 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Simulator
            </p>
            <h1 className="mt-2 text-3xl font-bold">VIP Movement Simulation</h1>
            <p className="mt-2 text-slate-300">
              Run the standard high-priority traffic scenario and inspect model output.
            </p>
          </div>

          <button
            type="button"
            onClick={simulate}
            disabled={loading}
            className="rounded-md bg-cyan-300 px-5 py-3 font-bold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Simulating..." : "Simulate"}
          </button>
        </div>

        <section className="mt-6 rounded-lg border border-white/10 bg-slate-900/80 p-5 shadow-2xl shadow-cyan-950/20 backdrop-blur">
          {error && (
            <div className="rounded-md border border-red-400/40 bg-red-500/15 p-4 text-red-100">
              {error}
            </div>
          )}

          {!data && !error && (
            <div className="rounded-md border border-white/10 bg-white/5 p-6 text-slate-300">
              Start the simulation to calculate closure probability, impact score, and deployment needs.
            </div>
          )}

          {data && (
            <div className="space-y-5">
              <div>
                <p className="text-sm text-slate-400">Scenario</p>
                <h2 className="mt-1 text-2xl font-bold">{data.scenario}</h2>
              </div>

              <div className="grid gap-3 sm:grid-cols-4">
                <div className="rounded-md bg-white/5 p-4">
                  <p className="text-sm text-slate-400">Closure</p>
                  <p className="mt-2 text-2xl font-bold">
                    {Math.round(data.prediction.closure_probability * 100)}%
                  </p>
                </div>
                <div className="rounded-md bg-white/5 p-4">
                  <p className="text-sm text-slate-400">Risk</p>
                  <p className="mt-2 text-2xl font-bold">{data.impact.risk}</p>
                </div>
                <div className="rounded-md bg-white/5 p-4">
                  <p className="text-sm text-slate-400">Police</p>
                  <p className="mt-2 text-2xl font-bold">{data.resources.police}</p>
                </div>
                <div className="rounded-md bg-white/5 p-4">
                  <p className="text-sm text-slate-400">Diversions</p>
                  <p className="mt-2 text-2xl font-bold">{data.resources.diversions}</p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-md bg-white/5 p-4">
                  <p className="text-sm text-slate-400">Impact Score</p>
                  <p className="mt-2 text-2xl font-bold">{data.impact.impact_score}</p>
                </div>
                <div className="rounded-md bg-white/5 p-4">
                  <p className="text-sm text-slate-400">Barricades</p>
                  <p className="mt-2 text-2xl font-bold">{data.resources.barricades}</p>
                </div>
              </div>

              <p className="rounded-md bg-cyan-300/10 p-4 text-cyan-50">
                {data.explanation}
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
