import React, { useState } from 'react';
import '../styles/UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', birthday: '', department: '' });
  const [updateUser, setUpdateUser] = useState({ id: '', name: '', email: '', birthday: '', department: '' });
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
  const [isUpdateUserOpen, setIsUpdateUserOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const createUser = () => {
    setUsers([...users, { id: Date.now(), ...newUser }]);
    setNewUser({ name: '', email: '', birthday: '', department: '' });
    setIsCreateUserOpen(false);
  };

  const updateUserDetails = () => {
    const updatedUsers = users.map(user =>
      user.id === updateUser.id
        ? { ...user, name: updateUser.name, email: updateUser.email, birthday: updateUser.birthday, department: updateUser.department }
        : user
    );
    setUsers(updatedUsers);
    setUpdateUser({ id: '', name: '', email: '', birthday: '', department: '' });
    setIsUpdateUserOpen(false);
  };

  const deleteUser = id => {
    const filteredUsers = users.filter(user => user.id !== id);
    setUsers(filteredUsers);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="user-management-container">
      <div className="user-management-header">
        <h3>Users</h3>
        <button 
          className="create-user-button"
          onClick={() => setIsCreateUserOpen(true)}
        >
          Create User
        </button>
      </div>

      {isCreateUserOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h4>Create User</h4>
            <input
              type="text"
              placeholder="Enter Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <input
              type="date"
              placeholder="Enter Birthday"
              value={newUser.birthday}
              onChange={(e) => setNewUser({ ...newUser, birthday: e.target.value })}
            />
            <input
              type="email"
              placeholder="Enter Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
            <input
              type="text"
              placeholder="Enter Department"
              value={newUser.department}
              onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
            />
            <button onClick={createUser}>Save</button>
            <button onClick={() => setIsCreateUserOpen(false)}>Cancel</button>
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

      <ul className="user-list">
        {filteredUsers.map(user => (
          <li key={user.id} className="user-list-item">
            <div className="user-info">
              <strong>{user.name}</strong>
              <p>{user.department}</p>
            </div>
            <div className="user-actions">
              <button 
                className="update" 
                onClick={() => {
                  setUpdateUser(user);
                  setIsUpdateUserOpen(true);
                }}
              >
                Update
              </button>
              <button 
                className="delete" 
                onClick={() => deleteUser(user.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {isUpdateUserOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h4>Update User</h4>
            <input
              type="text"
              placeholder="Name"
              value={updateUser.name}
              onChange={(e) => setUpdateUser({ ...updateUser, name: e.target.value })}
            />
            <input
              type="date"
              placeholder="Birthday"
              value={updateUser.birthday}
              onChange={(e) => setUpdateUser({ ...updateUser, birthday: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              value={updateUser.email}
              onChange={(e) => setUpdateUser({ ...updateUser, email: e.target.value })}
            />
            <input
              type="text"
              placeholder="Department"
              value={updateUser.department}
              onChange={(e) => setUpdateUser({ ...updateUser, department: e.target.value })}
            />
            <button onClick={updateUserDetails}>Save</button>
            <button onClick={() => setIsUpdateUserOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
