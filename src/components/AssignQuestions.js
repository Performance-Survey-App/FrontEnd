import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Button, 
  MenuItem, Select, InputLabel, 
  FormControl, Snackbar, Alert 
} from '@mui/material';
import AssignQuestionsService from '../services/AssignQuestions.services';
import DeptService from '../services/department.service';
import UserService from '../services/user.service';
import QuestionService from "../services/question.service"; 

const AssignQuestions = () => {
  const [departments, setDepartments] = useState([]);
  const [users, setUsers] = useState([]);
  const [department, setDepartment] = useState([]);
  const [assignedTo, setAssignedTo] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const assignService = new AssignQuestionsService();
  const deptService = new DeptService();
  const userService = new UserService();
  //console.log("userservic: ", userService)

  const questionService = new QuestionService();

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await deptService.fetchDepartments();
        setDepartments(data.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
        setSnackbarMessage('Error fetching departments');
        setSnackbarOpen(true);
      }
    };
    fetchDepartments();
  }, []);

  useEffect(() => {
    const fetchQuestions = async () => {
      if (department.length > 0) {
        try {
          let data;
          if (department.length === 1) {
            data = await questionService.fetchQuestionsByDeptId(department[0]);
          } else {
            console.log("questionsevice: ", questionService)
            data = await questionService.fetchQuestionsByDeptIds(department);
          }
          console.log("Fetched Questions:", data.data); // Debugging log for questions
        } catch (error) {
          console.error("Error fetching questions:", error);
          setSnackbarMessage('Error fetching questions');
          setSnackbarOpen(true);
        }
      }
    };
    fetchQuestions();
  }, [department]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const data = await userService.fetchAllUsers();
        setUsers(data.data);
        console.log("Fetched all users:", data.data); // Debugging log for users
      } catch (error) {
        console.error("Error fetching all users:", error);
        setSnackbarMessage('Error fetching users');
        setSnackbarOpen(true);
      }
    };
    fetchAllUsers();
  }, []);

  useEffect(() => {
    const fetchUsersByDepartment = async () => {
      if (selectedDepartment.length > 0) {
        try {
          let data;
          if (selectedDepartment.length === 1) {
            data = await userService.getUsersByDepartment(selectedDepartment[0]);
          } else {
            data = await userService.fetchUsersByDeptIds(selectedDepartment);
          }
          setUsers(data.data);
          console.log("Fetched users by department:", data.data);
        } catch (error) {
          console.error("Error fetching users by department:", error);
          setSnackbarMessage('Error fetching users by department');
          setSnackbarOpen(true);
        }
      }
    };
    fetchUsersByDepartment();
  }, [selectedDepartment]);

  const handleSubmit = async () => {
    const request = {
      departmentId: selectedDepartment,
      userIds: assignedTo,
      questionIds: department,
    };

    try {
      if (assignedTo.length === 1) {
        // Assign questions to a single user
        await assignService.AssignQuestionsToSingleUser(request);
        setSnackbarMessage('Questions assigned to a single user successfully!');
      } else if (assignedTo.length > 1) {
        // Assign questions to multiple users
        await assignService.AssignQuestionsToMultipleUsers(request);
        setSnackbarMessage('Questions assigned to multiple users successfully!');
      } else if (selectedDepartment.length === 1) {
        // Assign questions to a single department
        await assignService.AssignQuestionsToDepartment(request);
        setSnackbarMessage('Questions assigned to a department successfully!');
      } else if (selectedDepartment.length > 1 && department.length > 1) {
        // Assign different questions to different departments
        await assignService.AssignDiffQuestionsToDiffDepartment(request);
        setSnackbarMessage('Different questions assigned to different departments successfully!');
      } else {
        // Default action if nothing matches
        console.error("Invalid selection or action");
        setSnackbarMessage('Invalid assignment action');
      }
      setSnackbarOpen(true);
      setDepartment([]);
      setAssignedTo([]);
      setSelectedDepartment([]);
    } catch (error) {
      console.error("Error assigning questions:", error);
      setSnackbarMessage('Error assigning questions');
      setSnackbarOpen(true);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Assign Questions</Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Select Department(s)</InputLabel>
        <Select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          variant="outlined"
          multiple
          renderValue={(selected) => selected.map(deptId => {
            const dept = departments.find(d => d.departmentId === deptId);
            return dept ? dept.departmentName : '';
          }).join(', ')}
        >
          {departments.map((dept) => (
            <MenuItem key={dept.departmentId} value={dept.departmentId}>
              {dept.departmentName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Typography variant="h6" sx={{ mb: 2 }}>Assign To:</Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <FormControl fullWidth>
          <InputLabel>Select User(s)</InputLabel>
          <Select
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            variant="outlined"
            multiple
            renderValue={(selected) => selected.map(userId => {
              const user = users.find(u => u.userId === userId);
              return user ? user.userName : '';
            }).join(', ')}
          >
            {users.map((user) => (
              <MenuItem key={user.userId} value={user.userId}>
                {user.userName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Assign To Department</InputLabel>
          <Select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            variant="outlined"
            multiple
            renderValue={(selected) => selected.map(deptId => {
              const dept = departments.find(d => d.departmentId === deptId);
              return dept ? dept.departmentName : '';
            }).join(', ')}
          >
            {departments.map((dept) => (
              <MenuItem key={dept.departmentId} value={dept.departmentId}>
                {dept.departmentName}
              </MenuItem>
            ))}
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

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AssignQuestions;





// import React, { useState } from 'react';
// import { 
//   Box, Typography, Button, 
//   MenuItem, Select, InputLabel, 
//   FormControl, Snackbar, Alert 
// } from '@mui/material';
// import AssignQuestionsService from '../services/AssignQuestions.services';
// import DeptService from '../services/department.service';
// import UserService from '../services/user.service';


// const AssignQuestions = () => {
  
//   const [department, setDepartment] = useState('');
//   const [selectedQuestionnaire, setSelectedQuestionnaire] = useState('');
//   const [assignedTo, setAssignedTo] = useState('');
//   const [selectedDepartment, setSelectedDepartment] = useState('');
//   const [snackbarOpen, setSnackbarOpen] = useState(false);

//   const handleSubmit = () => {
//     // Logic to assign the questionnaire

//     // Open the Snackbar on successful action
//     setSnackbarOpen(true);

//     // Clear all previous selections
//     setDepartment('');
//     setSelectedQuestionnaire('');
//     setAssignedTo('');
//     setSelectedDepartment('');
//   };

//   const filteredQuestionnaires = questionnaires.filter(q => q.department === department);

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h4" sx={{ mb: 2 }}>Assign Questions</Typography>

//       <FormControl fullWidth sx={{ mb: 2 }}>
//         <InputLabel>Department</InputLabel>
//         <Select
//           value={department}
//           onChange={(e) => setDepartment(e.target.value)}
//           variant="outlined"
//         >
//           <MenuItem value="HR">HR</MenuItem>
//           <MenuItem value="IT">IT</MenuItem>
//           <MenuItem value="Sales">Sales</MenuItem>
//           {/* Add more departments as needed */}
//         </Select>
//       </FormControl>

//       {department && (
//         <FormControl fullWidth sx={{ mb: 2 }}>
//           <InputLabel>Questionnaire</InputLabel>
//           <Select
//             value={selectedQuestionnaire}
//             onChange={(e) => setSelectedQuestionnaire(e.target.value)}
//             variant="outlined"
//           >
//             {filteredQuestionnaires.map(q => (
//               <MenuItem key={q.id} value={q.title}>
//                 {q.title}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       )}

//       <Typography variant="h6" sx={{ mb: 2 }}>Assigned To:</Typography>

//       <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
//         <FormControl fullWidth>
//           <InputLabel>User</InputLabel>
//           <Select
//             value={assignedTo}
//             onChange={(e) => setAssignedTo(e.target.value)}
//             variant="outlined"
//           >
//             {/* Replace these with dynamic user data */}
//             <MenuItem value="John Doe">John Doe</MenuItem>
//             <MenuItem value="Jane Smith">Jane Smith</MenuItem>
//           </Select>
//         </FormControl>

//         <FormControl fullWidth>
//           <InputLabel>Department</InputLabel>
//           <Select
//             value={selectedDepartment}
//             onChange={(e) => setSelectedDepartment(e.target.value)}
//             variant="outlined"
//           >
//             {/* Replace these with dynamic department data */}
//             <MenuItem value="HR">HR</MenuItem>
//             <MenuItem value="IT">IT</MenuItem>
//             <MenuItem value="Sales">Sales</MenuItem>
//           </Select>
//         </FormControl>
//       </Box>

//       <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//         <Button 
//           onClick={handleSubmit} 
//           variant="contained" 
//           color="primary"
//         >
//           Assign
//         </Button>
//       </Box>

//       {/* Snackbar for notifications */}
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={6000}
//         onClose={() => setSnackbarOpen(false)}
//       >
//         <Alert onClose={() => setSnackbarOpen(false)} severity="success">
//           Questionnaire assigned successfully!
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default AssignQuestions;