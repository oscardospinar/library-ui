import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Home } from "./pages/Home";
import MainSearch from "./components/Mainsearch/Mainsearch";
import SearchResults from "./components/SearchResults/SearchResults";
import { LoadBooks } from "./pages/BooksModule/LoadBooks";
import Notfound from "./components/Loans/NotFound/NotFound";
import { BookProvider } from "../src/components/BookContext/useBooks";
import Login from "./components/Login/Login"; 
import FormularioRegistro from './components/Registro/Registro';
import EmailValidation from './components/Responsable/Responsable';
import { NavBar } from './components/NavBar/NavBar';  // Ajusta la ruta si es necesario
import {NavBarEstudiantes} from './components/NavBarEstudiantes/NavBarEstudiantes'; 
// Layouts
import LayoutWithNavBar from "./components/Layouts/LayoutWithNavBar";
import LayoutWithoutNavBar from "./components/Layouts/LayoutWithoutNavBar";
import AdminSearchResults from "./components/AdminSearchResults/AdminSearchResults";

// Definición de rutas
export const routes = [
  // Rutas sin Navbar
  {
    element: <LayoutWithoutNavBar />,
    children: [
      {
        index: true, // Página principal (login)
        element: <Login />,
      },

      {path:"/navar" ,
        element:<NavBar />,
      },
      {
        path: "navar2",  // Y esta también
        element: <NavBarEstudiantes />,
      },
    ],
  },
  // Rutas con Navbar
  {
    element: <LayoutWithNavBar />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/Registro",
        element: <FormularioRegistro />,
      },
      {
        path: "/search",
        element: <MainSearch />,
      },
      {
        path: "/results",
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
        path: "/Responsable",
        element: <EmailValidation />,
      },
      {
        path: "/admin-results",
        element: <AdminSearchResults />,
      }
    ],
  },
  // Ruta para 404
  {
    path: "*",
    element: <Notfound />,
  },
];

// Configuración del router
export const router = createBrowserRouter(routes);
