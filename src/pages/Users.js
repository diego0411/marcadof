import React, { useEffect, useState } from "react";
import axios from "axios";
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
  Select,
  MenuItem,
} from "@mui/material";

const Users = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  // ✅ Obtener lista de usuarios
  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://marcado-production.up.railway.app/user-management", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("❌ Error al obtener usuarios:", error);
    }
  };

  // ✅ Modificar el rol de un usuario
  const updateUserRole = async (id, role) => {
    try {
      await axios.put(`https://marcado-production.up.railway.app/user-management/${id}/role`, 
        { role },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUsers();
    } catch (error) {
      console.error("❌ Error al modificar el rol:", error);
    }
  };

  // ✅ Eliminar un usuario
  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://marcado-production.up.railway.app/user-management/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (error) {
      console.error("❌ Error al eliminar usuario:", error);
    }
  };

  // ✅ Obtener usuarios al cargar la página
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Gestión de Usuarios
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Correo</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Select
                    value={user.role}
                    onChange={(e) => updateUserRole(user.id, e.target.value)}
                  >
                    <MenuItem value="ADMIN">ADMIN</MenuItem>
                    <MenuItem value="PLANILLA">PLANILLA</MenuItem>
                    <MenuItem value="CONTRATISTA">CONTRATISTA</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => deleteUser(user.id)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Users;
