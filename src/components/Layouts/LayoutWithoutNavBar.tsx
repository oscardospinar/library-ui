import React from "react";
import { Outlet } from "react-router-dom";

const LayoutWithoutNavBar = () => (
  <main>
    <Outlet />
  </main>
);

export default LayoutWithoutNavBar;
