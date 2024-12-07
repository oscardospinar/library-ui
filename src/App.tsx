import React, { ReactElement } from "react";
import "./App.css";
import { Box } from "@mui/material";
import { NavBar } from "./components/NavBar/NavBar";
import { Outlet } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";

function App(): ReactElement {
  return (
    <Box sx={{ mt: '64px' }}>
      <NavBar />
      <Outlet />
    </Box>
  );
}

export default App;
