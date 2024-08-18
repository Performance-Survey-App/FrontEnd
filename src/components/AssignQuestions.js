import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const sendEmail = (name, email) => {
  alert(`Sending email to ${email} for ${name}`);
};

const AssignQuestions = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  const handleSubmit = () => {
    sendEmail(name, email);
    setIsAssignModalOpen(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4">Assign Questions</Typography>
        <Button 
          variant="contained" 
          color="primary"
          onClick={() => setIsAssignModalOpen(true)}
        >
          Assign Questions
        </Button>
      </Box>

      {/* Assign Questions Dialog */}
      <Dialog open={isAssignModalOpen} onClose={() => setIsAssignModalOpen(false)}>
        <DialogTitle>Assign Questions</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Enter Name"
            value={name}
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Enter Department"
            value={department}
            variant="outlined"
            onChange={(e) => setDepartment(e.target.value)}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Enter Email"
            value={email}
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleSubmit} 
            variant="contained" 
            color="primary"
          >
            Send Email
          </Button>
          <Button 
            onClick={() => setIsAssignModalOpen(false)} 
            variant="contained" 
            color="secondary"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AssignQuestions;
