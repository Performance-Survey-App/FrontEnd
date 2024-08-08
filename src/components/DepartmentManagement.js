import React, { useState } from 'react';

const DepartmentManagement = () => {
  const [departments, setDepartments] = useState([]);
  const [newDepartment, setNewDepartment] = useState('');
  const [updateDepartment, setUpdateDepartment] = useState({ id: '', name: '' });

  const createDepartment = () => {
    setDepartments([...departments, { id: Date.now(), name: newDepartment }]);
    setNewDepartment('');
  };

  const updateDepartmentDetails = () => {
    const updatedDepartments = departments.map(department =>
      department.id === updateDepartment.id ? { ...department, name: updateDepartment.name } : department
    );
    setDepartments(updatedDepartments);
    setUpdateDepartment({ id: '', name: '' });
  };

  const deleteDepartment = id => {
    const filteredDepartments = departments.filter(department => department.id !== id);
    setDepartments(filteredDepartments);
  };

  return (
    <div>
      <h3>MANAGE DEPARTMENTS</h3>
      <div>
        <h4>CREATE DEPARTMENT</h4>
        <input
          type="text"
          placeholder="Enter Department Name"
          value={newDepartment}
          className='I5'
          onChange={(e) => setNewDepartment(e.target.value)}
        />
        <button className='b3' onClick={createDepartment}>Save</button>
      </div>
      <div>
        <h4>UPDATE DEPARTMENT</h4>
        <select onChange={(e) => setUpdateDepartment(departments.find(department => department.id === parseInt(e.target.value)) || { id: '', name: '' })}>
          <option value="">Select Department</option>
          {departments.map(department => (
            <option key={department.id} value={department.id}>{department.name}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Department Name"
          value={updateDepartment.name}
          className='I6'
          onChange={(e) => setUpdateDepartment({ ...updateDepartment, name: e.target.value })}
        />
        <button className='b4' onClick={updateDepartmentDetails}>Save</button>
        <button onClick={() => deleteDepartment(updateDepartment.id)} className='bDelete'>Delete</button>
      </div>
    </div>
  );
};

export default DepartmentManagement;
