// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Marking from "./pages/Marking";
import Records from "./pages/Records";
import Users from "./pages/Users";


// Importa el layout que tiene la barra de navegación
import LayoutWithNav from "./LayoutWithNav";

function App() {
  return (
    <Router>
      <Routes>
        {/* 1) Ruta Login (SIN barra) */}
        <Route path="/" element={<Login />} />

        {/* 2) Rutas con barra de navegación */}
        <Route element={<LayoutWithNav />}>
          <Route path="/register" element={<Register />} />
          <Route path="/marking" element={<Marking />} />
          <Route path="/records" element={<Records />} />
          <Route path="/users" element={<Users />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
