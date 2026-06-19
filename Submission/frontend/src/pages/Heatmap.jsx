import { useMemo, useState } from "react";
import {
  CircleMarker,
  MapContainer,
  Polyline,
  Popup,
  TileLayer,
  Tooltip
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

const eventHotspots = [
  {
    id: 1,
    name: "MG Road Metro Junction",
    type: "Public Event",
    severity: "High",
    impact: 92,
    crowd: 18000,
    delay: 42,
    position: [12.9757, 77.6068],
    note: "Stage setup and pedestrian spillover expected near peak commute."
  },
  {
    id: 2,
    name: "Hebbal Flyover",
    type: "Construction",
    severity: "Critical",
    impact: 96,
    crowd: 7200,
    delay: 55,
    position: [13.0358, 77.597],
    note: "Lane closure affects airport-bound movement."
  },
  {
    id: 3,
    name: "Kanteerava Stadium",
    type: "Sports",
    severity: "High",
    impact: 84,
    crowd: 24000,
    delay: 38,
    position: [12.9698, 77.5937],
    note: "Event exit window creates dense outbound demand."
  },
  {
    id: 4,
    name: "KR Market",
    type: "Procession",
    severity: "Medium",
    impact: 68,
    crowd: 9500,
    delay: 27,
    position: [12.9635, 77.5767],
    note: "Slow moving procession along market access roads."
  },
  {
    id: 5,
    name: "Electronic City Toll",
    type: "VIP Movement",
    severity: "Medium",
    impact: 61,
    crowd: 4200,
    delay: 24,
    position: [12.8452, 77.6602],
    note: "Rolling restrictions for convoy movement."
  },
  {
    id: 6,
    name: "Whitefield Main Road",
    type: "Construction",
    severity: "High",
    impact: 79,
    crowd: 6800,
    delay: 34,
    position: [12.9698, 77.75],
    note: "Utility work narrows eastbound traffic."
  },
  {
    id: 7,
    name: "Jayanagar 4th Block",
    type: "Public Event",
    severity: "Low",
    impact: 42,
    crowd: 2600,
    delay: 14,
    position: [12.925, 77.5938],
    note: "Local crowd build-up around shopping streets."
  }
];

const routeCorridors = [
  {
    name: "Central business corridor",
    color: "#ef4444",
    points: [
      [12.9757, 77.6068],
      [12.9698, 77.5937],
      [12.9635, 77.5767]
    ]
  },
  {
    name: "North airport corridor",
    color: "#f59e0b",
    points: [
      [12.9757, 77.6068],
      [13.0047, 77.5926],
      [13.0358, 77.597]
    ]
  },
  {
    name: "IT corridor",
    color: "#38bdf8",
    points: [
      [12.9698, 77.75],
      [12.9279, 77.6271],
      [12.8452, 77.6602]
    ]
  }
];

const severityStyles = {
  Critical: {
    fill: "#dc2626",
    stroke: "#fecaca",
    label: "bg-red-500/15 text-red-100 border-red-400/40"
  },
  High: {
    fill: "#f97316",
    stroke: "#fed7aa",
    label: "bg-orange-500/15 text-orange-100 border-orange-400/40"
  },
  Medium: {
    fill: "#eab308",
    stroke: "#fef08a",
    label: "bg-yellow-500/15 text-yellow-100 border-yellow-400/40"
  },
  Low: {
    fill: "#22c55e",
    stroke: "#bbf7d0",
    label: "bg-emerald-500/15 text-emerald-100 border-emerald-400/40"
  }
};

const eventTypes = ["All", ...new Set(eventHotspots.map((event) => event.type))];
const severityOptions = ["All", "Critical", "High", "Medium", "Low"];
const timeWindows = [
  { label: "Now", multiplier: 1, delayBoost: 0 },
  { label: "+2h", multiplier: 1.14, delayBoost: 8 },
  { label: "+6h", multiplier: 0.86, delayBoost: -6 }
];

function formatNumber(value) {
  return new Intl.NumberFormat("en-IN").format(value);
}

export default function Heatmap() {
  const [activeType, setActiveType] = useState("All");
  const [activeSeverity, setActiveSeverity] = useState("All");
  const [activeWindow, setActiveWindow] = useState(timeWindows[0]);
  const [selectedEvent, setSelectedEvent] = useState(eventHotspots[0]);

  const visibleEvents = useMemo(() => {
    return eventHotspots
      .filter((event) => activeType === "All" || event.type === activeType)
      .filter((event) => activeSeverity === "All" || event.severity === activeSeverity)
      .map((event) => ({
        ...event,
        impact: Math.min(99, Math.round(event.impact * activeWindow.multiplier)),
        crowd: Math.round(event.crowd * activeWindow.multiplier),
        delay: Math.max(5, event.delay + activeWindow.delayBoost)
      }));
  }, [activeSeverity, activeType, activeWindow]);

  const overview = useMemo(() => {
    if (visibleEvents.length === 0) {
      return {
        totalCrowd: 0,
        averageImpact: 0,
        maxDelay: 0,
        criticalCount: 0
      };
    }

    const totalCrowd = visibleEvents.reduce((sum, event) => sum + event.crowd, 0);
    const averageImpact = Math.round(
      visibleEvents.reduce((sum, event) => sum + event.impact, 0) / visibleEvents.length
    );
    const maxDelay = Math.max(...visibleEvents.map((event) => event.delay));
    const criticalCount = visibleEvents.filter(
      (event) => event.severity === "Critical" || event.severity === "High"
    ).length;

    return {
      totalCrowd,
      averageImpact,
      maxDelay,
      criticalCount
    };
  }, [visibleEvents]);

  const displayedEvent = useMemo(() => {
    return visibleEvents.find((event) => event.id === selectedEvent.id) || visibleEvents[0] || selectedEvent;
  }, [selectedEvent, visibleEvents]);

  return (
    <main className="min-h-screen bg-slate-950/70 text-white">
      <section className="border-b border-white/10 bg-slate-900/80 px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Live risk map
            </p>
            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
              EVENTPULSE AI
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
              Interactive event intelligence for congestion impact, emergency routing, and response priority.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-2">
              {timeWindows.map((window) => (
                <button
                  key={window.label}
                  type="button"
                  onClick={() => setActiveWindow(window)}
                  className={`rounded-md border px-4 py-2 text-sm font-semibold transition ${
                    activeWindow.label === window.label
                      ? "border-cyan-300 bg-cyan-300 text-slate-950"
                      : "border-white/10 bg-white/5 text-slate-200 hover:border-cyan-300/70 hover:bg-white/10"
                  }`}
                >
                  {window.label}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {severityOptions.map((severity) => (
                <button
                  key={severity}
                  type="button"
                  onClick={() => setActiveSeverity(severity)}
                  className={`rounded-md border px-3 py-2 text-xs font-bold uppercase tracking-wide transition ${
                    activeSeverity === severity
                      ? "border-white bg-white text-slate-950"
                      : "border-white/10 bg-white/5 text-slate-300 hover:border-white/40"
                  }`}
                >
                  {severity}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-5 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2">
          {eventTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setActiveType(type)}
              className={`rounded-md border px-4 py-2 text-sm font-semibold transition ${
                activeType === type
                  ? "border-cyan-300 bg-cyan-300 text-slate-950"
                  : "border-white/10 bg-white/5 text-slate-200 hover:border-cyan-300/70 hover:bg-white/10"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-5 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
        <div className="overflow-hidden rounded-lg border border-white/10 bg-slate-900/85 shadow-2xl shadow-black/30 backdrop-blur">
          <div className="grid grid-cols-2 border-b border-white/10 sm:grid-cols-4">
            <div className="border-r border-white/10 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Active Events</p>
              <p className="mt-2 text-2xl font-bold">{visibleEvents.length}</p>
            </div>
            <div className="border-r border-white/10 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Avg Impact</p>
              <p className="mt-2 text-2xl font-bold">{overview.averageImpact}%</p>
            </div>
            <div className="border-r border-white/10 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Crowd Load</p>
              <p className="mt-2 text-2xl font-bold">{formatNumber(overview.totalCrowd)}</p>
            </div>
            <div className="p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Max Delay</p>
              <p className="mt-2 text-2xl font-bold">{overview.maxDelay} min</p>
            </div>
          </div>

          <div className="h-[64vh] min-h-[480px]">
            <MapContainer
              center={[12.9716, 77.5946]}
              zoom={11}
              scrollWheelZoom
              className="h-full w-full"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {routeCorridors.map((route) => (
                <Polyline
                  key={route.name}
                  positions={route.points}
                  pathOptions={{
                    color: route.color,
                    dashArray: "8 10",
                    opacity: 0.82,
                    weight: 5
                  }}
                >
                  <Tooltip sticky>{route.name}</Tooltip>
                </Polyline>
              ))}

              {visibleEvents.map((event) => {
                const style = severityStyles[event.severity];
                const isSelected = selectedEvent.id === event.id;

                return (
                  <CircleMarker
                    key={event.id}
                    center={event.position}
                    eventHandlers={{
                      click: () => setSelectedEvent(event)
                    }}
                    pathOptions={{
                      color: style.stroke,
                      fillColor: style.fill,
                      fillOpacity: isSelected ? 0.78 : 0.58,
                      opacity: 0.95,
                      weight: isSelected ? 4 : 2
                    }}
                    radius={(isSelected ? 18 : 14) + event.impact / 5}
                  >
                    <Tooltip direction="top" offset={[0, -8]} opacity={1}>
                      {event.name}
                    </Tooltip>
                    <Popup>
                      <div className="min-w-56 text-slate-900">
                        <strong>{event.name}</strong>
                        <p className="mt-1 text-sm">{event.type}</p>
                        <p className="mt-2 text-sm">
                          Impact {event.impact}% | Delay {event.delay} min
                        </p>
                      </div>
                    </Popup>
                  </CircleMarker>
                );
              })}
            </MapContainer>
          </div>
        </div>

        <aside className="space-y-5">
          <div className="rounded-lg border border-white/10 bg-slate-900/85 p-5 shadow-2xl shadow-cyan-950/20 backdrop-blur">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm text-slate-400">Selected hotspot</p>
                <h2 className="mt-1 text-xl font-bold">{displayedEvent.name}</h2>
              </div>
              <span
                className={`rounded-md border px-3 py-1 text-xs font-bold ${severityStyles[displayedEvent.severity].label}`}
              >
                {displayedEvent.severity}
              </span>
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-300">{displayedEvent.note}</p>

            <div className="mt-5 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-md bg-white/5 p-3">
                <p className="text-xs text-slate-400">Impact</p>
                <p className="mt-1 text-lg font-bold">{displayedEvent.impact}%</p>
              </div>
              <div className="rounded-md bg-white/5 p-3">
                <p className="text-xs text-slate-400">Crowd</p>
                <p className="mt-1 text-lg font-bold">{formatNumber(displayedEvent.crowd)}</p>
              </div>
              <div className="rounded-md bg-white/5 p-3">
                <p className="text-xs text-slate-400">Delay</p>
                <p className="mt-1 text-lg font-bold">{displayedEvent.delay}m</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-slate-900/85 p-5 shadow-2xl shadow-cyan-950/20 backdrop-blur">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Response Queue</h2>
              <span className="rounded-md bg-red-500/15 px-3 py-1 text-xs font-bold text-red-100">
                {overview.criticalCount} urgent
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {visibleEvents.length === 0 && (
                <div className="rounded-md border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                  No hotspots match this filter. Try another severity or event type.
                </div>
              )}

              {visibleEvents.length > 0 && [...visibleEvents]
                .sort((a, b) => b.impact - a.impact)
                .map((event) => (
                  <button
                    key={event.id}
                    type="button"
                    onClick={() => setSelectedEvent(event)}
                    className={`w-full rounded-md border p-3 text-left transition ${
                      selectedEvent.id === event.id
                        ? "border-cyan-300 bg-cyan-300/10"
                        : "border-white/10 bg-white/5 hover:border-white/30"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold">{event.name}</p>
                      <p className="text-sm font-bold text-cyan-200">{event.impact}%</p>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-800">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${event.impact}%`,
                          backgroundColor: severityStyles[event.severity].fill
                        }}
                      />
                    </div>
                    <p className="mt-2 text-xs text-slate-400">
                      {event.type} | {event.delay} min estimated delay
                    </p>
                  </button>
                ))}
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-slate-900/85 p-5 shadow-2xl shadow-cyan-950/20 backdrop-blur">
            <h2 className="text-lg font-bold">Corridor Signal</h2>
            <div className="mt-4 space-y-3">
              {routeCorridors.map((route, index) => (
                <button
                  key={route.name}
                  type="button"
                  onClick={() => {
                    const linkedEvent = eventHotspots[index] || eventHotspots[0];
                    setSelectedEvent(linkedEvent);
                  }}
                  className="flex w-full items-center gap-3 rounded-md border border-white/10 bg-white/5 p-3 text-left transition hover:border-cyan-300/60 hover:bg-white/10"
                >
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: route.color }}
                  />
                  <span>
                    <span className="block text-sm font-semibold">{route.name}</span>
                    <span className="text-xs text-slate-400">Click to inspect linked hotspot</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
