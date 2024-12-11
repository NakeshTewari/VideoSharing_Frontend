import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const { fullName, username, email, password, confirmPassword } = formData;
    if (!fullName || !username || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!avatar) {
      setError("Please upload an avatar.");
      return;
    }

    try {
      // Create a FormData object to send data and file
      const data = new FormData();
      data.append("fullName", fullName);
      data.append("username", username);
      data.append("email", email);
      data.append("password", password);
      data.append("avatar", avatar);

      // Send data to the backend
      const response = await axios.post(
        "https://videosharing-platform.onrender.com/userauth/api/register",
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 200) {
        setSuccess("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 3000);
      } else {
        setError("An error occurred. Please try again.");
      }
    } catch (err) {
      setError(err.response?.data?.msg || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-form-section">
          <h1 className="signup-title">Hello!</h1>
          <p className="signup-subtitle">Please signup to continue</p>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="input-group">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                className="input-field"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="input-field"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="input-field"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input-field"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="input-field"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label className="file-upload-label">Upload Avatar</label>
              <input
                type="file"
                name="avatar"
                accept="image/*"
                className="file-upload-input"
                onChange={handleAvatarChange}
              />
            </div>
            <button type="submit" className="signup-button">
              Sign Up
            </button>
          </form>
          <p className="login-link">
            Already have an account? <a href="/login">Sign In</a>
          </p>
        </div>
      </div>
    </div>
  );
}
