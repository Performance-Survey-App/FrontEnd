import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import eye from "../images/ph_eye.png";
import AuthService from '../services/auth.service';
import logo from "../images/logo.jpg";
import background from '../images/loginimage.jpeg';


const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
const authService=new  AuthService()
  const navigate = useNavigate();

  const handlePasswordVisibilityToggle = () => {
    setPasswordVisibility(prev => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    setLoading(true)
    e.preventDefault();
    setErrorMessage(''); // Clear any previous error messages
    const payload=  {
      userEmail: credentials.email, // use credentials.email
      password: credentials.password, // use credentials.password
    }
authService.login(payload).then((res)=>{
  console.log('Response:', res.data);
  if (res.status === 200) {
    setLoading(false)
    console.log('Login successful:', res.data);
    localStorage.setItem('accessToken',res.data.token)
    navigate('/admin'); // Navigate on successful login
  }
}).catch( (error)=> {
  setLoading(false)
  if (error.response) {
    console.error('Error Status:', error.response.status);
    console.error('Error Data:', error.response.data);
    if (error.response.status === 401) {
      setErrorMessage('Invalid email or password');
    } else {
      setErrorMessage(error.response.data.message || 'An error occurred');
    }
  } else {
    console.error('Error:', error.message);
    setErrorMessage('Network error, please try again');
  }
})
    
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100" style={{background: `linear-gradient(60deg, #F3F4F6, #F0FDF4)`}}>

  <div className="flex flex-col md:flex-row w-full md:w-2/3 lg:w-1/2 bg-white rounded-lg shadow-lg overflow-hidden">
    {/* Left side with the image and text */}
    <div className="flex flex-col items-center justify-center w-full md:w-1/2 p-6 bg-cover bg-center"
         style={{ backgroundImage: ` url(${background})` }}>
      <h2 className="text-white font-bold text-xl mb-4">Performance Survey</h2>
    </div>

    {/* Right side with the login form and logo */}
    <div className="flex flex-col items-center justify-center w-full md:w-1/2 p-6">
      <img
        src={logo}
        alt="Logo"
        className="w-20 h-20 mb-4 object-contain"
      />
      {/* Form section */}
      <form onSubmit={handleLogin} className="w-full">
        {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Email</label>
          <input
            required
            type="email"
            name="email"
            placeholder="example@gmail.com"
            value={credentials.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4 relative">
          <label className="block text-gray-700 font-semibold mb-2">Password</label>
          <input
            required
            placeholder="password"
            name="password"
            type={passwordVisibility ? "text" : "password"}
            value={credentials.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
          <img
            src={eye}
            alt="Toggle Password Visibility"
            className="absolute bottom-3 right-4 h-5 cursor-pointer"
            onClick={handlePasswordVisibilityToggle}
          />
        </div>
        {loading ? (
          <button
          className={`p-2 font-bold bg-[#C1C8D2] text-[#556070] cursor-not-allowed flex gap-2 justify-center items-center w-full rounded transition`}
          disabled={true}
        >
          <span>Loading</span>
          <div className="w-4 h-4 border-4 border-[#556070] border-dotted rounded-full animate-spin mr-4"></div>
        </button>

        ) : ( <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-emerald-600 transition w-full"
        >
          Submit
        </button>)}
       
      </form>
    </div>
  </div>
</div>


  );
};

export default LoginPage;



