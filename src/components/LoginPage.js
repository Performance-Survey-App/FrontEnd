import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import eye from "../images/ph_eye.png"
const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisibility,setPasswordVisibilty] = useState(false);
  
  const navigate = useNavigate();
  
   const handlePassword = ()=> {
    setPasswordVisibilty(!passwordVisibility)
   }
  const handleLogin = (e) => { 
    e.preventDefault();

    if (username === 'admin' && password === 'adminpass' && email === 'admin@jubileelifeng.com') {
      navigate('/admin');
    } else if (username === 'user' && password === 'userpass' && email === 'user@jubileelifeng.com') {
      navigate('/user');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
   
    <div className="w-full h-screen bg-gradient-to-r from-emerald-300 to-blue-300 flex justify-center items-center px-5 md:px-10">
   
    <div className="flex flex-col md:flex-row w-full md:w-2/3 h-auto md:h-[65%]">
      
      
      <div className="bg-white w-full md:w-1/2 p-6 md:p-8 rounded-t-lg md:rounded-l-lg md:rounded-t-none shadow-lg">
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              required
              type="email"
              name="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Username</label>
            <input
              required
              placeholder='username'
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <input
              required
              placeholder='password'
              name="password"
              type={passwordVisibility ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
            <img
              src={eye}
              className='absolute bottom-3 right-4 h-5 cursor-pointer'
              onClick={handlePassword}
            />
          </div>
          <button
            type="submit"
            className="bg-green-400 text-white py-2 px-4 rounded hover:bg-emerald-500 transition w-full"
          >
            Submit
          </button>
        </form>
      </div>

      <div className=" hidden md:block bg-green-400 w-full md:w-1/2 p-6 md:p-8 rounded-b-lg md:rounded-r-lg md:rounded-b-none shadow-lg">
       
      </div>
    </div>
  </div>
  );
};

export default LoginPage;