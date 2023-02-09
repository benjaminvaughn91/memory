import React from "react";
import ReactDOM from "react-dom/client";
import GameApp from "./components/GameApp";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <GameApp />
  </React.StrictMode>
);
