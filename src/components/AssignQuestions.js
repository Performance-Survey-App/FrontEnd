import React, { useState } from 'react';
import '../styles/AssignQuestions.css';

const sendEmail = (name, email) => {
  console.log(`Sending email to ${email} for ${name}`);
};

const AssignQuestions = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  const handleSubmit = () => {
    sendEmail(name, email);
    setIsAssignModalOpen(false);
  };

  return (
    <div className="assign-questions-container">
      <div className="assign-questions-header">
        <h2>Assign Questions</h2>
        <button 
          className="assign-questions-button"
          onClick={() => setIsAssignModalOpen(true)}
        >
          Assign Questions
        </button>
      </div>

      {isAssignModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h4>Assign Questions</h4>
            <input
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleSubmit}>Send Email</button>
            <button onClick={() => setIsAssignModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignQuestions;
