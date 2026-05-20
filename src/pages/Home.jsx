import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Home Page Loaded");
  }, []);

  return (
    <div className="home">
      <div className="hero">
        <h1>AI-Powered Learning Platform 🚀</h1>
        <p>Build skills, track progress, and explore courses in one place.</p>

        <button onClick={() => navigate("/courses")}>
          Explore Courses
        </button>
      </div>
    </div>
  );
}

export default Home;