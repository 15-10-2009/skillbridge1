import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="nav">
      <h2 className="logo">SkillBridge Pro</h2>

      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/courses">Courses</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;