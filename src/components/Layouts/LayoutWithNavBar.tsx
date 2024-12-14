import React from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "../NavBar/NavBar"; // Ajusta la ruta si es necesario

const LayoutWithNavBar = () => (
  <>
    <NavBar />
    <main>
      <Outlet />
    </main>
  </>
);

export default LayoutWithNavBar;
