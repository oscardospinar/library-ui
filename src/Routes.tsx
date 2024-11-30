import React from "react";
import App from "./App";
import { Home } from "./pages/Home";
import { createBrowserRouter } from "react-router-dom";
import { LoadBooks } from "./pages/BooksModule/LoadBooks";
import Notfound from "./components/Loans/NotFound/NotFound";


export const routes = [
  {
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/libros",
        element: <LoadBooks />,
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
