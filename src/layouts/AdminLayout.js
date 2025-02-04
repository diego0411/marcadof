// src/layouts/AdminLayout.js
import React from "react";
import AdminSidebar from "../components/AdminSidebar";
import { useNavigate } from "react-router-dom";

const AdminLayout = ({ children }) => {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  // Si no es ADMIN, redirigimos o mostramos error
  if (role !== "ADMIN") {
    navigate("/marking");
    return null;
  }

  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />
      <div style={{ flex: 1, padding: "1rem" }}>
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
