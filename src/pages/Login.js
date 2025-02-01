import React from "react";
import { useState } from "react";
import { json, Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Login() {
  // const [SignUp, setSignUp] = useState(false);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  async function OnSignIn(e) {
    e.preventDefault();

    const response = await fetch("http://localhost:4000/userauth/api/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    const data = await response.json(); // Parse the JSON from the response
    console.log("Login successful:", JSON.stringify(data));

    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("userId",data.user._id);
    localStorage.setItem("username",data.user.username);

    if (data) {
      navigate("/");
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">LOGIN</h2>
        <form onSubmit={OnSignIn}>
          <div className="input-group">
            <label className="input-wrapper">
              <i className="fas fa-envelope icon"></i>
              <input
                type="username"
                placeholder="Username"
                className="input-field"
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
          </div>
          <div className="input-group">
            <label className="input-wrapper">
              <i className="fas fa-lock icon"></i>
              <input
                type="password"
                placeholder="Password"
                className="input-field"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <div className="remember-group">
            <input type="checkbox" id="remember" className="checkbox" />
            <label htmlFor="remember" className="remember-label">
              Remember me
            </label>
          </div>
          <button type="submit" className="login-button">
            LOGIN
          </button>
        </form>
      
        <div className="signup-link">
          Not a member? <a href="#"> <Link to="/Signup">Sign up now</Link></a>
        </div>
      </div>
    </div>
  );
}
