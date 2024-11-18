import React from "react"
import App from "./App";
import { Home } from "./pages/Home";
import { createBrowserRouter } from "react-router-dom"
import { Loans } from "./components/NavBar/Loans";

export const routes = [
    {
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "prestamos",
                element: <Loans />
            }
        ]
    }
]

export const router = createBrowserRouter( routes, {
    future: {
        v7_relativeSplatPath: true,
    }
})