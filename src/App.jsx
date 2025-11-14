import { BrowserRouter, Routes, Route } from "react-router-dom";
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

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  return (
    <BrowserRouter>
      <div className="page">
        <Routes>
  {!user ? (
    <Route path="*" element={<Login />} />
  ) : (
    <>
      <Route path="/" element={<Explore user={user} />} />
      <Route path="/interests" element={<Interests user={user} />} />
      <Route path="/buddies" element={<Buddies user={user} />} />
      <Route path="/activities" element={<Activities user={user} />} />
      <Route path="/chats" element={<Chats user={user} />} />
      <Route path="/profile" element={<Profile user={user} />} />
    </>
  )}
</Routes>

      </div>

      <Navbar user={user} />
    </BrowserRouter>
  );
}

export default App;
