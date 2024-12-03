import React from "react"
import App from "./App";
import { Home } from "./pages/Home";
import { createBrowserRouter } from "react-router-dom"
import MainSearch from "./components/Mainsearch/Mainsearch";
import SearchResults from "./components/SearchResults/SearchResults";

export const routes = [
    {
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />
            }
            ,{
                path: "search",
                element: <MainSearch />
            }
            ,{
                path: "results",
                element: <SearchResults />
            }
        ]
    }
]

export const router = createBrowserRouter( routes, {
    future: {
        v7_relativeSplatPath: true,
    }
})