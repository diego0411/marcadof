import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001", // 🔹 Asegúrate de que el backend corre en este puerto
  withCredentials: true, // 🔹 Para enviar cookies de autenticación si son necesarias
});

export default api;
