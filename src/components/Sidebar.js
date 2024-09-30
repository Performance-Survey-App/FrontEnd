// // src/components/Sidebar.js
// import React, { useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import { Box, List, ListItem, ListItemIcon, ListItemText, Typography, IconButton, Drawer } from '@mui/material';
// import HomeIcon from '@mui/icons-material/Home';
// import PeopleIcon from '@mui/icons-material/People';
// import ApartmentIcon from '@mui/icons-material/Apartment';
// import QuizIcon from '@mui/icons-material/Quiz';
// import AssignmentIcon from '@mui/icons-material/Assignment';
// import AssessmentIcon from '@mui/icons-material/Assessment';
// import MenuIcon from '@mui/icons-material/Menu';
// import logo from '../images/logo.jpg';

// const Sidebar = () => {
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);

//   const toggleDrawer = () => {
//     setIsDrawerOpen(!isDrawerOpen);
//   };

//   const SidebarContent = (
//     <Box
//       sx={{
//         width: 250,
//         bgcolor: 'primary.main',
//         height: '100%',
//         color: 'white',
//         p: 2,
//       }}
//     >
//       <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', mb: 2 }}>
//         <img src={logo} alt="Logo" style={{ width: 40, height: 40, marginRight: 10 }} />
//         <Typography variant="h6">Performance Analysis</Typography>
//       </Box>
//       <List>
//         <ListItem button component={NavLink} to="/admin">
//           <ListItemIcon>
//             <HomeIcon sx={{ color: 'white' }} />
//           </ListItemIcon>
//           <ListItemText primary="Home" />
//         </ListItem>
//         <ListItem button component={NavLink} to="./user-management">
//           <ListItemIcon>
//             <PeopleIcon sx={{ color: 'white' }} />
//           </ListItemIcon>
//           <ListItemText primary="Manage Users" />
//         </ListItem>
//         <ListItem button component={NavLink} to="./department-management">
//           <ListItemIcon>
//             <ApartmentIcon sx={{ color: 'white' }} />
//           </ListItemIcon>
//           <ListItemText primary="Manage Department" />
//         </ListItem>
//         <ListItem button component={NavLink} to="./question-management">
//           <ListItemIcon>
//             <QuizIcon sx={{ color: 'white' }} />
//           </ListItemIcon>
//           <ListItemText primary="Manage Questions" />
//         </ListItem>
//         <ListItem button component={NavLink} to="./assign-questions">
//           <ListItemIcon>
//             <AssignmentIcon sx={{ color: 'white' }} />
//           </ListItemIcon>
//           <ListItemText primary="Assign Questions" />
//         </ListItem>
//         <ListItem button component={NavLink} to="./responses">
//           <ListItemIcon>
//             <AssessmentIcon sx={{ color: 'white' }} />
//           </ListItemIcon>
//           <ListItemText primary="Responses" />
//         </ListItem>
//       </List>
//     </Box>
//   );

//   return (
//     <>
//       <IconButton
//         color="inherit"
//         aria-label="open drawer"
//         edge="start"
//         onClick={toggleDrawer}
//         sx={{
//           position: 'fixed',  // Ensure it floats over content
//           top: 16,            // Adjust based on where you want it positioned
//           left: 16,           // Adjust based on where you want it positioned
//           zIndex: (theme) => theme.zIndex.drawer + 1, // Float over drawer
//           display: { sm: 'none' }  // Only show on small screens
//         }}
//       >
//         <MenuIcon />
//       </IconButton>

//       {/* Mobile Sidebar */}
//       <Drawer
//         anchor="left"
//         open={isDrawerOpen}
//         onClose={toggleDrawer}
//         sx={{ display: { xs: 'block', sm: 'none' } }}
//       >
//         {SidebarContent}
//       </Drawer>

//       {/* Desktop Sidebar */}
//       <Box
//         sx={{
//           width: 270,
//           bgcolor: 'green',
//           height: '100vh',
//           color: 'white',
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           overflow: 'hidden',
//           display: { xs: 'none', sm: 'block' },
//         }}
//       >
//         {SidebarContent}
//       </Box>
//     </>
//   );
// };

