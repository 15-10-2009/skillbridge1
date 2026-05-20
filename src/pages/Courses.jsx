import { useState } from "react";

function Courses() {
  const [courses] = useState([
    {
      title: "React Mastery",
      level: "Beginner",
      category: "Frontend",
    },
    {
      title: "Advanced JavaScript",
      level: "Intermediate",
      category: "Frontend",
    },
    {
      title: "MERN Stack Development",
      level: "Advanced",
      category: "Full Stack",
    },
    {
      title: "Node.js Backend",
      level: "Intermediate",
      category: "Backend",
    },
    {
      title: "Express API Design",
      level: "Intermediate",
      category: "Backend",
    },
    {
      title: "MongoDB Essentials",
      level: "Beginner",
      category: "Database",
    },
    {
      title: "UI/UX Design Basics",
      level: "Beginner",
      category: "Design",
    },
    {
      title: "Tailwind CSS Mastery",
      level: "Beginner",
      category: "Frontend",
    },
    {
      title: "Python for AI",
      level: "Advanced",
      category: "AI/ML",
    },
    {
      title: "Machine Learning Basics",
      level: "Advanced",
      category: "AI/ML",
    },
    {
      title: "Cyber Security Basics",
      level: "Intermediate",
      category: "Security",
    },
    {
      title: "Git & GitHub Mastery",
      level: "Beginner",
      category: "Tools",
    },
  ]);

  return (
    <div className="courses">
      <h1>Explore Courses 📚</h1>

      <div className="grid">
        {courses.map((course, i) => (
          <div className="card" key={i}>
            <h2>{course.title}</h2>

            <p>Category: {course.category}</p>

            <span className="badge">{course.level}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;