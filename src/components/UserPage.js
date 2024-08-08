import React, { useState, useEffect } from 'react';

// Mock function to simulate sending email
const sendEmail = (email, message) => {
  console.log(`Sending email to ${email} with message: ${message}`);
};

const UserPage = () => {
  const [pendingQuestions, setPendingQuestions] = useState([
    { id: 1, text: 'Question 1' },
    { id: 2, text: 'Question 2' },
    { id: 3, text: 'Question 3' }
  ]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [answer, setAnswer] = useState('');
  const [adminEmail, setAdminEmail] = useState('admin@example.com');

  const handleSubmit = () => {
    setAnswers([...answers, { questionId: pendingQuestions[currentQuestion].id, answer }]);
    setAnswer('');
    if (currentQuestion < pendingQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setPendingQuestions([]);
      sendEmail(adminEmail, 'User has completed the questionnaire.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Questionnaire Page</h2>
      {pendingQuestions.length > 0 ? (
        <div>
          <h3>You have pending questions:</h3>
          <div>
            <h4>{pendingQuestions[currentQuestion].text}</h4>
            <input
              type="text"
              placeholder="Your Answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <button onClick={handleSubmit}>Submit</button>
          </div>
          {currentQuestion < pendingQuestions.length - 1 && (
            <div>
              <button onClick={() => setCurrentQuestion(currentQuestion + 1)}>Answer Next Question</button>
            </div>
          )}
        </div>
      ) : (
        <h3>No Pending Questions</h3>
      )}
    </div>
  );
};

export default UserPage;

 

