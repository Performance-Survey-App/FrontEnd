import React, { useState } from 'react';
import { CSVLink } from "react-csv";

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

  const clearResponses = () => {
    setResponses([]);
  };

  return (
    <div>
      <h3>VIEW RESPONSES</h3>
      <table>
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
      <button onClick={clearResponses} className='b6'>Clear Responses</button>
      <CSVLink data={responses} filename={"responses.csv"} className='link'>Save Report in Excel</CSVLink>
    </div>
  );
};

export default Responses;
