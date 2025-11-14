// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "./firebase/firebaseconfig";
import { onAuthStateChanged } from "firebase/auth";

import Login from "./pages/Login";
import Interests from "./pages/Interests";
import Explore from "./pages/Explore";
import Buddies from "./pages/Buddies";
import Activities from "./pages/Activities";
import Chats from "./pages/Chats";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";

export default function App() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setChecking(false);
    });
    return () => unsub();
  }, []);

  console.log("USER STATUS:", user);


  if (checking) return <div className="page">Loading...</div>;

  return (
    <BrowserRouter>
      {!user ? (
        <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
      ) : (
        <>
          <div className="page">
            <Routes>
              <Route path="/" element={<Interests user={user} />} />
              <Route path="/explore" element={<Explore user={user} />} />
              <Route path="/buddies" element={<Buddies user={user} />} />
              <Route path="/activities" element={<Activities user={user} />} />
              <Route path="/chats" element={<Chats user={user} />} />
              <Route path="/profile" element={<Profile user={user} />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
          <Navbar user={user} />
        </>
      )}
    </BrowserRouter>
  );
}
