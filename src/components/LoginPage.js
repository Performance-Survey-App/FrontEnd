import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';


const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();

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
    <div className ='container'>
      <h2>LOGIN</h2>
      <form onSubmit={handleLogin} className = 'form'>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='inputss'
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className='inputs'
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='input'
        />
        <button className= 'B1'>SIGN IN</button>
      </form>
    </div>
  );
};

export default LoginPage;
