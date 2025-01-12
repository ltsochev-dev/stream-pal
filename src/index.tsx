import "./globals.css";
import { init as initSpatialNavigation } from "@noriginmedia/norigin-spatial-navigation";
import { createRoot } from "react-dom/client";
import App from "@/app/App";
import { StrictMode } from "react";

document.addEventListener("DOMContentLoaded", () => {
  document.body.innerHTML = '<div id="app"></div>';

  const container = document.getElementById("app");

  if (container) {
    initSpatialNavigation({
      // debug: true,
      distanceCalculationMethod: "center",
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
