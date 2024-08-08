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
            <NavLink to="/admin" activeClassName="active">Home</NavLink>
          </li>
          <li>
            <NavLink to="./user-management" activeClassName="active">Manage User</NavLink>
          </li>
          <li>
            <NavLink to="./department-management" activeClassName="active">Manage Department</NavLink>
          </li>
          <li>
            <NavLink to="./question-management" activeClassName="active">Manage Questions</NavLink>
          </li>
          <li>
            <NavLink to="./assign-questions" activeClassName="active">Assign Questions</NavLink>
          </li>
          <li>
            <NavLink to="./responses" activeClassName="active">Response</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
