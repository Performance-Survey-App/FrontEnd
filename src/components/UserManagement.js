import React, { useState } from 'react';
import { Box, Button, TextField, Modal, Typography, List, ListItem, ListItemText, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', birthday: '', department: '', password: '' });
  const [updateUser, setUpdateUser] = useState({ id: '', name: '', email: '', birthday: '', department: '' });
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
  const [isUpdateUserOpen, setIsUpdateUserOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const createUser = () => {
    setUsers([...users, { id: Date.now(), ...newUser }]);
    setNewUser({ name: '', email: '', birthday: '', department: '', password: '' });
    setIsCreateUserOpen(false);
  };

  const updateUserDetails = () => {
    const updatedUsers = users.map(user =>
      user.id === updateUser.id
        ? { ...user, name: updateUser.name, email: updateUser.email, birthday: updateUser.birthday, department: updateUser.department }
        : user
    );
    setUsers(updatedUsers);
    setUpdateUser({ id: '', name: '', email: '', birthday: '', department: '' });
    setIsUpdateUserOpen(false);
  };

  const confirmDeleteUser = id => {
    setUserToDelete(id);
    setIsDeleteConfirmOpen(true);
  };

  const deleteUser = () => {
    const filteredUsers = users.filter(user => user.id !== userToDelete);
    setUsers(filteredUsers);
    setIsDeleteConfirmOpen(false);
    setUserToDelete(null);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: { xs: 1, sm: 2 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">Users</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />} 
          onClick={() => setIsCreateUserOpen(true)}
        >
          Create User
        </Button>
      </Box>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2 }}
      />

      <List>
        {filteredUsers.map(user => (
          <ListItem
            key={user.id}
            secondaryAction={
              <Box sx={{ display: 'flex' }}>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => {
                    setUpdateUser(user);
                    setIsUpdateUserOpen(true);
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => confirmDeleteUser(user.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            }
          >
            <ListItemText primary={user.name} secondary={user.department} />
          </ListItem>
        ))}
      </List>

      <Modal
        open={isCreateUserOpen}
        onClose={() => setIsCreateUserOpen(false)}
        aria-labelledby="create-user-modal"
        aria-describedby="create-user-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: 400 },
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" id="create-user-modal">Create User</Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            variant="outlined"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            type="email"
            variant="outlined"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Birthday"
            type="date"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            value={newUser.birthday}
            onChange={(e) => setNewUser({ ...newUser, birthday: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Department"
            variant="outlined"
            value={newUser.department}
            onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Default Password"
            type="password"
            variant="outlined"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          />
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Button onClick={createUser} variant="contained">Save</Button>
            <Button onClick={() => setIsCreateUserOpen(false)} variant="outlined">Cancel</Button>
          </Box>
        </Box>
      </Modal>

      <Modal
        open={isUpdateUserOpen}
        onClose={() => setIsUpdateUserOpen(false)}
        aria-labelledby="update-user-modal"
        aria-describedby="update-user-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: 400 },
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" id="update-user-modal">Update User</Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            variant="outlined"
            value={updateUser.name}
            onChange={(e) => setUpdateUser({ ...updateUser, name: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            type="email"
            variant="outlined"
            value={updateUser.email}
            onChange={(e) => setUpdateUser({ ...updateUser, email: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Birthday"
            type="date"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            value={updateUser.birthday}
            onChange={(e) => setUpdateUser({ ...updateUser, birthday: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Department"
            variant="outlined"
            value={updateUser.department}
            onChange={(e) => setUpdateUser({ ...updateUser, department: e.target.value })}
          />
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Button onClick={updateUserDetails} variant="contained">Save</Button>
            <Button onClick={() => setIsUpdateUserOpen(false)} variant="outlined">Cancel</Button>
          </Box>
        </Box>
      </Modal>

      <Dialog
        open={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
      >
        <DialogTitle>{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteConfirmOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteUser} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserManagement;
