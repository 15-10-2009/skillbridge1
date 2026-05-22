import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Login from "./pages/Login";
// Import the new detail page we discussed
import CourseDetail from "./pages/CourseDetail"; 

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/login" element={<Login />} />
        
        {/* DYNAMIC ROUTE: 
            The ":id" part allows this route to match /course/react-mastery, 
            /course/mern-stack, etc., using just one component.
        */}
        <Route path="/course/:id" element={<CourseDetail />} />
      </Routes>
    </>
  );
}

export default App;