import React, { useEffect, useState } from "react";
import axios from "axios";
import { downloadReport } from "../services/reportService";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Box,
} from "@mui/material";

const Records = () => {
  const [records, setRecords] = useState([]);
  const [arrivalTime, setArrivalTime] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // ✅ Obtener el rol del usuario

  // ✅ Función para obtener registros desde el backend
  const fetchRecords = async () => {
    if (!token) {
      console.error("No tienes sesión activa. Inicia sesión.");
      return;
    }

    try {
      const url =
        role === "ADMIN"
          ? "https://marcado-production.up.railway.app/marking/all-records"
          : "https://marcado-production.up.railway.app/marking/records";

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecords(response.data);
    } catch (error) {
      console.error("Error al obtener registros:", error);
    }
  };

  // ✅ Función para obtener el horario actual
  const fetchSchedule = async () => {
    if (!token) return;

    try {
      const response = await axios.get(
        "https://marcado-production.up.railway.app/schedule/get",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setArrivalTime(response.data.arrival_time.slice(0, 5));
      setDepartureTime(response.data.departure_time.slice(0, 5));
    } catch (error) {
      console.error("Error al obtener el horario:", error);
    }
  };

  // ✅ Función para actualizar el horario (Solo para ADMIN)
  const updateSchedule = async () => {
    if (!arrivalTime || !departureTime) {
      setMessage("⚠️ Ambos horarios son obligatorios.");
      return;
    }

    try {
      await axios.post(
        "https://marcado-production.up.railway.app/schedule/set",
        { arrivalTime, departureTime },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("✅ Horario actualizado correctamente.");
      fetchRecords(); // 🔹 Recargar registros después de actualizar el horario
    } catch (error) {
      console.error("Error al actualizar el horario:", error);
      setMessage("❌ No tienes permisos para modificar el horario.");
    }
  };

  // ✅ Cargar registros y horario al montar el componente
  useEffect(() => {
    fetchRecords();
    fetchSchedule();
  }, [token, role]);

  return (
    <Container component="main" maxWidth="md">
      <Typography variant="h5" gutterBottom>
        Registros de Marcado {role === "ADMIN" ? "de Todos los Usuarios" : ""}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={fetchRecords}
        sx={{ marginBottom: 2 }}
      >
        Actualizar Registros
      </Button>

      {/* ✅ Mostrar formulario solo si el usuario es ADMIN */}
      {role === "ADMIN" && (
        <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
          <Typography variant="h6">Configurar Horarios</Typography>
          <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
            <TextField
              label="Hora de Ingreso"
              type="time"
              value={arrivalTime}
              onChange={(e) => setArrivalTime(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Hora de Salida"
              type="time"
              value={departureTime}
              onChange={(e) => setDepartureTime(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <Button variant="contained" color="success" onClick={updateSchedule}>
              Guardar Horario
            </Button>
          </Box>
          {message && <Typography color="error">{message}</Typography>}
        </Paper>
      )}

      {/* ✅ Si no hay registros, mostramos un aviso */}
      {records.length === 0 ? (
        <Typography>No hay registros disponibles</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                {role === "ADMIN" && <TableCell>Usuario</TableCell>}
                <TableCell>Fecha</TableCell>
                <TableCell>Latitud</TableCell>
                <TableCell>Longitud</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.id}</TableCell>
                  {role === "ADMIN" && <TableCell>{record.name}</TableCell>}
                  <TableCell>
                    {new Date(record.timestamp).toLocaleString("es-ES")}
                  </TableCell>
                  <TableCell>{record.lat}</TableCell>
                  <TableCell>{record.lng}</TableCell>
                  <TableCell>{record.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default Records;
