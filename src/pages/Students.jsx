import { useEffect, useState } from "react";

import {
  getStudents,
  deleteStudent,
} from "../api/studentApi";

import "../styles/global.css";

const Students = () => {
  const [students, setStudents] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  
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

            <button
              className="delete-btn"
              onClick={() => handleDelete(student._id)}
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>
  );
};

export default Students;