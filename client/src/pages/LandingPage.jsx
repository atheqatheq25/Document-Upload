import React from "react";

import { useNavigate }
from "react-router-dom";



const LandingPage = () => {

  const navigate =
    useNavigate();

  return (

    

    <div
      style={{

        height: "100vh",

        width: "100%",

        display: "flex",

        justifyContent: "center",

        alignItems: "center",

        background:
          "linear-gradient(to right, #f8fafc, #e2e8f0)",

        fontFamily: "Arial",

      }}
    >

      <div
        style={{

          width: "450px",

          background: "white",

          borderRadius: "22px",

          padding: "45px",

          boxShadow:
            "0 10px 35px rgba(0,0,0,0.08)",

          textAlign: "center",

        }}
      >

        {/* LOGO */}

        <img
          src="/loanwiser-logo.jpg"
          alt="Loanwiser Logo"
          style={{

            width: "90px",

            marginBottom: "20px",

          }}
        />

        {/* TITLE */}

        <h1
          style={{

            fontSize: "34px",

            fontWeight: "700",

            color: "#1e293b",

            marginBottom: "10px",

          }}
        >

          Loanwiser

        </h1>

        {/* SUBTITLE */}

        <p
          style={{

            color: "#64748b",

            marginBottom: "40px",

            fontSize: "15px",

          }}
        >

          Secure Document Management Portal

        </p>

        {/* LOGIN */}

        <button

          onClick={() =>
            navigate(
              "/login"
            )
          }

          style={{

            width: "100%",

            padding: "14px",

            border: "none",

            borderRadius: "12px",

            background: "#2563eb",

            color: "white",

            fontSize: "16px",

            fontWeight: "600",

            cursor: "pointer",

            marginBottom: "18px",

          }}
        >

          Login

        </button>

        {/* REGISTER */}

        <button

          onClick={() =>
            navigate(
              "/register"
            )
          }

          style={{

            width: "100%",

            padding: "14px",

            border: "none",

            borderRadius: "12px",

            background: "#0f172a",

            color: "white",

            fontSize: "16px",

            fontWeight: "600",

            cursor: "pointer",

          }}
        >

          Register

        </button>

      </div>

    </div>

  );

};

export default LandingPage;