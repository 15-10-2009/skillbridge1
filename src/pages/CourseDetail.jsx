import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { coursesData } from "../data/courses";
import Swal from 'sweetalert2'; 

function CourseDetail() {
  const { id } = useParams();
  // Find the specific course from our data file using the URL ID
  const course = coursesData.find((item) => item.id === id);
  
  // State to track if the user is enrolled
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    // When page loads, check localStorage to see if user already enrolled
    const savedEnrollments = JSON.parse(localStorage.getItem("myCourses") || "[]");
    if (savedEnrollments.includes(id)) {
      setIsEnrolled(true);
    }
  }, [id]);

  const handleEnroll = () => {
    const savedEnrollments = JSON.parse(localStorage.getItem("myCourses") || "[]");
    
    if (!savedEnrollments.includes(id)) {
      // 1. Add ID to the array and save to browser memory
      savedEnrollments.push(id);
      localStorage.setItem("myCourses", JSON.stringify(savedEnrollments));
      
      // 2. Update UI state
      setIsEnrolled(true);

      // 3. Show professional popup
      Swal.fire({
        title: 'Enrollment Successful!',
        text: `You have successfully joined ${course.title}.`,
        icon: 'success',
        background: '#0f172a', // Dark theme matching your UI
        color: '#fff',
        confirmButtonColor: '#2563eb',
        confirmButtonText: 'Start Learning'
      });
    }
  };

  // Error handling if the URL ID doesn't match any course
  if (!course) {
    return (
      <div style={{ color: 'white', padding: '100px', textAlign: 'center' }}>
        <h2>Course not found!</h2>
        <Link to="/courses" style={{ color: "#2563eb" }}>Return to Course List</Link>
      </div>
    );
  }

  return (
    <div className="course-detail-container" style={styles.container}>
      {/* Back Button */}
      <Link to="/courses" style={styles.backLink}>
        ← Back to Explore
      </Link>
      
      {/* Course Header */}
      <div style={styles.header}>
        <span style={styles.categoryBadge}>{course.category}</span>
        <h1 style={styles.title}>{course.title}</h1>
        <div style={styles.metaRow}>
          <span style={styles.levelBadge}>{course.level}</span>
          <span style={styles.duration}>🕒 12 Weeks • Certificate Included</span>
        </div>
      </div>

      <hr style={styles.divider} />

      {/* Description */}
      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>About this Course</h3>
        <p style={styles.descriptionText}>{course.description}</p>
      </section>

      {/* Syllabus Section */}
      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>Course Syllabus</h3>
        <div style={styles.syllabusGrid}>
          {course.syllabus.map((item, index) => (
            <div key={index} style={styles.syllabusItem}>
              <span style={styles.itemNumber}>{index + 1}</span>
              <span style={styles.itemText}>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Enroll Button */}
      <button 
        onClick={handleEnroll}
        disabled={isEnrolled}
        style={{ 
          ...styles.enrollButton, 
          background: isEnrolled ? "#1e293b" : "#2563eb",
          cursor: isEnrolled ? "default" : "pointer",
          border: isEnrolled ? "1px solid #334155" : "none"
        }}
      >
        {isEnrolled ? "✓ You are Enrolled" : `Enroll in ${course.title}`}
      </button>
    </div>
  );
}

// Inline Styles for a clean Dark UI
const styles = {
  container: {
    padding: "60px 20px",
    maxWidth: "900px",
    margin: "0 auto",
    color: "#f8fafc",
    fontFamily: 'sans-serif'
  },
  backLink: {
    color: "#94a3b8",
    textDecoration: "none",
    fontSize: "0.9rem",
    display: "block",
    marginBottom: "30px"
  },
  header: {
    marginBottom: "40px"
  },
  categoryBadge: {
    color: "#38bdf8",
    textTransform: "uppercase",
    fontSize: "0.8rem",
    fontWeight: "bold",
    letterSpacing: "1px"
  },
  title: {
    fontSize: "3rem",
    margin: "10px 0",
    fontWeight: "800"
  },
  metaRow: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginTop: "10px"
  },
  levelBadge: {
    background: "#1e293b",
    padding: "4px 12px",
    borderRadius: "6px",
    fontSize: "0.85rem",
    border: "1px solid #334155"
  },
  duration: {
    color: "#94a3b8",
    fontSize: "0.9rem"
  },
  divider: {
    border: "0",
    borderTop: "1px solid #1e293b",
    margin: "40px 0"
  },
  section: {
    marginBottom: "40px"
  },
  sectionTitle: {
    fontSize: "1.5rem",
    marginBottom: "15px"
  },
  descriptionText: {
    color: "#cbd5e1",
    lineHeight: "1.7",
    fontSize: "1.1rem"
  },
  syllabusGrid: {
    display: "grid",
    gap: "12px"
  },
  syllabusItem: {
    background: "#0f172a",
    padding: "15px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    gap: "15px",
    border: "1px solid #1e293b"
  },
  itemNumber: {
    color: "#2563eb",
    fontWeight: "bold",
    fontSize: "1.2rem"
  },
  itemText: {
    color: "#e2e8f0"
  },
  enrollButton: {
    marginTop: "20px",
    width: "100%",
    padding: "20px",
    borderRadius: "12px",
    color: "white",
    fontSize: "1.2rem",
    fontWeight: "bold",
    transition: "all 0.3s ease"
  }
};

export default CourseDetail;