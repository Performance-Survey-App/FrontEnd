// import React, { useState } from 'react';
// import {
//   Container,
//   Typography,
//   Box,
//   TextField,
//   Button,
//   IconButton,
//   Menu,
//   MenuItem,
//   Snackbar,
//   Alert,
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemButton
// } from '@mui/material';
// import SettingsIcon from '@mui/icons-material/Settings';
// import { useNavigate } from 'react-router-dom';

// // Mock function to simulate sending responses to the database
// const sendResponsesToDatabase = (responses) => {
//   console.log('Responses sent to database:', responses);
// };

// const UserPage = () => {
//   const [pendingQuestionnaires, setPendingQuestionnaires] = useState([
//     {
//       id: 1,
//       title: 'Questionnaire 1',
//       questions: [
//         { id: 1, text: 'Question 1' },
//         { id: 2, text: 'Question 2' },
//       ],
//     },
//     {
//       id: 2,
//       title: 'Questionnaire 2',
//       questions: [
//         { id: 3, text: 'Question 3' },
//         { id: 4, text: 'Question 4' },
//       ],
//     },
//   ]);

//   const [currentQuestionnaireIndex, setCurrentQuestionnaireIndex] = useState(0);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [responses, setResponses] = useState([]);
//   const [answer, setAnswer] = useState('');
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);
//   const navigate = useNavigate();

//   const handleSettingsClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const handleLogout = () => {
//     navigate('/login'); // Redirect to login page
//     handleMenuClose();
//   };

//   const handleChangePassword = () => {
//     navigate('/change-password'); // Redirect to change password page
//     handleMenuClose();
//   };

//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };

//   const handleSubmitAnswer = () => {
//     const currentQuestionnaire = pendingQuestionnaires[currentQuestionnaireIndex];
//     const currentQuestion = currentQuestionnaire.questions[currentQuestionIndex];
//     const newResponses = [
//       ...responses,
//       { questionnaireId: currentQuestionnaire.id, questionId: currentQuestion.id, answer },
//     ];
//     setResponses(newResponses);
//     setAnswer('');
//     setSnackbarMessage('Answer submitted');
//     setSnackbarOpen(true);

//     if (currentQuestionIndex < currentQuestionnaire.questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     } else if (currentQuestionnaireIndex < pendingQuestionnaires.length - 1) {
//       setCurrentQuestionnaireIndex(currentQuestionnaireIndex + 1);
//       setCurrentQuestionIndex(0);
//     } else {
//       setPendingQuestionnaires([]);
//       sendResponsesToDatabase(newResponses);
//       setSnackbarMessage('All questionnaires completed and responses sent.');
//       setSnackbarOpen(true);
//     }
//   };

//   return (
//     <Container maxWidth="lg" sx={{ mt: 5, display: 'flex' }}>
//       {/* Sidebar Drawer */}
//       <Drawer
//         variant="permanent"
//         sx={{
//           width: 240,
//           flexShrink: 0,
//           '& .MuiDrawer-paper': {
//             width: 240,
//             boxSizing: 'border-box',
//           },
//         }}
//       >
//         <List>
//           {pendingQuestionnaires.map((questionnaire, index) => (
//             <ListItem key={questionnaire.id} disablePadding>
//               <ListItemButton onClick={() => {
//                 setCurrentQuestionnaireIndex(index);
//                 setCurrentQuestionIndex(0); // Reset to the first question
//               }}>
//                 <ListItemText primary={questionnaire.title} />
//               </ListItemButton>
//             </ListItem>
//           ))}
//         </List>
//       </Drawer>

//       {/* Main Content */}
//       <Box sx={{ flexGrow: 1, ml: 3 }}>
//         <IconButton
//           aria-controls={open ? 'settings-menu' : undefined}
//           aria-haspopup="true"
//           onClick={handleSettingsClick}
//           color="inherit"
//           sx={{ position: 'absolute', top: 0, right: 0 }}
//         >
//           <SettingsIcon />
//         </IconButton>
//         <Menu
//           id="settings-menu"
//           anchorEl={anchorEl}
//           open={open}
//           onClose={handleMenuClose}
//         >
//           <MenuItem onClick={handleChangePassword}>Change Password</MenuItem>
//           <MenuItem onClick={handleLogout}>Logout</MenuItem>
//         </Menu>

