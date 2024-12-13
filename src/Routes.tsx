import React from "react";
import App from "./App";
import { Home } from "./pages/Home";
import { createBrowserRouter } from "react-router-dom";
import MainSearch from "./components/Mainsearch/Mainsearch";
import SearchResults from "./components/SearchResults/SearchResults";
import { LoadBooks } from "./pages/BooksModule/LoadBooks";
import Notfound from "./components/Loans/NotFound/NotFound";
import { BookProvider } from "../src/components/BookContext/useBooks";
import Login from "./components/Login/Login"; // Importa el componente Login

export const routes = [
  {
    element: <App />,
    children: [
      {
        index: true,
        element: <Login />, // Configura Login como la ruta inicial
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "search",
        element: <MainSearch />,
      },
      {
        path: "results",
        element: <SearchResults />,
      },
      {
        path: "/libros",
        element: (
          <BookProvider>
            <LoadBooks />
          </BookProvider>
        ),
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