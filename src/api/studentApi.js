import axios from "axios";

// ======================================
// AXIOS INSTANCE
// ======================================
const API = axios.create({
  baseURL: "/api",
});

// ======================================
// GET ALL STUDENTS
// ======================================
export const getStudents = async () => {
  return await API.get("/students");
};

// ======================================
// CREATE STUDENT
// ======================================
export const createStudent = async (studentData) => {
  return await API.post("/students", studentData);
};

// ======================================
// UPDATE STUDENT
// ======================================
export const updateStudent = async (id, updatedData) => {
  // FIXED: Removed the extra space between "students" and "/${id}"
  return await API.put(`/students/${id}`, updatedData);
};

// ======================================
// DELETE STUDENT
// ======================================
export const deleteStudent = async (id) => {
  return await API.delete(`/students/${id}`);
};