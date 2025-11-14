// src/pages/Login.jsx
import React from "react";
import { auth, provider } from "../firebase/firebaseconfig";
import { signInWithPopup } from "firebase/auth";

export default function Login() {
  const googleLogin = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      alert(`Welcome, ${res.user.displayName}!`);
    } catch (err) {
      console.error(err);
      alert("Login error");
    }
  };

  console.log("LOGIN PAGE RENDERED");


  return (
    <div className="page">
      <h1 className="h1">Welcome to Rasnet 🌍</h1>
      <p>Please sign in to continue.</p>

      <button className="btn" onClick={googleLogin}>
        Sign in with Google
      </button>
    </div>
  );
}
