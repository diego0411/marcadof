import React, { useState } from "react";
import axios from "axios";
import { Button, Container, Typography, Paper } from "@mui/material";

const Marking = ({ onMarkSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [location, setLocation] = useState(null);

  const handleMarkAttendance = async () => {
    setLoading(true);
    setMessage("");

    if (!navigator.geolocation) {
      setMessage("La geolocalización no está soportada en tu navegador.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });

          const token = localStorage.getItem("token");

          await axios.post(
            "http://localhost:5001/marking/mark",
            { lat: latitude, lng: longitude },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          setMessage("Marcado exitoso.");
          if (onMarkSuccess) onMarkSuccess(); // 🔹 Recargar registros después de marcar
        } catch (error) {
          setMessage("Error al marcar la asistencia.");
          console.error(error);
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        setMessage("No se pudo obtener la ubicación.");
        setLoading(false);
      }
    );
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Marcar Asistencia
        </Typography>
        <Button variant="contained" color="primary" onClick={handleMarkAttendance} disabled={loading} fullWidth>
          {loading ? "Obteniendo ubicación..." : "Marcar Asistencia"}
        </Button>
        {location && (
          <Typography variant="body2" sx={{ marginTop: 2 }}>
            Ubicación: {location.lat}, {location.lng}
          </Typography>
        )}
        {message && <Typography color="error" sx={{ marginTop: 2 }}>{message}</Typography>}
      </Paper>
    </Container>
  );
};

export default Marking;
