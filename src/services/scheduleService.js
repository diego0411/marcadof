import api from "./api";

export const setSchedule = async (arrivalTime, departureTime) => {
  return await api.post("/config/schedule", { arrivalTime, departureTime });
};

export const getRecords = async () => {
  const response = await api.get("/marking/records");
  return response.data;
};
