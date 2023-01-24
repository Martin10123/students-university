import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import { AuthUserProvider } from "./context";
import { AppRouter } from "./routes";

import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthUserProvider>
        <AppRouter />
      </AuthUserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
