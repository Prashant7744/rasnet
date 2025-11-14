// src/pages/Login.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase/firebaseconfig";
import { signInWithPopup } from "firebase/auth";

export default function Login() {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      // result.user contains user info
      alert(`Welcome, ${result.user.displayName || "Friend"}!`);
      navigate("/interests"); // go to interests after login
    } catch (err) {
      console.error("Google sign-in error:", err);
      alert("Sign-in failed. Check console.");
    }
  };

  return (
    <div className="page">
      <h1 className="h1">Welcome to Rasnet 🌐</h1>
      <p>Please sign in to continue.</p>
      <button className="btn ghost" onClick={handleGoogleSignIn}>
        Sign in with Google
      </button>
    </div>
  );
}
