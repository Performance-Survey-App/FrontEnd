// src/components/AssignQuestions.js

import React, { useState } from 'react';

const sendEmail = (email, password) => {
  console.log(`Sending email to ${email} with password ${password}`);
};

const AssignQuestions = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    sendEmail(email, password);
  };

  return (
    <div>
      <h2>Assign Questions</h2>
      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit}>Send Email</button>
    </div>
  );
};

export default AssignQuestions;
