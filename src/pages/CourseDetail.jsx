import { useParams, Link, useNavigate } from "react-router-dom";
import { coursesData } from "../data/courses";
import Swal from 'sweetalert2'; // Import the popup library

function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = coursesData.find((item) => item.id === id);

  const handleEnroll = () => {
    // 1. Show a success message
    Swal.fire({
      title: 'Success!',
      text: `You have successfully enrolled in ${course.title}!`,
      icon: 'success',
      confirmButtonText: 'Go to My Dashboard',
      confirmButtonColor: '#2563eb',
      background: '#1a1a1a',
      color: '#fff'
    }).then((result) => {
      if (result.isConfirmed) {
        // 2. Redirect the user (e.g., to home or a dashboard)
        navigate("/"); 
      }
    });
  };

  if (!course) return <div className="white-text">Course not found!</div>;

  return (
    <div className="course-detail" style={{ padding: "40px", maxWidth: "800px", margin: "0 auto", color: "white" }}>
      <Link to="/courses" style={{ color: "#646cff" }}>← Back to Courses</Link>
      
      <h1>{course.title}</h1>
      <p>{course.description}</p>

      {/* SYLLABUS LIST */}
      <div className="syllabus">
        <h3>What you will learn:</h3>
        {course.syllabus.map((item, i) => (
          <div key={i} style={{ padding: '10px', borderBottom: '1px solid #333' }}>
            ✅ {item}
          </div>
        ))}
      </div>

      {/* THE ENROLL BUTTON */}
      <button 
        onClick={handleEnroll}
        style={{ 
          marginTop: "30px", 
          padding: "15px 30px", 
          background: "#2563eb", 
          color: "white", 
          border: "none", 
          borderRadius: "8px", 
          fontSize: "1.2rem",
          cursor: "pointer",
          fontWeight: "bold",
          width: "100%"
        }}
      >
        Enroll in {course.title} Now
      </button>
    </div>
  );
}

export default CourseDetail;