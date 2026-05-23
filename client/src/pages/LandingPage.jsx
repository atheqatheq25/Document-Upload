import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!isMounted) return;
      
      if (user?.email) {
        navigate("/dashboard", { replace: true });
      }
    });
    
    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [navigate]);

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