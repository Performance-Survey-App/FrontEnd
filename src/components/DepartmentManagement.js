
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const backend_URL = process.env.REACT_APP_BACKEND_BASE_URL;

const DepartmentPage = () => {
  const [departments, setDepartments] = useState([]);
  const [departmentName, setDepartmentName] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [authToken, setAuthToken] = useState('');

  
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

  
  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    setAuthToken(token);
  }, []);


  const handleAddDepartment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${backend_URL}/CreateDepartment`,
        { departmentName },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      setDepartments([...departments, response.data]);
      setDepartmentName('');
      setShowForm(false);
    } catch (error) {
      console.error('Error adding department:', error);
    }
  };

 
  const handleUpdateDepartment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${backend_URL}/updateDepartmentById`,  
        { departmentName },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );

      const updatedDepartments = departments.map((dept) =>
        dept.id === response.data.id ? response.data : dept
      );
      setDepartments(updatedDepartments);
      setDepartmentName('');
      setShowForm(false);
      setEditingDepartment(null);
    } catch (error) {
      console.error('Error updating department:', error);
    }
  };

 
  const handleDeleteDepartment = async () => {
    if (!selectedDepartment) return;
    try {
      await axios.delete(
        `${backend_URL}/disableDepartmentById/${selectedDepartment.id}`, 
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      setDepartments(departments.filter(dept => dept.id !== selectedDepartment.id));
      setShowModal(false);
      setSelectedDepartment(null);
    } catch (error) {
      console.error('Error deleting department:', error);
    }
  };

 
  const startEditingDepartment = (department) => {
    setEditingDepartment(department);
    setDepartmentName(department.departmentName);
    setShowForm(true);  
    setShowModal(false); 
  };

  
  const openModal = (department) => {
    setSelectedDepartment(department);
    setShowModal(true);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Department Management</h1>

      {showForm && (
        <form className="bg-white p-6 rounded-lg shadow-md space-y-4" onSubmit={editingDepartment ? handleUpdateDepartment : handleAddDepartment}>
          <h2 className="text-2xl font-semibold">{editingDepartment ? 'Edit Department' : 'Add Department'}</h2>
          <input
            type="text"
            placeholder="Department Name"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <div className="flex justify-between">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
              {editingDepartment ? 'Update Department' : 'Add Department'}
            </button>
            <button type="button" className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors" onClick={() => setShowForm(false)}>
              Cancel
            </button>
          </div>
        </form>
      )}

      <ul className="mt-6 space-y-4">
        {departments.map((department) => (
          <li key={department.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
            <span className="text-lg font-medium">{department.departmentName}</span>
            <button className="text-2xl font-bold" onClick={() => openModal(department)}>
              ...
            </button>
          </li>
        ))}
      </ul>

      <button className="w-full mt-6 bg-green-500 text-white py-3 rounded-lg text-center hover:bg-green-600 transition-colors" onClick={() => { setShowForm(true); setEditingDepartment(null); }}>
        Add Department
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Actions for {selectedDepartment.departmentName}</h2>
            <button onClick={() => startEditingDepartment(selectedDepartment)} className="w-full bg-blue-500 text-white py-2 rounded-lg mb-3 hover:bg-blue-600 transition-colors">
              Edit
            </button>
            <button onClick={handleDeleteDepartment} className="w-full bg-red-500 text-white py-2 rounded-lg mb-3 hover:bg-red-600 transition-colors">
              Delete
            </button>
            <button className="w-full bg-gray-400 text-black py-2 rounded-lg hover:bg-gray-500 transition-colors" onClick={() => setShowModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentPage;
