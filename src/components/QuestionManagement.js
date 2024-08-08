import React, { useState } from 'react';
import '../styles/QuestionManagement.css';

const QuestionManagement = () => {
  const [departments, setDepartments] = useState([]);
  const [departmentQuestions, setDepartmentQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({ type: '', text: '', choices: [] });
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [questionType, setQuestionType] = useState('');
  const [isCreateQuestionOpen, setIsCreateQuestionOpen] = useState(false);
  const [isUpdateQuestionOpen, setIsUpdateQuestionOpen] = useState(false);
  const [updateQuestionData, setUpdateQuestionData] = useState({ id: '', text: '', type: '', choices: [] });
  const [searchTerm, setSearchTerm] = useState('');

  const createQuestion = () => {
    setDepartmentQuestions([
      ...departmentQuestions,
      { id: Date.now(), department: selectedDepartment, ...newQuestion }
    ]);
    setNewQuestion({ type: '', text: '', choices: [] });
    setIsCreateQuestionOpen(false);
  };

  const updateQuestionDetails = () => {
    const updatedQuestions = departmentQuestions.map(question =>
      question.id === updateQuestionData.id ? { ...question, text: updateQuestionData.text, type: updateQuestionData.type, choices: updateQuestionData.choices } : question
    );
    setDepartmentQuestions(updatedQuestions);
    setUpdateQuestionData({ id: '', text: '', type: '', choices: [] });
    setIsUpdateQuestionOpen(false);
  };

  const deleteQuestion = id => {
    const filteredQuestions = departmentQuestions.filter(question => question.id !== id);
    setDepartmentQuestions(filteredQuestions);
  };

  const filteredQuestions = departmentQuestions.filter(question =>
    question.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="question-management-container">
      <div className="question-management-header">
        <h3>Department Questions</h3>
        <button 
          className="create-question-button"
          onClick={() => setIsCreateQuestionOpen(true)}
        >
          Create Question
        </button>
      </div>

      {isCreateQuestionOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h4>Create Question</h4>
            <select onChange={(e) => setSelectedDepartment(e.target.value)}>
              <option value="">Select Department</option>
              {departments.map(department => (
                <option key={department.id} value={department.id}>{department.name}</option>
              ))}
            </select>
            <select onChange={(e) => setQuestionType(e.target.value)}>
              <option value="Text">Text Question</option>
              <option value="MultipleChoice">Multiple Choice</option>
            </select>
            {questionType && (
              <div>
                <input
                  type="text"
                  placeholder="Enter Question"
                  value={newQuestion.text}
                  onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value, type: questionType })}
                />
                {questionType === 'MultipleChoice' && (
                  <div>
                    <p>Choices: Very Poor, Poor, Very Good, Excellent</p>
                    <input
                      type="hidden"
                      value={['Very Poor', 'Poor', 'Very Good', 'Excellent']}
                      onChange={() => setNewQuestion({ ...newQuestion, choices: ['Very Poor', 'Poor', 'Very Good', 'Excellent'] })}
                    />
                  </div>
                )}
                <button onClick={createQuestion}>Save Question</button>
                <button onClick={() => setIsCreateQuestionOpen(false)}>Cancel</button>
              </div>
            )}
          </div>
        </div>
      )}

      {isUpdateQuestionOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h4>Update Question</h4>
            <input
              type="text"
              placeholder="Update Question"
              value={updateQuestionData.text}
              onChange={(e) => setUpdateQuestionData({ ...updateQuestionData, text: e.target.value })}
            />
            <button onClick={updateQuestionDetails}>Save Changes</button>
            <button onClick={() => setIsUpdateQuestionOpen(false)}>Cancel</button>
            <button onClick={() => deleteQuestion(updateQuestionData.id)}>Delete</button>
          </div>
        </div>
      )}

      <input 
        className="search-bar"
        type="text" 
        placeholder="Search questions by text..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <ul className="question-list">
        {filteredQuestions
          .filter(question => question.department === selectedDepartment)
          .map(question => (
            <li key={question.id} className="question-list-item">
              <div className="question-info">
                <strong>{question.text}</strong> ({question.type})
              </div>
              <div className="question-actions">
                <button 
                  className="update" 
                  onClick={() => {
                    setUpdateQuestionData(question);
                    setIsUpdateQuestionOpen(true);
                  }}
                >
                  Update
                </button>
                <button 
                  className="delete" 
                  onClick={() => deleteQuestion(question.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default QuestionManagement;
