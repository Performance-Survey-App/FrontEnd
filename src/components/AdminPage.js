// src/components/AdminPage.js
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import UserManagement from './UserManagement';
import DepartmentManagement from './DepartmentManagement';
import QuestionManagement from './QuestionManagement';
import AssignQuestions from './AssignQuestions';
import Responses from './Responses';
import '../styles/AdminPage.css';

const AdminPage = () => {
  return (
    <div className="admin-container">
      <Sidebar />
      <div className="content">
        <Routes>
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/department-management" element={<DepartmentManagement />} />
          <Route path="/question-management" element={<QuestionManagement />} />
          <Route path="/assign-questions" element={<AssignQuestions />} />
          <Route path="/responses" element={<Responses />} />
          <Route path="/" element={<div>
            <h1>Welcome to the Admin Dashboard</h1>
            {/* <h1>Peoples lifeeeeeeeeee</h1> */}
          </div>} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminPage;
