import {
BrowserRouter,
Routes,
Route,
useLocation
}
from "react-router-dom";

import Navbar from "./components/Navbar";
import SpeakBot from "./components/SpeakBot";

import Dashboard from "./pages/Dashboard";
import Predict from "./pages/Predict";
import Simulator from "./pages/Simulator";
import Analytics from "./pages/Analytics";
import Heatmap from "./pages/Heatmap";

function AppContent() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/heatmap";

  function updatePointer(event) {
    event.currentTarget.style.setProperty("--pointer-x", `${event.clientX}px`);
    event.currentTarget.style.setProperty("--pointer-y", `${event.clientY}px`);
  }

  return (

    <div
      className="app-frame"
      onPointerMove={updatePointer}
    >

      <div className="animated-background" aria-hidden="true">
        <span className="pulse pulse-one" />
        <span className="pulse pulse-two" />
        <span className="pulse pulse-three" />
        <span className="traffic-line line-one" />
        <span className="traffic-line line-two" />
        <span className="traffic-line line-three" />
      </div>

      {!hideNavbar && <Navbar />}

      <Routes>

        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/predict"
          element={<Predict />}
        />

        <Route
          path="/simulator"
          element={<Simulator />}
        />

        <Route
          path="/analytics"
          element={<Analytics />}
        />

        <Route
          path="/heatmap"
          element={<Heatmap />}
        />

      </Routes>

      <SpeakBot />

    </div>

  );
}

function App() {

  return (

    <BrowserRouter>

      <AppContent />

    </BrowserRouter>

  );
}

export default App;
