import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Button, IconButton, Menu, MenuItem } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';

// Mock function to simulate sending email
const sendEmail = (email, message) => {
  console.log(`Sending email to ${email} with message: ${message}`);
};

const UserPage = () => {
  const [pendingQuestions, setPendingQuestions] = useState([
    { id: 1, text: 'Question 1' },
    { id: 2, text: 'Question 2' },
    { id: 3, text: 'Question 3' },
  ]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [answer, setAnswer] = useState('');
  const [adminEmail, setAdminEmail] = useState('admin@example.com');
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
    // Implement logout functionality here
    navigate('/login'); // Redirect to login page
    handleMenuClose();
  };

  const handleChangePassword = () => {
    navigate('/change-password'); // Redirect to change password page
    handleMenuClose();
  };

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
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Questionnaire Page
        </Typography>
        <IconButton
          aria-controls={open ? 'settings-menu' : undefined}
          aria-haspopup="true"
          onClick={handleSettingsClick}
          color="inherit"
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
      </Box>

      {pendingQuestions.length > 0 ? (
        <Box>
          <Typography variant="h6" gutterBottom>
            You have pending questions:
          </Typography>
          <Box>
            <Typography variant="h5" gutterBottom>
              {pendingQuestions[currentQuestion].text}
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
              onClick={handleSubmit}
              sx={{ mb: 2 }}
            >
              Submit
            </Button>
          </Box>
          {currentQuestion < pendingQuestions.length - 1 && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
            >
              Answer Next Question
            </Button>
          )}
        </Box>
      ) : (
        <Typography variant="h6">
          No Pending Questions
        </Typography>
      )}
    </Container>
  );
};

export default UserPage;
