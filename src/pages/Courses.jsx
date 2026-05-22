import { useState } from "react";
import { Link } from "react-router-dom";
import { coursesData } from "../data/courses"; 

function Courses() {
 
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredCourses = coursesData.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || course.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["All", "Frontend", "Backend", "Full Stack", "Database", "AI/ML", "Design", "Security", "Tools"];

  return (
    <div className="courses-container" style={styles.container}>
      <header style={styles.header}>
        <h1>Explore Courses 📚</h1>
        <p style={{ color: "#94a3b8" }}>Master the most in-demand tech skills.</p>
      </header>

      {/* SEARCH & FILTER SECTION */}
      <div className="toolbar" style={styles.toolbar}>
        <input 
          type="text" 
          placeholder="Search by course title..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
        
        <div className="category-filters" style={styles.categoryList}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                ...styles.filterBtn,
                background: activeCategory === cat ? "#2563eb" : "#1e293b",
                border: activeCategory === cat ? "1px solid #60a5fa" : "1px solid #334155",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* GRID SECTION */}
      <div className="grid" style={styles.grid}>
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <Link 
              to={`/course/${course.id}`} 
              key={course.id} 
              className="card-link"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="card" style={styles.card}>
                <div style={styles.cardHeader}>
                  <span style={styles.categoryTag}>{course.category}</span>
                </div>
                <h2 style={styles.cardTitle}>{course.title}</h2>
                <div style={styles.cardFooter}>
                  <span className="badge" style={styles.levelBadge}>{course.level}</span>
                  <span style={styles.viewMore}>Details →</span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div style={{ textAlign: 'center', gridColumn: '1/-1', padding: '40px' }}>
            <h3 style={{ color: "#94a3b8" }}>No courses match your search or filter.</h3>
          </div>
        )}
      </div>
    </div>
  );
}

// Advanced Styling for Internship Portfolio
const styles = {
  container: { padding: "40px 5%", color: "white" },
  header: { marginBottom: "30px" },
  toolbar: { 
    display: "flex", 
    flexDirection: "column", 
    gap: "20px", 
    marginBottom: "40px",
    background: "#0f172a",
    padding: "20px",
    borderRadius: "12px"
  },
  searchInput: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #334155",
    background: "#1e293b",
    color: "white",
    fontSize: "1rem",
    maxWidth: "400px"
  },
  categoryList: { display: "flex", gap: "10px", flexWrap: "wrap" },
  filterBtn: {
    padding: "8px 16px",
    borderRadius: "20px",
    color: "white",
    cursor: "pointer",
    fontSize: "0.85rem",
    transition: "0.3s"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "25px"
  },
  card: {
    background: "#1e293b",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid #334155",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    transition: "transform 0.2s"
  },
  categoryTag: { color: "#38bdf8", fontSize: "0.7rem", fontWeight: "bold", textTransform: "uppercase" },
  cardTitle: { fontSize: "1.2rem", margin: "15px 0" },
  cardFooter: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  levelBadge: { background: "#2563eb", padding: "4px 8px", borderRadius: "4px", fontSize: "0.75rem" },
  viewMore: { color: "#64748b", fontSize: "0.8rem" }
};

export default Courses;