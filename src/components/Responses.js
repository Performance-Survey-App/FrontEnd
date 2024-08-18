import React, { useState } from 'react';
import { CSVLink } from "react-csv";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Responses = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [responses, setResponses] = useState([
    {
      id: 1,
      department: 'Department 1',
      multipleChoiceScore: 80,
      textResponse: 'Good',
      totalScore: 85,
      userAssignedTo: 'User 1'
    },
    // Add more response objects as needed
  ]);
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);

  const clearResponses = () => {
    setResponses([]);
    setIsClearModalOpen(false);
  };

  return (
    <Box sx={{ p: 2, [theme.breakpoints.up('sm')]: { p: 3 } }}>
      <Typography variant={isMobile ? "h5" : "h4"} gutterBottom>
        View Responses
      </Typography>

      {responses.length > 0 ? (
        <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
          <Table size={isMobile ? 'small' : 'medium'}>
            <TableHead>
              <TableRow>
                <TableCell>Department</TableCell>
                <TableCell>Multiple Choice Score</TableCell>
                <TableCell>Text Response</TableCell>
                <TableCell>Total Score</TableCell>
                <TableCell>User Assigned To</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {responses.map((response) => (
                <TableRow key={response.id}>
                  <TableCell>{response.department}</TableCell>
                  <TableCell>{response.multipleChoiceScore}</TableCell>
                  <TableCell>{response.textResponse}</TableCell>
                  <TableCell>{response.totalScore}</TableCell>
                  <TableCell>{response.userAssignedTo}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body1" sx={{ mt: 2 }}>
          No responses available.
        </Typography>
      )}

      <Box sx={{ mt: 2, display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: isMobile ? 'center' : 'space-between', alignItems: isMobile ? 'center' : 'initial' }}>
        <Button
          variant="contained"
          color="error"
          onClick={() => setIsClearModalOpen(true)}
          sx={{ mb: isMobile ? 2 : 0 }}
        >
          Clear Responses
        </Button>
        <CSVLink
          data={responses}
          filename={"responses.csv"}
          style={{ textDecoration: 'none', width: isMobile ? '100%' : 'auto' }}
        >
          <Button variant="contained" color="primary" sx={{ width: isMobile ? '100%' : 'auto' }}>
            Save Report in Excel
          </Button>
        </CSVLink>
      </Box>

      <Dialog
        open={isClearModalOpen}
        onClose={() => setIsClearModalOpen(false)}
        fullScreen={isMobile}
      >
        <DialogTitle>Clear Responses</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to clear all responses? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={clearResponses}
            color="error"
            variant="contained"
            fullWidth={isMobile}
          >
            Yes, Clear
          </Button>
          <Button
            onClick={() => setIsClearModalOpen(false)}
            variant="outlined"
            fullWidth={isMobile}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Responses;
