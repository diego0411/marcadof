// src/LayoutWithNav.js
import React from "react";
import Navigation from "./components/Navigation";
import { Outlet } from "react-router-dom";

function LayoutWithNav() {
  return (
    <>
      {/* Barra de navegación */}
      <Navigation />
      {/* Renderiza la ruta hija */}
      <Outlet />
    </>
  );
}

export default LayoutWithNav;
