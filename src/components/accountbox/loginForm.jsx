import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../accountbox/loginForm.css";

function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    if (email === "admin123@gmail.com" && password === "admin") {
      alert("You have successfully logged in!");
      login();
      navigate("/home");
    } else {
      alert("Login failed. Please check your email and password.");
    }
  };

  return (
    <div className="login-cont">
      <div className="login-float">
        <div className="login-form">
          <h2>Admin Login</h2>
          <form onSubmit={onSubmit}>
            <div>
              <input
                type="text"
                name="Email"
                value={email}
                placeholder="Email Address"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="password"
                name="Password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
