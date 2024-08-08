import React, { useState } from 'react';
import { CSVLink } from "react-csv";
import '../styles/Responses.css';

const Responses = () => {
  const [responses, setResponses] = useState([
    {
      id: 1,
      department: 'Department 1',
      multipleChoiceScore: 80,
      textResponse: 'Good',
      totalScore: 85,
      userAssignedTo: 'User 1'
    },
    // Add more response objects as needed
  ]);
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);

  const clearResponses = () => {
    setResponses([]);
    setIsClearModalOpen(false);
  };

  return (
    <div className="responses-container">
      <h3>VIEW RESPONSES</h3>
      {responses.length > 0 ? (
        <table className="responses-table">
          <thead>
            <tr>
              <th>DEPARTMENT</th>
              <th>MULTIPLE CHOICE SCORE</th>
              <th>TEXT RESPONSE</th>
              <th>TOTAL SCORE</th>
              <th>USER ASSIGNED TO</th>
            </tr>
          </thead>
          <tbody>
            {responses.map(response => (
              <tr key={response.id}>
                <td>{response.department}</td>
                <td>{response.multipleChoiceScore}</td>
                <td>{response.textResponse}</td>
                <td>{response.totalScore}</td>
                <td>{response.userAssignedTo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No responses available.</p>
      )}

      <div className="responses-actions">
        <button 
          onClick={() => setIsClearModalOpen(true)} 
          className="clear-responses-button"
        >
          Clear Responses
        </button>
        <CSVLink 
          data={responses} 
          filename={"responses.csv"} 
          className="save-report-link"
        >
          Save Report in Excel
        </CSVLink>
      </div>

      {isClearModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h4>Are you sure you want to clear all responses?</h4>
            <button onClick={clearResponses} className="confirm-button">Yes, Clear</button>
            <button onClick={() => setIsClearModalOpen(false)} className="cancel-button">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Responses;
