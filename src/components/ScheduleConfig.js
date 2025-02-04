import { useState } from "react";
import { setSchedule } from "../services/scheduleService";

const ScheduleConfig = () => {
  const [arrivalTime, setArrivalTime] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [message, setMessage] = useState("");

  const handleSave = async () => {
    try {
      await setSchedule(arrivalTime, departureTime);
      setMessage("Horario guardado correctamente.");
    } catch (error) {
      setMessage("Error al guardar el horario.");
    }
  };

  return (
    <div>
      <h2>Configurar Horario</h2>
      <label>Hora de Llegada: </label>
      <input type="time" value={arrivalTime} onChange={(e) => setArrivalTime(e.target.value)} />
      <label>Hora de Salida: </label>
      <input type="time" value={departureTime} onChange={(e) => setDepartureTime(e.target.value)} />
      <button onClick={handleSave}>Guardar</button>
      <p>{message}</p>
    </div>
  );
};

export default ScheduleConfig;
