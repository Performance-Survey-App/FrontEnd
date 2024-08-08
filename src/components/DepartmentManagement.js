import React, { useState } from 'react';
import '../styles/DepartmentManagement.css';

const DepartmentManagement = () => {
  const [departments, setDepartments] = useState([]);
  const [newDepartment, setNewDepartment] = useState('');
  const [updateDepartment, setUpdateDepartment] = useState({ id: '', name: '' });
  const [isCreateDepartmentOpen, setIsCreateDepartmentOpen] = useState(false);
  const [isUpdateDepartmentOpen, setIsUpdateDepartmentOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const createDepartment = () => {
    setDepartments([...departments, { id: Date.now(), name: newDepartment }]);
    setNewDepartment('');
    setIsCreateDepartmentOpen(false);
  };

  const updateDepartmentDetails = () => {
    const updatedDepartments = departments.map(department =>
      department.id === updateDepartment.id ? { ...department, name: updateDepartment.name } : department
    );
    setDepartments(updatedDepartments);
    setUpdateDepartment({ id: '', name: '' });
    setIsUpdateDepartmentOpen(false);
  };

  const deleteDepartment = id => {
    const filteredDepartments = departments.filter(department => department.id !== id);
    setDepartments(filteredDepartments);
  };

  const filteredDepartments = departments.filter(department =>
    department.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="department-management-container">
      <div className="department-management-header">
        <h3>Departments</h3>
        <button 
          className="create-department-button"
          onClick={() => setIsCreateDepartmentOpen(true)}
        >
          Create Department
        </button>
      </div>

      {isCreateDepartmentOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h4>Create Department</h4>
            <input
              type="text"
              placeholder="Enter Department Name"
              value={newDepartment}
              onChange={(e) => setNewDepartment(e.target.value)}
            />
            <button onClick={createDepartment}>Save</button>
            <button onClick={() => setIsCreateDepartmentOpen(false)}>Cancel</button>
          </div>
        </div>
      )}

      {isUpdateDepartmentOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h4>Update Department</h4>
            <input
              type="text"
              placeholder="Department Name"
              value={updateDepartment.name}
              onChange={(e) => setUpdateDepartment({ ...updateDepartment, name: e.target.value })}
            />
            <button onClick={updateDepartmentDetails}>Save</button>
            <button onClick={() => setIsUpdateDepartmentOpen(false)}>Cancel</button>
            <button 
              className="delete" 
              onClick={() => deleteDepartment(updateDepartment.id)}
            >
              Delete
            </button>
          </div>
        </div>
      )}

      <input 
        className="search-bar"
        type="text" 
        placeholder="Search by name..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <ul className="department-list">
        {filteredDepartments.map(department => (
          <li key={department.id} className="department-list-item">
            <div className="department-info">
              <strong>{department.name}</strong>
            </div>
            <div className="department-actions">
              <button 
                className="update" 
                onClick={() => {
                  setUpdateDepartment(department);
                  setIsUpdateDepartmentOpen(true);
                }}
              >
                Update
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DepartmentManagement;
