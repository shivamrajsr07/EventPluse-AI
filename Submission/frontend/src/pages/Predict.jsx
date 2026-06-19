import { useState } from "react";
import API from "../services/api";

const scenarios = {
  "VIP Movement": {
    event_cause: "vip_movement",
    duration_hours: 8,
    hour: 18,
    day_of_week: 5,
    month: 7,
    is_weekend: 1,
    zone_density: 69,
    junction_density: 13,
    latitude: 13.02,
    longitude: 77.62
  },
  "Public Event": {
    event_cause: "public_event",
    duration_hours: 5,
    hour: 20,
    day_of_week: 6,
    month: 8,
    is_weekend: 1,
    zone_density: 82,
    junction_density: 18,
    latitude: 12.97,
    longitude: 77.59
  },
  Construction: {
    event_cause: "construction",
    duration_hours: 10,
    hour: 9,
    day_of_week: 2,
    month: 6,
    is_weekend: 0,
    zone_density: 74,
    junction_density: 22,
    latitude: 13.03,
    longitude: 77.6
  }
};

function getErrorMessage(error) {
  const detail = error.response?.data?.detail;

  if (Array.isArray(detail)) {
    return detail
      .map((item) => `${item.loc?.slice(1).join(".") || "field"}: ${item.msg}`)
      .join("; ");
  }

  if (typeof detail === "object" && detail?.message) {
    return detail.message;
  }

  if (typeof detail === "string") {
    return detail;
  }

  return error.message || "Prediction failed";
}

export default function Predict() {
  const [scenarioName, setScenarioName] = useState("VIP Movement");
  const [form, setForm] = useState(scenarios["VIP Movement"]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function runPrediction() {
    setLoading(true);
    setError("");

    try {
      const response = await API.post(
        "/predict",
        form
      );

      setResult(response.data);
    } catch (requestError) {
      setResult(null);
      setError(getErrorMessage(requestError));
    } finally {
      setLoading(false);
    }
  }

  function selectScenario(name) {
    setScenarioName(name);
    setForm(scenarios[name]);
    setResult(null);
    setError("");
  }

  function updateField(key, value) {
    setForm((current) => ({
      ...current,
      [key]: key === "event_cause" ? value : Number(value)
    }));
  }

  function resetScenario() {
    selectScenario(scenarioName);
  }

  return (
    <main className="min-h-[calc(100vh-54px)] bg-slate-950/70 p-6 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Prediction
            </p>
            <h1 className="mt-2 text-3xl font-bold">Event Impact Forecast</h1>
            <p className="mt-2 text-slate-300">
              Run a road-closure prediction against the trained EventPulse AI model.
            </p>
          </div>

          <button
            type="button"
            onClick={runPrediction}
            disabled={loading}
            className="rounded-md bg-cyan-300 px-5 py-3 font-bold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Running..." : "Run Prediction"}
          </button>
        </div>

        <section className="mt-6 grid gap-5 lg:grid-cols-[360px_1fr]">
          <div className="rounded-lg border border-white/10 bg-slate-900/80 p-5 shadow-2xl shadow-cyan-950/20 backdrop-blur">
            <label className="text-sm font-semibold text-slate-300" htmlFor="scenario">
              Scenario
            </label>
            <select
              id="scenario"
              value={scenarioName}
              onChange={(event) => selectScenario(event.target.value)}
              className="mt-2 w-full rounded-md border border-white/10 bg-slate-950/90 px-3 py-3 text-white outline-none focus:border-cyan-300"
            >
              {Object.keys(scenarios).map((name) => (
                <option key={name}>{name}</option>
              ))}
            </select>

            <div className="mt-5 grid gap-3 text-sm">
              {Object.entries(form).map(([key, value]) => (
                <label key={key} className="grid gap-2 rounded-md bg-white/5 px-3 py-2">
                  <span className="text-slate-400">{key}</span>
                  <input
                    value={value}
                    type={key === "event_cause" ? "text" : "number"}
                    step={key.includes("density") ? 1 : "any"}
                    onChange={(event) => updateField(key, event.target.value)}
                    className="w-full rounded-md border border-white/10 bg-slate-950/80 px-3 py-2 font-semibold text-white outline-none focus:border-cyan-300"
                  />
                </label>
              ))}
            </div>

            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={resetScenario}
                className="rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-slate-200 transition hover:border-cyan-300/60 hover:bg-white/10"
              >
                Reset scenario
              </button>
              <button
                type="button"
                onClick={runPrediction}
                disabled={loading}
                className="rounded-md bg-cyan-300 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Test data
              </button>
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-slate-900/80 p-5 shadow-2xl shadow-cyan-950/20 backdrop-blur">
            {error && (
              <div className="rounded-md border border-red-400/40 bg-red-500/15 p-4 text-red-100">
                {error}
              </div>
            )}

            {!result && !error && (
              <div className="rounded-md border border-white/10 bg-white/5 p-6 text-slate-300">
                Choose a scenario and run prediction to see impact, resource recommendation, and explanation.
              </div>
            )}

            {result && (
              <div className="space-y-5">
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-md bg-white/5 p-4">
                    <p className="text-sm text-slate-400">Closure Probability</p>
                    <p className="mt-2 text-2xl font-bold">
                      {Math.round(result.prediction.closure_probability * 100)}%
                    </p>
                  </div>
                  <div className="rounded-md bg-white/5 p-4">
                    <p className="text-sm text-slate-400">Impact Score</p>
                    <p className="mt-2 text-2xl font-bold">{result.impact.impact_score}</p>
                  </div>
                  <div className="rounded-md bg-white/5 p-4">
                    <p className="text-sm text-slate-400">Risk</p>
                    <p className="mt-2 text-2xl font-bold">{result.impact.risk}</p>
                  </div>
                </div>

                <div className="rounded-md bg-white/5 p-4">
                  <h2 className="font-bold">Recommended Resources</h2>
                  <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    <span>Police: {result.resources.police}</span>
                    <span>Barricades: {result.resources.barricades}</span>
                    <span>Diversions: {result.resources.diversions}</span>
                  </div>
                </div>

                <div className="rounded-md bg-cyan-300/10 p-4 text-cyan-50">
                  {result.explanation}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
