import React,
{
  useState,
  useEffect,
} from "react";
import toast
from "react-hot-toast";

import {

  signInWithEmailAndPassword,

} from "firebase/auth";

import { auth }
from "../firebase";

import { useNavigate }
from "react-router-dom";

const Login = () => {

  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const [
  loading,
  setLoading,
] = useState(false);

  // REDIRECT ON REFRESH

  useEffect(() => {

    const navigationEntries =
      performance.getEntriesByType(
        "navigation"
      );

    if (
      navigationEntries.length > 0 &&
      navigationEntries[0].type ===
        "reload"
    ) {

      navigate("/");

    }

  }, []);

  // LOGIN

  const handleLogin =
    async () => {

      try {

        await signInWithEmailAndPassword(

          auth,

          email,

          password

        );

        toast.success(
          "✅ Login Successful"
        );

        navigate(
          "/dashboard"
        );

      } catch (error) {

        console.error(error);

        toast.error(
          "❌ Invalid Email or Password"
        );

      }

    };

  return (

    <div
      style={{

        height: "100vh",

        display: "flex",

        justifyContent: "center",

        alignItems: "center",

        background:
          "linear-gradient(to right, #f8fafc, #e2e8f0)",

      }}
    >

      <div
        style={{

          width: "400px",

          background: "white",

          padding: "40px",

          borderRadius: "20px",

          boxShadow:
            "0 10px 30px rgba(0,0,0,0.08)",

        }}
      >

        <h2
          style={{

            textAlign: "center",

            marginBottom: "30px",

          }}
        >

          Login

        </h2>

        {/* EMAIL */}

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          style={{

            width: "100%",

            padding: "12px",

            marginBottom: "20px",

            borderRadius: "10px",

            border:
              "1px solid #dcdcdc",

          }}
        />

        {/* PASSWORD */}

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          style={{

            width: "100%",

            padding: "12px",

            marginBottom: "25px",

            borderRadius: "10px",

            border:
              "1px solid #dcdcdc",

          }}
        />

        {/* LOGIN */}

        <button

          onClick={handleLogin}

          style={{

            width: "100%",

            padding: "13px",

            border: "none",

            borderRadius: "10px",

            background: "#2563eb",

            color: "white",

            fontWeight: "600",

            cursor: "pointer",

          }}
        >

          Login

        </button>

      </div>

    </div>

  );

};

export default Login;