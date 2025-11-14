// src/components/Navbar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseconfig";

export default function Navbar({ user }) {
  const navigate = useNavigate();

  const go = (path) => {
    if (!user) {
      alert("Please sign in to avail services.");
      return;
    }
    navigate(path);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out");
      navigate("/"); // will show Login because App checks auth
    } catch (err) {
      console.error("Logout error:", err);
      alert("Logout failed");
    }
  };

  return (
    <nav className="navbar" role="navigation" aria-label="bottom navigation">
      <button className="nav-link" onClick={() => go("/buddies")}>
        <span>👥</span>
        <span>Buddies</span>
      </button>

      <button className="nav-link" onClick={() => go("/activities")}>
        <span>⚽</span>
        <span>Activities</span>
      </button>

      <button className="nav-link" onClick={() => go("/chats")}>
        <span>💬</span>
        <span>Chats</span>
      </button>

      <button className="nav-link" onClick={() => go("/profile")}>
        <span>👤</span>
        <span>Profile</span>
      </button>

      {/* small logout button */}
      <button className="nav-link" onClick={handleLogout} title="Logout">
        <span>🔒</span>
        <span>Logout</span>
      </button>
    </nav>
  );
}
