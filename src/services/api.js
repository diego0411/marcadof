import axios from "axios";

const api = axios.create({
  baseURL: "https://marcado-production.up.railway.app", // 🔹 Asegúrate de que el backend corre en este puerto
  withCredentials: true, // 🔹 Para enviar cookies de autenticación si son necesarias
});

export default api;
