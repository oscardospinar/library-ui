import React, { ReactElement } from 'react';
import './App.css';
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

function App(): ReactElement {
  return (
    <Box>
      <Outlet /> {/* Aquí se cargarán los componentes según la ruta */}
    <Box sx={{ mt: '64px' }}>
      <NavBar />
      <Outlet />
    </Box>
  );
}

export default App;
