import "./globals.css";
import { createRoot } from "react-dom/client";
import App from "@/app/App";
import { StrictMode } from "react";
import { init as initSpatialNavigation } from "@noriginmedia/norigin-spatial-navigation";

document.addEventListener("DOMContentLoaded", () => {
  document.body.innerHTML = '<div id="app"></div>';

  const container = document.getElementById("app");

  if (container) {
    initSpatialNavigation({
      distanceCalculationMethod: "center",
      // debug: true,
      // visualDebug: true,
    });

    const root = createRoot(container);

    if (process.env.NODE_ENV === "development") {
      root.render(
        <StrictMode>
          <App />
        </StrictMode>
      );
    } else {
      root.render(<App />);
    }

    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  }
});
