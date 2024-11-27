import React from "react";
import App from "./App";
import { Home } from "./pages/Home";
import Notfound from "./components/Loans/NotFound/NotFound";
import { createBrowserRouter } from "react-router-dom";

export const routes = [
  {
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "*",
        element: <Notfound />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes, {
  future: {
    v7_relativeSplatPath: true,
  },
});
