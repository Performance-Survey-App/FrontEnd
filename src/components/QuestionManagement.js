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
  ListItemSecondaryAction,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const QuestionnaireManagement = () => {
  const [departments, setDepartments] = useState([]);
  const [users, setUsers] = useState([]);
  const [questionnaires, setQuestionnaires] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({ type: '', text: '', choices: [] });
  const [newQuestionnaire, setNewQuestionnaire] = useState({ title: '', description: '', department: '', user: '' });
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [questionType, setQuestionType] = useState('');
  const [isCreateQuestionOpen, setIsCreateQuestionOpen] = useState(false);
  const [isUpdateQuestionOpen, setIsUpdateQuestionOpen] = useState(false);
  const [isViewQuestionnaireOpen, setIsViewQuestionnaireOpen] = useState(false);
  const [isEditQuestionnaireOpen, setIsEditQuestionnaireOpen] = useState(false);
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState(null);
  const [updateQuestionData, setUpdateQuestionData] = useState({ id: '', text: '', type: '', choices: [] });
  const [editQuestionnaireData, setEditQuestionnaireData] = useState({ id: '', title: '', description: '', department: '', user: '', questions: [] });
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteType, setDeleteType] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' or 'error'

  const addQuestion = () => {
    setQuestions([...questions, { id: Date.now(), ...newQuestion }]);
    setNewQuestion({ type: '', text: '', choices: [] });
    setIsCreateQuestionOpen(false);
    showSnackbar('Question added successfully!');
  };

  const updateQuestionDetails = () => {
    const updatedQuestions = questions.map(question =>
      question.id === updateQuestionData.id ? { ...question, text: updateQuestionData.text, type: updateQuestionData.type, choices: updateQuestionData.choices } : question
    );
    setQuestions(updatedQuestions);
    setUpdateQuestionData({ id: '', text: '', type: '', choices: [] });
    setIsUpdateQuestionOpen(false);
    showSnackbar('Question updated successfully!');
  };

  const handleDelete = () => {
    if (deleteType === 'questionnaire') {
      const filteredQuestionnaires = questionnaires.filter(q => q.id !== itemToDelete);
      setQuestionnaires(filteredQuestionnaires);
      showSnackbar('Questionnaire deleted successfully!');
    } else if (deleteType === 'question') {
      const filteredQuestions = questions.filter(question => question.id !== itemToDelete);
      setQuestions(filteredQuestions);
      showSnackbar('Question deleted successfully!');
    }
    setIsDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  const confirmDelete = (id, type) => {
    setItemToDelete(id);
    setDeleteType(type);
    setIsDeleteDialogOpen(true);
  };

  const createQuestionnaire = () => {
    setQuestionnaires([...questionnaires, { id: Date.now(), ...newQuestionnaire, questions }]);
    setNewQuestionnaire({ title: '', description: '', department: '', user: '' });
    setQuestions([]);
    showSnackbar('Questionnaire created successfully!');
  };

  const openQuestionnaire = (questionnaire) => {
    setSelectedQuestionnaire(questionnaire);
    setIsViewQuestionnaireOpen(true);
  };

  const openEditQuestionnaire = (questionnaire) => {
    setEditQuestionnaireData({ ...questionnaire });
    setQuestions(questionnaire.questions);
    setIsEditQuestionnaireOpen(true);
  };

  const updateQuestionnaire = () => {
    const updatedQuestionnaires = questionnaires.map(q =>
      q.id === editQuestionnaireData.id ? { ...editQuestionnaireData, questions } : q
    );
    setQuestionnaires(updatedQuestionnaires);
    setIsEditQuestionnaireOpen(false);
    setQuestions([]);
    showSnackbar('Questionnaire updated successfully!');
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleQuestionTypeChange = (e) => {
    const value = e.target.value;
    if (isCreateQuestionOpen) {
      setNewQuestion({ ...newQuestion, type: value });
    } else {
      setUpdateQuestionData({ ...updateQuestionData, type: value });
    }
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Typography variant="h5">Questionnaire Management</Typography>

      {/* Questionnaire Creation Form */}
      <Box sx={{ mt: 3, mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          label="Questionnaire Title"
          value={newQuestionnaire.title}
          onChange={(e) => setNewQuestionnaire({ ...newQuestionnaire, title: e.target.value })}
          sx={{ mb: 2 }}
        />
{/* 
        <TextField
          fullWidth
          variant="outlined"
          label="Description"
          multiline
          rows={3}
          value={newQuestionnaire.description}
          onChange={(e) => setNewQuestionnaire({ ...newQuestionnaire, description: e.target.value })}
          sx={{ mb: 2 }}
        /> */}

        <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
          <InputLabel>Department</InputLabel>
          <Select
            value={selectedDepartment}
            onChange={(e) => {
              setSelectedDepartment(e.target.value);
              setNewQuestionnaire({ ...newQuestionnaire, department: e.target.value });
            }}
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

        {/* <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
          <InputLabel>User</InputLabel>
          <Select
            value={selectedUser}
            onChange={(e) => {
              setSelectedUser(e.target.value);
              setNewQuestionnaire({ ...newQuestionnaire, user: e.target.value });
            }}
            label="User"
          >
            <MenuItem value="">
              <em>Select User</em>
            </MenuItem>
            {users.map(user => (
              <MenuItem key={user.id} value={user.id}>
                {user.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}

        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setIsCreateQuestionOpen(true)}
          sx={{ mb: 2, mr: 2,}}
        >
          Add Question
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={createQuestionnaire}
          sx={{ mb: 2 }}
        >
          Save Questionnaire
        </Button>
      </Box>

      {/* List of Created Questionnaires */}
      <Typography variant="h6" sx={{ mb: 2 }}>Saved Questionnaires</Typography>
      <List>
        {questionnaires.map((questionnaire) => (
          <ListItem key={questionnaire.id} button onClick={() => openQuestionnaire(questionnaire)}>
            <ListItemText primary={questionnaire.title} secondary={questionnaire.description} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => openEditQuestionnaire(questionnaire)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => confirmDelete(questionnaire.id, 'questionnaire')}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      {/* Modal for Viewing a Questionnaire */}
      <Modal
        open={isViewQuestionnaireOpen}
        onClose={() => setIsViewQuestionnaireOpen(false)}
        aria-labelledby="view-questionnaire-modal"
        aria-describedby="view-questionnaire-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: '60%', md: '50%' },
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            {selectedQuestionnaire?.title}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {selectedQuestionnaire?.description}
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="subtitle1" gutterBottom>
            Questions
          </Typography>
          <List>
            {selectedQuestionnaire?.questions.map((question) => (
              <ListItem key={question.id}>
                <ListItemText primary={question.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Modal>

      {/* Modal for Creating a New Question */}
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
            width: { xs: '90%', sm: '60%', md: '50%' },
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Create New Question
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            label="Question Text"
            value={newQuestion.text}
            onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
            <InputLabel>Type</InputLabel>
            <Select
              value={newQuestion.type}
              onChange={handleQuestionTypeChange}
              label="Type"
            >
              <MenuItem value="">
                <em>Select Type</em>
              </MenuItem>
              <MenuItem value="multiple-choice">Multiple Choice</MenuItem>
              <MenuItem value="text">Text</MenuItem>
            </Select>
          </FormControl>
          {newQuestion.type === 'multiple-choice' && (
  <Box sx={{ mb: 2 }}>
    <Typography variant="subtitle1">Choices</Typography>
    <List>
      {newQuestion.choices.map((choice, index) => (
        <ListItem key={index} sx={{ pl: 0 }}>
          <TextField
            fullWidth
            variant="outlined"
            value={choice}
            onChange={(e) => {
              const updatedChoices = [...newQuestion.choices];
              updatedChoices[index] = e.target.value;
              setNewQuestion({ ...newQuestion, choices: updatedChoices });
            }}
            sx={{ mr: 2 }}
          />
          <IconButton
            edge="end"
            color="error"
            onClick={() => {
              const updatedChoices = newQuestion.choices.filter((_, i) => i !== index);
              setNewQuestion({ ...newQuestion, choices: updatedChoices });
            }}
          >
            <DeleteIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
    <Button
      variant="outlined"
      onClick={() => setNewQuestion({ ...newQuestion, choices: [...newQuestion.choices, ''] })}
    >
      Add Choice
    </Button>
  </Box>
)}

          <Button
            variant="contained"
            color="primary"
            onClick={addQuestion}
          >
            Add Question
          </Button>
        </Box>
      </Modal>

      {/* Modal for Editing a Question */}
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
            width: { xs: '90%', sm: '60%', md: '50%' },
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Update Question
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            label="Question Text"
            value={updateQuestionData.text}
            onChange={(e) => setUpdateQuestionData({ ...updateQuestionData, text: e.target.value })}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
            <InputLabel>Type</InputLabel>
            <Select
              value={updateQuestionData.type}
              onChange={handleQuestionTypeChange}
              label="Type"
            >
              <MenuItem value="">
                <em>Select Type</em>
              </MenuItem>
              <MenuItem value="multiple-choice">Multiple Choice</MenuItem>
              <MenuItem value="text">Text</MenuItem>
            </Select>
          </FormControl>
          {updateQuestionData.type === 'multiple-choice' && (
            <TextField
              fullWidth
              variant="outlined"
              label="Choices (comma separated)"
              value={updateQuestionData.choices.join(', ')}
              onChange={(e) => setUpdateQuestionData({ ...updateQuestionData, choices: e.target.value.split(',').map(choice => choice.trim()) })}
              sx={{ mb: 2 }}
            />
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={updateQuestionDetails}
          >
            Update Question
          </Button>
        </Box>
      </Modal>

      {/* Modal for Editing a Questionnaire */}
      <Modal
        open={isEditQuestionnaireOpen}
        onClose={() => setIsEditQuestionnaireOpen(false)}
        aria-labelledby="edit-questionnaire-modal"
        aria-describedby="edit-questionnaire-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: '60%', md: '50%' },
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Edit Questionnaire
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            label="Title"
            value={editQuestionnaireData.title}
            onChange={(e) => setEditQuestionnaireData({ ...editQuestionnaireData, title: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Description"
            multiline
            rows={3}
            value={editQuestionnaireData.description}
            onChange={(e) => setEditQuestionnaireData({ ...editQuestionnaireData, description: e.target.value })}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
            <InputLabel>Department</InputLabel>
            <Select
              value={editQuestionnaireData.department}
              onChange={(e) => setEditQuestionnaireData({ ...editQuestionnaireData, department: e.target.value })}
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
          {/* <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
            <InputLabel>User</InputLabel>
            <Select
              value={editQuestionnaireData.user}
              onChange={(e) => setEditQuestionnaireData({ ...editQuestionnaireData, user: e.target.value })}
              label="User"
            >
              <MenuItem value="">
                <em>Select User</em>
              </MenuItem>
              {users.map(user => (
                <MenuItem key={user.id} value={user.id}>
                  {user.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}
          <Button
            variant="contained"
            color="primary"
            onClick={updateQuestionnaire}
          >
            Update Questionnaire
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => setIsCreateQuestionOpen(true)}
            sx={{ ml: 2 }}
          >
            Add Question
          </Button>
        </Box>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this {deleteType}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default QuestionnaireManagement;
