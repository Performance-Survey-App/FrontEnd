import React, { useState } from 'react';
import { Box, Typography, Button, TextField, List, ListItem, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Snackbar, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const DepartmentManagement = () => {
  const [departments, setDepartments] = useState([]);
  const [newDepartment, setNewDepartment] = useState('');
  const [updateDepartment, setUpdateDepartment] = useState({ id: '', name: '' });
  const [isCreateDepartmentOpen, setIsCreateDepartmentOpen] = useState(false);
  const [isUpdateDepartmentOpen, setIsUpdateDepartmentOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [departmentToDelete, setDepartmentToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const createDepartment = () => {
    setDepartments([...departments, { id: Date.now(), name: newDepartment }]);
    setNewDepartment('');
    setIsCreateDepartmentOpen(false);
    setSnackbarMessage('Department created successfully!');
    setSnackbarOpen(true);
  };

  const updateDepartmentDetails = () => {
    const updatedDepartments = departments.map(department =>
      department.id === updateDepartment.id ? { ...department, name: updateDepartment.name } : department
    );
    setDepartments(updatedDepartments);
    setUpdateDepartment({ id: '', name: '' });
    setIsUpdateDepartmentOpen(false);
    setSnackbarMessage('Department updated successfully!');
    setSnackbarOpen(true);
  };

  const confirmDeleteDepartment = id => {
    setDepartmentToDelete(id);
    setIsDeleteConfirmOpen(true);
  };

  const deleteDepartment = () => {
    const filteredDepartments = departments.filter(department => department.id !== departmentToDelete);
    setDepartments(filteredDepartments);
    setIsDeleteConfirmOpen(false);
    setDepartmentToDelete(null);
    setSnackbarMessage('Department deleted successfully!');
    setSnackbarOpen(true);
  };

  const filteredDepartments = departments.filter(department =>
    department.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4">Departments</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />} 
          onClick={() => setIsCreateDepartmentOpen(true)}
        >
          Create Department
        </Button>
      </Box>

      {/* Create Department Dialog */}
      <Dialog open={isCreateDepartmentOpen} onClose={() => setIsCreateDepartmentOpen(false)}>
        <DialogTitle>Create Department</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Department Name"
            type="text"
            fullWidth
            value={newDepartment}
            onChange={(e) => setNewDepartment(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsCreateDepartmentOpen(false)}>Cancel</Button>
          <Button onClick={createDepartment} color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Update Department Dialog */}
      <Dialog open={isUpdateDepartmentOpen} onClose={() => setIsUpdateDepartmentOpen(false)}>
        <DialogTitle>Update Department</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Department Name"
            type="text"
            fullWidth
            value={updateDepartment.name}
            onChange={(e) => setUpdateDepartment({ ...updateDepartment, name: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsUpdateDepartmentOpen(false)}>Cancel</Button>
          <Button onClick={updateDepartmentDetails} color="primary">Save</Button>
          <Button 
            onClick={() => confirmDeleteDepartment(updateDepartment.id)} 
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
      >
        <DialogTitle>{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this department? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteConfirmOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteDepartment} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Search Bar */}
      <TextField
        fullWidth
        margin="dense"
        label="Search by name..."
        type="text"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Department List */}
      <List>
        {filteredDepartments.map(department => (
          <ListItem
            key={department.id}
            secondaryAction={
              <Box sx={{ display: 'flex' }}>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => {
                    setUpdateDepartment(department);
                    setIsUpdateDepartmentOpen(true);
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => confirmDeleteDepartment(department.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            }
          >
            <Typography variant="body1" sx={{ flexGrow: 1 }}>
              {department.name}
            </Typography>
          </ListItem>
        ))}
      </List>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DepartmentManagement;
