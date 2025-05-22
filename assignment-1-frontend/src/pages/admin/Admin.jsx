import React, { use } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

const Admin = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "Admin@27") {
      toast.success("Login successful");
      setTimeout(() => {
        navigate("/all-results");
      }, 100);
    } else {
      toast.error("Invalid credentials. Try again");
    }
  };

  return (
    <div className="outer-box">
      <div>
        <header className="admin-header">Welcome to Admin Portal!</header>
      </div>
      <div className="admin-box">
        <header className="admin">Admin Login</header>
        <form className="input-box" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="enter username"
            value={username}
            onChange={handleUsernameChange}
            name="username"
          />
          <input
            type="password"
            placeholder="enter password"
            value={password}
            onChange={handlePasswordChange}
            name="password"
          />
          <button type="submit">Login</button>
        </form>
      </div>
      <div>
        <footer className="admin-footer">
          <p>&copy; 2025 Survey App. All rights Reserved</p>
        </footer>
      </div>
    </div>
  );
};

export default Admin;
