import { useState } from "react";

function Login() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email || !form.password || !form.name) {
      setMessage("⚠️ Please fill all required fields");
      return;
    }

    if (form.password.length < 6) {
      setMessage("⚠️ Password must be at least 6 characters");
      return;
    }

    setMessage("✅ Login Successful (Demo Mode)");
  };

  return (
    <div className="auth-container">
      {/* LEFT FORM */}
      <div className="auth-box">
        <h2>Welcome to SkillBridge Pro 🚀</h2>
        <p>Login / Register to continue learning</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
          />

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <select name="role" onChange={handleChange}>
            <option value="student">Student</option>
            <option value="developer">Developer</option>
            <option value="admin">Admin</option>
          </select>

          <label className="show-pass">
            <input
              type="checkbox"
              onChange={() => setShowPassword(!showPassword)}
            />
            Show Password
          </label>

          <button type="submit">Continue</button>

          <p className="msg">{message}</p>
        </form>
      </div>

      {/* RIGHT INFO PANEL */}
      <div className="auth-info">
        <h2>Why SkillBridge Pro?</h2>

        <ul>
          <li>🔥 AI-powered learning paths</li>
          <li>📚 100+ curated courses</li>
          <li>🚀 Real-world projects</li>
          <li>📊 Skill tracking dashboard</li>
          <li>🤝 Collaboration system</li>
        </ul>

        <div className="mini-card">
          <h3>Start Learning Today</h3>
          <p>Join thousands of students upgrading their careers.</p>
        </div>
      </div>
    </div>
  );
}

export default Login;