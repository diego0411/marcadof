import api from "./api";

// Obtener registros de marcado
export const getRecords = async () => {
  return await api.get("/marking/records");  // 🔹 Verifica que esta ruta es la correcta en el backend
};

// Registrar un nuevo marcado
export const markAttendance = async (lat, lng) => {
  return await api.post("/marking/mark", { lat, lng });  // 🔹 Asegúrate de que la ruta sea "/marking/mark"
};
