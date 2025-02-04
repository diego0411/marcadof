import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Box, Paper } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      // En el backend, asegúrate de que /auth/login devuelva: { token, role }
      const response = await axios.post("http://localhost:5001/auth/login", { email, password });

      const { token, role } = response.data; 
      if (token) {
        // Guardamos el token y el rol en localStorage
        localStorage.setItem("token", token);
        if (role) {
          localStorage.setItem("role", role); 
        }
        // Navegamos a la ruta que desees después de login
        navigate("/records");
      } else {
        setMessage("No se recibió un token. Revisa el backend.");
      }
    } catch (error) {
      setMessage("Error al iniciar sesión. Verifica tus credenciales.");
      console.error(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Iniciar Sesión
        </Typography>
        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Correo"
            variant="outlined"
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
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Iniciar Sesión
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

export default Login;
