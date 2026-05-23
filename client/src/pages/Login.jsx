import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

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

  // GOOGLE LOGIN

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      await fetch(`${process.env.REACT_APP_API_URL || "http://127.0.0.1:5000"}/register-user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.displayName || "Google User",
          email: user.email,
          firebase_uid: user.uid,
        }),
      });

      toast.success("✅ Login with Google Successful");
      setLoading(false);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error("❌ Google Login Failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>

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

        <button className="auth-button" onClick={handleLogin}>
          Login
        </button>

        <div className="divider-line">Or</div>

        <button className="google-btn" onClick={handleGoogleLogin} disabled={loading}>
          {loading ? "Signing in..." : "🔍 Sign in with Google"}
        </button>
      </div>
    </div>
  );
};

export default Login;