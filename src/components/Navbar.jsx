import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const [hasEnrollments, setHasEnrollments] = useState(false);

  // This effect checks if the user has any courses enrolled to highlight the "My Learning" link
  useEffect(() => {
    const checkEnrollments = () => {
      const savedIds = JSON.parse(localStorage.getItem("myCourses") || "[]");
      setHasEnrollments(savedIds.length > 0);
    };

    // Check on mount
    checkEnrollments();

    // Listen for storage changes (in case they enroll while the navbar is visible)
    window.addEventListener("storage", checkEnrollments);
    return () => window.removeEventListener("storage", checkEnrollments);
  }, []);

  return (
    <nav className="nav" style={styles.nav}>
      <h2 className="logo" style={styles.logo}>SkillBridge Pro</h2>

      <div className="links" style={styles.links}>
        <Link to="/" style={styles.linkItem}>Home</Link>
        <Link to="/courses" style={styles.linkItem}>Explore Courses</Link>
        
        {/* NEW: My Learning Link */}
        <Link to="/my-learning" style={styles.linkItem}>
          My Learning
          {hasEnrollments && <span style={styles.dot}></span>}
        </Link>
        
        <Link to="/login" style={styles.loginBtn}>Login</Link>
      </div>
    </nav>
  );
}

// Optional: Inline styles to make the Navbar look more professional
const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 5%",
    background: "#0f172a",
    borderBottom: "1px solid #1e293b",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  logo: {
    color: "#fff",
    fontSize: "1.5rem",
    fontWeight: "bold",
    margin: 0
  },
  links: {
    display: "flex",
    gap: "25px",
    alignItems: "center"
  },
  linkItem: {
    color: "#94a3b8",
    textDecoration: "none",
    fontSize: "0.95rem",
    fontWeight: "500",
    transition: "color 0.3s",
    position: "relative"
  },
  dot: {
    height: "8px",
    width: "8px",
    backgroundColor: "#2563eb",
    borderRadius: "50%",
    display: "inline-block",
    position: "absolute",
    top: "-5px",
    right: "-10px"
  },
  loginBtn: {
    background: "#2563eb",
    color: "#fff",
    padding: "8px 20px",
    borderRadius: "6px",
    textDecoration: "none",
    fontSize: "0.9rem",
    fontWeight: "600"
  }
};

export default Navbar;