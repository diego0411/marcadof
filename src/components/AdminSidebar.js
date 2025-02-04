// AdminSidebar.js con Material UI Drawer
import React from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const AdminSidebar = ({ open, onClose }) => {
  return (
    <Drawer open={open} onClose={onClose} variant="permanent">
      <List>
        <ListItem>
          <ListItemText primary="Panel Admin" />
        </ListItem>
        <ListItem button component={Link} to="/admin/register">
          <ListItemText primary="Registrar Usuario" />
        </ListItem>
        <ListItem button component={Link} to="/admin/records">
          <ListItemText primary="Ver Registros" />
        </ListItem>
        {/* mas enlaces... */}
      </List>
    </Drawer>
  );
};

export default AdminSidebar;
