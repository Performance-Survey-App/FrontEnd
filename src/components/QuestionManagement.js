import React, { useState, useEffect } from "react";
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
  Snackbar,
  Alert,
  ListItemText,

  
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import QuestionService from "../services/question.service";
import DeptService from '../services/department.service';
import EditIcon from '@mui/icons-material/Edit';

const QuestionnaireManagement = () => {
  const [departments, setDepartments] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    type: "",
    questionText: "",
    departmentId: "",
    choices: [],
  });
  const [isCreateQuestionOpen, setIsCreateQuestionOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [departmentQestions, setDepartmentQuestions] = useState([]);
  const [DepartmentId, setDepartmentId] = useState(null);
  const [updateQuestion, setUpdateQuestion] = useState({
    type: "",
    questionText: "",
    departmentId: "",
    choices: [],
  });
  const [IsUpdateQuestion, setIsUpdateQuestion] = useState(false);
  const [IsDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [confirmDeleteQuestion, setconfirmDeleteQuestion] = useState(null);
  const [QuestionToDelete, setQuestionToDelete] = useState(null);
  const [IsUpdateQuestionOpen, setIsUpdateQuestionOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  

  const questionService = new QuestionService();
  const deptService = new DeptService();

  useEffect(() => {
    fetchDepartments();
    loadQuestions();
  }, []);


  const fetchDepartments = async () => {
    try {
      const response = await deptService.fetchDepartments();
      console.log("API Response:", response);

      // Check if the response data is directly an array or contains a $values array
      if (Array.isArray(response.data)) {
        setDepartments(response.data);
      } else if (Array.isArray(response.data.$values)) {
        setDepartments(response.data.$values);
      } else {
        console.error(
          "Unexpected response format, expected an array:",
          response.data
        );
        setDepartments([]);
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
      setDepartments([]);
      setSnackbarMessage("Error fetching departments");
      setSnackbarOpen(true);
    }
  };

  const loadQuestions = async (departmentId) => {
    try {
      const questions = await questionService.fetchQuestionsByDeptId(
        departmentId
      );
      console.log("Questions:", questions);
      setDepartmentQuestions(questions.data);
    } catch (error) {
      console.error("Error loading questions:", error);
    }
  };

  const handleCreateQuestion = async () => {
    try {
      const { type, questionText, departmentId, choices } = newQuestion;

      if (type === "multiple-choice") {
        // Ensure choices align with schema
        const formattedQuestion = {
          QuestionText: questionText,
          DepartmentId: departmentId,
          Options: choices.map((choice) => ({
            text: choice.text,
            score: choice.score,
          })),
        };

        await questionService.createMultipleChoiceQuestions(formattedQuestion);
      } else if (type === "text") {
        const formattedQuestion = {
          QuestionText: questionText,
          DepartmentId: departmentId,
        };
        await questionService.createTextQuestions(formattedQuestion);
      }

      setQuestions([...questions, { ...newQuestion, id: Date.now() }]);
      setNewQuestion({
        type: "",
        questionText: "",
        departmentId: "",
        choices: [],
      });
      setIsCreateQuestionOpen(false);
      showSnackbar("Question created successfully!", "success");
    } catch (error) {
      showSnackbar("Failed to create question", "error");
    }
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleQuestionTypeChange = (e) => {
    setNewQuestion({ ...newQuestion, type: e.target.value });
  };

  const updateQuestionsDetails = async () => {
    try {
      const { type, questionText, departmentId, choices } = newQuestion;

      if (type === "multiple-choice") {
        // Ensure choices align with schema
        const formattedQuestion = {
          QuestionText: questionText,
          DepartmentId: departmentId,
          Options: choices.map((choice) => ({
            text: choice.text,
            score: choice.score,
          })),
        };

        await questionService.updateMultipleChoiceQuestions(formattedQuestion, updateQuestion.questionId);
      } else if (type === "text") {
        const formattedQuestion = {
          QuestionText: questionText,
          DepartmentId: departmentId,
        };
        await questionService.updateTextQuestions(formattedQuestion, updateQuestion.questionId);
      }

      setQuestions([...questions, { ...newQuestion, id: Date.now() }]);
      setNewQuestion({
        type: "",
        questionText: "",
        departmentId: "",
        choices: [],
      });
      setIsUpdateQuestionOpen(false);
      loadQuestions(newQuestion.departmentId)
      showSnackbar("Question updated successfully!", "success");
    } catch (error) {
      showSnackbar("Failed to update question", "error");
    }
  };

  
  const deleteQuestion = async (questionId) => {
    try {
      await questionService.deleteQuestions(questionId);

      setIsDeleteConfirmOpen(false);
      setQuestionToDelete(null);
      setSnackbarMessage("Questions deleted successfully!");
      setSnackbarOpen(true);
      fetchDepartments();
      loadQuestions(newQuestion.departmentId)
    } catch (error) {
      console.error("Error deleting Questions:", error);
      setSnackbarMessage(
        `Error deleting department: ${
          error.response?.data?.message || error.message
        }`
      );
      setSnackbarOpen(true);
    }
  };

  // const filteredDepartments = departments.filter(
  //   (department) =>
  //     department &&
  //     department.departmentName &&
  //     department.departmentName.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Typography variant="h5">Question Management</Typography>

      <Box sx={{ mt: 3, mb: 3 }}>
        <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
          <InputLabel>Department</InputLabel>
          <Select
            value={newQuestion.departmentId}
            onChange={(e) => {
              setNewQuestion({ ...newQuestion, departmentId: e.target.value });
              loadQuestions(e.target.value);
            }}
            label="Department"
          >
            <MenuItem value="">
              <em>Select Department</em>
            </MenuItem>
            {departments.map((department) => (
              <MenuItem
                key={department.departmentId}
                value={department.departmentId}
              >
                {department.departmentName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setIsCreateQuestionOpen(true)}
          sx={{ mb: 2 }}
        >
          Add Question
        </Button>

        {/*         
      <List>
        {departmentQestions.map(question => (
          <ListItem
            key={question.questionId}
            secondaryAction={
              <Box sx={{ display: 'flex' }}>
                
              </Box>
            }
          >
            <ListItem
              primary={question.questionText} 
              //secondary={user.userEmail + (user.disabled ? ' (Disabled)' : '')} 
            />
          </ListItem>
        ))}
      </List> */}

        <List>
          {departmentQestions.map((question, index) => (
            <ListItem
              key={question.questionId}
              sx={{ alignItems: "flex-start" }}


            >
              <ListItemText

                primary={
                  <div className="flex justify-between items-center">
                   <Typography variant="h6">
                    {`${index + 1}. ${question.questionText}`}
                  </Typography>
                  <Box className="flex">
                            <IconButton
                              edge="end"
                              aria-label="edit"
                              onClick={() => {
                                setUpdateQuestion(question);
                                setIsUpdateQuestionOpen(true);
                              }}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              edge="end"
                              aria-label="delete"
                              onClick={() =>
                                deleteQuestion(question.questionId)
                              }
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                  </div>
                 
                }
                secondary={
                  question.options.length > 0 ? (
                    <List component="div" disablePadding>
                      {question.options.map((option, optionIndex) => (
                        <ListItem key={option.optionId} sx={{ pl: 4 }}>
                          <ListItemText
                            primary={`${String.fromCharCode(
                              65 + optionIndex
                            )}. ${option.text}`}
                          />

                          
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ pl: 2 }}
                    >
                      
                    </Typography>
                  )
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>


      {/* Modal for Creating a New Question */}
      <Modal
  open={isCreateQuestionOpen}
  onClose={() => setIsCreateQuestionOpen(false)}
  aria-labelledby="create-question-modal"
  aria-describedby="create-question-modal-description"
>
  <Box
    sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: { xs: "90%", sm: "60%", md: "50%" },
      maxHeight: "80vh", // Set max height of the modal
      overflow: "auto", // Make the modal scrollable
      bgcolor: "background.paper",
      borderRadius: 2,
      boxShadow: 24,
      p: 4,
    }}
  >
    <Typography variant="h6" component="h2" gutterBottom>
      Create New Question
    </Typography>
    <TextField
      fullWidth
      variant="outlined"
      label="Question Text"
      value={newQuestion.questionText}
      onChange={(e) =>
        setNewQuestion({ ...newQuestion, questionText: e.target.value })
      }
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

    {newQuestion.type === "multiple-choice" && (
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1">Choices</Typography>
        <List>
          {newQuestion.choices.map((choice, index) => (
            <ListItem key={index}>
              <TextField
                fullWidth
                variant="outlined"
                label={`Option ${index + 1}`}
                value={choice.text}
                onChange={(e) => {
                  const updatedChoices = [...newQuestion.choices];
                  updatedChoices[index].text = e.target.value;
                  setNewQuestion({
                    ...newQuestion,
                    choices: updatedChoices,
                  });
                }}
                sx={{ mr: 2 }}
              />
              <TextField
                variant="outlined"
                label="Score"
                type="number"
                value={choice.score}
                onChange={(e) => {
                  const updatedChoices = [...newQuestion.choices];
                  updatedChoices[index].score = parseInt(e.target.value, 10);
                  setNewQuestion({
                    ...newQuestion,
                    choices: updatedChoices,
                  });
                }}
                sx={{ width: "100px", mr: 2 }}
              />
              <IconButton
                edge="end"
                color="error"
                onClick={() => {
                  const updatedChoices = newQuestion.choices.filter(
                    (_, i) => i !== index
                  );
                  setNewQuestion({
                    ...newQuestion,
                    choices: updatedChoices,
                  });
                }}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
        <Button
          variant="outlined"
          onClick={() =>
            setNewQuestion({
              ...newQuestion,
              choices: [...newQuestion.choices, { text: "", score: 0 }],
            })
          }
        >
          Add Choice
        </Button>
      </Box>
    )}
    <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
      <InputLabel>Department</InputLabel>
      <Select
        value={departments.departmentId}
        onChange={(e) => {
          setDepartmentId(e.target.value);
        }}
        label="Department"
      >
        <MenuItem value="">
          <em>Select Department</em>
        </MenuItem>
        {departments.map((department) => (
          <MenuItem
            key={department.departmentId}
            value={department.departmentId}
          >
            {department.departmentName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <Button
      variant="contained"
      color="primary"
      onClick={handleCreateQuestion}
      sx={{ mt: 2 }}
    >
      Create Question
    </Button>
  </Box>
</Modal>



<Modal
  open={IsUpdateQuestionOpen}
  onClose={() => setIsUpdateQuestionOpen(false)}
  aria-labelledby="update-question-modal"
  aria-describedby="update-question-modal-description"
>
  <Box
    sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: { xs: "90%", sm: "60%", md: "50%" },
      maxHeight: "80vh", // Set max height of the modal
      overflow: "auto", // Make the modal scrollable
      bgcolor: "background.paper",
      borderRadius: 2,
      boxShadow: 24,
      p: 4,
    }}
  >
    <Typography variant="h6" component="h2" gutterBottom>
      Update Question
    </Typography>
    <TextField
      fullWidth
      variant="outlined"
      label="Question Text"
      value={newQuestion.questionText}
      onChange={(e) =>
        setNewQuestion({ ...newQuestion, questionText: e.target.value })
      }
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

    {newQuestion.type === "multiple-choice" && (
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1">Choices</Typography>
        <List>
          {newQuestion.choices.map((choice, index) => (
            <ListItem key={index}>
              <TextField
                fullWidth
                variant="outlined"
                label={`Option ${index + 1}`}
                value={choice.text}
                onChange={(e) => {
                  const updatedChoices = [...newQuestion.choices];
                  updatedChoices[index].text = e.target.value;
                  setNewQuestion({
                    ...newQuestion,
                    choices: updatedChoices,
                  });
                }}
                sx={{ mr: 2 }}
              />
              <TextField
                variant="outlined"
                label="Score"
                type="number"
                value={choice.score}
                onChange={(e) => {
                  const updatedChoices = [...newQuestion.choices];
                  updatedChoices[index].score = parseInt(e.target.value, 10);
                  setNewQuestion({
                    ...newQuestion,
                    choices: updatedChoices,
                  });
                }}
                sx={{ width: "100px", mr: 2 }}
              />
              <IconButton
                edge="end"
                color="error"
                onClick={() => {
                  const updatedChoices = newQuestion.choices.filter(
                    (_, i) => i !== index
                  );
                  setNewQuestion({
                    ...newQuestion,
                    choices: updatedChoices,
                  });
                }}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
        <Button
          variant="outlined"
          onClick={() =>
            setNewQuestion({
              ...newQuestion,
              choices: [...newQuestion.choices, { text: "", score: 0 }],
            })
          }
        >
          Add Choice
        </Button>
      </Box>
    )}
    <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
      <InputLabel>Department</InputLabel>
      <Select
        value={departments.departmentId}
        onChange={(e) => {
          setDepartmentId(e.target.value);
        }}
        label="Department"
      >
        <MenuItem value="">
          <em>Select Department</em>
        </MenuItem>
        {departments.map((department) => (
          <MenuItem
            key={department.departmentId}
            value={department.departmentId}
          >
            {department.departmentName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <Button
      variant="contained"
      color="primary"
      onClick={updateQuestionsDetails}
      sx={{ mt: 2 }}
    >
      Update Question
    </Button>
  </Box>
</Modal>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default QuestionnaireManagement;
