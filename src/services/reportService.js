import axios from "axios";

const API_URL = "https://marcado-production.up.railway.app/export"; // Asegurar que esta ruta es correcta

export const downloadReport = async (type) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No tienes sesión activa. Inicia sesión.");
    return;
  }

  try {
    const response = await axios.get(`${API_URL}/${type}`, {
      headers: { Authorization: `Bearer ${token}` }, // 🔹 Asegura que el token se envía correctamente
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `report.${type === "csv" ? "csv" : type === "excel" ? "xlsx" : "pdf"}`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error("No autorizado. Inicia sesión nuevamente.");
    } else {
      console.error("Error al descargar el reporte:", error);
    }
  }
};
