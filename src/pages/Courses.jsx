import { Link } from "react-router-dom";
import { coursesData } from "../data/courses"; // Import the data we created

function Courses() {
  return (
    <div className="courses">
      <h1>Explore Courses 📚</h1>

      <div className="grid">
        {coursesData.map((course) => (
          /* Wrap the card in a Link. The ID must match the data file */
          <Link 
            to={`/course/${course.id}`} 
            key={course.id} 
            className="card-link"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div className="card">
              <h2>{course.title}</h2>
              <p>Category: {course.category}</p>
              <span className="badge">{course.level}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Courses;