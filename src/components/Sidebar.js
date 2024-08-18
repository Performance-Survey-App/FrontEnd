// src/components/Sidebar.js
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography, IconButton, Drawer } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import ApartmentIcon from '@mui/icons-material/Apartment';
import QuizIcon from '@mui/icons-material/Quiz';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssessmentIcon from '@mui/icons-material/Assessment';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../images/logo.jpg';

const Sidebar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const SidebarContent = (
    <Box
      sx={{
        width: 250,
        bgcolor: 'primary.main',
        height: '100%',
        color: 'white',
        p: 2,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', mb: 2 }}>
        <img src={logo} alt="Logo" style={{ width: 40, height: 40, marginRight: 10 }} />
        <Typography variant="h6">Performance Analysis</Typography>
      </Box>
      <List>
        <ListItem button component={NavLink} to="/admin">
          <ListItemIcon>
            <HomeIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={NavLink} to="./user-management">
          <ListItemIcon>
            <PeopleIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Manage Users" />
        </ListItem>
        <ListItem button component={NavLink} to="./department-management">
          <ListItemIcon>
            <ApartmentIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Manage Department" />
        </ListItem>
        <ListItem button component={NavLink} to="./question-management">
          <ListItemIcon>
            <QuizIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Manage Questions" />
        </ListItem>
        <ListItem button component={NavLink} to="./assign-questions">
          <ListItemIcon>
            <AssignmentIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Assign Questions" />
        </ListItem>
        <ListItem button component={NavLink} to="./responses">
          <ListItemIcon>
            <AssessmentIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Responses" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={toggleDrawer}
        sx={{
          position: 'fixed',  // Ensure it floats over content
          top: 16,            // Adjust based on where you want it positioned
          left: 16,           // Adjust based on where you want it positioned
          zIndex: (theme) => theme.zIndex.drawer + 1, // Float over drawer
          display: { sm: 'none' }  // Only show on small screens
        }}
      >
        <MenuIcon />
      </IconButton>

      {/* Mobile Sidebar */}
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer}
        sx={{ display: { xs: 'block', sm: 'none' } }}
      >
        {SidebarContent}
      </Drawer>

      {/* Desktop Sidebar */}
      <Box
        sx={{
          width: 270,
          bgcolor: 'primary.main',
          height: '100vh',
          color: 'white',
          position: 'fixed',
          top: 0,
          left: 0,
          overflow: 'hidden',
          display: { xs: 'none', sm: 'block' },
        }}
      >
        {SidebarContent}
      </Box>
    </>
  );
};

export default Sidebar;
