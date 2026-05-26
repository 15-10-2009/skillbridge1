import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { coursesData } from "../data/courses";

function MyLearning() {
  const [myCourses, setMyCourses] = useState([]);

  useEffect(() => {
    
    const savedIds = JSON.parse(localStorage.getItem("myCourses") || "[]");
    
    
    const enrolledData = coursesData.filter((course) => 
      savedIds.includes(course.id)
    );
    
    setMyCourses(enrolledData);
  }, []);

  
  const handleUnenroll = (id) => {
    const updatedIds = myCourses.filter(c => c.id !== id).map(c => c.id);
    localStorage.setItem("myCourses", JSON.stringify(updatedIds));
    setMyCourses(myCourses.filter(c => c.id !== id));
  };

  return (
    <div className="my-learning-container" style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>My Dashboard 🎓</h1>
        <p style={styles.subtitle}>Continue where you left off.</p>
      </header>

      {myCourses.length > 0 ? (
        <div style={styles.grid}>
          {myCourses.map((course) => (
            <div key={course.id} style={styles.card}>
              <div style={styles.cardHeader}>
                <span style={styles.badge}>{course.category}</span>
                <button 
                  onClick={() => handleUnenroll(course.id)} 
                  style={styles.removeBtn}
                  title="Remove from Dashboard"
                >
                  ✕
                </button>
              </div>
              <h3 style={styles.cardTitle}>{course.title}</h3>
              <div style={styles.progressContainer}>
                <div style={styles.progressBar}></div>
                <span style={styles.progressText}>0% Complete</span>
              </div>
              <Link to={`/course/${course.id}`} style={styles.continueBtn}>
                Resume Lesson
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div style={styles.emptyState}>
          <div style={{ fontSize: "50px", marginBottom: "20px" }}>📥</div>
          <h2>You haven't enrolled in any courses yet.</h2>
          <p style={{ color: "#94a3b8", marginBottom: "20px" }}>
            Explore our catalog and start your learning journey today.
          </p>
          <Link to="/courses" style={styles.exploreBtn}>
            Browse Courses
          </Link>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "60px 20px",
    maxWidth: "1200px",
    margin: "0 auto",
    minHeight: "80vh",
    color: "#f8fafc"
  },
  header: {
    marginBottom: "40px",
    borderBottom: "1px solid #1e293b",
    paddingBottom: "20px"
  },
  title: { fontSize: "2.5rem", margin: "0" },
  subtitle: { color: "#94a3b8", fontSize: "1.1rem" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "25px"
  },
  card: {
    background: "#0f172a",
    padding: "25px",
    borderRadius: "16px",
    border: "1px solid #1e293b",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    transition: "transform 0.2s",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px"
  },
  badge: {
    background: "#2563eb33",
    color: "#38bdf8",
    padding: "4px 10px",
    borderRadius: "6px",
    fontSize: "0.75rem",
    fontWeight: "bold"
  },
  removeBtn: {
    background: "transparent",
    border: "none",
    color: "#475569",
    cursor: "pointer",
    fontSize: "1.1rem"
  },
  cardTitle: { margin: "0 0 20px 0", fontSize: "1.3rem" },
  progressContainer: { marginBottom: "20px" },
  progressBar: {
    height: "6px",
    background: "#1e293b",
    borderRadius: "3px",
    width: "100%",
    position: "relative"
  },
  progressText: {
    fontSize: "0.8rem",
    color: "#94a3b8",
    marginTop: "8px",
    display: "block"
  },
  continueBtn: {
    background: "#2563eb",
    color: "white",
    textDecoration: "none",
    textAlign: "center",
    padding: "12px",
    borderRadius: "8px",
    fontWeight: "bold",
    fontSize: "0.9rem"
  },
  emptyState: {
    textAlign: "center",
    marginTop: "100px",
    padding: "40px"
  },
  exploreBtn: {
    background: "#2563eb",
    color: "white",
    textDecoration: "none",
    padding: "12px 30px",
    borderRadius: "8px",
    fontWeight: "bold"
  }
};

export default MyLearning;