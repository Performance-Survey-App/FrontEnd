import React, { useState } from 'react';
import { 
  Box, Typography, Button, 
  MenuItem, Select, InputLabel, 
  FormControl, Snackbar, Alert 
} from '@mui/material';

const questionnaires = [
  { id: 1, department: 'HR', title: 'Employee Satisfaction Survey' },
  { id: 2, department: 'IT', title: 'Tech Skills Assessment' },
  { id: 3, department: 'Sales', title: 'Sales Performance Review' },
  // Add more questionnaires here
];

const AssignQuestions = () => {
  const [department, setDepartment] = useState('');
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSubmit = () => {
    // Logic to assign the questionnaire

    // Open the Snackbar on successful action
    setSnackbarOpen(true);

    // Clear all previous selections
    setDepartment('');
    setSelectedQuestionnaire('');
    setAssignedTo('');
    setSelectedDepartment('');
  };

  const filteredQuestionnaires = questionnaires.filter(q => q.department === department);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Assign Questions</Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Department</InputLabel>
        <Select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          variant="outlined"
        >
          <MenuItem value="HR">HR</MenuItem>
          <MenuItem value="IT">IT</MenuItem>
          <MenuItem value="Sales">Sales</MenuItem>
          {/* Add more departments as needed */}
        </Select>
      </FormControl>

      {department && (
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Questionnaire</InputLabel>
          <Select
            value={selectedQuestionnaire}
            onChange={(e) => setSelectedQuestionnaire(e.target.value)}
            variant="outlined"
          >
            {filteredQuestionnaires.map(q => (
              <MenuItem key={q.id} value={q.title}>
                {q.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      <Typography variant="h6" sx={{ mb: 2 }}>Assigned To:</Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <FormControl fullWidth>
          <InputLabel>User</InputLabel>
          <Select
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            variant="outlined"
          >
            {/* Replace these with dynamic user data */}
            <MenuItem value="John Doe">John Doe</MenuItem>
            <MenuItem value="Jane Smith">Jane Smith</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Department</InputLabel>
          <Select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            variant="outlined"
          >
            {/* Replace these with dynamic department data */}
            <MenuItem value="HR">HR</MenuItem>
            <MenuItem value="IT">IT</MenuItem>
            <MenuItem value="Sales">Sales</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          color="primary"
        >
          Assign
        </Button>
      </Box>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          Questionnaire assigned successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AssignQuestions;