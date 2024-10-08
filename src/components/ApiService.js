import axios from "axios";// services/apiService.js

const backend_URL = process.env.REACT_APP_BACKEND_BASE_URL;

class ApiService {
  constructor() {
    this.authToken = sessionStorage.getItem("authToken");
    this.axiosInstance = axios.create({
      baseURL: backend_URL,
      headers: {
        Authorization: `Bearer ${this.authToken}`,
      },
    });
  }

  // Fetch all departments
  async fetchDepartments() {
    try {
      const response = await this.axiosInstance.get('/getAllDepartment');
      return response.data;
    } catch (error) {
      console.error('Error fetching departments:', error);
      throw error;
    }
  }

  // Create a new department
  async createDepartment(departmentName, authToken) {
    try {
        const response = await axios.post(`${backend_URL}/CreateDepartment`, 
        { 
            departmentName 
        }, 
        {
            headers: {
                Authorization: `Bearer ${authToken}`, // Pass the token in the headers
            },
        });
        return response.data; // Return the created department data
    } catch (error) {
        console.error('Error adding department:', error);
        throw error;
    }
}

  

  // Update an existing department
  async updateDepartment(departmentId, departmentName) {
    try {
      const response = await this.axiosInstance.put(`/updateDepartmentById/${departmentId}`, {
        departmentName,
      });
      return response.data;
    } catch (error) {
      console.error('Error updating department:', error);
      throw error;
    }
  }

  // Delete a department (disable it)
  async deleteDepartment(departmentId) {
    try {
      await this.axiosInstance.delete(`/disableDepartmentById/${departmentId}`);
    } catch (error) {
      console.error('Error deleting department:', error);
      throw error;
    }
  }
}

export default new ApiService();
