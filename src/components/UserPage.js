import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  Alert
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';

// Mock function to simulate sending responses to the database
const sendResponsesToDatabase = (responses) => {
  console.log('Responses sent to database:', responses);
};

const UserPage = () => {
  const [pendingQuestionnaires, setPendingQuestionnaires] = useState([
    {
      id: 1,
      title: 'Questionnaire 1',
      questions: [
        { id: 1, text: 'Question 1' },
        { id: 2, text: 'Question 2' },
      ],
    },
    {
      id: 2,
      title: 'Questionnaire 2',
      questions: [
        { id: 3, text: 'Question 3' },
        { id: 4, text: 'Question 4' },
      ],
    },
  ]);

  const [currentQuestionnaireIndex, setCurrentQuestionnaireIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [answer, setAnswer] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleSettingsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    navigate('/login'); // Redirect to login page
    handleMenuClose();
  };

  const handleChangePassword = () => {
    navigate('/change-password'); // Redirect to change password page
    handleMenuClose();
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmitAnswer = () => {
    const currentQuestionnaire = pendingQuestionnaires[currentQuestionnaireIndex];
    const currentQuestion = currentQuestionnaire.questions[currentQuestionIndex];
    const newResponses = [
      ...responses,
      { questionnaireId: currentQuestionnaire.id, questionId: currentQuestion.id, answer },
    ];
    setResponses(newResponses);
    setAnswer('');
    setSnackbarMessage('Answer submitted');
    setSnackbarOpen(true);

    if (currentQuestionIndex < currentQuestionnaire.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentQuestionnaireIndex < pendingQuestionnaires.length - 1) {
      setCurrentQuestionnaireIndex(currentQuestionnaireIndex + 1);
      setCurrentQuestionIndex(0);
    } else {
      setPendingQuestionnaires([]);
      sendResponsesToDatabase(newResponses);
      setSnackbarMessage('All questionnaires completed and responses sent.');
      setSnackbarOpen(true);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5, position: 'relative' }}>
      <IconButton
        aria-controls={open ? 'settings-menu' : undefined}
        aria-haspopup="true"
        onClick={handleSettingsClick}
        color="inherit"
        sx={{ position: 'absolute', top: 0, right: 0 }}
      >
        <SettingsIcon />
      </IconButton>
      <Menu
        id="settings-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleChangePassword}>Change Password</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>

      {pendingQuestionnaires.length > 0 ? (
        <Box>
          <Typography variant="h5" gutterBottom>
            {pendingQuestionnaires[currentQuestionnaireIndex].title}
          </Typography>
          <Typography variant="h6" gutterBottom>
            {pendingQuestionnaires[currentQuestionnaireIndex].questions[currentQuestionIndex].text}
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Your Answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitAnswer}
            sx={{ mb: 2 }}
          >
            Submit Answer
          </Button>
        </Box>
      ) : (
        <Typography variant="h6">
          No Pending Questionnaires
        </Typography>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UserPage;
