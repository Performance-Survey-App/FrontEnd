import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className='logo'></div>
      <nav>
        <ul>
          <li>
            <i class="fa fa-home" aria-hidden="true"></i>
            <NavLink to="/admin" activeClassName="active">Home</NavLink>
          </li>
          <li>
            <NavLink to="./user-management" activeClassName="active">User Management</NavLink>
          </li>
          <li>
            <NavLink to="./department-management" activeClassName="active">Department Management</NavLink>
          </li>
          <li>
            <NavLink to="./question-management" activeClassName="active">Question Management</NavLink>
          </li>
          <li>
            <NavLink to="./assign-questions" activeClassName="active">Assign Questions</NavLink>
          </li>
          <li>
            <NavLink to="./responses" activeClassName="active">Responses</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
