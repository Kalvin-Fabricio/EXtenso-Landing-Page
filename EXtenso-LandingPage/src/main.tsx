import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
// TS can't find type declarations for CSS side-effect import in some setups.
// Ignore the next line for TS checking to avoid the module not found error.
// @ts-ignore
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