//         {pendingQuestionnaires.length > 0 ? (
//           <Box>
//             <Typography variant="h5" gutterBottom>
//               {pendingQuestionnaires[currentQuestionnaireIndex].title}
//             </Typography>
//             <Typography variant="h6" gutterBottom>
//               {pendingQuestionnaires[currentQuestionnaireIndex].questions[currentQuestionIndex].text}
//             </Typography>
//             <TextField
//               fullWidth
//               variant="outlined"
//               placeholder="Your Answer"
//               value={answer}
//               onChange={(e) => setAnswer(e.target.value)}
//               sx={{ mb: 2 }}
//             />
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleSubmitAnswer}
//               sx={{ mb: 2 }}
//             >
//               Submit Answer
//             </Button>
//           </Box>
//         ) : (
//           <Typography variant="h6">
//             No Pending Questionnaires
//           </Typography>
//         )}

//         <Snackbar
//           open={snackbarOpen}
//           autoHideDuration={3000}
//           onClose={handleSnackbarClose}
//         >
//           <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
//             {snackbarMessage}
//           </Alert>
//         </Snackbar>
//       </Box>
//     </Container>
//   );
// };

// export default UserPage;
 

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
  Alert,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Paper,
  Divider,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';

// Mock function to simulate sending responses to the database
const sendResponsesToDatabase = (responses) => {
  console.log('Responses sent to database:', responses);
};

// Mock function to simulate sending an email notification to the admin
const sendEmailToAdmin = () => {
  console.log('Email sent to admin: Department questions have been answered.');
};

const UserPage = () => {
  const [pendingQuestions, setPendingQuestions] = useState([
    {
      id: 1,
      title: 'Department 1',
      questions: [
        { id: 1, text: 'Multiple Choice Question 1' },
        { id: 2, text: 'Multiple Choice Question 2' },
      ],
    },
    {
      id: 2,
      title: 'Department 2',
      questions: [
        { id: 3, text: 'Text Question 1' },
        { id: 4, text: 'Text Question 2' },
      ],
    },
  ]);

  const [currentDepartmentIndex, setCurrentDepartmentIndex] = useState(0);
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
    navigate('/login');
    handleMenuClose();
  };

  const handleChangePassword = () => {
    navigate('/change-password');
    handleMenuClose();
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleNext = () => {
    const currentDepartment = pendingQuestions[currentDepartmentIndex];
    const currentQuestion = currentDepartment.questions[currentQuestionIndex];
    const newResponses = [
      ...responses,
      { departmentId: currentDepartment.id, questionId: currentQuestion.id, answer },
    ];
    setResponses(newResponses);
    setAnswer('');
    setSnackbarMessage('Answer saved');
    setSnackbarOpen(true);

    if (currentQuestionIndex < currentDepartment.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentDepartmentIndex < pendingQuestions.length - 1) {
      setCurrentDepartmentIndex(currentDepartmentIndex + 1);
      setCurrentQuestionIndex(0);
    } else {
      setPendingQuestions([]);
      sendResponsesToDatabase(newResponses);
      sendEmailToAdmin();
      setSnackbarMessage('All questions completed and responses sent.');
      setSnackbarOpen(true);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5, display: 'flex' }}>
      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: '#f4f4f4',
          },
        }}
      >
        <Typography variant="h6" sx={{ p: 2 }}>
          Pending Departments
        </Typography>
        <Divider />
        <List>
          {pendingQuestions.map((department, index) => (
            <ListItem key={department.id} disablePadding>
              <ListItemButton onClick={() => {
                setCurrentDepartmentIndex(index);
                setCurrentQuestionIndex(0);
              }}>
                <ListItemText primary={department.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, ml: 3 }}>
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

        {pendingQuestions.length > 0 ? (
          <Paper
            elevation={3}
            sx={{
              p: 4,
              backgroundColor: '#f0f9f0',
              mt: 5,
              textAlign: 'center',
              borderRadius: 2,
              minHeight: '300px',
            }}
          >
            <Typography variant="h5" gutterBottom>
              {pendingQuestions[currentDepartmentIndex].title}
            </Typography>
            <Typography variant="h6" gutterBottom>
              {pendingQuestions[currentDepartmentIndex].questions[currentQuestionIndex].text}
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Your Answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              sx={{ mb: 2, backgroundColor: 'white', borderRadius: 1 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              sx={{ mb: 2 }}
            >
              {currentQuestionIndex === pendingQuestions[currentDepartmentIndex].questions.length - 1 &&
              currentDepartmentIndex === pendingQuestions.length - 1
                ? 'Submit'
                : 'Next'}
            </Button>
          </Paper>
        ) : (
          <Typography variant="h6" sx={{ mt: 5, textAlign: 'center' }}>
            No Pending Questions
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
      </Box>
    </Container>
  );
};

export default UserPage;
