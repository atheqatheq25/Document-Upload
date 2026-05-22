import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="landing-card">
        <img src="/loanwiser-logo.jpg" alt="Loanwiser Logo" className="landing-logo" />
        <h1 className="landing-title">Loanwiser</h1>
        <p className="landing-subtitle">Secure Document Management Portal</p>

        <button className="btn-wide btn-primary" onClick={() => navigate("/login")}>
          Login
        </button>

        <button className="btn-wide btn-secondary" onClick={() => navigate("/register")}>
          Register
        </button>
      </div>
    </div>
  );
};

export default LandingPage;