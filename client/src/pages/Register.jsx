import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import axios from "axios";
import { API_BASE_URL } from "../api/apiClient";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
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

  // GOOGLE SIGNUP

  const handleGoogleSignup = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      await axios.post(`${API_BASE_URL}/register-user`, {
        name: user.displayName || "Google User",
        email: user.email,
        firebase_uid: user.uid,
      });

      toast.success("✅ Registration with Google Successful");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      console.error("Google signup error:", error);
      setLoading(false);
      toast.error("❌ Google Registration Failed: " + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Register</h2>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="auth-input"
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="auth-input"
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="auth-input"
        />

        <button className="auth-button" onClick={handleRegister}>
          {loading ? "Registering..." : "Register"}
        </button>

        <div className="divider-line">Or</div>

        <button className="google-btn" onClick={handleGoogleSignup} disabled={loading}>
          {loading ? "Signing up..." : "🔍 Sign up with Google"}
        </button>
      </div>
    </div>
  );
};

export default Register;