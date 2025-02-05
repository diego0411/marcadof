import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from "@mui/material";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("CONTRATISTA"); // Valor por defecto
  const [message, setMessage] = useState("");
  const [userRole, setUserRole] = useState(""); // Rol del usuario actual
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener el rol del usuario logueado desde localStorage
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setUserRole(storedRole);
    }
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    // Verificar si un usuario normal intenta registrar un ADMIN o PLANILLA
    if (userRole !== "ADMIN" && (role === "ADMIN" || role === "PLANILLA")) {
      setMessage("⚠️ Solo los administradores pueden asignar esos roles.");
      return;
    }

    try {
      // Envío de datos al backend
      const response = await axios.post("https://marcado-production.up.railway.app/auth/register", {
        name,
        email,
        password,
        role
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });

      if (response.status === 201) {
        setMessage("✅ Usuario registrado con éxito");
        setTimeout(() => navigate("/"), 2000); // Redirigir después de 2 segundos
      } else {
        setMessage("❌ Error al registrar usuario");
      }
    } catch (error) {
      console.error("❌ Error en el registro:", error);
      if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage("❌ Error en el servidor");
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Registro de Usuario
        </Typography>
        <Box
          component="form"
          onSubmit={handleRegister}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Nombre"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            label="Correo"
            variant="outlined"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Contraseña"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FormControl fullWidth>
            <InputLabel id="role-label">Rol</InputLabel>
            <Select
              labelId="role-label"
              id="role-select"
              value={role}
              label="Rol"
              onChange={(e) => setRole(e.target.value)}
              disabled={userRole !== "ADMIN"} // Bloquea la edición si no es ADMIN
            >
              <MenuItem value="ADMIN">ADMIN</MenuItem>
              <MenuItem value="PLANILLA">PLANILLA</MenuItem>
              <MenuItem value="CONTRATISTA">CONTRATISTA</MenuItem>
            </Select>
          </FormControl>

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Registrar
          </Button>
        </Box>
        {message && (
          <Typography color="error" align="center" sx={{ marginTop: 2 }}>
            {message}
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default Register;
