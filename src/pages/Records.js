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
} from "@mui/material";

const Records = () => {
  const [records, setRecords] = useState([]);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // ✅ Obtener el rol del usuario

  // Función para obtener registros desde el backend
  const fetchRecords = async () => {
    if (!token) {
      console.error("No tienes sesión activa. Inicia sesión.");
      return;
    }

    try {
      const url =
        role === "ADMIN"
          ? "http://localhost:5001/marking/all-records" // ✅ Nueva ruta para admin
          : "http://localhost:5001/marking/records"; // ✅ Ruta para usuarios normales

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecords(response.data);
    } catch (error) {
      console.error("Error al obtener registros:", error);
    }
  };

  // Cargar registros al montar el componente
  useEffect(() => {
    fetchRecords();
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

      {/* Si no hay registros, mostramos un aviso */}
      {records.length === 0 ? (
        <Typography>No hay registros disponibles</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                {role === "ADMIN" && <TableCell>Usuario</TableCell>} {/* ✅ Mostrar nombre solo para admin */}
                <TableCell>Fecha</TableCell>
                <TableCell>Latitud</TableCell>
                <TableCell>Longitud</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.id}</TableCell>
                  {role === "ADMIN" && <TableCell>{record.name}</TableCell>}
                  <TableCell>
                    {new Date(record.timestamp).toLocaleString()}
                  </TableCell>
                  <TableCell>{record.lat}</TableCell>
                  <TableCell>{record.lng}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Sección para exportar reportes */}
      <Paper
        elevation={3}
        sx={{ marginTop: 4, padding: 2, textAlign: "center" }}
      >
        <Typography variant="h6" gutterBottom>
          Exportar Reportes
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => downloadReport("csv")}
          sx={{ marginRight: 1 }}
        >
          Exportar CSV
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => downloadReport("pdf")}
          sx={{ marginRight: 1 }}
        >
          Exportar PDF
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={() => downloadReport("excel")}
        >
          Exportar Excel
        </Button>
      </Paper>
    </Container>
  );
};

export default Records;
