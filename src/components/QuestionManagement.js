import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Modal,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5">Department Questions</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setIsCreateQuestionOpen(true)}
        >
          Create Question
        </Button>
      </Box>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search questions by text..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
        <InputLabel>Department</InputLabel>
        <Select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          label="Department"
        >
          <MenuItem value="">
            <em>Select Department</em>
          </MenuItem>
          {departments.map(department => (
            <MenuItem key={department.id} value={department.id}>
              {department.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <List>
        {filteredQuestions
          .filter(question => question.department === selectedDepartment)
          .map(question => (
            <ListItem key={question.id}>
              <ListItemText primary={question.text} secondary={`Type: ${question.type}`} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => {
                    setUpdateQuestionData(question);
                    setIsUpdateQuestionOpen(true);
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => deleteQuestion(question.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
      </List>

      <Modal
        open={isCreateQuestionOpen}
        onClose={() => setIsCreateQuestionOpen(false)}
        aria-labelledby="create-question-modal"
        aria-describedby="create-question-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: 400 },
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" id="create-question-modal">Create Question</Typography>
          <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
            <InputLabel>Department</InputLabel>
            <Select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              label="Department"
            >
              {departments.map(department => (
                <MenuItem key={department.id} value={department.id}>
                  {department.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
            <InputLabel>Question Type</InputLabel>
            <Select
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value)}
              label="Question Type"
            >
              <MenuItem value="Text">Text Question</MenuItem>
              <MenuItem value="MultipleChoice">Multiple Choice</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Enter Question"
            value={newQuestion.text}
            onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value, type: questionType })}
            sx={{ mb: 2 }}
          />
          {questionType === 'MultipleChoice' && (
            <Box sx={{ mb: 2 }}>
              <Typography>Choices: Very Poor, Poor, Very Good, Excellent</Typography>
            </Box>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" color="primary" onClick={createQuestion}>Save Question</Button>
            <Button variant="outlined" color="secondary" onClick={() => setIsCreateQuestionOpen(false)}>Cancel</Button>
          </Box>
        </Box>
      </Modal>

      <Modal
        open={isUpdateQuestionOpen}
        onClose={() => setIsUpdateQuestionOpen(false)}
        aria-labelledby="update-question-modal"
        aria-describedby="update-question-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: 400 },
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" id="update-question-modal">Update Question</Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Update Question"
            value={updateQuestionData.text}
            onChange={(e) => setUpdateQuestionData({ ...updateQuestionData, text: e.target.value })}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" color="primary" onClick={updateQuestionDetails}>Save Changes</Button>
            <Button variant="outlined" color="secondary" onClick={() => setIsUpdateQuestionOpen(false)}>Cancel</Button>
            <Button variant="contained" color="error" onClick={() => deleteQuestion(updateQuestionData.id)}>Delete</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default QuestionManagement;
