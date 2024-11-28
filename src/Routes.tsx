import React from "react";
import App from "./App"; // Desde la raíz de src
import { createBrowserRouter } from "react-router-dom";
import Home from "./components/Home/Home"; // Importando el componente Home
import Login from "./components/Login/Login"; // Importando el componente Login

export const routes = [
    {
        element: <App />,
        children: [
            {
                index: true, // Ruta principal "/"
                element: <Home />,
            },
            {
                path: "login", // Ruta "/login"
                element: <Login />,
            },
        ],
    },
];

export const router = createBrowserRouter(routes, {
    future: {
        v7_relativeSplatPath: true,
    },
});
