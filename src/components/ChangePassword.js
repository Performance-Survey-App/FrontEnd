import React, { useState } from 'react';
import eye from "../images/ph_eye.png"
// import { Container, Typography, TextField, Button } from '@mui/material';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [passwordVisibility,setPasswordVisibilty] = useState(false)
  
  const hadlePasswordVisibility = ()=> {
    setPasswordVisibilty(!passwordVisibility)
  }
  const handleSubmit = () => {
    if (newPassword === confirmPassword) {
      // Handle password change logic here
      alert('Password changed successfully');
    } else {
      alert('Passwords do not match');
    }
  };

  return (
    <div className=' h-screen w-full bg-gradient-to-r from-blue-300 to-emerald-300 flex justify-center items-center px-5 md:px-10'>
     <div className='flex flex-col md:flex-row w-full md:w-2/3 h-auto md:h-[65%]'>
      
      <div className=' bg-white w-full md:w-1/2 p-6 md:p-8 rounded-t-lg md:rounded-l-lg md:rounded-t-none shadow-lg'>
        <form>
          <div className='mb-4 relative'>
            <label className='block text-gray-700 font-semibold mb-2'>Current Password</label>
            <input
              type={passwordVisibility? "text" : "password"}
              placeholder='current password'
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className=' w-full px-3 py-2 border rounded-md'
            />
            <img
              src={eye}
              alt='eye'
              className=' absolute right-2 bottom-3 cursor-pointer'
              onClick={hadlePasswordVisibility}
            />
          </div>
           <div className='mb-4 relative'>
            <label className='block text-gray-700 font-semibold mb-2'>New Password</label>
            <input
             type={passwordVisibility? "text" : "password"}
              placeholder='new password'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className='w-full px-3 py-2 border rounded-md'
            />
             <img
              src={eye}
              alt='eye'
              className=' absolute right-2 bottom-3 cursor-pointer'
              onClick={hadlePasswordVisibility}
            />
          </div>
          <div className='mb-4 relative'>
            <label className='block text-gray-700 font-semibold mb-2'>Confirm New Password</label>
            <input
              type={passwordVisibility? "text" : "password"}
              placeholder='confirm new password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className='w-full px-3 py-2 border rounded-md'
            />
             <img
              src={eye}
              alt='eye'
              className=' absolute right-2 bottom-3 cursor-pointer'
              onClick={hadlePasswordVisibility}
            />
          </div>
          <button className=' bg-blue-500 text-white py-2 px-4 rounded hover:bg-emerald-500 transition w-full' onClick={handleSubmit}>
           Change Password
          </button>
        </form>
      </div>
      <div className=' hidden md:block bg-blue-500 w-full md:w-1/2 p-6 md:p-8 rounded-b-lg md:rounded-r-lg md:rounded-b-none shadow-lg'>

      </div>
     </div>
    </div>
    // <Container maxWidth="sm" sx={{ mt: 5 }}>
    //   <Typography variant="h4" gutterBottom>
    //     Change Password
    //   </Typography>
    //   <TextField
    //     fullWidth
    //     variant="outlined"
    //     label="Current Password"
    //     type="password"
    //     value={currentPassword}
    //     onChange={(e) => setCurrentPassword(e.target.value)}
    //     sx={{ mb: 2 }}
    //   />
    //   <TextField
    //     fullWidth
    //     variant="outlined"
    //     label="New Password"
    //     type="password"
    //     value={newPassword}
    //     onChange={(e) => setNewPassword(e.target.value)}
    //     sx={{ mb: 2 }}
    //   />
    //   <TextField
    //     fullWidth
    //     variant="outlined"
    //     label="Confirm New Password"
    //     type="password"
    //     value={confirmPassword}
    //     onChange={(e) => setConfirmPassword(e.target.value)}
    //     sx={{ mb: 2 }}
    //   />
    //   <Button
    //     variant="contained"
    //     color="primary"
    //     onClick={handleSubmit}
    //   >
    //     Change Password
    //   </Button>
    // </Container>
  );
};

export default ChangePassword;
