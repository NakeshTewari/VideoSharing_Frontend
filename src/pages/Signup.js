import React from "react";

export default function Signup() {
  return (
    <div className="signup-page">
      <div className="signup-container">
        {/* Left Section */}
        <div className="signup-form-section">
          <h1 className="signup-title">Hello!</h1>
          <p className="signup-subtitle">Please signup to continue</p>
          <form>
            <div className="input-group">
              <input
                type="text"
                placeholder="Full Name"
                className="input-field"
                defaultValue=""
              />
            </div>
            <div className="input-group">
              <input
                type="email"
                placeholder="Email Address"
                className="input-field"
                defaultValue=""
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                placeholder="Password"
                className="input-field"
                defaultValue=""
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                placeholder="Confirm Password"
                className="input-field"
                defaultValue=""
              />
            </div>
            <button type="submit" className="signup-button">
              Sign Up
            </button>
          </form>
          <div className="signup-alt-text">or</div>
          <div className="signup-social">
            <button className="social-button facebook">
              <i className="fab fa-facebook-f"></i>
            </button>
            <button className="social-button twitter">
              <i className="fab fa-twitter"></i>
            </button>
          </div>
          <p className="login-link">
            I'm already a member! <a href="#">Sign In</a>
          </p>
        </div>

        {/* Right Section */}
        <div className="signup-info-section">
          <div className="info-content">
            <div className="info-logo">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/55/Soccerball_pattern.svg"
                alt="Soccer Ball Logo"
              />
            </div>
            <h2 className="info-title">Soccer Ball</h2>
            <p className="info-subtitle">Already have an account?</p>
            <button className="info-signin-button">Sign In</button>
          </div>
        </div>
      </div>
    </div>
  );
}
