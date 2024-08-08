import React, { useState } from 'react';
// import { Document, Packer, Paragraph } from "docx";
// import { saveAs } from "file-saver";

const QuestionManagement = () => {
  const [departments, setDepartments] = useState([]);
  const [departmentQuestions, setDepartmentQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({ type: '', text: '', choices: [] });
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [questionType, setQuestionType] = useState('');

  const createQuestion = () => {
    setDepartmentQuestions([
      ...departmentQuestions,
      { id: Date.now(), department: selectedDepartment, ...newQuestion }
    ]);
    setNewQuestion({ type: '', text: '', choices: [] });
  };

  const updateQuestion = (id, newText) => {
    const updatedQuestions = departmentQuestions.map(question =>
      question.id === id ? { ...question, text: newText } : question
    );
    setDepartmentQuestions(updatedQuestions);
  };

  const deleteQuestion = id => {
    const filteredQuestions = departmentQuestions.filter(question => question.id !== id);
    setDepartmentQuestions(filteredQuestions);
  };

//   const saveQuestionsToWordFile = async () => {
//     const doc = new Document({
//       sections: [
//         {
//           properties: {},
//           children: departmentQuestions.map(question => {
//             const text = `${question.text} (${question.type})${question.type === 'MultipleChoice' ? ': ' + question.choices.join(', ') : ''}`;
//             return new Paragraph(text);
//           }),
//         },
//       ],
//     });

//     const blob = await Packer.toBlob(doc);
//     saveAs(blob, "questions.docx");
//   };

  return (
    <div>
      <h3>MANAGE DEPARTMENT QUESTIONS</h3>
      <div>
        <h4>DEPARTMENT QUESTIONS</h4>
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
                  onChange={(e) => setNewQuestion({ ...newQuestion, choices: ['Very Poor', 'Poor', 'Very Good', 'Excellent'] })}
                />
              </div>
            )}
            <button onClick={createQuestion}>Save Question</button>
          </div>
        )}
      </div>
      <div>
        <h4>VIEW QUESTIONS</h4>
        <select onChange={(e) => setSelectedDepartment(e.target.value)}>
          <option value="">Select Department</option>
          {departments.map(department => (
            <option key={department.id} value={department.id}>{department.name}</option>
          ))}
        </select>
        <ul>
          {departmentQuestions
            .filter(question => question.department === selectedDepartment)
            .map(question => (
              <li key={question.id}>
                {question.text} ({question.type})
                <button onClick={() => deleteQuestion(question.id)}>Delete</button>
              </li>
            ))}
        </ul>
        {/* <button onClick={saveQuestionsToWordFile}>Save Questions to Word</button> */}
      </div>
    </div>
  );
};

export default QuestionManagement;
