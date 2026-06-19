import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const routeGuides = {
  "/": [
    "Welcome to EventPulse AI command center. Start here for operational totals, system health, and fast links into prediction, simulation, analytics, and the risk map.",
    "The dashboard cards summarize the current traffic intelligence posture. Use the quick action buttons to move directly into a working tool."
  ],
  "/predict": [
    "This is the prediction console. Choose a scenario, review its event features, then run prediction to fetch model output from the backend.",
    "After the result arrives, inspect closure probability, impact score, risk, recommended resources, and the model explanation."
  ],
  "/simulator": [
    "This simulator runs a standard VIP movement scenario against the backend. Press simulate to calculate closure probability and deployment needs.",
    "Use the output cards to compare risk, police requirement, barricades, diversions, and response explanation."
  ],
  "/analytics": [
    "Analytics shows event distribution data. If the backend is available the chart uses live statistics, otherwise it clearly falls back to sample data.",
    "Use the chart and metrics to identify the largest event categories and response pressure."
  ],
  "/heatmap": [
    "This live risk map is fully interactive. Filter by time window, severity, and event type, then click hotspots or queue items to inspect them.",
    "The side panel explains the selected hotspot, crowd load, delay, and corridor priority."
  ]
};

function getSpeechSupport() {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export default function SpeakBot() {
  const location = useLocation();
  const [enabled, setEnabled] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);
  const [speaking, setSpeaking] = useState(false);
  const utteranceRef = useRef(null);

  const tips = useMemo(() => {
    return routeGuides[location.pathname] || routeGuides["/"];
  }, [location.pathname]);

  const currentTip = tips[tipIndex % tips.length];
  const speechSupported = getSpeechSupport();

  function stopSpeech() {
    if (speechSupported) {
      window.speechSynthesis.cancel();
    }
    utteranceRef.current = null;
    setSpeaking(false);
  }

  function speak(text = currentTip) {
    stopSpeech();

    if (!speechSupported) {
      setEnabled(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.92;
    utterance.pitch = 1;
    utterance.volume = 0.95;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    utteranceRef.current = utterance;
    setEnabled(true);
    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  }

  function toggleGuide() {
    if (speaking || enabled) {
      setEnabled(false);
      stopSpeech();
      return;
    }

    speak();
  }

  function nextTip() {
    const next = (tipIndex + 1) % tips.length;
    setTipIndex(next);

    if (enabled || speaking) {
      speak(tips[next]);
    }
  }

  useEffect(() => {
    return () => {
      if (speechSupported) {
        window.speechSynthesis.cancel();
      }
      setSpeaking(false);
      utteranceRef.current = null;
    };
  }, [location.pathname, speechSupported]);

  return (
    <aside className="speak-bot" aria-label="Voice guide">
      <div className="speak-bot__status">
        <span className={`speak-bot__dot ${speaking ? "is-live" : ""}`} />
        <div>
          <p>Speak Bot</p>
          <span>{speechSupported ? (speaking ? "Speaking now" : "Ready to guide") : "Voice unavailable"}</span>
        </div>
      </div>

      <p className="speak-bot__tip">{currentTip}</p>

      <div className="speak-bot__controls">
        <button type="button" onClick={toggleGuide} disabled={!speechSupported}>
          {speaking || enabled ? "Stop" : "Run"}
        </button>
        <button type="button" onClick={nextTip} disabled={!speechSupported}>
          Next
        </button>
      </div>
    </aside>
  );
}
