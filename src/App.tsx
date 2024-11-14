import React, {ReactElement} from 'react';
import './App.css';
import { Box } from "@mui/material";
import {NavBar} from "./components/NavBar";
import {Outlet} from "react-router-dom";

function App(): ReactElement {
  return (
    <Box>
      <NavBar />
      <Outlet />
    </Box>
  );
}

export default App;
