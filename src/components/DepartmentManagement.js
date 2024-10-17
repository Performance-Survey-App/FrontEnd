import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Button, TextField, List, ListItem, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Snackbar, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeptService from '../services/department.service';

const DepartmentManagement = () => {
  const [departments, setDepartments] = useState([]);
  const [newDepartment, setNewDepartment] = useState('');
  const [updateDepartment, setUpdateDepartment] = useState({ departmentId: '', departmentName: '' });
  const [isCreateDepartmentOpen, setIsCreateDepartmentOpen] = useState(false);
  const [isUpdateDepartmentOpen, setIsUpdateDepartmentOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [departmentToDelete, setDepartmentToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const deptService = new DeptService();

  useEffect(() => {
    fetchDepartments();
}, []);

const fetchDepartments = async () => {
    try {
        const response = await deptService.fetchDepartments();
        console.log("API Response:", response);

        // Check if the response data is directly an array or contains a $values array
        if (Array.isArray(response.data)) {
            setDepartments(response.data);
        } else if (Array.isArray(response.data.$values)) {
            setDepartments(response.data.$values);
        } else {
            console.error("Unexpected response format, expected an array:", response.data);
            setDepartments([]);
        }
    } catch (error) {
        console.error("Error fetching departments:", error);
        setDepartments([]);
        setSnackbarMessage('Error fetching departments');
        setSnackbarOpen(true);
    }
};



  const createDepartment = async () => {
    try {
        const response = await deptService.createDepartment({ departmentName: newDepartment });
        // Extract the departmentName and $id from the response
        const newDept = {
            $id: response.data.$id,
            departmentName: response.data.departmentName,
        };
        // Update the departments state
        setDepartments([...departments, newDept]);
        setNewDepartment(''); // Clear input
        setIsCreateDepartmentOpen(false);
        setSnackbarMessage('Department created successfully!');
        setSnackbarOpen(true);
        
    fetchDepartments();
    } catch (error) {
        console.error("Error creating department:", error);
        setSnackbarMessage(`Error creating department: ${error.response?.data?.message || error.message}`);
        setSnackbarOpen(true);
    }
  };

  const updateDepartmentDetails = async () => {
    try {
      console.log("department.id:", updateDepartment)

      await deptService.updateDepartmentDetails(
        
        { departmentName: updateDepartment.departmentName },
        updateDepartment.departmentId
      );
  
      const updatedDepartments = departments.map(department =>
        department.departmentId === updateDepartment.departmentId
          ? { ...department, departmentName: updateDepartment.departmentName }
          : department
      );
      setDepartments(updatedDepartments);
      setUpdateDepartment({ departmentId: '', departmentName: '' });
      setIsUpdateDepartmentOpen(false);
      setSnackbarMessage('Department updated successfully!');
      setSnackbarOpen(true);
      fetchDepartments();
    } catch (error) {
      console.error("Error updating department:", error);
      setSnackbarMessage(`Error updating department: ${error.response?.data?.message || error.message}`);
      setSnackbarOpen(true);
    }
  };
  
  const confirmDeleteDepartment = (departmentId) => {
    setDepartmentToDelete(departmentId);
    setIsDeleteConfirmOpen(true);
  };

  const deleteDepartment = async () => {
    try {
        await deptService.deleteDepartment(departmentToDelete);
        
        setIsDeleteConfirmOpen(false);
        setDepartmentToDelete(null);
        setSnackbarMessage('Department deleted successfully!');
        setSnackbarOpen(true);
        fetchDepartments();
    } catch (error) {
        console.error("Error deleting department:", error);
        setSnackbarMessage(`Error deleting department: ${error.response?.data?.message || error.message}`);
        setSnackbarOpen(true);
    }
};


  const filteredDepartments = departments.filter(department =>
    
    department && department.departmentName && department.departmentName.toLowerCase().includes(searchTerm.toLowerCase())
  );
 console.log("this comment",filteredDepartments)
  return (
    <Box className="p-6 bg-gray-50 rounded-lg shadow-md">
      <Box className="flex justify-between mb-4">
        <Typography variant="h4" className="text-gray-800">Departments</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />} 
          onClick={() => setIsCreateDepartmentOpen(true)}
          className="bg-green-500 text-white hover:bg-blue-600 transition"
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
            value={updateDepartment.departmentName}
            onChange={(e) => setUpdateDepartment({ ...updateDepartment, departmentName: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsUpdateDepartmentOpen(false)}>Cancel</Button>
          <Button onClick={updateDepartmentDetails} color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteConfirmOpen} onClose={() => setIsDeleteConfirmOpen(false)}>
        <DialogTitle>{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this department? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteConfirmOpen(false)} color="primary">Cancel</Button>
          <Button onClick={deleteDepartment} color="secondary">Delete</Button>
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
        className="mb-4"
      />

      {/* Department List */}
      <List className="bg-white rounded-lg shadow">
        {filteredDepartments.length > 0 ? (
          filteredDepartments.map(department => (
            <ListItem
              key={department.departmentId}
              className="border-b hover:bg-gray-100 transition"
              secondaryAction={
                <Box className="flex">
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
                    onClick={() => confirmDeleteDepartment(department.departmentId)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              }
            >
              <Typography variant="body1" className="text-gray-700">
                {department.departmentName}
              </Typography>
            </ListItem>
          ))
        ) : (
          <Typography className="p-4 text-gray-500">No departments found.</Typography>
        )}
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
