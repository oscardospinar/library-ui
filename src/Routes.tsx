import React from "react"
import App from "./App";
import { Home } from "./pages/Home";
import { createBrowserRouter } from "react-router-dom"
import { Book } from "./pages/BooksModule/Book";
<<<<<<< HEAD
import BookEditor from "./pages/BooksModule/Book/bookEditor";
=======
import { LoadBooks } from "./pages/BooksModule/LoadBooks";
>>>>>>> bd7f0151558ccc16630838dd53dad405912ff94b

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
                element: <LoadBooks />
            },
            {
                path: ":id",
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