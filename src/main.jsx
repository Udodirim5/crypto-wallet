import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/globals.css";
import App from "./App.jsx";
import { CoinProvider } from "./context/CoinContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CoinProvider>
      <App />
    </CoinProvider>
  </StrictMode>
);
