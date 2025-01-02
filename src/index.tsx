import "./globals.css";
import { createRoot } from "react-dom/client";
import App from "@/app/App";
import { StrictMode } from "react";

document.addEventListener("DOMContentLoaded", () => {
  document.body.innerHTML = '<div id="app"></div>';

  const container = document.getElementById("app");

  if (container) {
    const root = createRoot(container);

    if (import.meta.env.DEV) {
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