// export default Sidebar;


import React, { useState } from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import logo from '../images/logo.jpg';
import { MdHome } from "react-icons/md";
import { FaLock } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";

import { CiSettings } from "react-icons/ci";
const Sidebar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  

  const [isSettings,setIsSettings] = useState(false);
  
  
  const handleChangePassword = () => {
         navigate('/change-password'); // Redirect to the change password page
       };

   const toggleSettings = ()=> {
    setIsSettings(!isSettings);
   }
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const navigate = useNavigate('')
  const SidebarContent = (
    <div className=" w-80 bg-white h-full text-black p-4">
      <div className="flex items-center mb-4">
        <img src={logo} alt="Logo" className="w-10 h-10 mr-3" />
        <h1 className="text-2xl font-serif">Performance Analysis</h1>
      </div>
      <ul className=' font-serif text-xl'>
        <li className="mb-2">
          <NavLink to="/admin" className="flex items-center p-2 hover:bg-green-600 hover:text-white  rounded">
          <MdHome  className='mr-3 text-2xl'/>
            Home
          </NavLink>
        </li>
        <li className="mb-2">
          <NavLink to="./department-management" className="flex items-center p-2 hover:bg-green-600 hover:text-white  rounded">
            <span className="material-icons mr-3 text-2xl">apartment</span>
            Manage Department
          </NavLink>
        </li>
        <li className="mb-2">
        
          <NavLink to="./user-management" className="flex items-center p-2 hover:bg-green-600 hover:text-white rounded">
            <span className="material-icons mr-3 text-2xl">people</span>
            Manage Users
          </NavLink>
        </li>
       
        <li className="mb-2">
          <NavLink to="./question-management" className="flex items-center p-2 hover:bg-green-600 hover:text-white  rounded">
            <span className="material-icons mr-3 text-2xl">quiz</span>
            Manage Questions
          </NavLink>
        </li>
        <li className="mb-2">
          <NavLink to="./assign-questions" className="flex items-center p-2 hover:bg-green-600 hover:text-white  rounded">
            <span className="material-icons mr-3 text-2xl">assignment</span>
            Assign Questions
          </NavLink>
        </li>
        <li className="mb-2">
          <NavLink to="./responses" className="flex items-center p-2 hover:bg-green-600 hover:text-white  rounded">
            <span className="material-icons mr-3 text-2xl">assessment</span>
            Responses
          </NavLink>
        </li>
       
        <li className="mt-6">
          <div onClick={toggleSettings} className="cursor-pointer flex items-center p-2 hover:bg-green-600 hover:text-white  rounded">
            <CiSettings className="mr-3 text-2xl" />
            <h2 className="">Settings</h2>
          </div>

          {/* Toggleable content for settings */}
          {isSettings && (
            <ul className="mt-2 ml-6">
              <li className="mb-2">
                <div onClick={handleChangePassword} className="flex items-center p-2 hover:bg-green-600 hover:text-white  rounded">
                  <FaLock className="mr-3" />
                  Change Password
                </div>
              </li>
              {/* Add more settings options here if needed */}
            </ul>
          )}
        </li>
        <li className="mt-6">
          <NavLink to="/logout" className="flex items-center p-2 hover:bg-green-600 hover:text-white  rounded">
            <MdLogout className="text-2xl mr-3" />
            Logout
          </NavLink>
        </li>
       
      </ul>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleDrawer}
        className="fixed top-4 left-4 text-white bg-green-600 p-2 rounded focus:outline-none z-50 sm:hidden"
      >
        <span className="material-icons">menu</span>
      </button>

      {/* Mobile Sidebar Drawer */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleDrawer}
        >
          <div
            className="fixed top-0 left-0 h-full bg-green-500 text-white w-64 z-50"
            onClick={(e) => e.stopPropagation()}
          >
            {SidebarContent}
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden sm:block fixed top-0 left-0 h-full bg-green-500 text-white w-64">
        {SidebarContent}
      </div>
    </>
  );
};

export default Sidebar;
