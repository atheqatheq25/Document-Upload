import React,
{
  useState,
  useEffect,
} from "react";

import toast
from "react-hot-toast";
import {

  createUserWithEmailAndPassword,

} from "firebase/auth";

import { auth }
from "../firebase";

import axios
from "axios";
import { API_BASE_URL }
from "../api/apiClient";

import { useNavigate }
from "react-router-dom";

const Register = () => {

  const navigate =
    useNavigate();

  const [name, setName] =
    useState("");

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

  // REGISTER

  const handleRegister =
    async () => {

      try {
        setLoading(true);
        // FIREBASE REGISTER

        const userCredential =

          await createUserWithEmailAndPassword(

            auth,

            email,

            password

          );

        const firebaseUser =
          userCredential.user;

        // SAVE TO BACKEND

        await axios.post(

          `${API_BASE_URL}/register-user`,

          {

            name,

            email,

            password,

            firebase_uid:
              firebaseUser.uid,

          }

        );

        toast.success(
          "✅ Registration Successful"
        );
        setLoading(false);
        navigate("/login");

      } catch (error) {

        console.error(error);
        setLoading(false);
        toast.error(
          "❌ Registration Failed"
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

          width: "420px",

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

          Register

        </h2>

        {/* NAME */}

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
          style={{

            width: "100%",

            padding: "12px",

            marginBottom: "18px",

            borderRadius: "10px",

            border:
              "1px solid #dcdcdc",

          }}
        />

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

            marginBottom: "18px",

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

        {/* REGISTER */}

        <button

          onClick={
            handleRegister
          }

          style={{

            width: "100%",

            padding: "13px",

            border: "none",

            borderRadius: "10px",

            background: "#0f172a",

            color: "white",

            fontWeight: "600",

            cursor: "pointer",

          }}
        >

         {loading
  ? "Registering..."
  : "Register"} 

        </button>

      </div>

    </div>

  );

};

export default Register;