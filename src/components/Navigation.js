// src/components/Navigation.js
import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Ejemplo sencillo:
  return (
    <nav style={{ background: "#ccc", padding: "1rem", display: "flex", gap: "1rem" }}>
      {/* Todos los roles logueados ven marcar asistencia */}
      <Link to="/marking">Marcar Asistencia</Link>

      {/* Solo ADMIN ve estas rutas */}
      {role === "ADMIN" && (
        <>
          <Link to="/records">Ver Registros</Link>
          <Link to="/register">Registrar Usuario</Link>
        </>
      )}
    </nav>
  );
}

export default Navigation;
