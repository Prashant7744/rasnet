// src/pages/Profile.jsx
import React from "react";
import { auth } from "../firebase/firebaseconfig";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Profile({ user }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);   // <-- THIS IS WHERE YOU WRITE IT
      alert("Logged out successfully!");
      navigate("/"); // Go to login page
    } catch (err) {
      console.error(err);
      alert("Logout failed");
    }
  };

  return (
    <div className="page">
      <h1 className="h1">Your Profile</h1>

      <p><strong>Name:</strong> {user?.displayName}</p>
      <p><strong>Email:</strong> {user?.email}</p>

      <button className="btn" style={{ marginTop: 20 }} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
