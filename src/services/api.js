import axios from "axios";

const api = axios.create({
  baseURL: "https://marcado-production.up.railway.app", // 🔹 URL del backend en Railway
  withCredentials: true, // 🔹 Para enviar cookies de autenticación
});

export default api;
