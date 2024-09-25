import React, { useState } from 'react';
import { CSVLink } from "react-csv";
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery, IconButton
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const Responses = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const [responses, setResponses] = useState([
    {
      id: 1,
      department: 'IT',
      multipleChoiceScore: 80,
      textResponse: 'Good',
      totalScore: 85,
      userAssignedTo: 'Bosun'
    },
    {
      id: 2,
      department: 'IT',
      multipleChoiceScore: 70,
      textResponse: 'Average',
      totalScore: 75,
      userAssignedTo: 'Toye'
    },
    {
      id: 3,
      department: 'Application',
      multipleChoiceScore: 90,
      textResponse: 'Excellent',
      totalScore: 95,
      userAssignedTo: 'Chidimma'
    },
    // Add more response objects as needed
  ]);

  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const [openDepartments, setOpenDepartments] = useState({});

  // Helper function to group responses by department
  const groupByDepartment = (responses) => {
    return responses.reduce((acc, response) => {
      const { department } = response;
      if (!acc[department]) {
        acc[department] = [];
      }
      acc[department].push(response);
      return acc;
    }, {});
  };

  const groupedResponses = groupByDepartment(responses);

  const clearResponses = () => {
    setResponses([]);
    setIsClearModalOpen(false);
  };

  const toggleDepartmentVisibility = (department) => {
    setOpenDepartments((prev) => ({
      ...prev,
      [department]: !prev[department],
    }));
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
              {Object.keys(groupedResponses).map((department) => (
                <React.Fragment key={department}>
                  <TableRow onClick={() => toggleDepartmentVisibility(department)} sx={{ cursor: 'pointer' }}>
                    <TableCell colSpan={5} sx={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>
                      <Box display="flex" alignItems="center" justifyContent="space-between">
                        {department}
                        <IconButton size="small" aria-label={`toggle ${department} responses`}>
                          {openDepartments[department] ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                  {openDepartments[department] && groupedResponses[department].map((response) => (
                    <TableRow key={response.id}>
                      <TableCell>{response.department}</TableCell>
                      <TableCell>{response.multipleChoiceScore}</TableCell>
                      <TableCell>{response.textResponse}</TableCell>
                      <TableCell>{response.totalScore}</TableCell>
                      <TableCell>{response.userAssignedTo}</TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
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
          aria-label="Clear all responses"
        >
          Clear Responses
        </Button>
        <CSVLink
          data={responses}
          filename={"responses.csv"}
          style={{ textDecoration: 'none', width: isMobile ? '100%' : 'auto' }}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{ width: isMobile ? '100%' : 'auto' }}
            disabled={responses.length === 0}
            aria-label="Save report as Excel file"
          >
            Save Report in Excel
          </Button>
        </CSVLink>
      </Box>

      <Dialog
        open={isClearModalOpen}
        onClose={() => setIsClearModalOpen(false)}
        fullScreen={isSmallScreen}
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
