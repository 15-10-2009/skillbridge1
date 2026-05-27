import { useEffect, useState } from "react";

import {
  getStudents,
  deleteStudent,
  createStudent,
  updateStudent,
} from "../api/studentApi";

import "../styles/global.css";

const defaultForm = {
  name: "",
  course: "",
  age: "",
  email: "",
  learningStatus: "",
  skills: "",
};

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState(defaultForm);
  const [editingId, setEditingId] = useState(null);
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchStudents = async () => {
    try {
      setLoading(true);

      const response = await getStudents();

      setStudents(response.data);

      setLoading(false);
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Failed to fetch students";
      setError(message);
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm(defaultForm);
    setEditingId(null);
    setFormError("");
    setSuccessMessage("");
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (student) => {
    setEditingId(student._id);
    setForm({
      name: student.name || "",
      course: student.course || "",
      age: student.age?.toString() || "",
      email: student.email || "",
      learningStatus: student.learningStatus || "",
      skills: student.skills?.join(", ") || "",
    });
    setFormError("");
    setSuccessMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");
    setSuccessMessage("");

    if (!form.name.trim() || !form.course.trim()) {
      setFormError("Name and course are required.");
      return;
    }

    const payload = {
      name: form.name.trim(),
      course: form.course.trim(),
      age: Number(form.age) || 0,
      email: form.email.trim(),
      learningStatus: form.learningStatus.trim(),
      skills: form.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
    };

    try {
      setSubmitting(true);
      if (editingId) {
        const response = await updateStudent(editingId, payload);
        setStudents((prevStudents) =>
          prevStudents.map((student) =>
            student._id === editingId ? response.data : student
          )
        );
        setSuccessMessage("Student updated successfully.");
      } else {
        const response = await createStudent(payload);
        setStudents((prevStudents) => [response.data, ...prevStudents]);
        setSuccessMessage("Student created successfully.");
      }
      resetForm();
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Failed to submit student data.";
      setFormError(message);
    } finally {
      setSubmitting(false);
    }
  };

  

  const handleDelete = async (id) => {
    try {
      await deleteStudent(id);
      setStudents((prevStudents) => prevStudents.filter((student) => student._id !== id));
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Failed to delete student";
      setError(message);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  

  return (
    <div className="students-page">

      <h1 className="page-title">
        🚀 SkillBridge Pro Students
      </h1>

      <div className="student-form-card">
        <div className="student-form-header">
          <h2>{editingId ? "Update Student" : "Create Student"}</h2>
          {editingId && (
            <button className="cancel-btn" type="button" onClick={resetForm}>
              Cancel Edit
            </button>
          )}
        </div>

        {formError && <div className="error-text form-message">{formError}</div>}
        {successMessage && <div className="success-text form-message">{successMessage}</div>}

        <form className="student-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleFormChange}
              placeholder="Student Name"
            />
          </div>

          <div className="form-row">
            <label htmlFor="course">Course</label>
            <input
              id="course"
              name="course"
              type="text"
              value={form.course}
              onChange={handleFormChange}
              placeholder="Course Name"
            />
          </div>

          <div className="form-row">
            <label htmlFor="age">Age</label>
            <input
              id="age"
              name="age"
              type="number"
              value={form.age}
              onChange={handleFormChange}
              placeholder="Age"
            />
          </div>

          <div className="form-row">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleFormChange}
              placeholder="Email Address"
            />
          </div>

          <div className="form-row">
            <label htmlFor="learningStatus">Status</label>
            <input
              id="learningStatus"
              name="learningStatus"
              type="text"
              value={form.learningStatus}
              onChange={handleFormChange}
              placeholder="Learning Status"
            />
          </div>

          <div className="form-row">
            <label htmlFor="skills">Skills</label>
            <input
              id="skills"
              name="skills"
              type="text"
              value={form.skills}
              onChange={handleFormChange}
              placeholder="Comma-separated skills"
            />
          </div>

          <button className="primary-btn" type="submit" disabled={submitting}>
            {submitting ? "Saving..." : editingId ? "Update Student" : "Create Student"}
          </button>
        </form>
      </div>

      {loading && (
        <h2 className="loading-text">
          Loading students...
        </h2>
      )}

      {error && (
        <h2 className="error-text">
          {error}
        </h2>
      )}

      {!loading && !error && students.length === 0 && (
        <h2 className="error-text">
          No students found.
        </h2>
      )}

      <div className="students-grid">

        {students.map((student) => (

          <div className="student-card" key={student._id}>

            <h2>{student.name}</h2>

            <p>
              <strong>Course:</strong> {student.course}
            </p>

            <p>
              <strong>Age:</strong> {student.age}
            </p>

            <p>
              <strong>Email:</strong> {student.email}
            </p>

            <p>
              <strong>Status:</strong> {student.learningStatus}
            </p>

            <div className="skills-box">

              {student.skills?.map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                </span>
              ))}

            </div>

            <div className="card-actions">
              <button className="edit-btn" type="button" onClick={() => handleEdit(student)}>
                Edit
              </button>
              <button className="delete-btn" type="button" onClick={() => handleDelete(student._id)}>
                Delete
              </button>
            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default Students;