

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import eye from "../images/ph_eye.png"; 

const LoginPage = () => {
  const [userEmail, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [error, setError] = useState(''); 
  const navigate = useNavigate();

  const handlePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const handleLogin = async (e) => {
  e.preventDefault();
  console.log("A login click happened");

  const backend_URL = process.env.REACT_APP_BACKEND_BASE_URL;
  if (!backend_URL) {
    setError('Backend URL is not defined. Please check your environment variables.');
    return; 
  }

  console.log("the env: ",process.env.REACT_APP_BACKEND_BASE_URL)
  console.log('Request payload:', { userEmail, password });

  try {
    const response = await fetch(`${backend_URL}/Adminlogin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userEmail, password }), 
    });

   
    if (response.ok) {
      const data = await response.json(); 
      if (data.token) {
        sessionStorage.setItem('authToken', data.token);
        setPassword(''); 
        setError(''); 
        navigate('/admin'); 
        console.log("The token: ",sessionStorage.getItem('authToken'))
      } else {
        setError('Login response does not contain an access token');
        console.error('Login response does not contain an access token', data);
      }
    } else {
      const errorText = await response.text(); 
      try {
        const errorData = JSON.parse(errorText);
        setError(errorData.message); 
        console.error('Authentication failed:', errorData.message);
      } catch (jsonParseError) {
        setError(`Authentication failed: ${errorText}`); 
        console.error('Authentication failed:', errorText);
      }
    }
  } catch (error) {
    setError("Check internet connection"); 
    console.error('Login error: ', error);
  }
};
  return (
    <div className="w-full h-screen bg-gradient-to-r from-emerald-300 to-blue-300 flex justify-center items-center px-5 md:px-10">
      <div className="flex flex-col md:flex-row w-full md:w-2/3 h-auto md:h-[65%]">
        <div className="bg-white w-full md:w-1/2 p-6 md:p-8 rounded-t-lg md:rounded-l-lg md:rounded-t-none shadow-lg">
          <form onSubmit={handleLogin} className='space-y-9'>
            <div className="mt-4">
              <label className="block text-gray-700 font-semibold mb-2">Email</label>
              <input
                required
                type="email"
                placeholder="example@gmail.com"
                value={userEmail}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-16 px-3 py-2 border rounded-md"
              />
            </div>

            <div className="mt-4 relative">
              <label className="block text-gray-700 font-semibold mb-2">Password</label>
              <input
                required
                placeholder='password'
                type={passwordVisibility ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-16 px-3 py-2 border rounded-md"
              />
              <img
                src={eye}
                className='absolute bottom-3 right-4 h-5 cursor-pointer'
                onClick={handlePasswordVisibility}
                alt="Toggle password visibility"
              />
            </div>

            {error && <p className="text-red-500">{error}</p>} 

            <button
              type="submit"
              className="bg-green-400 mt-4 h-16 text-white py-2 px-4 rounded hover:bg-emerald-500 transition w-full"
            >
              Submit
            </button>
          </form>
        </div>

        <div className="hidden md:block bg-green-400 w-full md:w-1/2 p-6 md:p-8 rounded-b-lg md:rounded-r-lg md:rounded-b-none shadow-lg">
          
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
