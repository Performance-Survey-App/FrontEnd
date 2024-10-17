import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Modal, Typography, List, ListItem, ListItemText, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Switch, Snackbar, Alert, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import BlockIcon from '@mui/icons-material/Block';
import UserService from '../services/user.service';
import DeptService from '../services/department.service';
import userEvent from '@testing-library/user-event';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', department: '', password: '' });
  const [updateUser, setUpdateUser] = useState({ UserId: '', name: '', email: '', department: '' });
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
  const [isUpdateUserOpen, setIsUpdateUserOpen] = useState(false);
  const [isDisableConfirmOpen, setIsDisableConfirmOpen] = useState(false);
  const [userToDisable, setUserToDisable] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDisabled, setShowDisabled] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
   const [departmentId, setdepartmentId ] = useState(null)

  const userService = new UserService(); 
  const deptService = new DeptService();

  const fetchUsers = async () => {
    try {

      const response = await userService.fetchUsers(departmentId);
      console.log("response: ", response)
      if (Array.isArray(response.data)) {
        setUsers(response.data);
      } else {
        console.error('Unexpected data format:', response);
        setUsers([]); // Set empty array if data format is unexpected
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      if(error && error.status === 404){
        setUsers([])
      }
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await deptService.fetchDepartments(); // Make sure this method exists
      if (Array.isArray(response.data)) {
        setDepartments(response.data);
      } else {
        console.error('Unexpected data format:', response);
        setDepartments([]); // Set empty array if data format is unexpected
      }
    } catch (error) {
      console.error('Error fetching departments:', error);
      setSnackbarMessage('Failed to fetch departments.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };
console.log("Users: ",users)

  useEffect(() => {
    fetchDepartments(); // Fetch departments when the component mounts
  }, []); // Empty dependency array since userService is a stable reference


  useEffect(()=>{
    if(departmentId ){
      fetchUsers();
    }
  }, [departmentId])

  const createUser = async () => {
    try {
      const model = {
        name: newUser.name,
        userEmail: newUser.email,
        departmentId: newUser.department
      }
      await userService.createUser(model);
      await fetchUsers(); // Refresh users list
      setNewUser({ name: '', email: '', department: '' });
      setIsCreateUserOpen(false);
      setSnackbarMessage('User created successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error creating user:', error);
      setSnackbarMessage('Failed to create user.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const updateUserDetails = async () => {
    try {
      const model = {
        name: updateUser.name,
        userEmail: updateUser.email,
        departmentId: updateUser.department
      }
      console.log("updateUser: ", updateUser)
      await userService.updateUserDetails(model, updateUser.userId);
      await fetchUsers(); // Refresh users list
      setUpdateUser({ UserId: '', name: '', email: '', department: '' });
      setIsUpdateUserOpen(false);
      setSnackbarMessage('User updated successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error updating user:', error);
      setSnackbarMessage('Failed to update user.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const confirmDisableUser = (id) => {
    setUserToDisable(id);
    setIsDisableConfirmOpen(true);
  };

  const disableUser = async () => {
    try {
      await userService.deleteUser(userToDisable);
      await fetchUsers(); // Refresh users list
      setIsDisableConfirmOpen(false);
      setUserToDisable(null);
      setSnackbarMessage('User disabled successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error disabling user:', error);
      setSnackbarMessage('Failed to disable user.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };
console.log("departments: ", departments)
  // const filteredUsers = users.filter((user) =>
  //   user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
  //   (showDisabled || !user.disabled)
  // );

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

      <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
          <InputLabel>Department</InputLabel>
          <Select
            value={departmentId}
            onChange={(e) => {setdepartmentId(e.target.value);  }}
            label="Department"
          >
            <MenuItem value="">
              <em>Select Department</em>
            </MenuItem>
            { departments && departments?.map(department => (
              <MenuItem key={department.departmentId} value={department.departmentId}>
                {department.departmentName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2 }}
      />

      <List>
        {users && users.length > 0 ? (
            <>
            {users.map(user => (
    <ListItem
      key={user.userId}
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
            aria-label="disable"
            onClick={() => confirmDisableUser(user.userId)}
          >
            <BlockIcon />
          </IconButton>
        </Box>
      }
    >
      <ListItemText 
        primary={user.name} 
        //secondary={user.userEmail + (user.disabled ? ' (Disabled)' : '')} 
      />
    </ListItem>
  ))}
            </>
        ) :(
          <p>No User found</p>
        )}
      
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
            boxShadow: 20,
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
            {departments.map((dept, index) => (
              <MenuItem key={index} value={dept.departmentId}>{dept.departmentName}</MenuItem>
            ))}
          </Select>
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
          <Select
            fullWidth
            margin="normal"
            label="Department"
            variant="outlined"
            value={updateUser.department}
            onChange={(e) => setUpdateUser({ ...updateUser, department: e.target.value })}
          >
            <MenuItem value="" disabled>Select Department</MenuItem>
            {departments.map((dept, index) => (
              <MenuItem key={index} value={dept.departmentId}>{dept.departmentName}</MenuItem>
            ))}
          </Select>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Button onClick={updateUserDetails} variant="contained">Update</Button>
            <Button onClick={() => setIsUpdateUserOpen(false)} variant="outlined">Cancel</Button>
          </Box>
        </Box>
      </Modal>

      <Dialog
        open={isDisableConfirmOpen}
        onClose={() => setIsDisableConfirmOpen(false)}
      >
        <DialogTitle>{"Confirm Disable User"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to disable this user? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDisableConfirmOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={disableUser} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserManagement;

// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Button,
//   TextField,
//   Modal,
//   Typography,
//   List,
//   ListItem,
//   ListItemText,
//   IconButton,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   Switch,
//   Snackbar,
//   Alert,
//   Select,
//   MenuItem
// } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import EditIcon from '@mui/icons-material/Edit';
// import BlockIcon from '@mui/icons-material/Block';
// import UserService from '../services/user.service';
// import DeptService from '../services/department.service';

// const UserManagement = () => {
//   const [users, setUsers] = useState([]);
//   const [departments, setDepartments] = useState([]);
//   const [selectedDepartment, setSelectedDepartment] = useState('');
//   const [newUser, setNewUser] = useState({ name: '', email: '', department: '' });
//   const [updateUser, setUpdateUser] = useState({ userId: '', name: '', email: '', department: '' });
//   const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
//   const [isUpdateUserOpen, setIsUpdateUserOpen] = useState(false);
//   const [isDisableConfirmOpen, setIsDisableConfirmOpen] = useState(false);
//   const [userToDisable, setUserToDisable] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showDisabled, setShowDisabled] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [snackbarSeverity, setSnackbarSeverity] = useState('success');

//   const userService = new UserService(); 
//   const deptService = new DeptService();

//   const fetchUsers = async () => {
//     try {
//       const response = await userService.fetchUsers();
//       if (Array.isArray(response.data)) {
//         setUsers(response.data);
//       } else {
//         console.error('Unexpected data format:', response);
//         setUsers([]);
//       }
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//   };

//   const fetchDepartments = async () => {
//     try {
//       const response = await deptService.fetchDepartments();
//       if (Array.isArray(response.data)) {
//         setDepartments(response.data);
//       } else {
//         console.error('Unexpected data format:', response);
//         setDepartments([]);
//       }
//     } catch (error) {
//       console.error('Error fetching departments:', error);
//       setSnackbarMessage('Failed to fetch departments.');
//       setSnackbarSeverity('error');
//       setSnackbarOpen(true);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//     fetchDepartments();
//   }, []);

//   const createUser = async () => {
//     try {
//       const model = {
//         name: newUser.name,
//         userEmail: newUser.email,
//         departmentId: newUser.department
//       };
//       await userService.createUser(model);
//       await fetchUsers();
//       setNewUser({ name: '', email: '', department: '' });
//       setIsCreateUserOpen(false);
//       setSnackbarMessage('User created successfully!');
//       setSnackbarSeverity('success');
//       setSnackbarOpen(true);
//     } catch (error) {
//       console.error('Error creating user:', error);
//       setSnackbarMessage('Failed to create user.');
//       setSnackbarSeverity('error');
//       setSnackbarOpen(true);
//     }
//   };

//   const updateUserDetails = async () => {
//     try {
//       const model = {
//         name: updateUser.name,
//         userEmail: updateUser.email,
//         departmentId: updateUser.department
//       };
//       await userService.updateUserDetails(model, updateUser.userId);
//       await fetchUsers();
//       setUpdateUser({ userId: '', name: '', email: '', department: '' });
//       setIsUpdateUserOpen(false);
//       setSnackbarMessage('User updated successfully!');
//       setSnackbarSeverity('success');
//       setSnackbarOpen(true);
//     } catch (error) {
//       console.error('Error updating user:', error);
//       setSnackbarMessage('Failed to update user.');
//       setSnackbarSeverity('error');
//       setSnackbarOpen(true);
//     }
//   };

//   const confirmDisableUser = (id) => {
//     setUserToDisable(id);
//     setIsDisableConfirmOpen(true);
//   };

//   const disableUser = async () => {
//     try {
//       await userService.deleteUser(userToDisable);
//       await fetchUsers();
//       setIsDisableConfirmOpen(false);
//       setUserToDisable(null);
//       setSnackbarMessage('User disabled successfully!');
//       setSnackbarSeverity('success');
//       setSnackbarOpen(true);
//     } catch (error) {
//       console.error('Error disabling user:', error);
//       setSnackbarMessage('Failed to disable user.');
//       setSnackbarSeverity('error');
//       setSnackbarOpen(true);
//     }
//   };

//   const filteredUsers = users.filter((user) => 
//     user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
//     (showDisabled || !user.disabled) &&
//     (selectedDepartment ? user.departmentId === selectedDepartment : true)
//   );

//   return (
//     <Box sx={{ p: { xs: 1, sm: 2 } }}>
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
//         <Typography variant="h6">Users</Typography>
//         <Button 
//           variant="contained" 
//           color="primary" 
//           startIcon={<AddIcon />} 
//           onClick={() => setIsCreateUserOpen(true)}
//         >
//           Create User
//         </Button>
//       </Box>

//       <Select
//         fullWidth
//         variant="outlined"
//         value={selectedDepartment}
//         onChange={(e) => setSelectedDepartment(e.target.value)}
//         displayEmpty
//         sx={{ mb: 2 }}
//       >
//         <MenuItem value="">All Departments</MenuItem>
//         {departments.map((dept, index) => (
//           <MenuItem key={index} value={dept.departmentId}>{dept.departmentName}</MenuItem>
//         ))}
//       </Select>

//       <TextField
//         fullWidth
//         variant="outlined"
//         placeholder="Search by name..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         sx={{ mb: 2 }}
//       />

//       <List>
//         {filteredUsers.map(user => (
//           <ListItem
//             key={user.id}
//             secondaryAction={
//               <Box sx={{ display: 'flex' }}>
//                 <IconButton
//                   edge="end"
//                   aria-label="edit"
//                   onClick={() => {
//                     setUpdateUser(user);
//                     setIsUpdateUserOpen(true);
//                   }}
//                 >
//                   <EditIcon />
//                 </IconButton>
//                 <IconButton
//                   edge="end"
//                   aria-label="disable"
//                   onClick={() => confirmDisableUser(user.userId)}
//                 >
//                   <BlockIcon />
//                 </IconButton>
//               </Box>
//             }
//           >
//             <ListItemText 
//               primary={user.name} 
//               secondary={user.userEmail + (user.disabled ? ' (Disabled)' : '')} 
//             />
//           </ListItem>
//         ))}
//       </List>

//       <Modal
//         open={isCreateUserOpen}
//         onClose={() => setIsCreateUserOpen(false)}
//         aria-labelledby="create-user-modal"
//         aria-describedby="create-user-modal-description"
//       >
//         <Box
//           sx={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             width: { xs: '90%', sm: 400 },
//             bgcolor: 'background.paper',
//             boxShadow: 20,
//             p: 4,
//           }}
//         >
//           <Typography variant="h6" id="create-user-modal">Create User</Typography>
//           <TextField
//             fullWidth
//             margin="normal"
//             label="Name"
//             variant="outlined"
//             value={newUser.name}
//             onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
//           />
//           <TextField
//             fullWidth
//             margin="normal"
//             label="Email"
//             type="email"
//             variant="outlined"
//             value={newUser.email}
//             onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
//           />
//           <Select
//             fullWidth
//             margin="normal"
//             label="Department"
//             variant="outlined"
//             value={newUser.department}
//             onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
//             displayEmpty
//           >
//             <MenuItem value="" disabled>Select Department</MenuItem>
//             {departments.map((dept, index) => (
//               <MenuItem key={index} value={dept.departmentId}>{dept.departmentName}</MenuItem>
//             ))}
//           </Select>
//           <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
//             <Button onClick={createUser} variant="contained">Save</Button>
//             <Button onClick={() => setIsCreateUserOpen(false)} variant="outlined">Cancel</Button>
//           </Box>
//         </Box>
//       </Modal>

//       <Modal
//         open={isUpdateUserOpen}
//         onClose={() => setIsUpdateUserOpen(false)}
//         aria-labelledby="update-user-modal"
//         aria-describedby="update-user-modal-description"
//       >
//         <Box
//           sx={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             width: { xs: '90%', sm: 400 },
//             bgcolor: 'background.paper',
//             boxShadow: 20,
//             p: 4,
//           }}
//         >
//           <Typography variant="h6" id="update-user-modal">Update User</Typography>
//           <TextField
//             fullWidth
//             margin="normal"
//             label="Name"
//             variant="outlined"
//             value={updateUser.name}
//             onChange={(e) => setUpdateUser({ ...updateUser, name: e.target.value })}
//           />
//           <TextField
//             fullWidth
//             margin="normal"
//             label="Email"
//             type="email"
//             variant="outlined"
//             value={updateUser.email}
//             onChange={(e) => setUpdateUser({ ...updateUser, email: e.target.value })}
//           />
//           <Select
//             fullWidth
//             margin="normal"
//             label="Department"
//             variant="outlined"
//             value={updateUser.department}
//             onChange={(e) => setUpdateUser({ ...updateUser, department: e.target.value })}
//             displayEmpty
//           >
//             <MenuItem value="" disabled>Select Department</MenuItem>
//             {departments.map((dept, index) => (
//               <MenuItem key={index} value={dept.departmentId}>{dept.departmentName}</MenuItem>
//             ))}
//           </Select>
//           <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
//             <Button onClick={updateUserDetails} variant="contained">Update</Button>
//             <Button onClick={() => setIsUpdateUserOpen(false)} variant="outlined">Cancel</Button>
//           </Box>
//         </Box>
//       </Modal>

//       <Dialog open={isDisableConfirmOpen} onClose={() => setIsDisableConfirmOpen(false)}>
//         <DialogTitle>Confirm Disable User</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Are you sure you want to disable this user?
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setIsDisableConfirmOpen(false)}>Cancel</Button>
//           <Button onClick={disableUser} color="error">Disable</Button>
//         </DialogActions>
//       </Dialog>

//       <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
//         <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default UserManagement;
