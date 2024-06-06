import axios from "axios";

const API_URL = "http://localhost:8800";

export const getEmployeers = async () => {
  try {
    const response = await axios.get(`${API_URL}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPositions = async () => {
  try {
    const response = await axios.get(`${API_URL}/positions`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteEmployeers = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchEmployee = async (searchTerm) => {
  try {
    const response = await axios.get(
      `${API_URL}/search?searchTerm=${searchTerm}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addEmployee = async (employeeData) => {
  try {
    const response = await axios.post(`${API_URL}/`, employeeData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateEmployee = async (employeeId, employeeData) => {
  try {
    const response = await axios.put(`${API_URL}/${employeeId}`, employeeData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// export const searchEmployeeByEmail = async (email) => {
//   try {
//     const response = await axios.get(`${API_URL}/?email=${email}`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };
