import React from "react";
import App from "./App";
import { Home } from "./pages/Home";
import { createBrowserRouter } from "react-router-dom";
import MainSearch from "./components/Mainsearch/Mainsearch";
import SearchResults from "./components/SearchResults/SearchResults";
import { LoadBooks } from "./pages/BooksModule/LoadBooks";
import Notfound from "./components/Loans/NotFound/NotFound";
import { BookProvider } from "../src/components/BookContext/useBooks";
import Login from "./components/Login/Login"; 
import { NavBar } from './components/NavBar/NavBar';  // Ajusta la ruta si es necesario
import {NavBarEstudiantes} from './components/NavBarEstudiantes/NavBarEstudiantes';  // Ajusta la ruta si es necesario
import FormularioRegistro from './components/Registro/Registro';
import EmailValidation from './components/Responsable/Responsable';
export const routes = [
  {
    element: <App />,
    children: [
      {
        index: true,
        element: <Login />, 
      },
      {
        path: "/home",
        element: <Home />,
      },
      {path:"/navar" ,
        element:<NavBar />,
    },
      {
        path: "navar2",  // Y esta también
        element: <NavBarEstudiantes />,
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
      { path:'/Responsable',
         element:<EmailValidation />,
     },
      {path:'/Registro',
         element:<FormularioRegistro />,
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