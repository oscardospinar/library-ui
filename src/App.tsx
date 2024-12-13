import React, { ReactElement } from 'react';
import './App.css';
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { NavBar } from './components/NavBar/NavBar';

function App(): ReactElement {
  return (
    <Box>
      <Outlet />
      <Box sx={{ mt: '64px' }}>
      </Box>
    </Box>
  );
}

export default App;
