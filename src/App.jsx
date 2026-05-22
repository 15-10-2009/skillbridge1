import { Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Login from "./pages/Login";
import CourseDetail from "./pages/CourseDetail"; 
import MyLearning from "./pages/MyLearning"; // Added this import

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/login" element={<Login />} />
        
        {/* The Dashboard for enrolled courses */}
        <Route path="/my-learning" element={<MyLearning />} />

        {/* DYNAMIC ROUTE: 
            The ":id" part acts as a variable. 
            Example: /course/react-mastery or /course/python-for-ai
        */}
        <Route path="/course/:id" element={<CourseDetail />} />
      </Routes>
    </>
  );
}

export default App;