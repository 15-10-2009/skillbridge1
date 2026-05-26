import { Routes, Route } from "react-router-dom"; // This is the error.

import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Login from "./pages/Login";
import CourseDetail from "./pages/CourseDetail";
import MyLearning from "./pages/MyLearning";
import Students from "./pages/Students";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/login" element={<Login />} />
        <Route path="/my-learning" element={<MyLearning />} />
        <Route path="/course/:id" element={<CourseDetail />} />
        <Route path="/students" element={<Students />} />
      </Routes>
    </>
  );
}

export default App;