import React, {ReactElement} from 'react';
import './App.css';
import { Box } from "@mui/material";
import {NavBar} from "./components/NavBar/NavBar";
import {Outlet} from "react-router-dom";
import Login from './components/Login/Login';

function App(): ReactElement {
  return (
    <Box>
      <Login />
      <Outlet />
    </Box>
  );
}

export default App;
