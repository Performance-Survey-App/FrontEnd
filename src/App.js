import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import LoginPage from './components/LoginPage';
import AdminPage from './components/AdminPage';
import UserPage from './components/UserPage';
// Import any other components if needed

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route for the AdminPage and its sub-routes */}
        <Route path="/admin/*" element={<AdminPage />} />
        
        {/* Route for the LoginPage */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Route for the UserPage */}
        <Route path="/user" element={<UserPage />} />
        
        {/* Default route */}
        <Route path="/" element={<Navigate to="/login" />} />
        {/* Handle unmatched routes */}
        <Route path="*" element={<h1>404 Page Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
