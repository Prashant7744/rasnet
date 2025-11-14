import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  return (
    <div className="navbar">
      <Link className={`nav-link ${location.pathname === "/buddies" ? "active" : ""}`} to="/buddies">Buddies</Link>
      <Link className={`nav-link ${location.pathname === "/activities" ? "active" : ""}`} to="/activities">Activities</Link>
      <Link className={`nav-link ${location.pathname === "/chats" ? "active" : ""}`} to="/chats">Chats</Link>
      <Link className={`nav-link ${location.pathname === "/profile" ? "active" : ""}`} to="/profile">Profile</Link>
    </div>
  );
}
