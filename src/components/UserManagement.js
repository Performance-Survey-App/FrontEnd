import React, { useState } from 'react';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [updateUser, setUpdateUser] = useState({ id: '', name: '', email: '' });

  const createUser = () => {
    setUsers([...users, { id: Date.now(), ...newUser }]);
    setNewUser({ name: '', email: '' });
  };

  const updateUserDetails = () => {
    const updatedUsers = users.map(user =>
      user.id === updateUser.id ? { ...user, name: updateUser.name, email: updateUser.email } : user
    );
    setUsers(updatedUsers);
    setUpdateUser({ id: '', name: '', email: '' });
  };

  const deleteUser = id => {
    const filteredUsers = users.filter(user => user.id !== id);
    setUsers(filteredUsers);
  };

  return (
    <div>
      <h3>MANAGE USERS</h3>
      <div className='class1'>
        <h4>CREATE USER</h4>
        <input
          type="text"
          placeholder="Enter Name"
          value={newUser.name}
          className='I1'
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Enter Email"
          value={newUser.email}
          className='I2'
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <button onClick={createUser} className='b1'>Save</button>
      </div>
      <div>
        <h4>UPDATE USER</h4>
        <select id='dropdown' onChange={(e) => setUpdateUser(users.find(user => user.id === parseInt(e.target.value)) || { id: '', name: '', email: '' })}>
          <option value="" className='O1'>Select User</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Name"
          value={updateUser.name}
          className='I3'
          onChange={(e) => setUpdateUser({ ...updateUser, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={updateUser.email}
          className='I4'
          onChange={(e) => setUpdateUser({ ...updateUser, email: e.target.value })}
        />
        <button onClick={updateUserDetails} className='b2'>Save</button>
      </div>
      <div>
        <h4>DELETE USER</h4>
        <select onChange={(e) => setUpdateUser(users.find(user => user.id === parseInt(e.target.value)) || { id: '', name: '', email: '' })}>
          <option value="" className='O2'>Select User</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>
        <button onClick={() => deleteUser(updateUser.id)} className='b4'>Delete</button>
      </div>
    </div>
  );
};

export default UserManagement;
