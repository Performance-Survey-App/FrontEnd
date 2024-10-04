

import React, { useState, useEffect } from 'react';
import axios from 'axios';


const backend_URL = process.env.REACT_APP_BACKEND_BASE_URL;

const DepartmentPage = () => {
  const [departments, setDepartments] = useState([]);
  const [departmentName, setDepartmentName] = useState('');
  const [editingDepartment, setEditingDepartment] = useState(null); 
  const [showForm, setShowForm] = useState(false);
  const [showActions, setShowActions] = useState(null); 


  useEffect(() => {
    fetchDepartments();
}, []);

const fetchDepartments = async () => {
    try {
        const response = await axios.get(`${backend_URL}/getAllDepartment`);
        setDepartments(response.data);
    } catch (error) {
        console.error('Error fetching departments:', error);
    }
};

  

  const handleAddDepartment = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post(`${backend_URL}/CreateDepartment`, {
              departmentName
          });
          setDepartments([...departments, response.data]);
          setDepartmentName(''); // Clear form
          setShowForm(false); // Close form after adding
      } catch (error) {
          console.error('Error adding department:', error);
      }
  };

  // Update department handler
  const handleUpdateDepartment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${backend_URL}/updateDepartmentById/${editingDepartment}`, {
        departmentName
      });
      const updatedDepartments = departments.map(dept => 
        dept.id === editingDepartment ? response.data : dept
      );
      setDepartments(updatedDepartments);
      setEditingDepartment(null); // Reset editing
      setDepartmentName(''); // Clear form input
    } catch (error) {
      console.error('Error updating department:', error);
    }
  };

  // Delete department handler
  const handleDeleteDepartment = async (id) => {
    try {
      await axios.delete(`${backend_URL}/disableDepartmentById/${id}`);
      setDepartments(departments.filter(dept => dept.id !== id));
    } catch (error) {
      console.error('Error deleting department:', error);
    }
  };

  // Assign User to department (Placeholder)
  const handleAssignUser = (id) => {
    alert(`Assigning user to department: ${id}`);
  };

  // Toggle action dropdown
  const toggleActions = (index) => {
    setShowActions(showActions === index ? null : index);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Departments</h1>
        <button 
          className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Close Form' : 'Add Department'}
        </button>
      </div>

      {/* Department Form */}
      {showForm && (
        <form onSubmit={editingDepartment !== null ? handleUpdateDepartment : handleAddDepartment} className="mb-4">
          <div className="flex space-x-4">
            <input
              type="text"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              placeholder="Enter department name"
              className="w-full px-3 py-2 border rounded-md"
              required
            />
            <button 
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
              {editingDepartment !== null ? 'Update Department' : 'Add Department'}
            </button>
          </div>
        </form>
      )}

      {/* Department Table */}
      <table className="min-w-full bg-white border">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Department Name
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {departments.map((department, index) => (
            <tr key={department.id}>
              <td className="px-6 py-4 border-b border-gray-200 text-sm">
                {department.departmentName}
              </td>
              <td className="px-6 py-4 border-b border-gray-200 text-right text-sm">
                <button className="text-gray-500 hover:text-gray-700" onClick={() => toggleActions(index)}>
                  ...
                </button>
                {/* Action Dropdown */}
                {showActions === index && (
                  <div className="absolute bg-white border rounded shadow-lg p-2">
                    <button 
                      onClick={() => {
                        setEditingDepartment(department.id);
                        setDepartmentName(department.departmentName); // Prefill form
                        setShowForm(true);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200"
                    >
                      Update Department
                    </button>
                    <button 
                      onClick={() => handleDeleteDepartment(department.id)} 
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200"
                    >
                      Delete Department
                    </button>
                    <button 
                      onClick={() => handleAssignUser(department.id)} 
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200"
                    >
                      Assign User
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentPage;
