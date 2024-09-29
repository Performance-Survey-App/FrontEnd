// // src/components/AdminPage.js
// import React from 'react';
// import { Routes, Route, useNavigate } from 'react-router-dom';
// import { Box, Container, Typography, Grid, IconButton, Menu, MenuItem } from '@mui/material';
// import Sidebar from './Sidebar';
// import UserManagement from './UserManagement';
// import DepartmentManagement from './DepartmentManagement';
// import QuestionManagement from './QuestionManagement';
// import AssignQuestions from './AssignQuestions';
// import Responses from './Responses';
// import ImageSlider from './ImageSlider'; // Custom image slider component
// import SettingsIcon from '@mui/icons-material/Settings'; // Material UI icon for settings
// import '../styles/AdminPage.css';

// const AdminPage = () => {
//   const navigate = useNavigate();
//   const [anchorEl, setAnchorEl] = React.useState(null);

//   const handleSettingsClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleLogout = () => {
//     handleClose();
//     navigate('/login'); // Redirect to the login page
//   };

//   const handleChangePassword = () => {
//     handleClose();
//     navigate('/change-password'); // Redirect to the change password page
//   };

//   return (
//     <Grid container>
//       {/* Sidebar */}
//       <Grid item xs={12} sm={3} md={2}>
//         <Sidebar />
//       </Grid>

//       {/* Main Content */}
//       <Grid item xs={12} sm={9} md={10}>
//         <Container maxWidth="lg" sx={{ mt: 2, ml: 2 }}>
//           <Box display="flex" justifyContent="space-between" alignItems="center">
//             <Typography variant="h4" gutterBottom>
              
//             </Typography>

//             {/* Settings Icon */}
//             <IconButton color="inherit" onClick={handleSettingsClick}>
//               <SettingsIcon />
//             </IconButton>

//             <Menu
//               anchorEl={anchorEl}
//               open={Boolean(anchorEl)}
//               onClose={handleClose}
//             >
//               <MenuItem onClick={handleChangePassword}>Change Password</MenuItem>
//               <MenuItem onClick={handleLogout}>Logout</MenuItem>
//             </Menu>
//           </Box>

//           <Routes>
//             <Route
//               path="/user-management"
//               element={<UserManagement />}
//             />
//             <Route
//               path="/department-management"
//               element={<DepartmentManagement />}
//             />
//             <Route
//               path="/question-management"
//               element={<QuestionManagement />}
//             />
//             <Route
//               path="/assign-questions"
//               element={<AssignQuestions />}
//             />
//             <Route
//               path="/responses"
//               element={<Responses />}
//             />
//             <Route
//               path="/"
//               element={
//                 <Box>
//                   {/* <ImageSlider /> Custom slideshow component */}
//                 </Box>
//               }
//             />
//           </Routes>
//         </Container>
//       </Grid>
//     </Grid>
//   );
// };

// export default AdminPage;

import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import UserManagement from './UserManagement';
import DepartmentManagement from './DepartmentManagement';
import QuestionManagement from './QuestionManagement';
import AssignQuestions from './AssignQuestions';
import Responses from './Responses';
import { IoNotificationsOutline } from "react-icons/io5";
import '../styles/AdminPage.css';

const AdminPage = () => {
  // const navigate = useNavigate();
  
  // const handleChangePassword = () => {
  //        handleClose();
  //        navigate('/change-password'); // Redirect to the change password page
  //      };

  return (
    <div className="flex min-h-screen">
    {/* Sidebar */}
    <Sidebar />

    {/* Main Content */}
    <div className="ml-0 sm:ml-64 flex-1 bg-gray-100 pl-16">
      <div className="bg-white drop-shadow-md py-6  sm:px-8 flex justify-between items-center w-full">
        <p className="text-lg font-semibold">Hi, Welcome</p>
        <IoNotificationsOutline className='text-2xl' />
      </div>

      {/* Add margin between the sidebar and content */}
      <div className=" sm:ml-4 bg-white rounded-md">
        <Routes>
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/department-management" element={<DepartmentManagement />} />
          <Route path="/question-management" element={<QuestionManagement />} />
          <Route path="/assign-questions" element={<AssignQuestions />} />
          <Route path="/responses" element={<Responses />} />
          <Route path="/" element={<div></div>} />
        </Routes>
      </div>
    </div>
  </div>
  );
};

export default AdminPage;
