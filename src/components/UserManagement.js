import React, { useState } from 'react';
import { Box, Button, TextField, Modal, Typography, List, ListItem, ListItemText, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Switch, Snackbar, Alert, Select, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', birthday: '', department: '', password: '' });
  const [updateUser, setUpdateUser] = useState({ id: '', name: '', email: '', birthday: '', department: '' });
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
  const [isUpdateUserOpen, setIsUpdateUserOpen] = useState(false);
  const [isDisableConfirmOpen, setIsDisableConfirmOpen] = useState(false);
  const [isEnableConfirmOpen, setIsEnableConfirmOpen] = useState(false);
  const [userToDisable, setUserToDisable] = useState(null);
  const [userToEnable, setUserToEnable] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDisabled, setShowDisabled] = useState(false);

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Sample departments list for the dropdown
  const departments = ['HR', 'Engineering', 'Marketing', 'Sales'];

  const createUser = () => {
    setUsers([...users, { id: Date.now(), ...newUser, disabled: false }]);
    setNewUser({ name: '', email: '', birthday: '', department: '', password: '' });
    setIsCreateUserOpen(false);
    setSnackbarMessage('User created successfully!');
    setSnackbarOpen(true);
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
    setSnackbarMessage('User updated successfully!');
    setSnackbarOpen(true);
  };

  const confirmDisableUser = id => {
    setUserToDisable(id);
    setIsDisableConfirmOpen(true);
  };

  const disableUser = () => {
    const updatedUsers = users.map(user =>
      user.id === userToDisable ? { ...user, disabled: true } : user
    );
    setUsers(updatedUsers);
    setIsDisableConfirmOpen(false);
    setUserToDisable(null);
    setSnackbarMessage('User disabled successfully!');
    setSnackbarOpen(true);
  };

  const confirmEnableUser = id => {
    setUserToEnable(id);
    setIsEnableConfirmOpen(true);
  };

  const enableUser = () => {
    const updatedUsers = users.map(user =>
      user.id === userToEnable ? { ...user, disabled: false } : user
    );
    setUsers(updatedUsers);
    setIsEnableConfirmOpen(false);
    setUserToEnable(null);
    setSnackbarMessage('User enabled successfully!');
    setSnackbarOpen(true);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (showDisabled || !user.disabled)
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

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="body1" sx={{ mr: 2 }}>Show Disabled Users</Typography>
        <Switch
          checked={showDisabled}
          onChange={() => setShowDisabled(!showDisabled)}
        />
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
                {user.disabled ? (
                  <IconButton
                    edge="end"
                    aria-label="enable"
                    onClick={() => confirmEnableUser(user.id)}
                  >
                    <CheckCircleIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    edge="end"
                    aria-label="disable"
                    onClick={() => confirmDisableUser(user.id)}
                  >
                    <BlockIcon />
                  </IconButton>
                )}
              </Box>
            }
          >
            <ListItemText 
              primary={user.name} 
              secondary={user.department + (user.disabled ? ' (Disabled)' : '')} 
            />
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
          <Select
            fullWidth
            margin="normal"
            label="Department"
            variant="outlined"
            value={newUser.department}
            onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
            displayEmpty
          >
            <MenuItem value="" disabled>Select Department</MenuItem>
            {departments.map((dept) => (
              <MenuItem key={dept} value={dept}>{dept}</MenuItem>
            ))}
          </Select>
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
          <Select
            fullWidth
            margin="normal"
            label="Department"
            variant="outlined"
            value={updateUser.department}
            onChange={(e) => setUpdateUser({ ...updateUser, department: e.target.value })}
            // displayEmpty
          >
            <MenuItem value="" disabled>Select Department</MenuItem>
            {departments.map((dept) => (
              <MenuItem key={dept} value={dept}>{dept}</MenuItem>
            ))}
          </Select>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Button onClick={updateUserDetails} variant="contained">Save</Button>
            <Button onClick={() => setIsUpdateUserOpen(false)} variant="outlined">Cancel</Button>
          </Box>
        </Box>
      </Modal>

      <Dialog
        open={isDisableConfirmOpen}
        onClose={() => setIsDisableConfirmOpen(false)}
      >
        <DialogTitle>Disable User</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to disable this user?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={disableUser} color="primary">Yes</Button>
          <Button onClick={() => setIsDisableConfirmOpen(false)} color="primary" autoFocus>No</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isEnableConfirmOpen}
        onClose={() => setIsEnableConfirmOpen(false)}
      >
        <DialogTitle>Enable User</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to enable this user?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={enableUser} color="primary">Yes</Button>
          <Button onClick={() => setIsEnableConfirmOpen(false)} color="primary" autoFocus>No</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserManagement;
