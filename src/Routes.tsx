import React from "react"
import App from "./App";
import { Home } from "./pages/Home";
import { createBrowserRouter } from "react-router-dom"
import { Book } from "./pages/BooksModule/Book";

export const routes = [
    {
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "libros",
                element: <Book />
            }
        ]
    }
]

export const router = createBrowserRouter( routes, {
    future: {
        v7_relativeSplatPath: true,
    }
})