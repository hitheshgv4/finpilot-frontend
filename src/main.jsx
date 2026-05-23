import React from "react";

import ReactDOM from "react-dom/client";

import App from "./App";

import "./index.css";

import { Toaster } from "react-hot-toast";

/* ================= ROOT ================= */

ReactDOM.createRoot(

  document.getElementById(
    "root"
  )

).render(

  <React.StrictMode>

    {/* ================= APP ================= */}

    <App />

    {/* ================= TOASTER ================= */}

    <Toaster

      position="top-right"

      reverseOrder={false}

      toastOptions={{

        duration: 3000,

        style: {

          background:
            "#111827",

          color:
            "#ffffff",

          border:
            "1px solid #374151",

        },

      }}

    />

  </React.StrictMode>

);